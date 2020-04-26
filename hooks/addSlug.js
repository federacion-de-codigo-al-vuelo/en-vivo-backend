const slugify = require("../funciones/herramientas/slugify")

const resolveInput = async ({
    operation,
    existingItem,
    originalInput,
    resolvedData,
    context,
    actions,
  }) => {
    if (operation == 'create') {
  
      return {
        ...resolvedData,
        slug: slugify(resolvedData.name)
      }
    } else {
      return resolvedData
    }
  }

module.exports = resolveInput  