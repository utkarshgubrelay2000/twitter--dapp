import axios from "axios";
let base_url=process.env.BACKEND_URL



export const register = async (data:any) => {

  const res = await fetch('/api/protected/', {
      method: 'POST',
      body: JSON.stringify({
        request_type: 'POST',
        target_url: `/auth/register`,
        payload:data
    })
  })

  if (res.ok) {

      return res?.json()
  } else {
      return res?.json()

  }

};


export const login = async (data:any) => {

  const res = await fetch('/api/protected/', {
      method: 'POST',
      body: JSON.stringify({
          request_type: 'POST',
          target_url: `/auth/login`,
          payload:data
      })
  })

  if (res.ok) {

      return res?.json()
  } else {
      return res?.json()

  }

};