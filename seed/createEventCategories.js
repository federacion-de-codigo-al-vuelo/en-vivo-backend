const faker = require("faker/locale/es_MX")
const moment = require("moment")

const generate = require("./generateFunctions")


const eventCategoryGenerate = ( i, past, future ) => {

    let name = generate.name(5,2)

  

    return {
        name: name,
    }
}

const createEventCategories = async (keystone, amount) => {
  const eventCategoriesMetaQuery = await keystone.executeQuery(
    `query {
      _allEventCategoriesMeta {
        count
      }
    }`
  );

  let eventCategoriesCount = eventCategoriesMetaQuery.data ?
    eventCategoriesMetaQuery.data._allEventCategoriesMeta?
      eventCategoriesMetaQuery.data._allEventCategoriesMeta.count
      : null
  : null
  

  if (eventCategoriesCount === 0) {
        
    for( let i = 0; i<amount; i++) {

        
        const res = await keystone.executeQuery(
            `mutation initialEventCategory($data: EventCategoryCreateInput) {
                createEventCategory(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: eventCategoryGenerate( i,i<10 )
                },
            }
        );
            
    }
    for( let i = 0; i<10; i++) {

        
        const res = await keystone.executeQuery(
            `mutation initialEventCategory($data: EventCategoryCreateInput) {
                createEventCategory(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: eventCategoryGenerate( i, true, true )
                },
            }
        );
            
    }

    
  }
}


module.exports = createEventCategories
