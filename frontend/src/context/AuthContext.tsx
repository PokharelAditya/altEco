import { onAuthStateChanged } from 'firebase/auth'
import type { Unsubscribe } from 'firebase/auth'
import { auth } from '../firebase'
import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  isLoggedIn: boolean,
  userId: string,
  email: string,
  photoURL: string,
  displayName: string,
  gender: string,
  createdAt: Date | string,
  dob: Date | string
}

type UserContext = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  loading: boolean
}

const AuthContext = createContext<UserContext | null>(null)

export const useAuthContext = (): UserContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    userId: '',
    email: '',
    photoURL: '',
    displayName: '',
    gender: '',
    createdAt: '',
    dob: ''
  })
  const [loading, setLoading] = useState<boolean>(true)

  // Helper to reset user state
  const setUserLoggedOut = () => {
    setUser({
      isLoggedIn: false,
      userId: '',
      email: '',
      photoURL: '',
      displayName: '',
      gender: '',
      createdAt: '',
      dob: ''
    })
  }

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined

    const checkAuth = async (): Promise<void> => {
      setLoading(true)
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({})
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const text = await response.text()
        if (!text || text.trim() === '') throw new Error('Empty response from server')

        let data
        try {
          data = JSON.parse(text)
        } catch {
          throw new Error('Invalid JSON response from server')
        }

        if (data.login) {
          setUser({
            isLoggedIn: true,
            userId: data.userId || '',
            email: data.email || '',
            photoURL: data.photoURL || '',
            displayName: data.displayName || '',
            gender: data.gender || '',
            createdAt: data.createdAt || '',
            dob: data.dob || ''
          })
          setLoading(false)
        } else {
          handleFirebaseAuth()
        }
      } catch {
        handleFirebaseAuth()
      }
    }

    const handleFirebaseAuth = () => {
      unsubscribe = onAuthStateChanged(auth, async (currUser) => {
        if (currUser?.email) {
          try {
            const token = await currUser.getIdToken()
            const response = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({ token })
            })

            if (response.ok) {
              const text = await response.text()
              if (text && text.trim() !== '') {
                const data = JSON.parse(text)
                if (data.login) {
                  setUser({
                    isLoggedIn: true,
                    userId: data.userId || '',
                    email: data.email || '',
                    photoURL: data.photoURL || '',
                    displayName: data.displayName || '',
                    gender: data.gender || '',
                    createdAt: data.createdAt || '',
                    dob: data.dob || ''
                  })
                } else {
                  setUserLoggedOut()
                }
              } else {
                setUserLoggedOut()
              }
            } else {
              setUser({
                isLoggedIn: true,
                userId: currUser.uid,
                email: currUser.email || '',
                photoURL: currUser.photoURL || '',
                displayName: currUser.displayName || '',
                gender: '',
                createdAt: '',
                dob: ''
              })
            }
          } catch {
            setUserLoggedOut()
          } finally {
            setLoading(false)
          }
        } else {
          setUserLoggedOut()
          setLoading(false)
        }
      })
    }

    checkAuth()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
