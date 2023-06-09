import { useHistory } from "react-router-dom";

import Avatar from "../../components/Avatar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectSummary({ project }) {
  const { response, updateDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleCompleteDocument = () => {
    updateDocument(project.id, {
      complete: true,
    });
    history.push("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">
          {project.name} &nbsp;
          {project.complete && (
            <span className={project.complete === true ? "completed" : ""}>
              (completed)
            </span>
          )}
        </h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="deu-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>

        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && project.complete === false && (
        <button className="btn" onClick={handleCompleteDocument}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
