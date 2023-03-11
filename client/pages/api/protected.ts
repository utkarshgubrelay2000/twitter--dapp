
import axios from "axios";

export default async function handler(req:any, res:any) {


    try {
        let req_body = JSON.parse(req.body);
        let request_type = req_body.request_type;
        let target_url = req_body.target_url;
        let payload = req_body.payload;

     

        var requestOptions = {
            url: `${process.env.BACKEND_URL}${target_url}`,
            method: request_type,
            headers: {
                "Content-Type": "application/json",
            },
            data: {...payload}
        };
        // console.log({requestOptions})
        const response = await axios({...requestOptions});

        const result = await response?.data


        return res.status(response?.status).json(result)
    } catch (err:any) {
        console.log("err", err)
        let status = err?.response?.status
        return res.status(status).send(err?.response?.data)
    }
}