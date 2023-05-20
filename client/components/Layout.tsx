import Image from "next/image";
import { useAppContext } from "../context/useProvider";
import { useEffect, useState } from "react";

const style = {
  profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center`,
  name: `font-bold mr-1`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#fff] ml-1`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between mr-28 mt-4 text-[#fff]`,
  footerIcon: `rounded-full text-lg p-2`,
  wrapper: `flex justify-center h-screen w-screen select-none  text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl text-[#fff] font-bold text-center mt-24`,
};

const Layout = ({ children, isAuth }: any) => {
  const { provider, account, connect } = useAppContext();
  let networkIds = [11155111, 1322];

  const [providerStatus, setProviderStatus] = useState("loading");
  useEffect(() => {
    changeProviderStatus();
  }, [provider]);
  useEffect(() => {
    if (account) {
      setProviderStatus("");
    }
    if (isAuth) {
      let t = localStorage.getItem("dapters");
      if (!t) {
        window.location.href = "/login";
      }
    }
  }, [account]);
  const changeProviderStatus = async () => {
    const networkId = await provider.networkVersion;

    if (provider) {
      let res = networkIds.find((item) => item == networkId);
      if (!res) return setProviderStatus("nonetwork");
      if (!account) return setProviderStatus("waitingForConnection");
      else return setProviderStatus("");
    } else setProviderStatus("metamaskNotFound");
  };

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src="/assets/metamask.png" width={200} height={200} />
      <div className={style.walletConnectButton} onClick={() => connect()}>
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  );

  const nonetwork = (
    <div className={style.loginContainer}>
      <Image src="/assets/metamask.png" width={200} height={200} />
      <button className={style.walletConnectButton} >
        Switch to correct network
      </button>
    </div>
  );
  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src="/assets/metamask.png" width={200} height={200} />
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
      <Image src="/assets/error.png" width={250} height={200} />
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
  useEffect(() => {
    chainChanged();
  }, [provider]);
  const chainChanged = () => {
    if (provider) {
      provider.on("networkChanged", function (networkId: number) {
        // Time to reload your interface with the new networkId
        let res = networkIds.find((item) => item == networkId);
        if (!res) {
          console.log("not found");
          setProviderStatus("nonetwork");
        }
        else{
          changeProviderStatus()
        }
        // window.location.reload()
      });
    }
  };
  return (
    <>
      {providerStatus === "loading" ? (
        loading
      ) : providerStatus == "nonetwork" ? (
        nonetwork
      ) : providerStatus === "metamaskNotFound" ? (
        noMetaMaskFound
      ) : providerStatus === "waitingForConnection" ? (
        noUserFound
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
