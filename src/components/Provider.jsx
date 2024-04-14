import { createContext } from "react"

export const ContextSystem = createContext()

export function ContextProvider({children , value}){
    return (
        <ContextSystem.Provider value={value}>
            {children}
        </ContextSystem.Provider>
    )
}

// usage
// const value = useContext(ContextSystem)