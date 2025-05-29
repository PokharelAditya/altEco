import { onAuthStateChanged } from 'firebase/auth'
import type { Unsubscribe } from 'firebase/auth'
import { auth } from '../firebase'
import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  isLoggedIn:boolean,
  userId:string,
  email:string,
  photoURL:string
  //more to add
}

type UserContext = {
  user:User,
  setUser:React.Dispatch<React.SetStateAction<User>>,
  loading:boolean
}

const AuthContext = createContext<UserContext|null>(null)

export const useAuthContext = ():UserContext|null => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {

  const [user,setUser] = useState<User>({isLoggedIn:false,userId:'',email:'',photoURL:''})
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(()=>{
    let unsubscribe:Unsubscribe
    let count =0
    const checkAuth = async ():Promise<void> => {
      try{
        const response = await fetch('/api/auth') 
        const data = await response.json()
        if(data.login){
          setUser({isLoggedIn:true,userId:data.userId,email:data.email,photoURL:''})
          setLoading(false)
        }else{
          count=1
          unsubscribe = onAuthStateChanged(auth,currUser => {
            setUser({
              isLoggedIn:currUser?.email ? true : false,
              userId:'',
              email:currUser?.email || '',
              photoURL:currUser?.photoURL || ''
            })
            setLoading(false)
          })
        }
      }
      catch(err){
        console.error(err)
      }
    }
    checkAuth()
    if(count) return ()=>unsubscribe()
  },[user.isLoggedIn])


  return <AuthContext.Provider value={{user,setUser,loading}}>
    {children}
  </AuthContext.Provider>
}
