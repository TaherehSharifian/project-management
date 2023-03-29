import "./Dashboard.css";

import { useCollections } from "../../hooks/useCollections";
import ProjectList from "../../components/ProjectList/ProjectList";

export default function Dashboard() {
  const { documents, error } = useCollections("projects");

  return (
    <div>
      <h2 className="page-title">Project List</h2>
      {error && <div className="error">{error.message}</div>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}
