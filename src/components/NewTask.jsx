import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(evt) {
    // console.log(evt.target.value); it passes
    setEnteredTask(evt.target.value); //the state change problem uncontrollable input?
    //cause usetate er por "" deinai
  }
  const [errMsg, setErrMsg] = useState("");
  function handleClick() {
    if (enteredTask.trim().length === 0 || enteredTask.trim().length < 3) {
      setErrMsg("Task Cannot Be Empty & Must Be At Least 3 Charecters!!");
    } else {
      onAdd(enteredTask.trim());
      setEnteredTask("");
      setErrMsg("");
    }
  }
  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
      <p className="text-red-500 font-semibold flex items-center py-4 gap-2">
        {errMsg}
      </p>
    </>
  );
}
