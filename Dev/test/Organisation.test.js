import assert from 'assert'
import {organisationService, dbService} from '../../Api/Services/index.js'

describe('Organisation service', () => {
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
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, name: "orgName", email: "test@gmail.com"};
            let result = await organisationService.createOrganisation(body.user, body.name, body.email);
            assert.strictEqual(result.status, 201);
            assert.strictEqual(result.data, {message: "Account created"})
        });
        it('no user', async () => {
            let body = {user: {userUuid: null}, name: "orgName", email: "test@gmail.com"};
            let result = await organisationService.createOrganisation(body.user, body.name, body.email);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('Not an admin', async () => {
            let body = {user: {userUuid: "b033c7ce-5441-4a90-b839-e5437fb9a58d"}, name: "orgName", email: "test@gmail.com"};
            let result = await organisationService.createOrganisation(body.user, body.name, body.email);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You dont have the right to create an organisation"})
        });
        it('error in body', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, name: "orgName", email: null};
            let result = await organisationService.createOrganisation(body.user, body.name, body.email);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
        it('organisation already exist', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, name: "test_organisation", email: "test@gmail.com"};
            let result = await organisationService.createOrganisation(body.user, body.name, body.email);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Organisation already exist"})
        });
    })
    describe('add Member organisation', () => {
        it('Add member organisation sucess', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, email: "Oui@gmail.com", type: "default"};
            let result = await organisationService.addMember(body.user, body.email, body.type);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {user: null, email: "Oui@gmail.com", type: "default"};
            let result = await organisationService.addMember(body.user, body.email, body.type);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('error in body', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, email: "Oui@gmail.com", type: null};
            let result = await organisationService.addMember(body.user, body.email, body.type);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
        it('not in organisation', async () => {
            let body = {user: {userUuid: "8c9503c5-cdf9-44a3-befa-8174ee5dc267"}, email: "Oui@gmail.com", type: "default"};
            let result = await organisationService.addMember(body.user, body.email, body.type);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not in this organisation"})
        });
        it('not admin in organisation', async () => {
            let body = {user: {userUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"}, email: "Oui@gmail.com", type: "default"};
            let result = await organisationService.addMember(body.user, body.email, body.type);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not admin in this organisation"})
        });
    })
    describe('disable Member organisation', () => {
        it('not admin in organisation', async () => {
            let body = {user: {userUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"}, targetUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"};
            let result = await organisationService.disableMember(body.user, body.targetUuid);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not admin in this organisation"})
        });
        it('disable member organisation sucess', async () => {
            let body = {user: {userUuid: "0b297e9f-de06-4419-b763-7ade0df98aab"}, targetUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"};
            let result = await organisationService.disableMember(body.user, body.targetUuid);
            assert.strictEqual(result.status, 201);
        });
        it('no user', async () => {
            let body = {user: undefined, targetUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"};
            let result = await organisationService.disableMember(body.user, body.targetUuid);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('user not found', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, targetUuid: "cc5e53b8-7a92-48aa-8fa6-13f714118888"};
            let result = await organisationService.disableMember(body.user, body.targetUuid);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "User not found"})
        });
        it('not in organisation', async () => {
            let body = {user: {userUuid: "b033c7ce-5441-4a90-b839-e5437fb9a58d"}, targetUuid: "cc5e53b8-7a92-48aa-8fa6-13f714119de9"};
            let result = await organisationService.disableMember(body.user, body.targetUuid);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You are not in this organisation"})
        });
    })
    describe('get list organisation', () => {
        it('Get organisation sucess', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}};
            let result = await organisationService.getAllOrganisation(body.user);
            assert.strictEqual(result.status, 200);
        });
        it('no user', async () => {
            let body = {user: null};
            let result = await organisationService.getAllOrganisation(body.user);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
    })
    describe('get organisation', () => {
        it('Get organisation sucess', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}};
            let result = await organisationService.getOrganisation(body.user);
            assert.strictEqual(result.status, 200);
        });
        it('no user', async () => {
            let body = {user: null};
            let result = await organisationService.getOrganisation(body.user);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
    })
    describe('disable organisation', () => {
        it('organisation disabled', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, uuid: "9a7db470-e17c-41a9-a07b-fa76f91e9a91"};
            let result = await organisationService.disableOrganisation(body.user, body.uuid);
            assert.strictEqual(result.status, 201);
            assert.strictEqual(result.data, {message: "Organisation disabled"})
        });
        it('no user', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, uuid: "9a7db470-e17c-41a9-a07b-fa76f91e9a91"};
            let result = await organisationService.disableOrganisation(body.user, body.uuid);
            assert.strictEqual(result.status, 401);
            assert.strictEqual(result.data, {error: "You need to authenticate"})
        });
        it('Not an admin', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, uuid: "9a7db470-e17c-41a9-a07b-fa76f91e9a91"};
            let result = await organisationService.disableOrganisation(body.user, body.uuid);
            assert.strictEqual(result.status, 403);
            assert.strictEqual(result.data, {error: "You dont have the right to disable an organisation"})
        });
        it('error in body', async () => {
            let body = {user: {userUuid: "f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77"}, uuid: "9a7db470-e17c-41a9-a07b-fa76f91e9a91"};
            let result = await organisationService.disableOrganisation(body.user, body.uuid);
            assert.strictEqual(result.status, 400);
            assert.strictEqual(result.data, {error: "Error in body"})
        });
    })
});