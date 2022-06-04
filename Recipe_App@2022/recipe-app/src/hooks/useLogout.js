import { useEffect, useState }from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [isCanclled, setIsCanclled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);


    // using useAuthContext hook
    const { dispatch, user } =  useAuthContext();

const logout = async () => {
    setError(null);
    setIsPending(true);

    // try to sign the user out  --- logging out the user
    try{
     //update online status
     const { uid } = user
     
     await projectFirestore.collection('users').doc(uid).update({online: false}) // changing the document

     await projectAuth.signOut()

        // dispatch  logout action
        dispatch({ type: "LOGOUT"}) // here we dont have to pass the payload - since the user going be to null atm
        
        // update state
        if(!isCanclled) {
            setIsPending(false);
            setError(null)
        }

    
    }
    catch(err) {
        if(!isCanclled){
            console.log( err.message);
            setError(err.message);
            setIsPending(false);
        }
    }
}

useEffect(() => {
    // cleaning up function 
    return () => setIsCanclled(true)

}, [])

  return { logout, isPending, error}

}