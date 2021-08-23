import React from 'react'
import { useEffect } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Redirect,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { firebase } from "../firebase/firebase-config"
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { useState } from 'react';
import { Loading } from '../components/loading/Loading';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

   const dispatch = useDispatch();

   const [checking, setChecking] = useState(true);
   const [isLoggedIn, setIsLoggedIn] = useState(false);


   useEffect(() => {
      // crea un observable que se dispara cuando cambia la autenticación
      firebase.auth().onAuthStateChanged((user) => {

         if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            setIsLoggedIn(true);

            dispatch(startLoadingNotes(user.uid))

         } else {
            setIsLoggedIn(false);
         }

         setChecking(false);

      });

   }, [dispatch, setChecking, setIsLoggedIn])

   if (checking) {
      return (
         <Loading />
      )
   }

   return (
      <Router>
         <Switch>
            <PublicRoute
               path="/auth"
               component={AuthRouter}
               isAuthenticated={isLoggedIn}
            />

            <PrivateRoute
               exact
               path="/"
               component={JournalScreen}
               isAuthenticated={isLoggedIn}
            />

            <Redirect to="/auth/login" />
         </Switch>
      </Router>
   )
}
