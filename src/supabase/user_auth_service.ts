
enum AuthStatus{
    NotAuth="NotAuth",
    Auth="Auth",
    SginUp="SginUp",
    Init="Init"
}
class AuthState{
    state: AuthStatus;
    currentUser: AppUser | null;
    constructor(state: AuthStatus, currentUser: AppUser | null) {
        this.state = state;
        this.currentUser = currentUser;
    }
}
class AppUser{
    id:String|null;
    email: String;
 
    firstName: String;
    lastName: String;
    gender: String;
    constructor(
        id:String|null,
        email: String, firstName: String, gender: String,lastName: String) {
        this.email = email;
        this.id = id;
        this.firstName = firstName;
        this.gender = gender;
        this.lastName = lastName;
    }
   
}

function loginViaEmailAndPassword(email:String,password:String)  {
    if (email.length == 0 || password.length == 0) {
        return false;
    }
    

}
export {AuthStatus,AuthState,loginViaEmailAndPassword}