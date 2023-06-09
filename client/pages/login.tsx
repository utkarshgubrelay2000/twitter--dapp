import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/useProvider';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Layout from '../components/Layout';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {userContract,account} = useAppContext()
  useEffect(()=>{
if(userContract){
  console.log(userContract)
}
  },[])
  const handleSubmit = async (e:any) => {
    e.preventDefault();
     try {
    
    let res=await userContract.signin(email)
    console.log(res.email,"heelo")
    if(res.email){

      await localStorage.setItem('dapters',res.email)
      window.location.href='/twitter'
    }

  } catch (error:any) {
    console.log(error)
    var errorMessage=error?.error?.message || "Something went wrong"
    toast.error(errorMessage)
   
  }
  };

  return (
    <Layout>
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="title">Log In</h1>
        <h1 className="subtitle">Check your account address </h1>
        <input
          className="input-field"
          type="text"
          disabled
          placeholder="Email"
          value={account}
        //  onChange={(e:any)  => setEmail(e.target.value)}
        />
         <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e:any)  => setEmail(e.target.value)}
        />

       
        <button className="login-button" type="submit">
          Log In
        </button>
        <span>
          Dont have a account <Link href='/signup'>
            <a>

             Signup {" "}
            </a>
            </Link>
              now.
        </span>
      </form>
    </div>
    </Layout>
  );
};

export default LoginPage;
