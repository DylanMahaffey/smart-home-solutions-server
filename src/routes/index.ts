import express, { Request, Response } from 'express'
const router = express.Router();

router.get('/', (res: Response, req: Request) => {
    res.sendFile('../../public')
})

export default router;