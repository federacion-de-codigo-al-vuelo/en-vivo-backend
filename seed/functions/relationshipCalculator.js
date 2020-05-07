const checkEdgeCases = require("./edgeCases")

const relationshipCalculate = ({
  probability,
  cardinality,
  minimum1,
  minimum2,
  maximum1,
  maximum2,
  amount1,
  amount2
}) => {

    try {
        checkEdgeCases(
            probability,
            cardinality,
            minimum1,
            minimum2,
            maximum1,
            maximum2,
            amount1,
            amount2
        )
    } catch(err) {
        throw err
    }

  switch (cardinality) {
    
    case('ONE_TO_ONE'):
      
    //   return new Error('unoauno')

    //   return new Error(minimum1 == 0 && minimum2 == 0)
    if (minimum1 == 0 && minimum2 == 0) {
      return probability > Math.random() ? 1 : 0
    } else {
      return 0
    }


    case('ONE_TO_MANY'):
      
      if (amount1 * minimum1 >= amount2 ) {
          return minimum1
      } else {
        
        let random = Math.random()+probability
        

        let num = Math.max(
            minimum1,
            minimum1 +
            Math.min(1,random) * ( maximum1 - minimum1 )
        ) 
        
        
        num = Math.min(num,Math.floor(amount2/amount1))
        
        return num
        
      }
  
    case('MANY_TO_MANY'):

      let num = Math.max(
        minimum1,
        Math.floor(
          minimum1 +
          ( probability * ( maximum1 - minimum1 ) ) 
        )
      )
      
      return num
    
    case('MANY_TO_ONE'):
      
      return Math.floor(
        probability === 1 ? 1 : Math.random > probability ? 0 : 1 
      )
  
  }

}

module.exports = relationshipCalculate