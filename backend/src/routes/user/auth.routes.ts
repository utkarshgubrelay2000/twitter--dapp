import { Router} from 'express'
import { checkToken, login, signup } from '../../services/user'
import auth from '../../middleware/auth'

const router = Router()

router.post('/register',signup) 
router.get('/check-token',auth,checkToken) 
router.post('/login',login) 


export default router