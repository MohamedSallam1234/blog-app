const express = require('express')
const signup = require('../controllers/authentication/signup.js')
const login = require('../controllers/authentication/login.js')
const getAllUsers = require('../controllers/get-all-users.js')
const isAuthenticated = require('./../middlewares/is-authenticated.js')
const restrictTo = require('./../middlewares/restrict-to.js')
const forgotPassword = require('../controllers/authentication/forgot-password.js')
const resetPassword = require('../controllers/authentication/reset-password.js')
const updatePassword = require('../controllers/authentication/update-password.js')
// const { Role } = require('@prisma/client')
const roles = ['USER', 'ADMIN', 'WRITER']

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/', isAuthenticated, restrictTo(roles), getAllUsers)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token/', resetPassword)
router.patch('/update-password', isAuthenticated, updatePassword)

module.exports = router
