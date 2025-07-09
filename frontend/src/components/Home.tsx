import { useAuthContext } from '../context/AuthContext'
import {User } from 'lucide-react'

const Home = () => {

  const {user,loading} = useAuthContext()
  
  if(loading){
    return <div>Loading...</div>
  }


  if(user.isLoggedIn){
    return <div className="text-white">
      {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
      name: {user.displayName}<br/>
      id: {user.userId}<br/>
      email: {user.email}<br/>
      gender: {user.gender}<br/>
      dob: {user.dob}<br/>
      joined: {user.createdAt}
    </div>
  }
  
  return <div>Login first</div>

}

export default Home
