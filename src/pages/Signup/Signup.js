import { useState } from "react";

import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState('')

  const {signup, isPending, error} = useSignup()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    signup(email, password,displayName, thumbnail)
  }

  const changeThumbnailHandler = (e) =>{
    setThumbnail(null)
    let selected = e.target.files[0]

    if (!selected) {
      setThumbnailError('Please select  a file')
      return
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('selected file must be an image')
      return
    }

    if (selected.size > 100000){
      setThumbnailError('Image file size must be less then 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Thumbnail:</span>
        <input
          type="file"
          required
          onChange={changeThumbnailHandler}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {isPending && <button className="btn" disabled>Signing up...</button>}
      {!isPending && <button className="btn">Sign up</button>}

      {error && <div className="error">{error}</div>}

    </form>
  );
}
