import express from 'express'
// middleware
import { requireSignin } from '../middleware'
import { CreateConnectAccount } from '../controllers/stripe'

const router = express.Router()
// this middleware will protect that currently logged in user token
router.post('/create-connect-account',requireSignin ,CreateConnectAccount);
module.exports =router;