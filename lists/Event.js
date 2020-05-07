const { Text, DateTime, Relationship } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/field-content');
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
        description: {
            type: Content,
            label: "Content",
        },
        image: {
            type: ImageRelationship,
            label: "Image",
            ref: "Image",
        },
        dateStart: {
            type: DateTime,
            label: "Start Date",
        },
        dateEnd: {
            type: DateTime,
            label: "End Date",
        },
        owner: {
            type: AuthedRelationship,
            label: "Owner",
            ref: "User",
        },
        categories: {
            type: Relationship,
            label: "Categories",
            ref: "EventCategory.events",
            many: true
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