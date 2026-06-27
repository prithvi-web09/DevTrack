gsap.to(".rocket", {
    y: 40,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

let pbtn = document.querySelector(".add-btn")
let modal1 = document.querySelector(".modal")
let page1 = document.querySelector("#page1")
let page2 = document.querySelector("#page2")
let page3 = document.querySelector("#page3")
let page4 = document.querySelector("#page4")
let cross = document.querySelector("#cross")

// force correct initial state — only page1 visible
page2.style.display = "none"
page3.style.display = "none"
page4.style.display = "none"

pbtn.addEventListener("click", function(){
    page2.style.display = "none"
    modal1.style.display = "flex";
})

cross.addEventListener("click", function(){
    page2.style.display = "block"
    modal1.style.display = "none";
})

// ── STUDY DURATION COUNTER ──
let studyMinus = document.querySelector("#studyMinus")
let studyAdd = document.querySelector("#studyAdd")
let studyCount = document.querySelector("#studyCount")
let counts = document.querySelector(".counts") // dashboard display on page1

let studyValue = Number(localStorage.getItem("studyHours")) || 0;
studyCount.textContent = studyValue
counts.textContent = studyValue

studyMinus.addEventListener("click", function(){
    if (studyValue > 0) {
        studyValue = studyValue - 0.5
    }
    studyCount.textContent = studyValue
    counts.textContent = studyValue
    localStorage.setItem("studyHours", studyValue)
})

studyAdd.addEventListener("click", function(){
    studyValue = studyValue + 0.5
    studyCount.textContent = studyValue
    counts.textContent = studyValue
    localStorage.setItem("studyHours", studyValue)
})

// ── MOOD SELECTOR ──
let moods = document.querySelectorAll(".mood-box");

moods.forEach(function(mood){
    mood.addEventListener("click", function(){
        moods.forEach(function(item){
            item.classList.remove("active");
        });
        mood.classList.add("active");
    });
});

// ── TASK CARDS (with localStorage persistence) ──
let taskContainer = document.querySelector(".task-contain")
let createTaskBtn = document.querySelector("#createTask");
let taskInput = document.querySelector("#taskInput");
let descInput = document.querySelector("#Description");

function saveTasks() {
    const allTasks = [];
    document.querySelectorAll(".task").forEach((taskEl) => {
        allTasks.push({
            title: taskEl.querySelector(".task-text h2").textContent,
            desc: taskEl.querySelector(".task-text p").textContent,
            count: taskEl.querySelector(".count").textContent
        });
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
     updateDashboardPreview();
}

function createTaskCard(title, desc, startCount = 0) {
    const newTask = document.createElement("div")
    newTask.classList.add("task");

    newTask.innerHTML = `
        <button class="task-delete">
            <i class="ri-delete-bin-line"></i>
        </button>
        <div class="task-header">
            <div class="task-icon">
                <i class="ri-code-s-slash-line"></i>
            </div>
            <div class="task-text">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
        </div>
        <div class="counter">
            <button class="minus"><i class="ri-subtract-line"></i></button>
            <div class="count">${startCount}</div>
            <button class="add"><i class="ri-add-line"></i></button>
        </div>
    `;

    taskContainer.appendChild(newTask);

    const minusBtn = newTask.querySelector(".minus")
    const addBtn = newTask.querySelector(".add")
    const countDisplay = newTask.querySelector(".count")
    const deleteBtn = newTask.querySelector(".task-delete")
    let cardValue = Number(startCount);

    minusBtn.addEventListener("click", () => {
        if (cardValue > 0) cardValue -= 0.5;
        countDisplay.textContent = cardValue;
        saveTasks();
    });

    addBtn.addEventListener("click", () => {
        cardValue += 0.5;
        countDisplay.textContent = cardValue;
        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        gsap.to(newTask, {
            opacity: 0,
            x: 50,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                newTask.remove();
                saveTasks();
            }
        });
    });
}

createTaskBtn.addEventListener("click", function(){
    const titleValue = taskInput.value.trim()
    const descValue = descInput.value.trim()

    if (titleValue == "") {
        alert("Please enter the field")
        return
    }

    createTaskCard(titleValue, descValue || "No description added", 0);
    saveTasks();

    taskInput.value = "";
    descInput.value = "";
    modal1.style.display = "none";
    page2.style.display = "block";
})

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        createTaskCard(task.title, task.desc, task.count);
    });
    updateDashboardPreview();
});
function updateDashboardPreview() {
    const tasks = document.querySelectorAll(".task");
    const dsaTitle = document.querySelector(".dsa h3:first-of-type");
    const dsaCount = document.querySelector(".dsa h3:last-of-type");

    if (tasks.length > 0) {
        const firstTask = tasks[0];
        const firstTitle = firstTask.querySelector(".task-text h2").textContent;
        const firstCount = firstTask.querySelector(".count").textContent;

        dsaTitle.textContent = firstTitle;
        dsaCount.textContent = firstCount;
    } else {
        // No tasks yet — show default placeholder text
        dsaTitle.textContent = "DSA Solved";
        dsaCount.textContent = "0";
    }
}
const dsaTitle = document.querySelector(".dsa h3:nth-of-type(1)");
const dsaCount = document.querySelector(".dsa h3:nth-of-type(2)");

// ── NAV BUTTONS ──
let downNavBtns = document.querySelectorAll(".down-nav button");

downNavBtns[0].addEventListener("click", function(){
    page1.style.display="block"
    page2.style.display="none"
    page3.style.display="none"
    page4.style.display="none"
})
downNavBtns[1].addEventListener("click", function(){
    page1.style.display="none"
    page2.style.display="block"
    page3.style.display="none"
    page4.style.display="none"
})
downNavBtns[2].addEventListener("click", function(){
    page1.style.display="none"
    page2.style.display="none"
    page3.style.display="block"
    page4.style.display="none"
})
downNavBtns[3].addEventListener("click", function(){
    page1.style.display="none"
    page2.style.display="none"
    page3.style.display="none"
    page4.style.display="block"
})


let done = document.querySelector("#done");
let input = document.querySelector("#skill-name");
let newSkill = document.querySelector(".skill-container");
let newSkills = document.querySelector(".skills-container");
let count = document.querySelector("#count")
let skillsCompleted = Number(localStorage.getItem("skillsCompleted")) || 0;
count.textContent = skillsCompleted;


function saveSkills() {
    const skills = [...newSkill.querySelectorAll(".new-skill")].map(card => ({
        name: card.querySelector("h3").textContent,
        value: card.querySelector(".mastery-slider").value
    }));
    localStorage.setItem("skills", JSON.stringify(skills));
}

function createSkillCard(skillName, value = 0) {
    const card = document.createElement("div");
    card.classList.add("new-skill");
    card.innerHTML = `
        <h3>${skillName}</h3>
        <h5>Current Mastery Level</h5>
        <span class="percentage">${value}%</span>
        <input type="range" min="0" max="100" value="${value}" class="mastery-slider">
        <div class="mastery-labels">
            <span>Novice</span>
            <span>Expert</span>
        </div>
    `;
    newSkill.appendChild(card);

    const cards = document.createElement("div");
    cards.classList.add("skills-comp");
    cards.innerHTML = `
        <h2>${skillName}</h2>
        <span class="percent">${value}%</span>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
    `;
    newSkills.appendChild(cards);

    const cardSlider = card.querySelector(".mastery-slider");
    const cardPercentage = card.querySelector(".percentage");
    const fill = cards.querySelector(".progress-fill");
    const cardPercent = cards.querySelector(".percent");


    fill.style.width = value + "%";

    cardSlider.addEventListener("input", () => {
        cardPercentage.textContent = cardSlider.value + "%";
        fill.style.width = cardSlider.value + "%";
        cardPercent.textContent = cardSlider.value + "%";
        
        saveSkills();
         if (Number(cardSlider.value) === 100) {
        gsap.to([card, cards], {
            opacity: 0,
            x: 50,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
            card.remove();
            cards.remove();
            saveSkills();
            skillsCompleted++;
            localStorage.setItem("skillsCompleted", skillsCompleted);
            count.textContent = skillsCompleted;
            }
        });
    }

    });
}

done.addEventListener("click", function(){
    let skillName = input.value.trim();
    if (skillName === "") return;
    createSkillCard(skillName);
    saveSkills();
    input.value = "";
});
JSON.parse(localStorage.getItem("skills") || "[]")
    .forEach(skill => createSkillCard(skill.name, skill.value));


let createProject = document.querySelector("#create-project")
let projectContainer = document.querySelector(".project-container")
let projectsCount = document.querySelector("#projectsCount")
let projectsCompleted = Number(localStorage.getItem("projectsCompleted")) || 0;
projectsCount.textContent = projectsCompleted;

function saveProjects() {
    const projects = [...projectContainer.querySelectorAll(".project-card")].map(card => ({
        name: card.querySelector("h1").textContent,
        desc: card.querySelector("p").textContent,
        link: card.querySelector(".github-btn").getAttribute("data-link"),
        status: card.querySelector("select").value
    }));
    localStorage.setItem("projects", JSON.stringify(projects));
}

function createProjectCard(projectName, projDesc, githubLink, status = "") {
    const projectCard = document.createElement("div")
    projectCard.classList.add("project-card")
    projectCard.innerHTML = `
    <div id="project-card">
        <h1>${projectName}</h1>
        <select class="selection">
            <option disabled ${status === "" ? "selected" : ""}>Choose your Stautus</option>
            <option value="100%" ${status === "100%" ? "selected" : ""}>100% Completed</option>
            <option value="progress" ${status === "progress" ? "selected" : ""}>In Progress</option>
            <option value="Yet" ${status === "Yet" ? "selected" : ""}>Yet to start</option>
        </select>
        <p>${projDesc}</p>
        <button class="github-btn" data-link="${githubLink}">
            View on GitHub
        </button>
    </div> 
    `
    projectContainer.appendChild(projectCard)

    const statusSelect = projectCard.querySelector("select");
    let prevStatus = status;

    projectCard.querySelector(".github-btn").addEventListener("click", () => {
        window.open(githubLink, "_blank")
    })

    statusSelect.addEventListener("change", () => {
        if (statusSelect.value === "100%" && prevStatus !== "100%") {
            projectsCompleted++;
        } else if (statusSelect.value !== "100%" && prevStatus === "100%") {
            projectsCompleted--;
        }
        prevStatus = statusSelect.value;
        localStorage.setItem("projectsCompleted", projectsCompleted);
        projectsCount.textContent = projectsCompleted;
        saveProjects();
    });
}

createProject.addEventListener("click", function(){
    let projectName = document.querySelector("#project-name").value;
    let projDesc = document.querySelector("#project-descript").value;
    let githubLink = document.querySelector("#link").value;

    createProjectCard(projectName, projDesc, githubLink);
    saveProjects();
});

// load saved projects on page load
JSON.parse(localStorage.getItem("projects") || "[]")
    .forEach(p => createProjectCard(p.name, p.desc, p.link, p.status));
