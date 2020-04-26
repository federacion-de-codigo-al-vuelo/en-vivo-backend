const { Text, DateTime } = require('@keystonejs/fields');
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');

const ImageRelationship = require('../keystone-media-server/fields/ImageRelationship')

module.exports = {
    fields: {
        name: {
            type: Text,
            label: "Event name",
            isRequired: true,
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
    labelField: "name",
    adminConfig: {
        defaultColumns: "image,startDate,owner",
        defaultSort: "dateStart"
    }
};