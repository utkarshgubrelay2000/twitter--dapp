import React, { useState } from 'react';
import { uploadHandler } from '../lib/image';
import { useAppContext } from '../context/useProvider';
import { toast } from 'react-toastify';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
const {userContract} = useAppContext()
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Handle login logic
    console.log(image,email,password)
    try {
      
    
    let res=await userContract.signup({user_name:password,image_url:image,email})
    
    window.location.href='/login'
  } catch (error:any) {
    console.log(error.error)
    toast.error(error.error.message)
   
  }
  };
  const handleChange=async(e:any)=>{
    setLoading(true)
    console.log('hello')
 let image:any=await uploadHandler(e.target.files[0])
 console.log(image)
setImage(image)
setLoading(false)
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="title">Sign Up</h1>
        <h1 className="subtitle">Note account will be created as per selected wallet</h1>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e:any)  => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="User Name"
          value={password}
          onChange={(e:any)  => setPassword(e.target.value)}
        />

              <input  className="input-field hidden"  name="file" type="file" />

              <div className="upload-btn-wrapper">
                {loading?
  <button className="btn"  disabled>Loading...</button>
: 
  <button className="btn"  onClick={()=>document.getElementById('file')}>Upload Image</button>
}
<input type="file" id='file' name="image"  onChange={handleChange}/>
</div>

        <button className="login-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
