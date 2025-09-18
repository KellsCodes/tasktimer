// context/UserContext.js
"use client"
import api from "@/lib/axios"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    // Load user from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    // keep localStorage in sync whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    // Logout user function
    const logout = async () => {
        const refreshToken = Cookies.get("refreshToken")
        // console.log(refreshToken)
        try {
            const { data } = await api.put("/logout", { refreshToken })
            if (data.code === 1) {
                Cookies.remove("refreshToken")
                Cookies.remove("accesToken")
                localStorage.removeItem("user")
                window.location.href = "/"
            }
        } catch (error) {
            // console.error(error)
            // console.log(error)
            console.log("error here")
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
