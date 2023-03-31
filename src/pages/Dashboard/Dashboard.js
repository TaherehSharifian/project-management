import "./Dashboard.css";

import { useCollections } from "../../hooks/useCollections";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "./ProjectFilter";

import { useState } from "react";

export default function Dashboard() {
  const { documents, error } = useCollections("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredProjects = documents
    ? documents.sort((a, b) => a.complete - b.complete) && // sorted documents from false to true
      documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;

          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              u.id === user.uid
                ? (assignedToMe = true)
                : (assignedToMe = false);
            });
            return assignedToMe;

          case "completed":
            return document.complete
            
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter;

          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Project List</h2>

      {error && <div className="error">{error.message}</div>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  );
}
