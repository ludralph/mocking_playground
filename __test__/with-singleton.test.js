const { createUser, updateUsername, getAllUsers } =  require('../functions-without-context')
const { prismaMock } = require('../singleton')

test('should create new user ', async () => {
  const user = {
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  })
})

test('should update a users name ', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUsername(user)).resolves.toEqual({
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  })
})

test('should fail if user does not accept terms', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: false,
  }

  prismaMock.user.create.mockImplementation()

  await expect(createUser(user)).resolves.toEqual(
    new Error('User must accept terms!')
  )
})

test('should retrieve all the users from the database', async () => {

  const dummyUsers = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@gmail.com",
      paidUser: false
    }
  ]

  prismaMock.user.findMany.mockResolvedValue(dummyUsers)
  await expect(getAllUsers()).resolves.toEqual(dummyUsers)

})