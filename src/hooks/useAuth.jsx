import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { StorageService } from '../services/storage.service'
import { UserService } from '../services/api/requests/user/user.index'

const DEFAULT_TOKEN = ""

const DEFAULT_USER = {
    id: "",
    email: "",
    token: "",
}

export const DEFAULT_AUTH_CONTEXT = {
    token: DEFAULT_TOKEN,
    isAuthenticated: false,
    login: ({ email, password }) => { },
    logout: () => { },
    user: DEFAULT_USER

}


const AuthContext = createContext(DEFAULT_AUTH_CONTEXT)

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [isAuth, setIsAuth] = useState()

    useEffect(() => {
        AuthService.getToken()
            .then(th => {
                if (th) {
                    setToken(th)
                    setIsAuth(Boolean(th))
                }
            })

    }, [token])

    useEffect(() => {
        getUserFromStorage()
    }, [user])

    const getUserFromStorage = async () => {
        const u = await StorageService.getItem("USER_INFO")
        if (u) {
            setUser(u)
        }
    }

    const login = async ({ email, password }) => {
        const result = await AuthService.login({ email, password })
        console.log("result login in useAuth: ", result)
        if (result && result.token) {
            setToken(result.token)
            setUser(result)
            setIsAuth(Boolean(token))

            UserService.getUserByID(result.id)
                .then(th => {
                    if (th) {
                        console.log("get user:", th)
                        StorageService.saveItem("USER_INFO", th)
                    }
                })
        }



    }

    const logout = () => {
        setToken(null)
        setIsAuth(Boolean(false))
        StorageService.removeItem("TOKEN")
        StorageService.removeItem("USER")
        StorageService.removeItem("USER_INFO")
    }


    const context = {
        token,
        isAuthenticated: isAuth, //Boolean(token),
        login,
        logout,
        user,
    }

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
