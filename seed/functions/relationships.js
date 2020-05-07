
const relationshipCalculate = require("./relationshipCalculator")
const createRelationship = require("./relationship")
const shuffle = require('../../functions/tools/shuffle')
const capitalize = require('../../functions/tools/capitalize')

const select = (cardinality, relationshipsNum, entity2) => {

  let selection = []

  for (let i = 0; i < relationshipsNum; i++) {

    if (cardinality == 'ONE_TO_ONE' || cardinality == 'ONE_TO_MANY'  ) {    
      selection.push(entity2.shift().id)
    } else {
      selection.push(entity2[i].id)
    }
  }
  return selection

}

const generateRelationships = async (
  keystone,
  entity1,
  entity2,
  options
) => {

  const {
    cardinality,
    maximum1,
    maximum2,
    minimum1,
    minimum2,
    probability
  } = {...options}

  const entity1Query = await keystone.executeQuery(
    `query {
      all${capitalize(entity1.plural)} {
        id
        name
      }
    }`
  );

  const entity2Query = await keystone.executeQuery(
    `query {
      all${capitalize(entity2.plural)} {
        id
        name
      }
    }`
  );

  

  let entity1Collection = shuffle(entity1Query.data['all' + capitalize(entity1.plural)])
  let entity2Collection = shuffle(entity2Query.data['all' + capitalize(entity2.plural)])


  let amount1 = entity1Collection.length
  let amount2 = entity2Collection.length

  // Calcula cuántas relationships para cada entity1
  entity1Collection.map(e => {

    relationshipsNum = relationshipCalculate({
      probability,
      cardinality,
      minimum1,
      minimum2,
      maximum1,
      maximum2,
      amount1,
      amount2
    })

    if (cardinality == 'ONE_TO_ONE' || cardinality == 'ONE_TO_MANY'  ) {
      amount2 = amount2-relationshipsNum
    }
      
    entity2Collection = shuffle(entity2Collection)

    e.relationships = select(cardinality, relationshipsNum, entity2Collection)
    amount1--
    
    return e

  })

  let many1 = cardinality == "MANY_TO_MANY" || cardinality == "ONE_TO_MANY" 
  let many2 = cardinality == "MANY_TO_MANY" || cardinality == "MANY_TO_ONE" 
  
  let responses = await entity1Collection.map(async e => {
    
    await e.relationships.map(async (otherId) =>{
      const res = await createRelationship(
        keystone, 
        {
          id: e.id,
          name: entity1.name,
          field: entity1.field,
          many: many1
        },
        {
          id: otherId,
          name: entity2.name,
          field: entity2.field,
          many: many2
        },
      )
      return res
    })
  })  
    

  return responses
}
    
module.exports=generateRelationships