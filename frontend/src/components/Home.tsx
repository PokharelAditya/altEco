import { useAuthContext } from '../context/AuthContext'

const Home = () => {

  const {user,loading} = useAuthContext()

  if(loading){
    return <div>Loading...</div>
  }


  if(user.isLoggedIn){
    return <div>
      <img src={`${user.photoURL}`} alt="photo"
      className="h-12 w-12 rounded-full"/>

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
