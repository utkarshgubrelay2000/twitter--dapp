import { useContext, useEffect } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import TweetBox from "./TweetBox";
import Post from "../Post";
import { BsStars } from "react-icons/bs";
import { useAppContext } from "../../context/useProvider";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

interface Tweet {
  author: TweetAuthor;
  tweet: string;
  timestamp: string;
}

interface TweetAuthor {
  name: string;
  walletAddress: string;
  profileImage: string;
  isProfileImageNft: boolean;
}

function Feed(props:any) {
  // const { tweets } = useContext(TwitterContext)
 
  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {props?.tweet && props?.tweet.map((tweet:any, index:number) => (
        <Post
          key={index}
          displayName={tweet?.user_name+" "+ tweet?.owner.slice(
            0,
            4)
    }
    userName={tweet?.user_name+" "+ tweet?.owner.slice(
      0,
      4)
}
          text={tweet.tweet}
          avatar={tweet.img}
          retweet={tweet.reweet?.length}
          isProfileImageNft={true}
          timestamp={tweet.timestamp}
          owner={tweet.owner}
          twetId={tweet.id}
        />
      ))}
    </div>
  );
}

export default Feed;
