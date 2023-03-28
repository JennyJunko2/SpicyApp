import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState()

  useEffect(()=> {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log('user:',user)
      setUser(user)
    })

    return unsubscribed
  }, [])

  const value = { user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}