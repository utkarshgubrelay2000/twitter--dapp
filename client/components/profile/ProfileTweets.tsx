import { useEffect, useContext, useState } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import Post from "../Post";
import { useAppContext } from "../../context/useProvider";

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

interface Tweet {
  timestamps: string;
  msg: string;
  owner:string
  likes:[],id:number
}

interface Tweets extends Array<Tweet> {}

interface Author {
  name: string;
  profileImage: string;
  walletAddress: string;
  isProfileImageNft: Boolean | undefined;
}

const ProfileTweets = (props:any) => {
  // const { currentUser } = useContext(TwitterContext)
  const { tweets,LoadPost } = useAppContext();

  const [author, setAuthor] = useState<Author>({
    name: "",
    profileImage: "",  
    walletAddress: "",
    isProfileImageNft: undefined,
  });
  
 

  return (
    <div className={style.wrapper}>
      {tweets?.map((tweet: any, index: number) => (
        <Post
          key={index}
        
          displayName={
            author.name === "Unnamed"
              ? `${tweet?.owner.slice(
                  0,
                  4
                )}...${tweet?.owner.slice(41)}`
              : author.name
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
  );
};

export default ProfileTweets;
