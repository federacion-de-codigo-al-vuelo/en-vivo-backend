const { Text, Relationship } = require('@keystonejs/fields');


const resolveInput = require('../hooks/addSlug');


module.exports = {
    fields: {
        name: {
            type: Text,
            label: "Event Category name",
            isRequired: true,
        },
        slug: {
            type: Text,
            label: "Slug",
        },
        events: {
            type: Relationship,
            ref: "Event.categories",
            many: true
        }
    },

    plural: "EventCategories",
    
    hooks: {
        resolveInput
    },
    
    labelField: "name",
};