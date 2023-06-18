import React, { createContext, useState } from 'react'

export const ModalContext = createContext();
export default function ModalContextProvider({children}) {

    const [modal, setModal] = useState(false);



    return (
        <ModalContext.Provider value={{modal, setModal}}>
            {children}
        </ModalContext.Provider>
    )
}
