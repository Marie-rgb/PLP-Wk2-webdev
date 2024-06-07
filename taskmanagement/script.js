firebase.initializeApp({
    apiKey: "AIzaSyAOPUtV5XP_RjMR-30UN56Py0IgHJXUFiI",
    authDomain: "plp-marie-rose.firebaseapp.com",
    projectId: "plp-marie-rose",
    storageBucket: "plp-marie-rose.appspot.com",
    messagingSenderId: "327402927180",
    appId: "1:327402927180:web:e9382f7b1affd68a6a70e9",

});

const db = firebase.firestore();

//function to add tasks
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        taskInput.value = "";
        console.log("Task added.");

    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            }
        });
    });

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}
