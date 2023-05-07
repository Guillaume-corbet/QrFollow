import jwt from 'jsonwebtoken'
import Seq from 'sequelize'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {errorService, dbService, tokenService} from './index.js'
import {Users} from '../Models/index.js'
import {v4} from 'uuid'

dotenv.config();

const createOrganisation = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

const disableOrganisation = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

const getAllOrganisation = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

const getOrganisation = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

const addMember = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

const disableMember = async () => {
    return ({status: 500, data: {error: 'Error in db'}});
}

export {createOrganisation, disableOrganisation, getAllOrganisation, getOrganisation, addMember, disableMember}