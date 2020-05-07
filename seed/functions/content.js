const faker = require("faker/locale/es_MX")

const blocks = (maxNum,numMin) => {

  if( parseInt(maxNum) > 0 ) {

    let amount = Math.max(Math.ceil(Math.random()*maxNum),numMin)
  
    let blocks = new Array( amount ).fill(0).map(e=>{
  
      const types = [
        'paragraph',
        'heading',
        'blockquote'
      ]
  
      let whichType = Math.floor(Math.random() * types.length);

      let type = types[whichType]
      
      let text
  
      switch (whichType) {
        case 'paragraph':
          text = faker.lorem.paragraph()
          break;
        case 'blockquote':
          text = faker.lorem.paragraph()
          break;
              
        default:
          text = faker.lorem.words( 4 + Math.floor(Math.random() * 6) )
          break;
      }
      
        return `{\"object\":\"block\",\"type\":\"${type}\",\"data\":{},\"nodes\":[
            {\"object\":\"text\",\"text\":\"${text}\",\"marks\":[]}
        ]},`
  
    }).reduce((e,acc)=>acc += e,'')
    
    blocks=blocks.substring(0, blocks.length - 1);    
  
    return blocks

  }
  
  return ''

}

  

const content = (maxNum,numMin,config) => {

    if( ! maxNum ) {
        maxNum = 0
    }

    if( ! numMin ) {
        numMin = maxNum
    }

    const {
      startType,
      titleLength
    } = {...config}

    let initialText

    switch( startType ) {
      
      case "sentence":
        initialText = faker.lorem.sentence()
        break;

      default:
        initialText = faker.lorem.paragraph()
        
    }

    let wordsTitle = titleLength ? titleLength : 4+Math.ceil(Math.random()*5)

    return ({
        create: {
          document: `{\"object\":\"document\",\"data\":{},\"nodes\":[
            
            {\"object\":\"block\",\"type\":\"heading\",\"data\":{},\"nodes\":[
                {\"object\":\"text\",\"text\":\"${faker.random.words(wordsTitle)}\",\"marks\":[]}
            ]},
            
            {\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[
                {\"object\":\"text\",\"text\":\"${initialText}\",\"marks\":[]}
            ]}
    
            ${maxNum>0 ? ',' : ''}

            ${blocks(maxNum,minNum)}
    
        ]}`
    
          
        }
    })
}


module.exports = {
  blocks,
  content
}