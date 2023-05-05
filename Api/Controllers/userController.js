import {userService} from '../Services/index.js'

const login = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.login(req.body.email, req.body.password);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}

const register = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.register(req.body.email, req.body.password, req.body.token);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}

const getMe = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.getOne(req.user);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}

/*const disable = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.disable(req.user, req.params.userUuid);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}*/

/*const edit = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.edit(req.user, req.params.userUuid, req.body);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}*/

const editPassword = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let resultat = await userService.editPassword(req.user, req.body.oldPassword, req.body.newPassword);
        res.status(resultat.status).send(JSON.stringify(resultat.data));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: e}));
    }
}

export {login, register, getMe, disable, edit, editPassword}