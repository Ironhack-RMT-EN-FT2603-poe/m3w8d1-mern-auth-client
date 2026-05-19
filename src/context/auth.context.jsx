import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)


    const passedContext = {
        isLoggedIn,
        setIsLoggedIn,
        loggedUserId,
        setLoggedUserId
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}
