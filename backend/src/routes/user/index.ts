import { Router } from 'express'
import profile_router from './profile.routes'



export const user_router = Router()


//user_router.use('/auth',auth_router)
user_router.use('/profile',profile_router)

