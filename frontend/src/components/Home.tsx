import { useAuthContext } from '../context/AuthContext'

const Home = () => {

  const {user,loading} = useAuthContext()

  if(loading){
    return <div>Loading...</div>
  }


  if(user.isLoggedIn){
    return <div>
      hello
      <img src={user.photoURL} alt="photo"/>
      {user.email}
    </div>
  }
  
  return <div>Login first</div>

}

export default Home
