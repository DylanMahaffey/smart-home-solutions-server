import express, { Request, Response } from 'express'
import { toggleDevice } from '../business/devices';
const router = express.Router();

router.get('/:id', async (res: Response, req: Request) => {
    const {id} = req.params;
    try {
        const success = await toggleDevice(id)
        res.json({ success })
    } catch (error) {
        console.error("Error: " + error)
        res.status(500).send(error)
    }
})

export default router;