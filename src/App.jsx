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
    tasks: [],
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
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
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
  //handling Task inside project
  function handleAddTask(text) {
    const taskId = uuidv4();

    setProjectState((prevState) => {
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectID,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
    // console.log(projectState.tasks);
  }
  //
  //task deletion
  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
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
        selectedProjectId={projectState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
