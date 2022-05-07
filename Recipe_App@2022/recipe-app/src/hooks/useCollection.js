//the hooks is about subscribing to realtime data from a firestore collections
import { useEffect, useState, useRef} from 'react';
import { projectFirestore } from '../firebase/config';


export const  useCollection = (collection, _query, _orderBy) => {
    const[documents, setDocuments] = useState(null); // will be used to store the transaction we reterived
    const [error, setError] = useState(null);

    // if we don't use a ref---> infinite loop in useEffect
    // _query is an array and is "different" on every function call - hence we have to wrap it - using useRef ...
 const query = useRef(_query).current
 const orderBy = useRef(_orderBy).current

 // this will fire once the componet mount and also whenever the dependency changes
    useEffect(() => {
        // getting reference to the collection 
        let ref = projectFirestore.collection(collection); 

        if(query){
            ref = ref.where(...query)
        }

        if(orderBy){
            ref= ref.orderBy(...orderBy) // orderBy() method - it takes 2 argument - the property as a string we want to order by and the either the acesnding or decsending 
        }

            // setting up realtime  listener
        const unsubscribe = ref.onSnapshot(snopshot => {
            let results = [];

            snopshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id }) //doc.data() - the function we use to get the data
                    // id - represent the id of the document itself
                    // uid - represent the id of the user who add the document
            })

           // update state
           setDocuments(results);
           setError(null);

        }, (error) => {
            console.log(error);
            setError('Could not fetch the data')
        })

        //  clean up function

        return ()  => unsubscribe(); //  unsubscribe from the realtime listener when the component unmount

    }, [collection, query, orderBy])

     return { documents, error}

}