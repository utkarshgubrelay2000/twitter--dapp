
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

import { useAppContext } from '../../context/useProvider'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

Modal.setAppElement('#__next')

const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
  secondary: `text-[#fff] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-16`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#fff]`,
  activeNav: `text-white`,
}

interface Tweets {
  tweet: string
  timestamp: string
}

interface UserData {
  name: string
  profileImage: string
  coverImage: string
  walletAddress: string
  tweets: Array<Tweets>
  isProfileImageNft: Boolean | undefined
}

const ProfileHeader = () => {
  //const { currentAccount, currentUser } = useContext(TwitterContext)
  const router = useRouter()
 const { loginFunction } = useAuth();
  
  const [userData, setUserData] = useState<any>({})
  const {userContract,account,profile} = useAppContext()
  useEffect(()=>{
    handleSubmit()
  },[0])
  const handleSubmit = async () => {

     try {
    
    let res=await userContract.getProfileDetails(account)
    console.log(res,"heelo")
    setUserData(res)
 

  } catch (error:any) {
   // console.log(error?.error?.message)
    var errorMessage=error?.error?.message || "Something went wrong"
    toast.error(errorMessage)
   
  }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.push('/')} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>{userData.email}</div>
          <div className={style.secondary}>
            {userData.tweets?.length} Tweets
          </div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        <img
          src={profile.image_url}
          alt='cover'
          className={style.coverPhoto}
        />
      </div>
      <div className={style.profileImageContainer}>
        <div
         
        >
          <img
            src={profile.image_url}
            alt={userData.walletAddress}
            className={
            
                 style.profileImage
            }
          />
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}> <>
              @{account?.slice(0, 8)}...{account?.slice(37)}
            </></div>
        </div>
        <div className={style.secondary}>
          {/* {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(37)}
            </>
          )} */}
        </div>
      </div>
      <div className={style.nav}>
        <div className={style.activeNav}>Tweets</div>
        <div>Tweets & Replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>
    </div>
  )
}

export default ProfileHeader
