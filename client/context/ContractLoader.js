import axios from "axios"

export const LoadContract=async (name)=>{
   
        let res=await axios.get(`/contracts/${name}.sol/${name}.json`)
        res=res.data
        console.log(res)
        let abi=res.abi
        return abi;
      
}
