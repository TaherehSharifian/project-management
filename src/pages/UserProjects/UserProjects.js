import "./UserProjects.css";

import { useCollections } from "../../hooks/useCollections";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectList from "../../components/ProjectList/ProjectList";

export default function UserProjects() {
  const { user } = useAuthContext();
  const { documents, error } = useCollections("projects", [
    "createdBy.id",
    "==",
    user.uid,
  ]);


  return (
    <div>
      <h2 className="page-title">{user.displayName} Projects ({documents && documents.length})</h2>
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}
