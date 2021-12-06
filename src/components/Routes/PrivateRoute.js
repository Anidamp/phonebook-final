import { Navigate } from "react-router-dom"

export default function PrivateRoutes({isAuth, component:C}) {
    
    return(
        <>
        {isAuth ? <C /> : <Navigate to="/" />  }
        </>
    )   
    
};