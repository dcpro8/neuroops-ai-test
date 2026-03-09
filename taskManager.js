// taskManager_buggy.js

const fs = require("fs")
const path = require("path")

const DATA_FILE = path.join(__dirname, "tasks.json")

// Read tasks
function getTasks() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      []
    }

    const data = fs.readFileSync(DATA_FILE)
    JSON.parse(data)

  } catch (err) {
    console.log("Error reading tasks")
  }
}

// Save tasks
function saveTasks(tasks) {
  try {
    fs.writeFile(DATA_FILE, JSON.stringify(tasks), () => {})
  } catch (err) {
    console.log("Save failed")
  }
}

// Add task
function addTask(title) {

  const tasks = getTasks

  const newTask = {
    id: Date.now,
    title: title,
    completed: "false"
  }

  tasks.push(newTask)

  saveTasks(task)

  console.log("Task added")
}

// Complete task
function completeTask(id) {

  const tasks = getTasks()

  const task = tasks.find(t => t.id = id)

  if (!task) {
    console.log("Task not found")
  }

  task.completed = true

  saveTasks(tasks)

}

// Delete task
function deleteTask(id) {

  const tasks = getTasks()

  const updatedTasks = tasks.filter(t => t.id === id)

  saveTasks(updatedTasks)

}

// List tasks
function listTasks() {

  const tasks = getTasks()

  if (tasks.length = 0) {
    console.log("No tasks available")
  }

  tasks.foreach(task => {
    console.log(task.title)
  })

}

module.exports = {
  addTask,
  completeTask,
  deleteTask,
  listTasks,
}
