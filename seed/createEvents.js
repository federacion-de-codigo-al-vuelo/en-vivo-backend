const faker = require("faker/locale/es_MX")
const moment = require("moment")

const generar = require("./funcionesGenerar")


const eventoGenerar = ( i, pasado, futuro ) => {

    let name = generar.name(5,2)

    let fecha_inicio

    let diasSemana = 7
    if( !! pasado && !! futuro ) {
        fecha_inicio = faker.date.between(
            moment( new Date() ).add( - diasSemana / 2, 'd' ),
            moment( new Date() ).add( diasSemana / 2, 'd' ),

        )
    } else if( ! pasado ) {
        fecha_inicio = faker.date.future(1)
    } else {
        fecha_inicio = faker.date.past(1)
    }

    let fecha_final = moment(new Date(fecha_inicio)).add(
        Math.ceil(Math.random()*4),'h'
    ).toDate().toISOString()

    fecha_final = moment(new Date(fecha_inicio)).add(
        Math.ceil(Math.random()*4)*15,'m'
    ).toDate().toISOString()

    fecha_inicio = fecha_inicio.toISOString()

    return {
        name: name,
        imagen: generar.imagen(),
        imagen_portada: generar.imagen(),
        fecha_inicio: fecha_inicio,
        fecha_final: fecha_final,
        descripcion: generar.contenido(7,3),
        meta_title: name,
        meta_descripcion: generar.parrafo(),
    }
}

const crearEventos = async (keystone, amount) => {
  const eventosMetaQuery = await keystone.executeQuery(
    `query {
      _allEventosMeta {
        count
      }
    }`
  );

  let eventosCuenta = eventosMetaQuery.data ?
    eventosMetaQuery.data._allEventosMeta?
      eventosMetaQuery.data._allEventosMeta.count
      : null
  : null
  

  if (eventosCuenta === 0) {
        
    for( let i = 0; i<amount; i++) {

        
        const res = await keystone.executeQuery(
            `mutation initialEvento($data: EventoCreateInput) {
                createEvento(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: eventoGenerar( i,i<10 )
                },
            }
        );
            
    }
    for( let i = 0; i<10; i++) {

        
        const res = await keystone.executeQuery(
            `mutation initialEvento($data: EventoCreateInput) {
                createEvento(data: $data) {
                    id
                }
            }`,
            {
                variables: {
                    data: eventoGenerar( i, true, true )
                },
            }
        );
            
    }

    
  }
}


module.exports = crearEventos
