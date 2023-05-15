import express from 'express'
import { gassStations } from '../models/gassStationModel.js';
import { logDate } from '../globals/globals.js';
import jwt from 'jsonwebtoken';
import gass from '../models/gassModel.js';
import  json  from 'body-parser';
import Acc from '../models/accesoriesModel.js';
const front_end_service = express.Router();

front_end_service.get('/', async (req, res) => {
    //get gass stations for the home page
    const clientDetails = jwt.decode(req.user.token)
    // console.log('user details ', clientDetails.contName || clientDetails.userName)
    try {

        const gasStationsData = await gassStations.find()
        res.status(200).json({ token: req.user.token, data: gasStationsData })
        console.log(`${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Request stations approved for : ${clientDetails.userName || clientDetails.contName} : ${clientDetails.userEmail || clientDetails.contEmail}`)
    } catch (err) {
        res.status(500).json({ token: "Internal server error, kindly try later" })
        console.log(`${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Request failed for : ${clientDetails.userName || clientDetails.contName} : ${clientDetails.userEmail || clientDetails.contEmail}`)

    }

})
front_end_service.post('/addStation', async (req, res) => {
    const clientDetails = jwt.decode(req.user.token)
    const { stationOwner, stationName, stationLocation, gasCategories, stationImage } = req.query
    if (stationOwner && stationName && stationLocation) {
        const postStation = new gassStations({
            stationOwner: stationOwner,
            stationName: stationName,
            stationLocation: stationLocation,
            gasCategories: gasCategories,
            stationImage: stationImage
        })
        try {
            const savePostStation = (await postStation.save()).toObject()
            const clientDetails = jwt.decode(req.user.token)
            res.status(200).json({token:clientDetails,data:savePostStation})
            console.log(`${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Added Station Succesfuly for station name: ${stationName}`)

        } catch (err) {
            res.status(500).json({ token: req.user.token, data: "Internal server Error, kindly try later" })
            console.error(`${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Request Failed to get DB`)

        }
    } else {
        console.log('fields empty')
    }
})

front_end_service.get('/gasService', async(req, res) => {
    const clientDetails = jwt.decode(req.user.token)
    const {gassStationName} = req.query

    if(gassStationName){
        
        try {
            
        const getGasService = await gass.find({gassStationName:gassStationName})
        res.status(200).json({token:req.user.token, data:getGasService})
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Request Gass Services approved for : ${clientDetails.userName || clientDetails.contName}`)

        } catch (err) {
            res.status(501).json({ token: req.user.token, data: "An error occured, kindly try again later" })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Get Service Failed for station name: ${clientDetails.userName || clientDetails.contName} : ${err}`)

        }
    }else{
        
        res.status(201).json({ token: req.user.token, data: "Kindly provide all the fields" })
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | User did not provide all the fields : ${clientDetails.userName || clientDetails.contName}`)

    }
})
front_end_service.post('/gasService', async (req, res) => {
    const clientDetails = jwt.decode(req.user.token)
    // console.log(req.user)
    const { gasName, gasService, gasPrice, weightRange, deliveryTime,gassStationName } = req.query
    if (gasName && gasService && gasPrice && weightRange && deliveryTime) {
        const postGasServices = new gass({
            gasName: gasName,
            gasService: gasService,
            gasPrice, gasPrice,
            weightRange: JSON.parse(req.query.weightRange),
            deliveryTime: deliveryTime,
            gassStationName:gassStationName

        })

        try { 
            const saveGasServices = (await postGasServices.save()).toObject()
            res.status(200).json({ token: req.user.token, data: saveGasServices })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Added Service Succesfuly for station name: ${clientDetails.userName || clientDetails.contName}`)

        } catch (err) {
            res.status(201).json({ token: req.user.token, data: "An error occured, Kindly try again later" })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Added Service Failed for station name: ${clientDetails.userName || clientDetails.contName} : ${err}`)


        }
    } else {
        res.status(201).json({ token: req.user.token, data: "Kindly provide all the fields" })
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | User did not provide all the fields : ${clientDetails.userName || clientDetails.contName}`)


    }
})

front_end_service.get('/AccService', async(req, res) => {
    const clientDetails = jwt.decode(req.user.token)
    const {gassStationName} = req.query

    if(gassStationName){
        try {
            console.log(gassStationName)
            
        const getGasService = await Acc.find({gassStationName:gassStationName})
        res.status(200).json({token:req.user.token, data:getGasService})
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Request Gass Services approved for : ${clientDetails.userName || clientDetails.contName}`)

        } catch (err) {
            console.log(gassStationName)
            res.status(500).json({ token: req.user.token, data: "An error occured try again later" })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Get Service Failed for station name: ${clientDetails.userName || clientDetails.contName} : ${err}`)

        }
    }else{
        
        res.status(201).json({ token: req.user.token, data: "Kindly provide all the fields" })
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | User did not provide all the fields : ${clientDetails.userName || clientDetails.contName}`)

    }
})
front_end_service.post('/AccService', async (req, res) => {
    const clientDetails = jwt.decode(req.user.token)
    // console.log(req.user)
    const { AccName, AccService, AccPrice, deliveryTime,gassStationName } = req.query
    if (AccName && AccService && AccPrice  && deliveryTime) {
        const postGasServices = new Acc({
            AccName: AccName,
            AccService: AccService,
            AccPrice, AccPrice,
            deliveryTime: deliveryTime,
            gassStationName:gassStationName

        })

        try { 
            const saveGasServices = (await postGasServices.save()).toObject()
            res.status(200).json({ token: req.user.token, data: saveGasServices })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Added Service Succesfuly for station name: ${clientDetails.userName || clientDetails.contName}`)

        } catch (err) {
            res.status(201).json({ token: req.user.token, data: "An error occured, kindly try again later" })
            console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | Added Service Failed for station name: ${clientDetails.userName || clientDetails.contName} : ${err}`)


        }
    } else {
        res.status(201).json({ token: req.user.token, data: "Kindly provide all the fields" })
        console.log(`${logDate} | Front End Service | Gas Services Requests | status ${res.statusCode} : ${res.statusMessage} | User did not provide all the fields : ${clientDetails.userName || clientDetails.contName}`)


    }
})
export default front_end_service
