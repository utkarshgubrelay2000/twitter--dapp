import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
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
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useAppContext } from '../../context/useProvider'
//import { client } from '../../lib/client'

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}

function TweetBox({}) {
  const [tweetMessage, setTweetMessage] = useState('')
  const [image, setImage] = useState('')
  const { contract,account } = useAppContext()
  const AddTweet=async(e:any)=>{
    try {
      
    
    e.preventDefault()
  const newDate=new Date();
  let tp=newDate.getTime()
  let img=image
 let a=  await  contract.createPost(tp,tweetMessage,img)
  console.log(a)
} catch (error) {
      console.log(error)
}
  }

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
   
    setImage('https://test-project12.infura-ipfs.io/ipfs/' + result.cid.toString());
  
    //form.reset();
  };
  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          // src={currentUser.profileImage}
          // className={
          //   currentUser.isProfileImageNft
          //     ? `${style.profileImage} smallHex`
          //     : style.profileImage
       //   }
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            onChange={e => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
          />
          {image&&
 <img
 alt={`Uploaded `}
 src={image}
 style={{ maxWidth: "400px", margin: "15px" }}
 //key={image.cid.toString() + index}
 />
}

          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
            <input name="file" id='file1' style={{display:'none'}} type="file" onChange={onSubmitHandler} />

              <BsCardImage onClick={()=>document.getElementById('file1')?.click()} className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type='submit'
              onClick={event => AddTweet(event)}
              disabled={!tweetMessage}
              className={`${style.submitGeneral} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
