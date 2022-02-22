

class User {
    static all = []
    static usersContainer = document.getElementById("user-container")
    constructor({name, email}){
        this.name = name;
        this.email = email;
    }
}

function fetchUsers() {
    fetch(USERS_URL)
    .then(response => response.json())
    .then(users => displayUser(users));
  }
  
  

function displayUser(users) {
    users.forEach(user=> {
      signUpForm.style.display = "none"
      if (localStorage.email == user.email) {  
        localStorage.user_id = user.id
        fetchProjects()
      }
    })
  }
  

  signUpForm.addEventListener('submit', function(e){
    localStorage.name = signUpFields[0].value
    localStorage.email = signUpFields[1].value
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
          })
        })
        fetchUsers();
        logOutButton.style.display="block"
        projectFormAppear();
        
  })

  function projectFormDisappear() {
    projectForm.style.display = 'none'
  }
  
  function projectFormAppear() {
    projectForm.style.display = 'block'
  }
  
  checkForUser();
  
  
  function checkForUser() {
    if (localStorage.email) { 
        loginUser()
    } else {
      displayLogin();
    }
  }

  function loginUser(){
    signUpForm.style.display = "none"
    logOutButton.style.display="block"
    fetchUsers();
  }
  
  function logOut() {
    localStorage.clear();
    location.reload();
  }
  
  function displayLogin() {
    localStorage.clear()
    signUpForm.style.display="block";
    logOutButton.style.display="none";
  }
  
  
  





