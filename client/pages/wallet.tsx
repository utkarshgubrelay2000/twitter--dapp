
import Feed from '../components/home/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import metamaskLogo from '../assets/metamask.png'
import errorImg from '../assets/error.png'
import Image from 'next/image'
import { useAppContext} from '../context/useProvider'
import { useContext, useEffect, useState } from 'react'
const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

const Home = () => {
 const {accounts,provider,connectWallet,web3Hooks,contract,chainChanged} =useAppContext()
 useEffect(()=>{
  chainChanged()
 },[])
 const [tweet,setTweet]=useState([]);
 const LoadTweets=async ()=>{

  if(contract){

    let tweets= await contract.methods.getAllTweets().call();
    let isLoggedIn=localStorage.getItem('tby')
    if(!isLoggedIn){

      let a= await contract.methods.signupUser().send({from:accounts});
      localStorage.setItem('tby',"Yes");
    }
//console.log(a)
    setTweet(tweets)
  }
  }
  useEffect(()=>{
  LoadTweets()
    
  },[contract])

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={'Home'} />
      <Feed tweet={tweet} />
      <Widgets />
    </div>
  )


  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
       onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorImg} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  )

  return <div className={style.wrapper}>{provider?accounts?userLoggedIn:noUserFound:noMetaMaskFound}</div>
}

export default Home
