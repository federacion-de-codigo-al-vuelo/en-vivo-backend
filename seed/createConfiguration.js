const randomString = require("./randomString")
const config = require("../data/config")
const { File } = require('@keystonejs/fields');

const generar = require("./funcionesGenerar")



const configuracionGenerar = () => {

  return {
    title: config.name,
    logotipo: generar.imagen(),
    video_presentacion_codigo: generar.video(),
    portada_imagen: generar.imagen(),
    facebook: generar.redes(config.name).facebook,
    twitter: generar.redes(config.name).twitter,
    instagram: generar.redes(config.name).instagram,
    introduccion_extracto: generar.parrafo(),
    introduccion_contenido: generar.contenido(3),
    cartelera: generar.imagen(),
    ubicacion_imagen: generar.imagen(),
    ubicacion: generar.contenido(0,0,{ tipoInicial: "sentence", longitudTitle: 2 }),
    informacion: generar.contenido(2),
    contacto: generar.contenido(2),
    visitas_title: "Visitas",
    visitas_text: generar.contenido(2),
    aviso_privacidad: generar.contenido(2),
    meta_title: config.name,
    meta_descripcion: generar.parrafo(),
  }
}

const crearConfiguraciones = async keystone => {
  const configuracionesMetaQuery = await keystone.executeQuery(
    `query {
      _allConfiguracionesMeta {
        count
      }
    }`
  );

  let configuracionesCuenta = configuracionesMetaQuery.data ?
    configuracionesMetaQuery.data._allConfiguracionesMeta?
      configuracionesMetaQuery.data._allConfiguracionesMeta.count
      : null
  : null
  

  if (configuracionesCuenta === 0) {
    
    
    
    const res = await keystone.executeQuery(
      `mutation initialConfiguracion($data: ConfiguracionCreateInput) {
            createConfiguracion(data: $data) {
              id
            }
          }`,
      {
        variables: {
          data: configuracionGenerar()
        },
      }
    );


  }
}


module.exports = crearConfiguraciones
