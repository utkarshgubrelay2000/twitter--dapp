import Layout from '../components/Layout'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTweets from '../components/profile/ProfileTweets'
import Sidebar from '../components/Sidebar'
import Feed from "../components/home/Feed";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
}

const profile = () => {
  return (
    <Layout>

    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon={'Profile'} />
        
        <div className={style.mainContent}>
          <ProfileHeader />
          <Feed/>
          <ProfileTweets />
        </div>
       
      </div>
    </div>
    </Layout>
  )
}

export default profile
