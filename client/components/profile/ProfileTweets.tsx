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
}

interface Tweets extends Array<Tweet> {}

interface Author {
  name: string;
  profileImage: string;
  walletAddress: string;
  isProfileImageNft: Boolean | undefined;
}

const ProfileTweets = () => {
  // const { currentUser } = useContext(TwitterContext)
  const [tweets, setTweets] = useState<Tweets>([]);
  const [author, setAuthor] = useState<Author>({
    name: "",
    profileImage: "",
    walletAddress: "",
    isProfileImageNft: undefined,
  });
  const { contract } = useAppContext();
  useEffect(() => {
    LoadPost();
  }, [1]);
  const LoadPost = async () => {
try {
  

    if (contract) {
      let res = await contract.getAllPosts();
      console.log(res);
      setTweets(res)
    }
  } catch (error) {
  console.log('hhh')
  }
  };
 

  return (
    <div className={style.wrapper}>
      {tweets?.map((tweet: Tweet, index: number) => (
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
          avatar={"https://images.pexels.com/photos/7651720/pexels-photo-7651720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        
          timestamp={tweet.timestamps}
          isProfileImageNft={true}
        />
      ))}
    </div>
  );
};

export default ProfileTweets;
