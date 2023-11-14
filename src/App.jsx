import React, { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import { v4 as uuidv4 } from "uuid";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectID: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null,
      };
    });
  }
  //

  function handleAddProject(projectData) {
    // const newProject={
    //   title:
    //   description:
    //   dueDate:
    // }
    const newProject = {
      ...projectData,
      id: uuidv4(),
    };
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  //
  //handleing project selection
  //
  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }
  //
  //handling project deletion in selected project
  //
  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter((project) => {
          project.id !== prevState.selectedProjectID;
        }),
      };
    });
  }
  //console.log(projectState);
  //

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectID
  );
  //
  //
  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />
  );
  if (projectState.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  //
  //for the cancel button
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }
  //
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
