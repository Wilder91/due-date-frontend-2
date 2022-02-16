const MILESTONES_URL= `${HOME_URL}/milestones`

const milestoneFields = document.querySelectorAll(".milestone-text")
const milestoneForm = document.querySelector(".milestone-form")

milestoneForm.style.display ="none";
class Milestone {
    constructor(name, kind, due_date){
        this.name = name;
        this.kind = kind; 
        this.due_date = due_date;
    }
}

milestoneForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch(HOME_URL + "/milestones", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
          },
          body: JSON.stringify({
            name: milestoneFields[0].value,
            description: milestoneFields[1].value,
            lead_time: milestoneFields[2].value,
            project_id: localStorage.project_id,
          })
        })  
        fetchMilestones(localStorage.project_id);
        
  })

  function deleteMilestone(id){ 
    fetch(MILESTONES_URL + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
        })
        
    })
    fetchMilestones(localStorage.project_id);
  }

  function displayMilestones(milestones){
    { 
      milestoneForm.reset();
      milestoneForm.style.display ="block";
      mainContainer.innerHTML = " "  
      milestones.forEach(milestone => {  
        
        if (milestone.project_id == localStorage.project_id) {
        console.log(`lsproj is ${localStorage.project_id}`)
        console.log(`other one is ${milestone.project_id}`)
         mainContainer.innerHTML += 
         
         `<div class="project-card">
          <h1> ${milestone.name} </h1>
          <h2>${milestone.description}</h2>
          <h3>${milestone.due_date}</h3>
          <button onclick="deleteMilestone(${milestone.id})">Delete</button>
          <btn>
          </div>`
        }
      })
     
    }
    milestoneForm.style.display ="block";
    projectFormDisappear();
    
  }

  function fetchMilestones(id){
    fetch(`${HOME_URL}/milestones`)
    .then(response => response.json())
    .then(milestones => displayMilestones(milestones));
    localStorage.project_id = id
  }