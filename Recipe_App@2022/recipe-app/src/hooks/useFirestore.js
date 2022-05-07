import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from '../firebase/config';

// this is going to be used to do 2 -different things
           // adding a new doc to firestore collection
          // remove doc from firestore collection

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

// here we will check the different type of dispatch
     // useReducer - allow us to have custom state logic
const firestoreReducer = (state, action) => {
    switch(action.type){
        case "IS_PENDING":
            return {isPending: true, document: null, success:false, error: null}
        
        case "ADDED_DOCUMENT":
              return {isPending: false, document: action.payload, success: true, error: null }
        
        case "DELETED_DOCUMENT":
            return { isPending: false, document:null, success: true, error: null  }
        case "ERROR":
              return { isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }

}

export const useFirestore = collection  => {  // collection  - make the function more reuseable
    const [response, dispatch] = useReducer(firestoreReducer, initialState); // response represent the state 
    const[isCanclled, setIsCanclled] = useState(false);

    //reference to collection  in our firestore database
    const ref = projectFirestore.collection(collection);


    // only dispatch if not canclled 

    const dispatchIfNotCancelled = action => {
        if(!isCanclled){
            dispatch(action)
        }
    }


    //add a document
    const addDocument  =  async doc => {
        dispatch({type: "IS_PENDING"});


        try {
            const createdAt = timestamp.fromDate(new Date ()) // this will create a new firebase timestamp
            const  addedDocument =  await ref.add({...doc, createdAt})  // the document reference 
           
           dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument})

        }
        catch(err) {
            dispatchIfNotCancelled({type: "ERROR", payload: err.message })
        }
    }

    useEffect(() => {  // will run once when the component mounts - never going to run again since it has empty dependency array
      // clean up function
      return ()  => setIsCanclled(true);

    }, []);

    return { addDocument,  response }
}