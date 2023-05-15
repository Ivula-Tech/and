import jwt from 'jsonwebtoken'
import { logDate } from './globals.js';

const validation = async (req, res, next) => {
        let token;
        let authHead = req.headers.authorization
        token = jwt.verify(authHead, process.env.JWT_ENC_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ token: "Unauthorized request, kindly log in again" })
                console.log(`${logDate} | Authentication Service | Validation Service Response | status ${res.statusCode} : ${res.statusMessage} | jwt token expired`)

            } else {
                const duration = req.query.type =='contractor' ?"10m":"3d"
                delete decoded.exp
                delete decoded.iat
                const newToken = jwt.sign(decoded, process.env.JWT_ENC_KEY, { expiresIn: duration })
                req.user = { token: newToken }
                // console.log("valid " ,req.user)
                // res.user({ userDetails: decoded, token:newToken })
                next()
            }
    })

}

export default validation;