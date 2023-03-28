import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: false, error: null, success: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  //   only dispatched if not canceled
  const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  //   add doc
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
        const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt});
      dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: err.message });
    }
  };

  //   delete a doc
  const deleteDocument = async (docId) => {
    dispatch({ type: "IS_PENDING"})
    try{
      const deletedDocument = await ref.doc(docId).delete()
      dispatchIfNotCanceled({ type: "DELETED_DOCUMENT", payload: deletedDocument})
    }catch(err){
      dispatchIfNotCanceled({ type: "ERROR", payload: "Could not delete document" });
    }
  };

  //   cleanup func
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
