import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { googleProvider,auth } from '../firebase'

const Login: React.FC = () => {

  type FormData = {
    email:string,
    password:string
  }
  const [formData,setFormData] = useState<FormData>({email:'',password:''})
  const {user,setUser} = useAuthContext()

  const navigate = useNavigate()

  useEffect(()=>{
    console.log(user)
    if(user.isLoggedIn){
      navigate('/')
    }
  },[])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    const {name,value} = e.target
    setFormData(prev => ({...prev,[name]:value}))
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault()
    try{
      const response = await fetch('/api/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: formData.email,
          password: formData.password 
        }),
      })
      const data = await response.json()
      if(data.login){
        setUser({isLoggedIn:true,userId:data.userId,email:data.email})
        navigate('/')
      }else{
        setUser({isLoggedIn:false,userId:'',email:''})
        alert('login failed')
      } 
    }
    catch(err){
      console.error(err)
    }
  }

  const handleGoogleLogin = async():Promise<void> => {
    try{
      await signInWithPopup(auth,googleProvider)
      navigate('/')
    }
    catch(err){
      console.error(err)
    }
  }


  return <div className="flex w-full h-screen justify-center items-center">
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-2">

      <div>
        <input onChange={handleChange}
          type="email" placeholder="Email" name="email" value={formData.email} className="border" required/>
      </div>
      <div>
        <input onChange={handleChange}
          type="password" placeholder="Password" name="password" value={formData.password} className="border" required/>
      </div>
      <div>
        <button type="submit" className="border cursor-pointer">submit</button>
      </div>
    </form>
    <div>
      <button className="border cursor-pointer" onClick={handleGoogleLogin}>Sign In with Google</button>

    </div>
  </div>
}

export default Login

