const { prisma } = require("./client")

async function createUser(user) {
  if (user.acceptTermsAndConditions) {
    return await prisma.user.create({
      data: user
    })
  } else {
    return new Error("User must accept terms!")
  }
}

async function updateUsername(user) {
  return await prisma.user.update({
    where: { id: user.id },
    data: user
  })
}

async function getAllUsers() {
    return new Promise(async (resolve, reject) => {
      prisma.user
        .findMany()
        .then((users) => {
          console.log(users);
          resolve(users)
        })
        .catch((error) => {
          reject({ error: 'Could not fetch users' })
        });
    });
  }

module.exports = {
    createUser,
    updateUsername,
    getAllUsers
}
