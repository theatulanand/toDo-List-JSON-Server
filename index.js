console.log(document.getElementById("checkBox").value);

let checkBox = document.getElementById("checkBox");



async function addTask() {

    let task = document.getElementById("input").value;

    let status;
    if (document.getElementById("checkBox").checked) {
        status = true;
    }else{
        status = false;
    }

    let body = {
        task,
        status
    };

    let res = await fetch(`http://localhost:3000/tasks`,{
        method: "POST",
        body: JSON.stringify(body),
        headers:{
            'Content-Type': "application/json"
        }
    });

}

async function fetchData(){
    try {
        let res = await fetch(`http://localhost:3000/tasks`);

        let data = await res.json();

        showData(data)
    } catch (error) {
        console.log("Error Is : ",error);
    }
}

async function showData(data){
    let taskBox = document.getElementById("taskBox");

    taskBox.innerHTML = "";

    data.forEach(ele => {
        let box = document.createElement("div");
        box.id = "box";

        let task = document.createElement("h3");
        task.innerText = ele.task;

        if(ele.status){
            box.style.backgroundColor = "green"
        }else{
            box.style.backgroundColor = "red"
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn";

        deleteBtn.innerText = "Delete"

        deleteBtn.addEventListener("click",async function(){
           let res =  await fetch(`http://localhost:3000/tasks/${ele.id}`,{
                method : "delete",
            });

        });

        box.append(task,deleteBtn);

        taskBox.append(box);
    });
}

fetchData();