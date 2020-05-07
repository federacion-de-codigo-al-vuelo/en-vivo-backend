const generar = require("./funcionesGenerar")

const categoriaEventoGenerar = i => {

    let name = generar.name(4,1)
    
    return {
        name: name
    }

}

const crearCategoriaEventos = async (keystone, amount) => {
  const categoriaEventosMetaQuery = await keystone.executeQuery(
    `query {
      _allCategoriasEventoMeta {
        count
      }
    }`
  );

  let categoriaEventosCuenta = categoriaEventosMetaQuery.data ?
    categoriaEventosMetaQuery.data._allCategoriasEventoMeta?
      categoriaEventosMetaQuery.data._allCategoriasEventoMeta.count
      : null
  : null
  
  

  if (categoriaEventosCuenta === 0) {
        
    for( let i = 0; i<amount; i++) {

        
        const res = await keystone.executeQuery(
            `mutation initialCategoriaEvento($data: CategoriaEventoCreateInput) {
              createCategoriaEvento(data: $data) {
                  id
                }
            }`,
            {
                variables: {
                    data: categoriaEventoGenerar( i )
                },
            }
        );
        
    }
    
  }
}


module.exports = crearCategoriaEventos
