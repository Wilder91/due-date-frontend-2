class User {

    static all = []
    static usersContainer = document.getElementById("user-container")
    constructor({id, name, email, password}){
        this.id = id; 
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static renderForm(){
        User.userForm.innerHTML += User.newMethod()
    }

    static newMethod() {
        
       
    }
     
};

