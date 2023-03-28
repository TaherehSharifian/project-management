import { useState, useEffect } from "react";

import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
      const image = await projectStorage.ref(uploadPath).put(thumbnail);
      const imageUrl = await image.ref.getDownloadURL();

      //   add display name to user
      await response.user.updateProfile({ displayName, photoURL: imageUrl });

      // create a user document
      await projectFirestore
        .collection("users")
        .doc(response.user.uid)
        .set({ online: true, displayName: displayName, photoURL: imageUrl });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
