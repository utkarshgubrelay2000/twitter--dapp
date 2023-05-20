import { Router} from 'express'
import { add_twit } from '../../services/user'

const router = Router()

router.get('/',add_twit) 


export default router