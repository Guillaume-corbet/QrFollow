import assert from 'assert'
import {userService, dbService, tokenService} from '../../Api/Services/index.js'

const isUuid = (uuid) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (typeof uuid != "string")
        return (false)
    return (regexExp.test(uuid))
}

describe('User service', () => {
    before(async () => {
        try {
            dbService.init_db("test")
            await dbService.sequelize.authenticate();
            await dbService.sequelize.sync();
        } catch (error) {
            console.log("error = ", error);
        }
    })
    describe('register', () => {
        it('admin created', async () => {
            let body = {email: "newUserAdmin@gmail.com", password: "Password13!", token: tokenService.signRegisterToken("newUserAdmin@gmail.com", "admin", null, null)};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 201);
            assert.deepStrictEqual(result.data, {message: "Account created"})
        });
        it('user org created', async () => {
            let body = {email: "newUserInOrg@gmail.com", password: "Password13!", token: tokenService.signRegisterToken("newUserInOrg@gmail.com", "default", "728c68e5-ba77-41c6-bcdc-b1f2f306bdce", "default")};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 201);
            assert.deepStrictEqual(result.data, {message: "Account created"})
        });
        it('email exist', async () => {
            let body = {email: "default_default_in_org@gmail.com", password: "Password13!", token: tokenService.signRegisterToken("testUser@gmail.com", "default", "728c68e5-ba77-41c6-bcdc-b1f2f306bdce", "default")};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 400);
            assert.deepStrictEqual(result.data, {error: "Email already exist"})
        });
        it('Different Email', async () => {
            let body = {email: "jexistepasgmailcom", password: "Password13!", token: tokenService.signRegisterToken("testUser2@gmail.com", "default", "728c68e5-ba77-41c6-bcdc-b1f2f306bdce", "default")};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 400);
            assert.deepStrictEqual(result.data, {error: "Error in body"})
        });
        it('invalid Email', async () => {
            let body = {email: "testUser2gmail.com", password: "Password13!", token: tokenService.signRegisterToken("testUser2gmail.com", "default", "728c68e5-ba77-41c6-bcdc-b1f2f306bdce", "default")};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 400);
            assert.deepStrictEqual(result.data, {error: "Invalid email"})
        });
        it('min charac password', async () => {
            let body = {email: "jexistepas@gmail.com", password: "pass", token: tokenService.signRegisterToken("testUser3@gmail.com", "default", "728c68e5-ba77-41c6-bcdc-b1f2f306bdce", "default")};
            let result = await userService.register(body.email, body.password, body.token);
            assert.deepStrictEqual(result.status, 400);
            assert.deepStrictEqual(result.data, {error: "Error in body"})
        });
    })
    describe('login', () => {
        it('good login', async () => {
            let body = {email: "default_default_in_org@gmail.com", password: "Password13!"};
            let result = await userService.login(body.email, body.password);
            console.log(result.data)
            assert.deepStrictEqual(result.status, 200);
        });
        it('bad email', async () => {
            let body = {email: "jexistepas@gmail.com", password: "Password13!"};
            let result = await userService.login(body.email, body.password);
            assert.deepStrictEqual(result.status, 403);
            assert.deepStrictEqual(result.data, {error: "Email invalid"})
        });
        it('bad password', async () => {
            let body = {email: "default_default_in_org@gmail.com", password: "mauvais"};
            let result = await  userService.login(body.email, body.password);
            assert.deepStrictEqual(result.status, 403);
            assert.deepStrictEqual(result.data, {error: "Password invalid"})
        });
    })
    describe('get my user', () => {
        it('good get user', async () => {
            let user = {userUuid: "25c619ce-2ca4-4545-9217-17caf9536f5e"};
            let result = await userService.getMe(user);
            console.log(result.data)
            assert.deepStrictEqual(result.status, 200);
        });
        it('no user', async () => {
            let result = await userService.getMe();
            assert.deepStrictEqual(result.status, 401);
            assert.deepStrictEqual(result.data, {error: "You need to authenticate"})
        });
    })
    describe('edit password', () => {
        it('good edit password', async () => {
            let body = {user: {userUuid: "25c619ce-2ca4-4545-9217-17caf9536f5e"}, oldPassword: "Password13!", newPassword: "NewPassword13!"};
            let result = await userService.editPassword(body.user, body.oldPassword, body.newPassword);
            assert.deepStrictEqual(result.status, 200);
            assert.deepStrictEqual(result.data, {message: "Password changed"})
        });
        it('no user', async () => {
            let body = {user: null, oldPassword: "Password13!", newPassword: "NewPassword13!"};
            let result = await userService.editPassword(body.user, body.oldPassword, body.newPassword);
            assert.deepStrictEqual(result.status, 401);
            assert.deepStrictEqual(result.data, {error: "You need to authenticate"})
        });
        it('error password', async () => {
            let body = {user: {userUuid: "25c619ce-2ca4-4545-9217-17caf9536f5e"}, oldPassword: "Password13", newPassword: "NewPassword13!"};
            let result = await  userService.editPassword(body.user, body.oldPassword, body.newPassword );
            assert.deepStrictEqual(result.status, 400);
            assert.deepStrictEqual(result.data, {error: "Error in password"})
        });
    })
});