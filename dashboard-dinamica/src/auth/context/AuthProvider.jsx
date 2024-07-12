import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer';


const inicialState = {
    logged: false,
}

export const AuthProvider = ( { children } ) => {

   const [ authState, dispatch ] = useReducer( authReducer, inicialState );

  return (
    <AuthContext.Provider value={ {} } >
        {children}
    </AuthContext.Provider>
  )
}
