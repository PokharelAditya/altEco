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

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined
    
    const checkAuth = async (): Promise<void> => {
      try {
        // Check if API endpoint exists and returns valid JSON
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({})
        })
        
        // Check if response is ok and has content
        if (!response.ok) {
          console.warn(`API returned ${response.status}: ${response.statusText}`)
          throw new Error(`HTTP ${response.status}`)
        }

        // Check if response has content
        const text = await response.text()
        if (!text || text.trim() === '') {
          console.warn('API returned empty response')
          throw new Error('Empty response from server')
        }

        // Try to parse JSON
        let data
        try {
          data = JSON.parse(text)
        } catch (parseError) {
          console.error('Failed to parse JSON response:', text)
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
          // Fallback to Firebase auth check
          handleFirebaseAuth()
        }
      } catch (err) {
        console.error('Auth API check failed:', err)
        // Fallback to Firebase auth check when API fails
        handleFirebaseAuth()
      }
    }

    const handleFirebaseAuth = () => {
      unsubscribe = onAuthStateChanged(auth, async (currUser) => {
        if (currUser?.email) {
          try {
            const token = await currUser.getIdToken()
            
            // Try API call with token
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
              // API failed, but user has Firebase auth - set basic info
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
          } catch (error) {
            console.error('Error in Firebase auth flow:', error)
            setUserLoggedOut()
          }
        } else {
          setUserLoggedOut()
        }
        setLoading(false)
      })
    }

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

    checkAuth()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
