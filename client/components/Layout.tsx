import metamaskLogo from "../assets/metamask.png";
import errorImg from "../assets/error.png";
import Image from "next/image";


const style = {

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
  wrapper: `flex justify-center h-screen w-screen select-none  text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}



const Layout = ({children}:any) => {

    const noUserFound = (
        <div className={style.loginContainer}>
          <Image src={metamaskLogo} width={200} height={200} />
          <div
            className={style.walletConnectButton}
            //   onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
          <div className={style.loginContent}>Connect to Metamask.</div>
        </div>
      );
    
      const noMetaMaskFound = (
        <div className={style.loginContainer}>
          <Image src={metamaskLogo} width={200} height={200} />
          <div className={style.loginContent}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a <br /> virtual Ethereum wallet, in your
              browser.
            </a>
          </div>
        </div>
      );
    
      const error = (
        <div className={style.loginContainer}>
          <Image src={errorImg} width={250} height={200} />
          <div className={style.loginContent}>
            An error occurred. Please try again later or from another browser.
          </div>
        </div>
      );
    
      const loading = (
        <div className={style.loginContainer}>
          <div className={style.loginContent}>Loading...</div>
        </div>
      );
  return (
<>
{children}
</>
  )
}

export default Layout
