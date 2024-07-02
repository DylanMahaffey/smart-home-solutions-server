import express, { Request, Response } from 'express'
import { getAllDevices } from '../business/devices';
const router = express.Router();

router.get('/get-all-devices', async (req: Request, res: Response) => {
    try {
        const devices = await getAllDevices()
        res.json({devices})
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

export default router;