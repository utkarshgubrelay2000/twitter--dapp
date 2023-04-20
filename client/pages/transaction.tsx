import React, { useEffect, useState } from 'react';
import { 
  Avatar, 
  Button, 
  TextField, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Box,
} from '@mui/material';
import { useAppContext } from '../context/useProvider';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { uploadHandler } from '../lib/image';
const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
 // wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-3/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-auto`,
  secondary: `text-[#8899a6] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-16`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`,
}



function ProfilePage() {
  const {userContract,contract,account,profile} = useAppContext()
  const [name, setName] = useState(profile?.user_name);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [image, setImage] = useState("");
  const [tweets, setTweets] = useState([]);

   useEffect(()=>{
    getmyTweets()
   },[profile])

   const getmyTweets=async ()=>{
    try {
      
      let tweetsArray=await contract.getMyPosts();
      console.log(tweetsArray)
      setEmail(profile.email)
      setName(profile.user_name)
      setImage(profile.image_url)
      setTweets(tweetsArray)
    } catch (error) {
      
    }
   }
  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };

  const updateProfile=async ()=>{
    let res=await userContract.update_profile({user_name:name,image_url:image,email})
console.log(res)

  }
  const handleChange=async(e:any)=>{
    setLoading(true)
    console.log('hello')
 let image:any=await uploadHandler(e.target.files[0])
 console.log(image)
setImage(image)
setLoading(false)
  }

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

 

  const handleTabChange = (event:any, newValue:any) => {
    setTabValue(newValue);
  };

  const handleTweetSubmit = (event:any) => {
    event.preventDefault();
    const tweetText = event.target.elements.tweetText.value;
   // setTweets([...tweets, tweetText]);
    event.target.reset();
  };

  return (
    <div>
          <Layout isAuth={true}>

<div className={style.wrapper}>
  <div className={style.content}>
    <Sidebar initialSelectedIcon={'Profile'} />
    
    <div  className={style.mainContent}>

        <div className={style.coverPhotoContainer}>
        <img
          src={image}
          alt='cover'
          className={style.coverPhoto}
        />
      </div>
      <div className={style.profileImageContainer}>
        <div
         
        >
          <img
            src={profile.image_url}
            alt={account}
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
      </div>
    <Grid container spacing={3}>
      
        <Grid container item xs={10}>
          <Paper sx={{ p: 5 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Profile and Tweets tabs"
            >
              <Tab label="Profile" />
              <Tab label="Tweets" />
            </Tabs>
            <Box hidden={tabValue !== 0}>
           
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleNameChange}
                sx={{ mt: 2 }}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                sx={{ mt: 2 }}
              />
              <div>

              {loading?
  <button className="btn"  disabled>Loading...</button>
  : 
  <button className="btn"  onClick={()=>document.getElementById('file')?.click()}>Change Image</button>
}
<input type="file" id='file' style={{display:'none'}} name="image"  onChange={handleChange}/>
  </div>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={updateProfile}
              >
                Update Profile
              </Button>
            </Box>
            <Box hidden={tabValue !== 1}>
              <div className='w-full'>

            {tweets?.map((tweet: any, index: number) => (
        <Post
          key={index}
        
          displayName={tweet?.owner.slice(
                  0,
                  4)
          }
          userName={`${tweet?.owner.slice(
            0,
            4
          )}...${tweet?.owner.slice(41)}`}
          text={tweet.msg}
          owner={tweet.owner}
          twetId={tweet.id}
        retweet={tweet.likes}
          timestamp={tweet.timestamps}
          avatar={tweet.image}
          isProfileImageNft={true}
        />
      ))}
      </div>
            </Box>
          </Paper>
        </Grid>
    
      </Grid>
    
    </div>
   
  </div>
</div>
</Layout>
     

    </div>
  );
}

export default ProfilePage;

