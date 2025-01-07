const fs = require("fs");
const readline = require("readline");
const path = require("path");

// Define the path to the JSON file relative to the script's directory
const tasksFilePath = path.join(__dirname, "tasks.json");

// Helper to save tasks to a JSON file
function saveTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Helper to load tasks from a JSON file
function loadTasksFromFile() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
  }
  return [];
}

// Validate input for task title and due date
function validateInput(title, dueDate) {
  if (!title || title.trim() === "") {
    console.error("Error: Task title cannot be empty.");
    return false;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    console.error("Error: Due date must follow the format YYYY-MM-DD.");
    return false;
  }
  return true;
}

// Display menu options
function displayMenu() {
  console.log("\n--- Task Management ---");
  console.log("1. View all tasks");
  console.log("2. Add a task");
  console.log("3. Update a task");
  console.log("4. Delete a task");
  console.log("5. Set preferences");
  console.log("6. Exit");
  console.log("-----------------------");
}

// Main application
function main() {
  let tasks = loadTasksFromFile();
  let preferences = { filter: "all" }; // Default preferences: show all tasks

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function handleInput(input) {
    switch (input.trim()) {
      case "1": // View tasks
        viewTasks(tasks, preferences.filter);
        break;
      case "2": // Add task
        rl.question("Enter task title: ", (title) => {
          rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
            if (validateInput(title, dueDate)) {
              const newTask = {
                id: tasks.length + 1,
                title,
                dueDate,
                completed: false,
              };
              tasks.push(newTask);
              saveTasksToFile(tasks);
              console.log("Task added successfully!");
            }
            displayMenu();
          });
        });
        break;
      case "3": // Update task
        rl.question("Enter task ID to update: ", (id) => {
          const task = tasks.find((t) => t.id === parseInt(id));
          if (!task) {
            console.error("Error: Task ID not found.");
          } else {
            rl.question("Enter new title: ", (newTitle) => {
              rl.question("Enter new due date (YYYY-MM-DD): ", (newDueDate) => {
                if (validateInput(newTitle, newDueDate)) {
                  task.title = newTitle;
                  task.dueDate = newDueDate;
                  saveTasksToFile(tasks);
                  console.log("Task updated successfully!");
                }
                displayMenu();
              });
            });
          }
        });
        break;
      case "4": // Delete task
        rl.question("Enter task ID to delete: ", (id) => {
          const index = tasks.findIndex((t) => t.id === parseInt(id));
          if (index === -1) {
            console.error("Error: Task ID not found.");
          } else {
            tasks.splice(index, 1);
            saveTasksToFile(tasks);
            console.log("Task deleted successfully!");
          }
          displayMenu();
        });
        break;
      case "5": // Set preferences
        rl.question(
          "Enter filter preference (all/completed/pending): ",
          (filter) => {
            if (["all", "completed", "pending"].includes(filter)) {
              preferences.filter = filter;
              console.log("Preferences updated successfully!");
            } else {
              console.error("Error: Invalid filter preference.");
            }
            displayMenu();
          }
        );
        break;
      case "6": // Exit
        console.log("Exiting application...");
        rl.close();
        return;
      default:
        console.error("Error: Invalid option. Please try again.");
        break;
    }
  }

  function viewTasks(tasks, filter) {
    console.log("\n--- Task List ---");
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    if (filteredTasks.length === 0) {
      console.log("No tasks found.");
    } else {
      filteredTasks.forEach((task) =>
        console.log(
          `ID: ${task.id}, Title: ${task.title}, Due: ${task.dueDate}, Completed: ${task.completed}`
        )
      );
    }
    displayMenu();
  }

  displayMenu();
  rl.on("line", handleInput);
}

main();
