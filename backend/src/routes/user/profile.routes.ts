import { Router} from 'express'

import auth from '../../middleware/auth'
import { get_my_profile } from '../../services/user'

const router = Router()

router.get('/',auth,get_my_profile) 


export default router