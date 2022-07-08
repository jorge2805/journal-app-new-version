import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { login, logout } from "../store/auth"
import { CheckingAuth } from "../ui"


export const AppRouter = () => {
  
  const {status} = useSelector( state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async(user) => {
      if(!user) return dispatch(logout());

      const {uid, email, displayName, photoURL} = user;
      dispatch(login( {uid, email, displayName, photoURL}) );
    })
  }, [])
  

  if(status === 'checking') return <CheckingAuth/>
  
  return (
    <Routes>

        <Route path="/auth/*" element={ <AuthRoutes /> } />

        <Route path="/*" element={ <JournalRoutes /> } />

    </Routes>
  )
}
