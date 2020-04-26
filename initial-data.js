const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

module.exports = async keystone => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count },
    },
  } = await keystone.executeQuery(
    `query {
      _allUsersMeta {
        count
      }
    }`
  );

  if (count === 0) {
    const password = 'password';
    const email = 'codigo@alvu.elo';
    const username = 'codigoalvuelo';
    const name = 'Código';
    const lastname = 'Al Vuelo';
    const isAdmin = true;

    await keystone.executeQuery(
      `mutation initialUser(
        $password: String,
        $email: String,
        $username: String,
        $name: String,
        $lastname: String,
        $isAdmin: Boolean
      ) {
            createUser(data: {
              email: $email, 
              password: $password
              username: $username,
              name: $name,
              lastname: $lastname,
              isAdmin: $isAdmin, 
            }) {
              id
            }
          }`,
      {
        variables: {
          email,
          password,
          username,
          name,
          lastname,
          isAdmin
        },
      }
    );

    console.log(`
      Usuario inicial creado:
      email: ${email}
      password: ${password}

      Por favor cambia las credenciales.
      
    `);

  }
};
