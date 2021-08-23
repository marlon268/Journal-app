import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from "validator";

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

   const { msgError, loading } = useSelector((state) => state.ui)


   const dispatch = useDispatch();

   const [formValues, handleInputChange] = useForm({
      email: 'estiben@gmail.com',
      password: '123456'
   });

   const { email, password } = formValues;

   const handleLogin = (e) => {
      e.preventDefault()


      if (!validator.isEmail(email)) {
         dispatch(setError("Email is not valid"))
      } else {
         dispatch(startLoginEmailPassword(email, password))
      }

   }

   const handleGoogleLogin = () => {
      dispatch(startGoogleLogin());
   }

   return (
      <>
         <h1 className="auth__title">Login</h1>

         {
            msgError &&
            (
               <div className="auth__alert-error">
                  {msgError}
               </div>
            )
         }

         <form
            onSubmit={handleLogin}
            className="auth__form animate__animated animate__fadeIn animate-faster"
         >
            <input
               type="text"
               placeholder="Email"
               name="email"
               className="auth__input"
               autoComplete="off"
               value={email}
               onChange={handleInputChange}
            />

            <input
               type="password"
               placeholder="Password"
               name="password"
               className="auth__input"
               value={password}
               onChange={handleInputChange}
            />

            <button
               className="btn btn-primary btn-block btn-margin"
               type="submit"
               disabled={loading}
            >
               Login
            </button>

            <div className="auth__social-networks">
               <p>Login with social networks</p>
               <div
                  className="google-btn"
                  onClick={handleGoogleLogin}
               >
                  <div className="google-icon-wrapper">
                     <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                  </div>
                  <p className="btn-text">
                     <b>Sign in with google</b>
                  </p>
               </div>
            </div>

            <Link className="link" to="/auth/register">
               Create new account
            </Link>

         </form>
      </>
   )
}
