const randomString = require("./randomString")

const crearPrimerUsuario = async (keystone) => {
  const usersMetaQuery = await keystone.executeQuery(
    `query {
      _allUsersMeta {
        count
      }
    }`
  );

  let usersCount = usersMetaQuery.data ?
    usersMetaQuery.data._allUsersMeta?
      usersMetaQuery.data._allUsersMeta.count
      : null
  : null
  

  if (usersCount === 0) {
    const password = 'password1';
    const email = 'labweb@gmail.com';

    await keystone.executeQuery(
      `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "Admin", email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      {
        variables: {
          password,
          email,
        },
      }
    );

    console.log(`

User created:
  email: ${email}
  password: ${password}
Please change these details after initial login.
`);
  }
}

module.exports = crearPrimerUsuario
