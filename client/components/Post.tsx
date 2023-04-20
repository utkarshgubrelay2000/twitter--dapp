import { BsFillPatchCheckFill } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/useProvider";
import { ethers } from "ethers";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { uploadHandler } from "../lib/image";
import { Button } from "@mui/material";

const style = {
  wrapper: `flex p-3 border-b border-[#38444d]`,
  profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center`,
  name: `font-bold mr-1`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#8899a6] ml-1`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
  footerIcon: `rounded-full text-lg p-2`,
 // wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,

  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
};

interface PostProps {
  displayName: string;
  userName: string;
  text: string;
  avatar: string;
  timestamp: string;
  isProfileImageNft: Boolean | undefined;
  retweet: [];
  twetId: number;
  owner:string
}

const Post = ({
  displayName,
  userName,
  text,
  avatar,
  timestamp,
  isProfileImageNft,
  retweet,
  twetId,
  owner
}: PostProps) => {

  const [open,setOpen]=useState(false)
  const [tweetMessage, setTweetMessage] = useState('')
 // const [image, setImage] = useState('')
  const [img, setImg] = useState('')
 // const [comments, setComments] = useState([])
  const { contract,userContract, account,LoadPost } = useAppContext();
  const handleClose=()=>setOpen(!open)
  useEffect(()=>{
   // getPostComments() 
 //   getProfileByAddress()
  },[0])
 
  const Retweet = async (e: any) => {
    e.preventDefault();

    if (contract) {

      let res = 
      await contract.addLikes(Number(ethers.utils.formatEther(twetId))
      );
      await LoadPost()
      console.log(res);
    }
  };

  

  
//   const getPostComments=async()=>{
//     try {
//       let id=twetId;
// let com=[]

//  let a=  await  contract.getPostComments(id)
// for (let index = 0; index < a.length; index++) {
//   const iterator = a[index];
  
//   let userDetails=await getUser(iterator.from);
//   console.log(userDetails,"helloworld")
// }

// //  setComments(a)
// } catch (error) {
//       console.log(error)
// }
//   }
  const disLike = async (e: any) => {
    console.log('disluke')
    if (contract) {
   
      let res = await contract.unlike(Number(ethers.utils.formatEther(twetId)));
      console.log(res);
      await LoadPost()
    
      window.location.reload();
    }
  };
  // const onSubmitHandler = async (event:any) => {
  //   event.preventDefault();
   
  //   let image:any=await uploadHandler(event.target.files[0])
  //   console.log(image)
  //  setImage(image)
  // };
  return (
    <div className={style.wrapper}>
      <div>
        <img
          src={"img"}
          alt={"jej"}
          className={
            isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.postMain}>
        <div>
          <span className={style.headerDetails}>
            <span className={style.name}>{displayName}</span>
            {isProfileImageNft && (
              <span className={style.verified}>
                <BsFillPatchCheckFill />
              </span>
            )}
            <span className={style.handleAndTimeAgo}>
              @{userName} •{" "}
              {format(
                new Date(
                  Number(ethers.utils.formatEther(timestamp)) *
                    1000000000000000000
                )
              )}
            </span>
          </span>
          <div className={style.tweet}>{text}</div>
        </div>
        <div className={style.footer}>
          <div
            className={`${style.footerIcon} flex flex-row hover:text-[#f91c80] hover:bg-[#39243c]`}
          >
            {retweet.length}
            {retweet.find((i: any) => i.toLowerCase() === account) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={disLike}
                style={{ color: `#39243c` }}
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={Retweet}
                style={{ color: `#39243c` }}
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            )}
           
          </div>

        
          <div
            className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
          >
            <FiShare onClick={handleClose} />
          </div>
        </div>
          {/* <div>

          {comments.map(async (target:any)=>{
            return (
              <div style={{display:'block',clear:'both'}}>
<br/>
                <h2>
         
                  {target.comment}
                </h2>
                </div>
              )
              
            })}
            </div> */}
        {/* <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   
  <div >
        <form>
          <textarea
            onChange={e => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
        
          />
          {image&&
 <img
 alt={`Uploaded `}
 src={image}
 style={{ maxWidth: "400px", margin: "15px" }}
 //key={image.cid.toString() + index}
 />
}

          <div >
          <Button onClick={AddTweet} variant="contained">Contained</Button>
          </div>
        </form>
      </div>
  </Box>
  </Modal> */}
      </div>
    </div>
  );
};

export default Post;
