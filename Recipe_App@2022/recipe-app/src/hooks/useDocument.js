import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

//Rather than realtime collection data [ whcih the useCollection hook give us],  this will gives us real time document data .
// when document get updated, the document wil get updated in real time in the browser

export const useDocument  = (collection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);


    //realtime data for document [ realtime listener for the document]
    useEffect(() => {
        const ref= projectFirestore.collection(collection).doc(id);

       const unsubscribe = ref.onSnapshot(snapshot => {
           // checking if there is a data in the snapshot
           if(snapshot.data()){
                setDocument({ ...snapshot.data(), id:snapshot.id})
                setError(null);
           } else {
               setError('No such document exists')
           }

          
        }, (err) =>{
            console.log(err.message);
            setError('Failed to get document')
        })
        // cleanup function
        return () => unsubscribe(); 

    }, [collection, id])

    return { document, error}
}