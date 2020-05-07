const faker = require("faker/locale/es_MX")
const moment = require("moment")

const generate = require("./generateFunctions")


const eventGenerate = ( i, past, future ) => {

    let name = generate.name(5,2)

    let dateStart

    let daysWeek = 7
    if( !! past && !! future ) {
        dateStart = faker.date.between(
            moment( new Date() ).add( - daysWeek / 2, 'd' ),
            moment( new Date() ).add( daysWeek / 2, 'd' ),

        )
    } else if( ! past ) {
        dateStart = faker.date.future(1)
    } else {
        dateStart = faker.date.past(1)
    }

    let dateEnd = moment(new Date(dateStart)).add(
        Math.ceil(Math.random()*4),'h'
    ).toDate().toISOString()

    dateEnd = moment(new Date(dateStart)).add(
        Math.ceil(Math.random()*4)*15,'m'
    ).toDate().toISOString()

    dateStart = dateStart.toISOString()

    return {
        name: name,
        description: generate.content(7,3),
        dateStart: dateStart,
        dateEnd: dateEnd,
    }
}

const createEvents = async (keystone, amount) => {
  const eventsMetaQuery = await keystone.executeQuery(
    `query {
      _allEventsMeta {
        count
      }
    }`
  );

  let eventsCount = eventsMetaQuery.data ?
    eventsMetaQuery.data._allEventsMeta?
      eventsMetaQuery.data._allEventsMeta.count
      : null
  : null
  

  if (eventsCount === 0) {
        


    for( let i = 0; i<amount; i++) {


        
        const imageQuery = await keystone.executeQuery(
            `mutation eventImage($data: ImageCreateInput) {
                createImage(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: {
                        original: generate.image()
                    }
                },
            }
        )

        image = imageQuery.data ? imageQuery.data.createImage.id : null
        


        const event = await keystone.executeQuery(
            `mutation initialEvent($data: EventCreateInput) {
                createEvent(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: eventGenerate( i, true, true )
                },
            }
        );


        let res = await keystone.executeQuery(
            `mutation addEventImage($id: ID!, $data: EventUpdateInput) {
                updateEvent(id: $id, data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    id: event.data.createEvent.id,
                    data: {
                        image: {
                            connect: {
                                id: image
                            }
                        }
                    }
                },
            }
        );

            
    }

    
  }
}


module.exports = createEvents
