///////////////////////////////////////////////////////////////////////////////////////
//  CWP JS HÜ 1
//  Andreas Pilgerstorfer
//
//  This file contains the a class UserList which manages all the User object.
//
/////////////////////////////////////////////////////////////////////////////////////////

class UserList {

    #userList;

    //constructor
    constructor() {
        this.#userList = new Map();
    }

    //addUser(user)
    // adds an user into the list of users
    // input parameter: user object
    addUser(user){
        this.#userList.set(user.id, user);
    }

    // getUserById(userId)
    // returns a User from the list of users
    // input parameter: identifier
    // return: the matching user object
    getUserById(userId){
        return this.#userList.get(Number(userId));
    }


    // printUserList()
    // prints the entire user list to html by calling
    // the individual print methods
    printUserList(){

        $("#user").empty();
        $(".alertEdit").addClass("hide");

        console.log(this.#userList.values());
        for (let user of this.#userList.values()){

            user.printUser();
        }
    }


}