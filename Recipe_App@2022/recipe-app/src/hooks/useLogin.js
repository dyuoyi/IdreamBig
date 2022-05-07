import { useState, useEffect} from 'react';
import { useAuthContext} from '../hooks/useAuthContext';
import { projectAuth, projectFirestore } from '../firebase/config';

export const useLogin =  () => {
    const[isCanclled, setIsCanclled] = useState(false);
    const [error, setError] = useState(null);
    const[isPending, SetIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        SetIsPending(true)

        //  try to login the user [try & catch blcok ]
        try {
         
      
          const res =   await projectAuth.signInWithEmailAndPassword(email, password);

           // update online status
           await projectFirestore.collection('users').doc(res.user.uid)
            .update({online: true})

            //dispatch login action
            dispatch({type: "LOGIN", payload: res.user})

            //update state
            if(!isCanclled) {
                SetIsPending(false);
                setError(null);
            }

        }
        catch(err){
            if(!isCanclled){
                console.log(err.message)
                setError(err.message);
                SetIsPending(false);
            }
        }
    }
  
    useEffect(() => {
        // return clean up function
        return () => setIsCanclled(true);
    }, [])

    return { login, error, isPending }
}