const crearPrimerUsuario = require("./seed/crearPrimerUsuario.js")
const crearConfiguracion = require("./seed/crearConfiguracion.js")
const crearEventos = require("./seed/crearEventos.js")
const crearCategoriasEvento = require("./seed/crearCategoriasEvento.js")
const crearEspacios = require("./seed/crearEspacios.js")
const crearLogotipos = require("./seed/crearLogotipos.js")

const generarRelaciones = require('./seed/funciones/generarRelaciones')


module.exports = async keystone => {

  if (process.env.RESET_DB == 'TRUE') {

    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
    });

    
    await crearPrimerUsuario(keystone)
    console.log('crearPrimerUsuario: DONE');
    
    await crearConfiguracion(keystone)
    console.log('crearConfiguracion: DONE');
    
    await crearEventos(keystone, 20)
    console.log('crearEventos: DONE');
    
    await crearCategoriasEvento(keystone, 15)
    console.log('crearCategoriasEvento: DONE');
    
    
    
    await generarRelaciones(keystone, {
      name: 'Evento',
      plural: 'Eventos',
      field: 'categoria',
    }, {
      name: 'CategoriaEvento',
      plural: 'CategoriasEvento',
    }, {
      cardinality: 'MANY_TO_ONE',
      maximum1: 1,
      maximum2: 1,
      minimum1: 1,
      minimum2: 0,
      
      probability: 1
    })
    console.log('generarRelaciones Evento y CategoriaEvento: DONE', );
  
  }


};
