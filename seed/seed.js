const createUsers = require("./createUsers.js")
const createConfiguration = require("./createConfiguration.js")
const createEvents = require("./createEvents.js")
const createEventCategories = require("./createEventCategories.js")

const relationships = require('./functions/relationships')


module.exports = async keystone => {

  if (process.env.RESET_DB == 1) {

    console.log("\n\nseeding data...\n\n")

    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
      console.warn("db dropped")
    });

    
    await createUsers(keystone)
    console.log('createUsers: DONE');
    
    await createConfiguration(keystone)
    console.log('createConfiguration: DONE');
    
    await createEvents(keystone, 30)
    console.log('createEvents: DONE');
    
    await createEventCategories(keystone, 9)
    console.log('createEventCategories: DONE');
    
    
    
    const rels = await relationships(keystone, {
      name: 'EventCategory',
      plural: 'EventCategories',
      field: 'events',
    }, {
      name: 'Event',
      plural: 'events',
      field: 'categories',
    }, {
      cardinality: 'MANY_TO_MANY',
      maximum1: 10,
      maximum2: 3,
      minimum1: 1,
      minimum2: 1,
      
      probability:1
    })
    console.log('relationships: Event, EventCategory: DONE' );
  
  }

  
  

  console.log("\n\nseeding data: DONE\n\n")


};
