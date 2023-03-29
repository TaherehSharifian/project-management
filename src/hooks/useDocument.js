import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, documentId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //   real time data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(documentId);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document");
        }
      },
      (err) => {
        setError("failed to get document");
      }
    );

    return () => unsubscribe();
  }, [collection, documentId]);

  return { document, error };
};
