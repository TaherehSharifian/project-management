import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import Avatar from "../../components/Avatar/Avatar"

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { response, updateDocument } = useFirestore("projects");

  const handleCommentForm = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      id: Math.random(),
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
    };

    await updateDocument(project.id, {
      comment: [...project.comment, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project comments</h4>

      {project.comment.length > 0 && (
        <ul>
          {project.comment.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date"></div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="add-comment" onSubmit={handleCommentForm}>
        <label>
          <span>add new comment</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
