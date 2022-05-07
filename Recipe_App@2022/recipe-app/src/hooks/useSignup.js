import { useEffect, useState } from 'react';
import { projectAuth} from '../firebase/config';
import { useAuthContext}  from './useAuthContext';
import { projectFirestore } from '../firebase/config';
 

export const useSignup = ()  => {
    const[isCancelled, setIsCanclled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    // the function which will innvok when a user signup
const signup = async (email, password, displayName) => { // this is fields are coming from the sign up form
    setError(null)
    setIsPending(true)

    try {
        //signup user
      const res =   await projectAuth.createUserWithEmailAndPassword(email, password);
      console.log(res.user) // user is the one just created

      if(!res){
          throw new Error ('Could not complelte signup')
      }

    // add name to user
    await res.user.updateProfile({ displayName});


    // create a user document
    await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true, 
        displayName
    });


    //dispatch login action
    dispatch({type: "LOGIN", payload: res.user})

    // update state
    if(!isCancelled) {
        setIsPending(false);
        setError(null);
    }

    } 
     catch(err){
         if(!isCancelled) {
            console.log(err.message);
            setError(err.message)
             setIsPending(false);
         }
     }
}
useEffect(() => {
    // cleaning up function
    return ()  => setIsCanclled(true)
}, [])

return  {error, isPending, signup}

}