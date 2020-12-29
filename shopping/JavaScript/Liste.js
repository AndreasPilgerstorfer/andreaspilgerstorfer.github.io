///////////////////////////////////////////////////////////////////////////////////////
//  CWP JS HÜ 1
//  Andreas Pilgerstorfer
//
//  This file contains a class named Liste.js which creates a list objects. A list object
//  consists of an id, a name, an article amount, a description, a created date, a desired
//  list completion date, a state (f.e taken), a total amount of articles and an articles
//  array.
//
/////////////////////////////////////////////////////////////////////////////////////////
let articleId = 1;

class Liste {

    #id;
    #name;
    #amount;
    #beschreibung;
    #erstellDatum;
    #erfuellDatum;
    #status;
    #total;
    #articles;

    //constructor
    constructor({id,name,amount, beschreibung, erstellDatum, erfuellDatum, status, articles}){
        this.#id = id;
        this.#name = name;
        this.#amount = amount;
        this.#beschreibung = beschreibung;
        this.#erstellDatum = erstellDatum;
        this.#erfuellDatum = erfuellDatum;
        this.#status = status;
        this.#total = "nicht vorhanden";
        this.#articles = [];


        if (articles == "none"){
            this.#articles = [];
        }
        else{
            for(let i = 0; i < articles.length; ++i){
                let n = articles[i].name ;
                let p = articles[i].preis ;
                let a = articles[i].Anzahl ;

                let artikel = new Artikel(articleId, n, p, a);
                this.#articles.push(artikel);
                articleId++;
            }
        }

    }

    // getter methods for all the private class variables
    get id(){
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get status(){
        return this.#status;
    }
    get beschreibung(){
        return this.#beschreibung;
    }
    get erfuellDatum(){
        return this.#erfuellDatum;
    }
    get erstellDatum(){
        return this.#erstellDatum;
    }
    get amount(){
        return this.#amount;
    }
    get total(){
        return this.#total;
    }
    get articles(){
        return this.#articles;
    }


    // setter methods for the private class variables
    // thy need a suitable parameter which represents
    // the new value of the variable.
    set status(newStatus){
        this.#status = newStatus;
    }
    set beschreibung(newBeschr){
        this.#beschreibung = newBeschr;
    }
    set name(newName){
        this.#name = newName;
    }
    set erfuellDatum(newDatErf){
        this.#erfuellDatum = newDatErf;
    }
    set erstellDatum(newDatErstell){
        this.#erstellDatum = newDatErstell;
    }
    set amount(newAmount){
        this.#amount = newAmount;
    }
    set total(newTotal){
        this.#total = newTotal;
    }

    // printList()
    // prints an list object to thtml depending
    // on th current state of the list object
    printList () {
        let statVisual;
        let statvisualNoneEdit;
        let statvisualNoneDelete;
        if (this.#status == "übernommen"){
            statVisual = "übernommen";
            statvisualNoneEdit = "hide";
            statvisualNoneDelete = "hide";
        }
        else if (this.#status == "abgeschlossen"){
            statVisual = "abgeschlossen";
            statvisualNoneEdit = "hide";
            statvisualNoneDelete = "sichtbar";
        }
        else{
            statVisual = "offen";
            statvisualNoneEdit = "sichtbar";
            statvisualNoneDelete = "sichtbar";
        }

        let list = $(`

                 <div id="${this.#id}" class="${statVisual}">
                    <h2 class="ListenName">${this.#name}</h2>
                    <p>${this.#amount} Artikel</p>
                    
                    <button class="customButton detail ">Detailansicht</button>
                    <button class="customButton edit  ${statvisualNoneEdit} ">Bearbeiten <i class="fa fa-edit"></i></button>
                    <button class="customButton hoverRed ${statvisualNoneDelete} ">Löschen <i class="fa fa-trash-o"></i></button>
                </div>
                               
        `);

        let dad = $(".grid").append(list);
    }




}