import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import Layout from "../components/Layout";
import { useAppContext } from "../context/useProvider";
import React, { useState } from "react";
const projectId = "2OH4HEi1zahea5EPXfsf3cM71OI";
const projectSecret = "51f3da00cb408fcc3cfaa97a46594170";
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
const Home = () => {
  
    const { provider,account,connect } = useAppContext();
// add this at the beginning of the App component
const [images, setImages] = useState<{ cid: CID; path: string }[]>([]);

const onSubmitHandler = async (event:any) => {
  event.preventDefault();
  console.log('helloooo',event.target.files)
  const form = event.target as HTMLFormElement;
  const files = form.files;

  if (!files || files.length === 0) {
    return alert("No files selected");
  }

  const file = files[0];
  // upload files
  const result = await (ipfs as IPFSHTTPClient).add(file);
 
console.log(result)
  setImages([
    ...images,
    {
      cid: result.cid,
      path: result.path,
    },
  ]);

  //form.reset();
};
  return (
    <Layout>
      <div>
      {ipfs && (
          <>
            <p>Upload File using IPFS</p>

            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" onChange={onSubmitHandler} />

              <button type="submit">Upload File</button>
            </form>
          </>
        )}
         <div>
              {images.map((image, index) => (
                <>
              
                <img
                  alt={`Uploaded #${index + 1}`}
                  src={"https://test-project12.infura-ipfs.io/ipfs/" + image.cid.toString()}
                  style={{ maxWidth: "400px", margin: "15px" }}
                  key={image.cid.toString() + index}
                  />
                  </>
              ))}
            </div>
   Hello App {account}
      </div>
    </Layout>
  );
};

export default Home;
