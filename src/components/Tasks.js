import Task from "./Task"
const Tasks = ({task, onDelete, onToggle}) => {
    return (
        <>
           {task.map(task => (<Task onToggle={onToggle} key={task.id} task={task} onDelete={onDelete}/>))} 
        </>
    )
}

export default Tasks
