import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollections = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update states
        results.sort((a, b) => a.complete - b.complete); // sorted documents from false to true
        setDocuments(results);
        setError(null);
      },
      (error) => {
        setError("Could not fetch documents");
      }
    );

    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error };
};
