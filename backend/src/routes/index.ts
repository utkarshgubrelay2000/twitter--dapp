import { Router } from 'express'
import { user_router } from './user'


const router = Router()

router.use('/',user_router)


export default router