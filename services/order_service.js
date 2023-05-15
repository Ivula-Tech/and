import express, { query } from "express";
import orders from "./../models/ordersModel.js";
import { logDate } from "./../globals/globals.js";
const orderService = express.Router()

orderService.get('/', async (req, res) => {
    try {
        const { requester, requestingID } = req.query
        if (requester, requestingID) {
            if (requester == 'contractor') {
                const getOrders = (await orders.find({ "contID": requestingID }))
                res.status(200).json(getOrders)
            }else if (requester == 'user') {
                const getOrders = (await orders.find({ "clientID": requestingID }))
                res.status(200).json(getOrders)
            } else {
                res.status(404).json({ message: "Sorry, your request could not be handled" })
            }
        } else {
            res.status(404).json({ message: "Sorry server could not action your request" })
        }
    } catch (error) {
        res.status(404).json({ message: "invalid request" })
    }
})
orderService.post('/', async (req, res) => {
    console.log('entered into posting order', req.body)

    try {

        const { clientID, contID, itemTier, itemID } = req.body

        if (clientID, contID, itemID, itemTier) {
            if (itemTier == "Gass" || itemTier == "Accesories") {
                const findOrder = await orders.find({ "clientID": clientID, "contID": contID, "item.itemID": itemID })
                if (findOrder.length > 0) {
                    res.status(404).json({ message: 'A similar order has been been made' })
                } else {
                    const orderPost = new orders({
                        clientID: clientID,
                        contID: contID,
                        item: {
                            itemTier: itemTier,
                            itemID: itemID
                        }
                    })

                    try {
                        const orderRes = await orderPost.save()
                        res.status(200).json({ orderRes })

                    } catch (error) {
                        res.status(404).json({ message: error.message })

                    }
                }

            } else {
                res.status(404).json({ message: 'could not find or handle your request' })
            }
        } else {
            res.status(404).json({ message: 'we could not find your item' })
        }


    } catch (err) {
        res.status(404).json({ message: "not found" })
    }
})

export default orderService 