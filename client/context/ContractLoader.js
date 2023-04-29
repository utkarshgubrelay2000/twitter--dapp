import axios from "axios"

export const LoadContract=async (name)=>{
   
        let res=await axios.get(`/contracts/${name}.sol/${name}.json`)
        res=res.data
        let abi=res.abi
        return abi;
      
}
