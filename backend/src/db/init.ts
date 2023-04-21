
import {  user } from "./models"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  user.sync({alter:true})
}
export default dbInit 