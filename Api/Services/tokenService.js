import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// Used to generate a token for user validation after creation

const verifyAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['token']
    const token = authHeader?.split(' ')[1]

    if (token == null || token == undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(401).send(JSON.stringify({error: "You are not authenticate"}));
        return;
    }
    jwt.verify(token, process.env.RANDOM_STRING_AUTH_TOKEN, async (err, user) => {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).send(JSON.stringify({error: "Token invalid"}));
            return;
        }
        req.user = user;
        next();
    });
}

const signAuthenticateToken = (userUuid) => {
    return (
        jwt.sign(
            {
                userUuid: userUuid
            },
            process.env.RANDOM_STRING_AUTH_TOKEN,
            { expiresIn: 86400 }
        )
    )
}

const verifyRegisterToken = (token) => {
    let allData = {}
    return (jwt.verify(token, process.env.RANDOM_STRING_REGISTER_TOKEN));
}

const signRegisterToken = (email, type, organisationUuid, organisationType) => {
    return (
        jwt.sign(
            {
                email: email,
                type: type,
                organisationUuid: organisationUuid,
                organisationType: organisationType
            },
            process.env.RANDOM_STRING_REGISTER_TOKEN,
            { expiresIn: 604800 }
        )
    )
}

export {verifyAuthenticateToken, signAuthenticateToken, verifyRegisterToken, signRegisterToken}