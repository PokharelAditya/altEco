import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
const UserSignupData = () => {

  type FormData = {
    email:string,
    displayName:string,
    photoURL:string
    password:string,
    confirmPassword:string,
    dob:string|number,
    gender:string,
  }
  const [formData, setFormData] = useState<FormData>({ 
    email:'',
    displayName:'',
    photoURL:'',
    password: '',
    confirmPassword:'',
    dob:'',
    gender: ''
  })
  
  const navigate = useNavigate()
  const {setUser} = useAuthContext()

  useEffect(()=>{
    const ss = onAuthStateChanged(auth,currUser => {
      setFormData(prev => ({ ...prev,
        email: currUser?.email || '',
        displayName:currUser?.displayName || '',
        photoURL:currUser?.photoURL || '' 
      }))
    })
    return ()=>ss()
  },[])
 
  const handleChange = (e:any): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getMaxDate = () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    return maxDate.toISOString().split('T')[0]
  }

  // Get min date (120 years ago from today) for DOB validation
  const getMinDate = () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    return minDate.toISOString().split('T')[0]
  }

  const checkPassword = ():boolean => {
   return (formData.password === formData.confirmPassword) ? true : false 
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!checkPassword()){
      alert('passwords dont match')
      return
    }
    
    const response = await fetch('/api/signup-detail',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    const data = await response.json()
    if(data.status){
      alert('signup successful')
      setUser(prev => ({...prev,isLoggedIn:true}))
      navigate('/')
    }else{
      alert('signup failed')
      navigate('/signup')
    }
  }
  return <div>

    <form onSubmit={handleSubmit}>
      <input type="password" className="border" name="password" placeholder="Password" value={formData.password} required
      onChange={handleChange}/>
     <input type="password" className="border" name="confirmPassword" placeholder="Confirm Password"
      value={formData.confirmPassword} required onChange={handleChange}/> 
      <input
                    id="dateOfBirth"
                    name="dob"
                    type="date"
                    required
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={formData.dob}
                    onChange={handleChange}
                    className="border"
      />

      <select
      id="gender"
      name="gender"
      required
      onChange={handleChange}
      value={formData.gender}
      className="border">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
      </select>

    <button type="submit" className="border cursor-pointer">Enter</button>
    </form>
  </div>
}

export default UserSignupData
