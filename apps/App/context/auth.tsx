import React from 'react'

type AuthContextType = {
  setAuth: (isAuth: boolean) => void
  auth: boolean
}

const AuthContext = React.createContext<AuthContextType>(null)

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [auth, setAuth] = React.useState(false)

  return (
    <AuthContext.Provider
      value={{
        setAuth: (isAuth) => setAuth(isAuth),
        auth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
