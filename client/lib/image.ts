import { create,  IPFSHTTPClient } from "ipfs-http-client";

const projectId = process.env.PROJECTID;
const projectSecret = process.env.PROJECTSECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }
  export const uploadHandler = async (file:any) => {
     // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file);
 
   return `https://${process.env.SUBDOMAIN}.infura-ipfs.io/ipfs/` + result.cid.toString()
    //form.reset();
  };