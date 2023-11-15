import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This Project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            // wasnt working before because i put second bracket after ((task)=>'{' but it shouldhave been '(' instead since I GUESS { wasnt forcing a return statement but ( did ?
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button className="text-stone-700 hover:text-red-700">
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
