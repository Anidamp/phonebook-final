import { Navigate } from "react-router-dom"

export default function PublicRoutes({isAuth, component:C}) {
    
    return(
        <>
        {isAuth ? <Navigate to="/contacts" /> : <C />}
        </>
    )   
    
};