milestoneForm.addEventListener('submit', function(e){
    e.preventDefault()
    id = localStorage.project_id
      fetch(PROJECTS_URL + "/" + id + + "/" + "milestones", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: inputFields[0].value,
            description: inputFields[1].value,
            lead_time: inputFields[2].value,
            project_id : localStorage.project_id
          })
        })  
       
  })
  
  /*signUpForm.addEventListener('submit', function(e){
    e.preventDefault()
      fetch(USERS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: signUpFields[0].value,
            email: signUpFields[1].value,
            password: signUpFields[2].value,
          })
        })
        validateUser();  
  })*/
  
  
  
  
  function displayMilestones(milestones, id){
    { console.log(id)
      localStorage.project_id = id
      milestoneForm.style.display ="block";
      mainContainer.innerHTML = " "  
      milestones.forEach(milestone => {  
         mainContainer.innerHTML += `<div class="project-card">
          
          <h1> ${milestone.name} </h1>
          <h2>${milestone.description}</h2>
          <h3>${milestone.lead_time}</h3>
          <button onclick="location.reload()"> Return to Project List</button>
          <btn>
        </div>`
      })
     
    }
    milestoneForm.style.display ="block";
    projectFormDisappear();
    
  }

  function fetchMilestones(id){
  
    fetch(HOME_URL + "/" + "projects" + "/" + id + "/" + "milestones")
    .then(response => response.json())
    .then(milestones => displayMilestones(milestones, id));
    
  }