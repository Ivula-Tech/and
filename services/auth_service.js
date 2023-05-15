import express from 'express';
import jwt from 'jsonwebtoken';
import contractors from '../models/contractorModel.js';
import { postUser } from '../models/userModel.js';
import { logDate } from './../globals/globals.js';
import dotenv from 'dotenv'

dotenv.config()
// import {Users} from './.../models/getUser.js'
const auth_service = express.Router()

//for public signup
const jwtConfig = (payload, key) => {
    let token = jwt.sign(payload, key)
    return token
}
//register a contractor/user
auth_service.post('/', async (req, res, next) => {
    if (req.query.type != 'contractor') {
        try {
            const { userName, password, userEmail, phoneNumber } = req.query
            if (userName && password && userEmail && phoneNumber) {

                const getMail = postUser.find({ userEmail: userEmail })

                getMail.then(async (response) => {
                    if (response.length > 0) {
                        res.status(201).json({ token: "The email provided is already taken" })
                        console.error(`${logDate} | Authentication Service | User SignUp Request | status ${res.statusCode} : ${res.statusMessage} | The email : ${userEmail} : is already taken`)
                    } else {

                        const postUserCall = new postUser({
                            userEmail: userEmail,
                            userName: userName,
                            phoneNumber: phoneNumber,
                            password: password,
                            location: ""
                        })
                        try {
                            const userPosted = (await postUserCall.save()).toObject()
                            let token = jwt.sign(userPosted, process.env.JWT_ENC_KEY, {expiresIn:"3d"})
                            // console.log(userPosted)
                            res.status(201).json({ token: token })
                            console.error(`${logDate} | Authentication Service | User SignUp Request | status ${res.statusCode} : ${res.statusMessage = 201 ? 'Sucess' : res.statusMessage} | userName : ${userName} userEmail ${userEmail} userPhone : ${phoneNumber}`)
                        } catch (err) {
                            res.status(500).json({ token: "Something went wrong kindly try again" })
                            console.log(err)
                            console.error(`${logDate} | Authentication Service | User SignUp Request | status ${res.statusCode} : ${res.statusMessage} | Could not add user to the database`)

                        }
                    }

                })
            } else {
                res.status(400).json({ token: 'Signup Failed : kindly provide all the fields' })
                console.error(`${logDate} | Authentication Service | User SignUp Request | status ${res.statusCode} : ${res.statusMessage} | User din't provid all the params`)

            }

        } catch (err) {
            res.status(401).json({ token: 'Could not action your request, try again' })
            console.error(`${logDate} | Authentication Service | User SignUp Request | status ${res.statusCode} : ${res.statusMessage} | Request body very empty`)

        }
    } else {
        try {
            const { userName, password, userEmail, phoneNumber } = req.query
            if (userName && password && userEmail && phoneNumber) {

                const getMail = contractors.find({ contEmail: userEmail })
                // console.log("contracto")
                getMail.then(async (response) => {
                    if (response.length > 0) {
                        res.status(201).json({ token: "The email provided is already taken" })
                        console.error(`${logDate} | Authentication Service | Contractor SignUp Request | status ${res.statusCode} : ${res.statusMessage} | The email : ${userEmail} : is already taken`)
                    } else {

                        const postUserCall = new contractors({
                            contEmail: userEmail,
                            contName: userName,
                            contPhone: phoneNumber,
                            password: password,
                            location: ""
                        })
                        try {
                            const userPosted = (await postUserCall.save()).toObject()
                            let token = jwt.sign(userPosted, process.env.JWT_ENC_KEY, {expiresIn:"2m"})
                            // console.log(userPosted)
                            res.status(201).json({ token: token })
                            console.error(`${logDate} | Authentication Service | Contractor SignUp Request | status ${res.statusCode} : ${res.statusMessage = 201 ? 'Sucess' : res.statusMessage} | userName : ${userName} userEmail ${userEmail} userPhone : ${phoneNumber}`)
                        } catch (err) {
                            res.status(500).json({ token: "Something went wrong kindly try again" })
                            console.log(err)
                            console.error(`${logDate} | Authentication Service | Contractor SignUp Request | status ${res.statusCode} : ${res.statusMessage} | Could not add user to the database`)

                        }
                    }

                })

            } else {
                res.status(400).json({ token: 'Signup Failed : kindly provide all the fields' })
                console.error(`${logDate} | Authentication Service | Contractor SignUp Request | status ${res.statusCode} : ${res.statusMessage} | User din't provid all the params`)

            }

        } catch (err) {
            res.status(401).json({ token: 'Could not action your request, try again' })
            console.error(`${logDate} | Authentication Service | Contractor SignUp Request | status ${res.statusCode} : ${res.statusMessage} | Request body very empty`)

        }

    }
})

//authenticate contractor/user
auth_service.get('/login', async (req, res, next) => {
    if (req.query.type != 'contractor') {
        const { userEmail, password } = req.query
        if (userEmail && password) {
            try {
                let getUsersCall = await postUser.findOne({ userEmail: userEmail, password: password })
                if (getUsersCall != null) {
                    getUsersCall = getUsersCall.toObject()
                    let token = jwt.sign(getUsersCall, process.env.JWT_ENC_KEY, { expiresIn: "3d" })
                    // console.log(userPosted)
                    res.status(200).json({ token: token })
                    console.log(`${logDate} | Authentication Service |User Login Request | status ${res.statusCode} : ${res.statusMessage} | ${userEmail}`)
                } else {
                    res.status(404).json({ token: 'user not found' })
                    console.log(`${logDate} | Authentication Service |User Login Request | status ${res.statusCode} : ${res.statusMessage} | Could not find user :  ${userEmail}`)


                }
            } catch (err) {
                res.status(500).json({ token: "Something went wrong try again" })
                console.log(`${logDate} | Authentication Service |User Login Request | status ${res.statusCode} : ${res.statusMessage} | Could not get user : ${userEmail} :  from the DB`)
            }

        } else {
            res.status(400).json({ token: "Login Failed : Kindly fill in all the fields" })
            console.error(`${logDate} | Authentication Service |User Login Request | status ${res.statusCode} : ${res.statusMessage} | User din't provid all the params`)
        }
    } else {
        
        const { userEmail, password } = req.query
        if (userEmail && password) {
            try {
                let getUsersCall = await contractors.findOne({ contEmail: userEmail, password: password })
                if (getUsersCall != null) {
                    getUsersCall = getUsersCall.toObject()

                    let token = jwt.sign(getUsersCall, process.env.JWT_ENC_KEY, {expiresIn:"15m"})
                    // console.log(userPosted)
                    res.status(200).json({ token: token })

                    console.log(`${logDate} | Authentication Service | Contractor Login Request | status ${res.statusCode} : ${res.statusMessage} | ${userEmail}`)
                } else {
                    res.status(404).json({ token: 'user not found' })
                    console.log(`${logDate} | Authentication Service | Contractor Login Request | status ${res.statusCode} : ${res.statusMessage} | Could not find user :  ${userEmail}`)


                }
            } catch (err) {
                res.status(500).json({ token: "Something went wrong try again" })
                console.log(`${logDate} | Authentication Service | Contractor Login Request | status ${res.statusCode} : ${res.statusMessage} | Could not get user : ${userEmail} :  from the DB`)
            }

        } else {
            res.status(400).json({ token: "Login Failed : Kindly fill in all the fields" })
            console.error(`${logDate} | Authentication Service | Contractor  Login Request | status ${res.statusCode} : ${res.statusMessage} | User din't provid all the params`)
        }
    }
})

export default auth_service;