const MILESTONES_URL= `${HOME_URL}/milestones`

const milestoneFields = document.querySelectorAll(".milestone-text")
const milestoneForm = document.querySelector(".milestone-form")
const projectsButton = document.querySelector(".projects-button")


class Milestone {

  static projectCard = document.querySelectorAll(".project-card")
    constructor(name, description, due_date, project_id ){
        this.name = name;
        this.description = description; 
        this.due_date = due_date;
        this.project_id = project_id;
    }

    display_card(milestone) {
      var card = document.createElement("project-card")
      console.log(milestone)
      card.innerHTML += 
      `
      <div class="project-card" id="${milestone.name}-card">
      <div class="innertext">
      <p>Click to View milestone's Milestones</p> 
      <h1> ${milestone.name} <h1> 
      <br></br>
      <h2> ${milestone.description} </h2>
      <h3>${milestone.due_date}</h3>
      <button onclick="deleteMilestone(${milestone.id})"> Delete</button>
      <br></br>
      </div>
      `
      mainContainer.appendChild(card)
        
    }

}

function fetchMilestones(id){
  fetch(`${HOME_URL}/projects/${id}/milestones`)
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones));
  localStorage.project_id = id
}

function fetchUserMilestones(id){
  fetch(`${HOME_URL}/users/${id}/milestones`)
  .then(response => response.json())
  .then(milestones => displayUserMilestones(milestones));
}

milestoneForm.addEventListener('submit', function(e){
    e.preventDefault();
    m = new Milestone(milestoneFields[0].value, milestoneFields[1].value, milestoneFields[2].value, localStorage.project_id)
    fetch(HOME_URL + "/milestones", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
        },
        body: JSON.stringify(m)
      }).then((response) => {
        console.log(response)
        fetchMilestones(localStorage.project_id);
      })
      
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
        
    }).then((response) => {
      console.log(response)
      fetchMilestones(localStorage.project_id);
    })
    
  }

  function displayMilestones(milestones){
    { projectForm.style.display="none";
      milestoneForm.reset();
      milestoneForm.style.display ="block";
      mainContainer.innerHTML = " "  
      milestones.forEach(milestone => {  
        m = new Milestone(milestone)
        m.display_card(milestone)
      })
     
    }
    milestoneForm.style.display ="block";
  }

  function displayUserMilestones(milestones) {
    { projectForm.style.display="none";
      milestoneForm.style.display="none";
      projectsButton.style.display="block"
      localStorage.removeItem("project_id")
      mainContainer.innerHTML = " "
      milestones.forEach(milestone => {  
        m = new Milestone(milestone);
        m.display_card(milestone)
    })
   
  }
 
}
