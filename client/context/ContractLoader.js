import axios from "axios"

export const LoadContract=async (name,web3)=>{
    if(web3){

        let res=await axios.get(`/contracts/${name}.json`)
        res=res.data
        let ac2=res.abi
        let network=res.networks[5777].address
        let contract=new web3.eth.Contract(ac2,network);
        return contract;
      }
}
