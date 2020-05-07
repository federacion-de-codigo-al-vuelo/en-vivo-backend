const createUsers = async (keystone) => {
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
    const password = 'password';
    const email = 'user@envivo.com';

    await keystone.executeQuery(
      `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "usuario", email: $email, isAdmin: true, password: $password}) {
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

`);
  }
}

module.exports = createUsers
