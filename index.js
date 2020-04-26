const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const initialiseData = require('./initial-data');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const resolveImageInput = require('./keystone-media-server/resolvers/imageInput') 

const {
  MONGO_URI,
  BUILD_STAGE
} = {...process.env}


const staticPath = "/archivos"
const staticSrc = "./archivos"


const {
  Event
}= require('./lists')

const { Image, MediaFile, ImageSize } = require('./keystone-media-server/lists/index')

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "en-vivo-backend";
const mongoUrl = MONGO_URI || 'mongodb://localhost:27017/'+PROJECT_NAME

const sessionStore = BUILD_STAGE == 1 ? null : new MongoStore({ url: mongoUrl })

const keystone = new Keystone({
  secureCookies: false,
  sessionStore,
  name: PROJECT_NAME,
  adapter: new Adapter(),
  onConnect: initialiseData,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});


Image.hooks = {
  resolveInput: (params) => resolveImageInput({
    ...params,
    keystone
  })
}

keystone.createList('ImageSize', ImageSize);
keystone.createList('MediaFile', MediaFile);
keystone.createList('Image', Image);

keystone.createList('Event', Event);



const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    BUILD_STAGE == 1 ? new GraphQLApp() : new GraphQLApp(sessionStore),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
    new StaticApp({
      path: staticPath,
      src: staticSrc,
      // fallback: 'index.html'
    }),
  ],
};
