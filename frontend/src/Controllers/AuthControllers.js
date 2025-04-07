export const SignupController = async (formdata) => {
    return await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    }).then(res => res.json());
  }
  
  export const LoginController = async (formdata) => {
    console.log(formdata);
  
  console.log(import.meta.env.VITE_PORT+"")
    return await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(formdata)
    }).then(res => res.json())
  }
  
  
  export const LogoutController = async () => {
    return fetch(`/api/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  }


  export const passReset=async(password,token)=>{
    return fetch(`/api/auth/ResetPassword/${token}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
        ,
        body: JSON.stringify({password:password})
      }).then(res => res.json())
  }


  export const forgetPass=async(email)=>{
    return fetch(`/api/auth/forgetPassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
        ,
        body: JSON.stringify({email:email})
      }).then(res => res.json())
  }

  export const logout=async()=>{
    return fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
  }
  