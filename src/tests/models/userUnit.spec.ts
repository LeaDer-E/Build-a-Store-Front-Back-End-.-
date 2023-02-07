import { AuthenticationMainUser, MainUser, User, UserStore } from '../../models/userUnit';

const userStore = new UserStore();

describe('Model of User', () => {
  const user: AuthenticationMainUser = {
    username: 'EslamMustafa',
    firstname:'Eslam',
    lastname:'Mustafa',
    password: 'password123',
  };

  async function createUser(user: AuthenticationMainUser) {
    return userStore.create(user);
  }

  async function deleteTheUser(id: number) {
    return userStore.deleteTheUser(id);
  }

  it('Have The Get User Method', () => {
    expect(userStore.getUser).toBeDefined();
  });

  it('Have The Show Method', () => {
    expect(userStore.read).toBeDefined();
  });

  it('Have The Create Method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('Have The Remove Method', () => {
    expect(userStore.deleteTheUser).toBeDefined();
  });

  it('Createing The New User', async () => {
    const createdUser = await createUser(user);
    if (createdUser) {
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.firstname).toBe(user.firstname);
      expect(createdUser.lastname).toBe(user.lastname);
    }
    await deleteTheUser(createdUser.id);
  });

  it('Returning The List of Users', async () => {
    const result: any = await userStore.getUser();
    expect(result[0].username).toEqual('EslamMustafa');
    expect(result[0].id).toEqual(1);
    expect(result[0].firstname).toEqual('Eslam');
    expect(result[0].lastname).toEqual('Mustafa');
  });

  it('Returning The Correct User', async () => {
    const createdUser: User = await createUser(user);
    const users = await userStore.read(createdUser.id);
    expect(users).toEqual(createdUser);
    await deleteTheUser(createdUser.id);
  });

  it('Removing The User', async () => {
    const createdUser: User = await createUser(user);
    await deleteTheUser(createdUser.id);
    expect(createdUser.firstname).toEqual('Eslam');
    expect(createdUser.lastname).toEqual('Mustafa');
  });

  it('Updating The User', async () => {
    const createdUser: User = await createUser(user);
    const newdataOfUser: MainUser = {
      firstname: 'LeaDer',
      lastname: 'E',
    };

    const { firstname, lastname } = await userStore.update(createdUser.id, newdataOfUser);
    expect(firstname).toEqual(newdataOfUser.firstname);
    expect(lastname).toEqual(newdataOfUser.lastname);
    await deleteTheUser(createdUser.id);
  });
});
