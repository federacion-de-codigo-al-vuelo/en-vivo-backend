const capitalize = require('../../functions/tools/capitalize')


const relate = async (keystone, e1,e2) => {

    // id
    // name
    // field
    // many

    let payload = { id: e2.id } 


    if( e1.many ) {
        payload = [ payload ]
    }

    const variables = {
        "id": e1.id,
        "data": {
            [e1.field]: {
                "connect": payload
            }
        }
    }

    const res = await keystone.executeQuery(
        `mutation connect${capitalize(e1.name)}($id: ID!, $data: ${capitalize(e1.name)}UpdateInput) {
            update${capitalize(e1.name)}(id: $id, data: $data) {
                id
                ${e1.field} {
                    id
                }
            }
        }`,
        { variables }
    );


    return res

}


const createRelationship = async (keystone, entity1, entity2 ) => {

    relate(keystone, entity1, entity2)

}
    
module.exports = createRelationship