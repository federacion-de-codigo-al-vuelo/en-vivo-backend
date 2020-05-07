const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const seedData = require('./seed/seed');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const resolveImageInput = require('./keystone-media-server/resolvers/imageInput') 
const createImageSizes = require('./keystone-media-server/seed/createImageSizes') 

const {
  MONGO_URI,
  BUILD_STAGE
} = {...process.env}


const staticPath = "/archivos"
const staticSrc = "./archivos"


const {
  User,
  Configuration,
  Event,
  EventCategory
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
  onConnect: ()=>{
    seedData(keystone)
    createImageSizes(keystone)
  },
});



// add current keystone instance to entity hooks for CRUD GraphQL requests
Image.hooks = {
  resolveInput: (params) => resolveImageInput({
    ...params,
    keystone
  })
}



keystone.createList('User', User);

// media server:
keystone.createList('ImageSize', ImageSize);
keystone.createList('MediaFile', MediaFile);
keystone.createList('Image', Image);


// our entities:


keystone.createList('Configuration', Configuration);

keystone.createList('Event', Event);
keystone.createList('EventCategory', EventCategory);



const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    BUILD_STAGE == 1 ? new GraphQLApp() : new GraphQLApp(sessionStore),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy,
    }),
    new StaticApp({
      path: staticPath,
      src: staticSrc,
      // fallback: 'index.html'
    }),
  ],
};
