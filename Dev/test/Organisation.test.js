import assert from 'assert'
import {userService, dbService} from '../../Api/Services/index.js'

const isUuid = (uuid) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (typeof uuid != "string")
        return (false)
    return (regexExp.test(uuid))
}

/*describe('Organisation service', () => {
    before(async () => {
        try {
            dbService.init_db("test")
            await dbService.sequelize.authenticate();
            await dbService.sequelize.sync();
        } catch (error) {
            console.log("error = ", error);
        }
    })
    describe('create organisation', () => {
        it('organisation created', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
            assert.strictEqual(result.data, {message: "Account created"})
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('Not an admin', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You dont have the right to create an organisation"})
        });
        it('error in body', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
        it('organisation already exist', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Organisation already exist"})
        });
    })
    describe('disable organisation', () => {
        it('organisation disabled', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
            assert.strictEqual(result.data, {message: "Organisation disabled"})
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('Not an admin', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You dont have the right to disable an organisation"})
        });
        it('error in body', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
    })
    describe('get list organisation', () => {
        it('Get organisation sucess', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('error in body', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
    })
    describe('get organisation', () => {
        it('Get organisation sucess', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('error in body', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
        it('not in organisation', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not in this organisation"})
        });
    })
    describe('add Member organisation', () => {
        it('Add member organisation sucess', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('error in body', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
        it('not in organisation', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not in this organisation"})
        });
        it('not admin in organisation', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not admin in this organisation"})
        });
    })
    describe('disable Member organisation', () => {
        it('disable member organisation sucess', async () => {
            let body = {email: "userexist@gmail.com", password: "password"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('user not found', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "User not found"})
        });
        it('not in organisation', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not in this organisation"})
        });
        it('not admin in organisation', async () => {
            let body = {email: "existe5@gmail.com", password: "password", firstname: "guillaume", name: "corbet"};
            let result = await userService.register(body);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not admin in this organisation"})
        });
    })
// });*/