///////////////////////////////////////////////////////////////////////////////////////
//  CWP JS HÜ 1
//  Andreas Pilgerstorfer
//
//  This file contains the class Artikel.js which creates a new Artikel Object.
//  An Artikel Object contains an id, a name, a price and an amount
//
/////////////////////////////////////////////////////////////////////////////////////////
class Artikel {

    // private attributes
    #id;
    #name;
    #preis;
    #anzahl;

    // constructor
    constructor( id, name, preis, anzahl ) {
        this.#id = id;
        this.#name = name;
        this.#preis= preis;
        this.#anzahl = anzahl;
    }

    //getter methods for all the private class variables
    get name(){
        return this.#name;
    }
    get anzahl(){
        return this.#anzahl;
    }
    get preis(){
        return this.#preis;
    }
    get id(){
        return this.#id;
    }

    // setter methods for all the private class variables
    // parameter: needs an replacement value to operate
    //            which replaces the existing value
    set name(newName){
        this.#name = newName;
    }
    set anzahl(newAmount){
        this.#anzahl = newAmount;
    }
    set preis(newPrice){
        this.#preis = newPrice;
    }
    set id(newId){
        this.#preis = newId;
    }

    // printArticle()
    // prints an article object to HTML and puts it into
    // the assigned place in the frontend
    printArticle(){
            let article = $(`
                 <div class="list-item" id="${this.#id}">
                        <p> <span class="boldText"> Name: </span> ${this.#name} <span class="boldText"> Preis: </span>  ${this.#preis} <span class="boldText"> Anzahl: </span> ${this.#anzahl} </p>
                        <span>
                            <button class="articleDeleteButton" > Artikel löschen  <i class="fa fa-trash-o"></i></button>
                        </span>
                 </div>               
        `);
        let dad = $(".articles").append(article);
    }

}