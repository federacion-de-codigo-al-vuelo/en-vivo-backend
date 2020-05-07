const generate = require("./generateFunctions")



const configurationGenerate = () => {

  return {
    name: "Site Configuration",
    site_name: "ENVIVO",
    meta_title: "ENVIVO",
    meta_descripcion: generate.paragraph(),
  }
}

const configurationsCreate = async keystone => {
  const configurationsMetaQuery = await keystone.executeQuery(
    `query {
      _allConfigurationsMeta {
        count
      }
    }`
  );

  let configurationsCount = configurationsMetaQuery.data ?
    configurationsMetaQuery.data._allConfigurationsMeta?
      configurationsMetaQuery.data._allConfigurationsMeta.count
      : null
  : null
  

  if (configurationsCount === 0) {
    
    
    
    const res = await keystone.executeQuery(
      `mutation initialConfiguration($data: ConfigurationCreateInput) {
            createConfiguration(data: $data) {
              id
            }
          }`,
      {
        variables: {
          data: configurationGenerate()
        },
      }
    );


  }
}


module.exports = configurationsCreate
