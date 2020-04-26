const { Text } = require('@keystonejs/fields');

const ImageRelationship = require('../keystone-media-server/fields/ImageRelationship');


module.exports = {
    fields: {
        
        name: {
            type: Text,
            isUnique: true,
        },
        
        site_name: {
            type: Text
        },
        
        logo: {
            type: ImageRelationship,
            ref: "Image"
        },

        
    },
    
    labelField: "name"
};