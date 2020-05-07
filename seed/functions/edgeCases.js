const RelationshipError = require("./error")

const checkEdgeCases = (
  probability,
  cardinality,
  minimum1,
  minimum2,
  maximum1,
  maximum2,
  amount1,
  amount2
) => {

  // log
// pruebas arrojan excepciones dependiendo 
  //   - 0 elementos en alguna de las entityes
  if ( ! amount1 || ! amount2 ) {
    throw new RelationshipError('NO HAY COMO HACER RELACIONES')    
  }
  //   - UNU A UNO minimum1 && minimum2 > 0 -> HAY QUE PARAR
  if ( cardinality === 'ONE_TO_ONE' && minimum1 > 0 && minimum2 > 0 ) {
    if ( 
      ( amount1 * minimum1 > amount2 ) ||
      ( amount2 * minimum2 > amount1 )
    ) {
      throw new RelationshipError('NO HAY SUFICIENTES ENTIDADES PARA CUMPLIR CON MINIMO DE RELACIONES')      
    }
  }
  //   - UNO A MUCHOS minimum1 * entity1.len > entity2.len -> HAY QUE PARAR
  if ( 
    cardinality === 'ONE_TO_MANY' &&
    amount1 * minimum1 > amount2
  ) {
    throw new RelationshipError('NO HAY SUFICIENTES ENTIDADES PARA CUMPLIR CON MINIMO DE RELACIONES')    
  }
  //   - UNU A MUCHOS minimum1 > 0 && entity2.len < entity1.len -> HAY QUE PARAR
  if ( 
    cardinality === 'ONE_TO_MANY' &&
    minimum1 > 0 &&
    amount1 > amount2
  ) {
    throw new RelationshipError('NO HAY SUFICIENTES ENTIDADES PARA CUMPLIR CON MINIMO DE RELACIONES')    
  }

  //   - MUCHOS A UNO minimum1 > entity2.len -> HAY QUE PARAR
  if ( 
    cardinality === 'MANY_TO_ONE' &&
    (amount2 == 0 || amount1 == 0 )
  ) {
    throw new RelationshipError('NO HAY SUFICIENTES ENTIDADES PARA CUMPLIR CON MINIMO DE RELACIONES')    
  }

  //   - MUCHOS A UNO minimum1 o máximo1 son mayores a 1
  if ( 
    cardinality === 'MANY_TO_ONE' &&
    (minimum1 > 1 || maximum1 > 1)
  ) {
    throw new RelationshipError('EL CAMPO PERMITE MAXIMO UNA RELACION')    
  }

  //   - MUCHOS A MUCHOS minimum1 > entity2.len -> HAY QUE PARAR
  if ( 
    cardinality === 'MANY_TO_MANY' &&
    (amount2 == 0 || amount1 == 0)
  ) {
    throw new RelationshipError('NO HAY SUFICIENTES ENTIDADES PARA CUMPLIR CON MINIMO DE RELACIONES')    
  }

  

}


module.exports = checkEdgeCases