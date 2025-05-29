import { useAuthContext } from '../context/AuthContext'

const Home = () => {

  const {user,loading} = useAuthContext()

  if(loading){
    return <div>Loading...</div>
  }


  if(user.isLoggedIn){
    return <div>
      hello
      <img src={user.photoURL} alt="photo"
      className="h-12 w-12 rounded-full"/>
      {user.email}
    </div>
  }
  
  return <div>Login first</div>

}

export default Home
