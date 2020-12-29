///////////////////////////////////////////////////////////////////////////////////////
//  CWP JS HÜ 1
//  Andreas Pilgerstorfer
//
//  This file contains the class App.js which initialises a new app with demo lists
//  and users from JSON files
//
/////////////////////////////////////////////////////////////////////////////////////////
class App {
    #Listlist;
    #userList;
    #ownId;
    #usersId;

    //constructor
    constructor() {
        this.#userList = new UserList();
        this.#Listlist = new ListList();
    }

    // init ()
    // calls the methods which read the content of the
    // JSON Files
    init(){
        this.loadFromJSONList();
        this.loadFromJSONUser()
    }

    // loadFromJSONList()
    // loads lists and articles from the JSON file lists.json
    // and creates list and article objects
    loadFromJSONList(){
        $.getJSON("shopping/Json/lists.json").then( (data) => {
            console.log(data);
            this.#ownId = data.personalId;
            for (let list of data.lists){
                let newEntry = new Liste(list);
                this.#Listlist.addList(newEntry);
            }
            this.#Listlist.printListList();
        });
    }

    // loadFromJSONUser()
    // loads users from the JSON file users.json
    // and creates user objects
    loadFromJSONUser(){
        $.getJSON("shopping/Json/users.json").then( (data) => {
            console.log(data);
            this.#usersId = data.usersId;
            for (let user of data.users){
                let newEntry = new User (user);

                this.#userList.addUser(newEntry);
            }
            this.#userList.printUserList();
        });
    }


}