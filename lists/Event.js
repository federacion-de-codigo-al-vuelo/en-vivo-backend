const { Text, DateTime } = require('@keystonejs/fields');
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');

const ImageRelationship = require('../keystone-media-server/fields/ImageRelationship')

const resolveInput = require('../hooks/addSlug');


module.exports = {
    fields: {
        name: {
            type: Text,
            label: "Event name",
            isRequired: true,
        },
        slug: {
            type: Text,
            label: "Slug",
        },
        image: {
            type: ImageRelationship,
            label: "Image",
            ref: "Image",
            isRequired: true,
        },
        dateStart: {
            type: DateTime,
            label: "Start Date",
            isRequired: true,
        },
        dateEnd: {
            type: DateTime,
            label: "End Date",
            isRequired: true,
        },
        owner: {
            type: AuthedRelationship,
            label: "Owner",
            ref: "User",
            isRequired: true,
        },
    },

    hooks: {
        resolveInput
    },
    

    labelField: "name",
    adminConfig: {
        defaultColumns: "image,startDate,owner",
        defaultSort: "dateStart"
    }
};