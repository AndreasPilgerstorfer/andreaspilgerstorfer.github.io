///////////////////////////////////////////////////////////////////////////////////////
//  CWP JS HÜ 1
//  Andreas Pilgerstorfer
//
//  This file contains a class named ListList which manages all the list objects and
//  deals with all the clickhandlers from the various amount of buttons from the
//  entire application.
//
/////////////////////////////////////////////////////////////////////////////////////////
let init = true; let initDetail = true; let addart = true; let hilfe = true; let c=true;
let counter = 7; let artcounter = 50;
let clickcounter = 0; let artClickcounter = 0;
let liste;


class ListList {

    #listlist;
    #rolle;
    #username;

    //constructor
    constructor() {
        // Map weil man häufig nach der Id suchen muss
        this.#listlist = new Map();
    }

    // addList
    // adds a List Object into the list of lists
    // input parameter: list object
    addList(list){
        this.#listlist.set(list.id, list);
    }

    // getListById(listId)
    // returns a List from the list of lists
    // input parameter: list identifier
    // return: the matching listobject
    getListById(listId){
        return this.#listlist.get(listId);
    }

    //removeList(id)
    // deletes a list object from the list
    // input parameter: list identifier
    removeList(id){
        this.#listlist.delete(Number(id));
    }

    // printListList()
    // prints the list-list by calling the individual print-method
    // it also changes the view (seeker/helper) and initialises
    // all the clickhandler for the listview
    printListList(){

        $(".grid").empty();
        $(".alertEdit").addClass("hide");
        $(".toggleView").removeClass("hide");


        for (let list of this.#listlist.values()){
            list.printList();
        }

        // change appearance depending on the current role
        //change seeker
        if(this.#rolle == "seeker"){
            for (let list of this.#listlist.values()){
                if (list.name != this.#username) {
                    let identifier = list.id;
                    $('#' +identifier).addClass("hide");
                }
            }
        }
        // change helper
        if(this.#rolle == "helper"){
            for (let list of this.#listlist.values()){
                    let identifier = list.id;
                    $('#' +identifier).find(".edit").addClass("hide");
                    $('#' +identifier).find(".hoverRed").addClass("hide");
            }
        }


        this.editListviewClickHandler();
        this.alertDetailClickHandler();
        this.addListClickHandler();

        if(init){
            this.detailClickHandler();
            this.deleteClickHandler();
            this.hilfeSuchenderClickHandler();
            this.hilfeLeistendClickHandler();

            init = false;
        }
    }

    //addListClickHandler()
    // shows the popup Window if someone clicks
    // on the Button add new List
    addListClickHandler(){

        $(document).on("click", ".addList" , (e)=> {
            clickcounter = 0;

            $(".alertEdit").addClass("hide");
            $(".alertAddList").removeClass("hide");
            $(".beschrAddError").addClass("hide");
            $(".datAddError").addClass("hide");
            $(".datErrorpastList").addClass("hide");

            if (hilfe){
                this.addNewList();
                hilfe = false;
            }

        });
    }

    //addNewList()
    // adds a new list to the list of lists by
    // reading the user input from the add new list
    // form. The given input gets validated and if the
    // input is corrected, the new list gets created
    addNewList(){

          $(document).on("click", ".adder" , (e)=> {

            let id= counter;
            counter ++;

            let name = this.#username;
            let amount = 0;

            let beschreibung = $("#beschr").val();
            if ((!isNaN(beschreibung) || beschreibung=="" || beschreibung.length <3)){
                $(".beschrAddError").removeClass("hide");
                $(".datAddError").addClass("hide");
                $(".datErrorpastList").addClass("hide");

                return;
            }

            //current date
            let curDat = new Date();
            let Tag = curDat.getDay() ;
            let Monat = curDat.getMonth() +1;
            let Jahr = curDat.getFullYear();
            let erstellDatum = Tag + "." + Monat +"." + Jahr ;
            console.log(Tag);

            // validate Date
            // Date-Picker
            let date = new Date ($('#dat').val());
            let datetime = date.getTime();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if ( isNaN(day) || isNaN(month)|| isNaN(year)){
                alert("Es wurde kein korrektes Datum eingegeben !");
                $(".beschrAddError").addClass("hide");
                $(".datAddError").removeClass("hide");
                $(".datErrorpastList").addClass("hide");
                return;
            }
            let time = curDat.getTime();

            if (datetime <= time){
                $(".beschrAddError").addClass("hide");
                $(".datAddError").addClass("hide");
                $(".datErrorpastList").removeClass("hide");
                return;
            }

            let erfuellDatum = day + "." + month +"." + year ;
            let status = "offen";
            let articles = "none";

            let data = {id,name,amount, beschreibung, erstellDatum, erfuellDatum, status, articles};

              if (clickcounter == 0){
                let newList =  new Liste (data) ;
                this.addList(newList);
                clickcounter ++;
            }

            $(".alertAddList").addClass("hide");
            this.printListList();

        });

    }

    //hilfeSuchenderClickHandler()
    // changes the current role and the view
    // of the application to the helper mode
    // which disables certain functionality and
    // only shows the lists that the current user
    // has created.
    hilfeSuchenderClickHandler(){
        $(document).on("click", ".Hilfesuchend" , (e)=> {

            this.#rolle = "seeker";

            // change Button Color
            $(".Hilfesuchend").css( "background-color", "honeydew");
            $(".Hilfeleistend").css( "background-color", "white");

            // get username
            this.#username = $("#user").children("option:selected").val();

            //update view
            this.printListList();

        });
    }

    //hilfeLeistendClickHandler()
    // changes the current role and the view
    // of the application to the seeker mode
    // which disables certain functionality and
    // allows the user to take and complete
    // lists from users which are seeking help
    hilfeLeistendClickHandler(){
        $(document).on("click", ".Hilfeleistend" , (e)=> {

            this.#rolle = "helper";

            // change Button Color
            $(".Hilfesuchend").css( "background-color", "white");
            $(".Hilfeleistend").css( "background-color", "honeydew");

            // get username
            this.#username = $("#user").children("option:selected").val();

            //update view
            this.printListList();

        });
    }

    //deleteClickHandler()
    // deletes the list which gets clicked on after
    // the users confirm a message that he really wants
    // to delete this list
    deleteClickHandler(){
        $(document).on("click", ".hoverRed" , (e)=> {
            let id = $(e.currentTarget).parent().attr('id');

            if (confirm('Möchtest du die Liste wirklich löschen')) {

                $(".grid").empty();

                this.removeList(id);
                this.printListList();
            }

        });
    }


    // editListviewClickHandler()
    // shows popup window which allows the user
    // to change the name of the list

    editListviewClickHandler(){
        $(document).on("click", ".edit" , (e)=> {
            let id = $(e.currentTarget).parent().attr('id');
            liste = this.getListById(Number(id));

            // show popup Fenster
            $(".alertErrorEditList").addClass("hide");
            $(".alertEdit").removeClass("hide");
            $(".editname").text(liste.name);


           this.changeNameList();
        });
    }


    //changeName()
    // reads the input from the form, validates
    // it and if tit is validate the name of th list gets
    // changed.
    changeNameList(){

        $(document).on("click", ".confirm" , (e)=> {

            //read and validate input
            let input =  $("#changeName").val();

            if (!isNaN(input) || input=="" || input.length <3){
                $(".alertErrorEditList").removeClass("hide");
            }
            else{
                liste.name = input;
                this.printListList();
            }

        });

    }


    //detailClickHandler()
    // switches from the list view to the detailview
    // of the list and creates all the clickhandler
    // for the detailview
    detailClickHandler(){

        $(document).on("click", ".detail" , (e)=> {
            e.stopImmediatePropagation();

            let id = $(e.currentTarget).parent().attr('id');
            liste = this.getListById(Number(id));

            $(".normal").addClass("hide");
            $(".detailview").removeClass("hide");

            $(".toggleView").addClass("hide");

            $(".alertErrorStat").addClass("hide");
            $(".alertSucc").addClass("hide");
            $(".alertError").addClass("hide");
            $(".alertSuccTaken").addClass("hide");
            $(".alertDetailEdit").addClass("hide");

            this.initDetailView(liste);

            //clickhandler detailview
            this.takeListeDetailClickHandler();
            this.alertDetailClickHandler();
            this.editDetailviewClickHandler();

            if(initDetail){
                this.abschickenListeDetailClickHandler();
                this.addArtikelClickhandler();
                this.deleteListeDetailClickHandler();
                this.detailViewBackClickHandler();
                this.deleteArtikelDetailClickHandler();
                initDetail = false;
            }

        });
    }

    //initDetailView()
    // customises the view of the detailview depending
    // on the current role (seeker/helper) and on the
    // list which was clicked on. It displays the
    // meta data (description, ...) and also the
    // articles from the current list
    initDetailView(){
        console.log(liste);

        $(".beschreibung").text(liste.beschreibung);
        $(".status").text(liste.status);
        $(".amount").text(liste.amount);
        $(".erstDat").text(liste.erstellDatum);
        $(".erfullDat").text(liste.erfuellDatum);
        $(".nametag").text(liste.name);

        if(liste.status == "übernommen"){
            $(".takeover").hide();
            $(".detailEdit").hide();
            $(".detailDelete").hide();
            $(".detailAdd").hide();
        }
        else if(liste.status == "abgeschlossen"){
            $(".takeover").hide();
            $(".detailEdit").hide();
            $(".detailDelete").hide();
            $(".detailAdd").hide();
            $("#total").hide();
            $(".sendIt").hide();
            $(".end .bold").text("Gesamtpreis: " +liste.total +" Euro");
        }
        else{
            $(".takeover").show();
            $(".detailEdit").show();
            $(".detailDelete").show();
            $(".detailAdd").show();
            $("#total").show();
            $(".sendIt").show();
            $(".end .bold").text("Gesamtpreis: * ");
            $(".alertError").addClass("hide");
            $(".alertErrorStat").addClass("hide");
            $(".alertSucc").addClass("hide");
            $(".alertSuccTaken").addClass("hide");
            $(".alertDetailEdit").addClass("hide");
        }
        // changing appearance depending on the role
        //change seeker
        if(this.#rolle == "seeker"){
            $(".takeover").hide();
            $(".sendIt").hide();
            $("#total").hide();
            $(".end .bold").hide();
            if (liste.status == "abgeschlossen") {

            }
        }
        // change helper
        if(this.#rolle == "helper"){
            $(".detailEdit").hide();
            $(".detailDelete").hide();
            $(".detailAdd").hide();
            $(".takeover").show();
            if (liste.status == "übernommen"){   $(".takeover").hide();  }
            $(".sendIt").show();
            $("#total").show();
            if (liste.status == "abgeschlossen") {
                $(".sendIt").hide();
                $("#total").hide();
                $(".takeover").hide();
                if(c){
                    let p = $(` <h3> Gesamtpreis: ${liste.total} Euro</h3>` );
                    $('#' + liste.id +".space").append(p);
                    c = false;
                }
            }
        }

        this.printArticleList(liste);
    }

    //printArticleList()
    // displays the article list in the detailview mode
    // depending on the articles array from the currently
    // clicked list object
    printArticleList(){
        $(".articles").empty();

        for (let article of liste.articles){
            article.printArticle();
        }

        if(this.#rolle == "helper") {
            $(".articleDeleteButton").addClass("hide");
        }

    }

    //detailViewBackClickHandler()
    // allows the user to change from detailview
    // back to listview
    detailViewBackClickHandler(){

            $(".detailview .centerBorder .customButton").unbind().click((e)=> {
                e.preventDefault();
                e.stopImmediatePropagation();

            $(".normal").removeClass("hide");
            $(".detailview").addClass("hide");

            $(".grid").empty();
             this.printListList();
            console.log(this);
        });
    }

    //alertDetailClickHandler()
    // allows the user to hide an alert error meesage
    // by clicking on the small cross in the right hand
    // upper corner of the error message
    alertDetailClickHandler(){
        $(document).on("click", ".closebtn" , (e)=> {
            $(".alertErrorStat").addClass("hide");
            $(".alertSucc").addClass("hide");
            $(".alertError").addClass("hide");
            $(".alertSuccTaken").addClass("hide");
            $(".alertEdit").addClass("hide");
            $(".alertDetailEdit").addClass("hide");
            $(".nameError").addClass("hide");
            $(".beschrError").addClass("hide");
            $(".datError").addClass("hide");
            $(".alertAddEdit").addClass("hide");
            $(".alertAddArtikel").addClass("hide");
        });
    }

    //addArtikelClickhandler()
    // allows the user to add an article in detailview
    // Therefore a popup window gets displayed
    addArtikelClickhandler(){

        $(document).on("click", ".detailAdd" , (e)=> {
            e.preventDefault();
            artClickcounter = 0;

            //show popup window
            $(".alertAddArtikel").removeClass("hide");

            //delete former Errors
            $(".artNameAddError").addClass("hide");
            $(".artPreisAddError").addClass("hide");
            $(".artAnzahlAddError").addClass("hide");
            $(".alertDetailEdit").addClass("hide");


            if(addart){
                this.confirmNewAddArtikelClickHandler() ;
                addart = false;
            }

        });
    }

    //confirmNewAddArtikelClickHandler()
    // adds a new article if the users fills out
    // the from corectly. The method validates
    // the form and if it is correct a new article gets
    // created and added to the articles array of the
    // current list
    confirmNewAddArtikelClickHandler(){
        $(".adder").unbind().click( (e)=> {

            $(".artNameAddError").addClass("hide");
            $(".artPreisAddError").addClass("hide");
            $(".artAnzahlAddError").addClass("hide");
            e.preventDefault();

            //read forms
            let name = $("#artName").val();
            let preis = $("#preis").val();
            let artikelAnzahl = $("#anzahl").val();


            // validate forms
            // name
            if ((!isNaN(name) || name=="" || name.length <2)){
                $(".artNameAddError").removeClass("hide");
                $(".artPreisAddError").addClass("hide");
                $(".artAnzahlAddError").addClass("hide");
                return;
            }
            // preis
            else if ( preis=="" || preis.length <1){
                $(".artNameAddError").addClass("hide");
                $(".artPreisAddError").removeClass("hide");
                $(".artAnzahlAddError").addClass("hide");
                return;
            }
            // artikel
            else if ( artikelAnzahl=="" || artikelAnzahl.length <1) {
                $(".artNameAddError").addClass("hide");
                $(".artPreisAddError").addClass("hide");
                $(".artAnzahlAddError").removeClass("hide");
                return;
            }
            else{
                // create Artikel
                if (artClickcounter == 0){
                    let artikel = new Artikel(artcounter, name, preis, artikelAnzahl );
                    artClickcounter ++;
                    artcounter ++;
                    console.log(artikel);

                    // push in Array
                    liste.articles.push(artikel);

                    //update amount
                    let oldAmount = liste.amount;
                    liste.amount = Number(oldAmount)+ Number(1);
                    console.log(liste);

                    //print to html
                    $(".alertAddArtikel").addClass("hide");
                }
                this.initDetailView(liste);
            }
        });
    }

    //takeListeDetailClickHandler()
    // allows the user to to take a list for himself
    // the state of th list gets changed to taken
    takeListeDetailClickHandler(){

        $(document).on("click", ".takeover" , (e)=> {
            e.preventDefault();
            e.stopPropagation();

            liste.status = "übernommen" ;

            this.initDetailView(liste);

            $(".alertSuccTaken").removeClass("hide");
            console.log(this);
        });

    }

    //abschickenListeDetailClickHandler()
    // validates the form from the total amount
    // and if the amount is in a coorect form
    // the state of the list gets changed to completed
    abschickenListeDetailClickHandler(){

        $(document).on("click", ".sendIt" , (e)=> {
            e.preventDefault();
            $(".alertErrorStat").addClass("hide");
            $(".alertSucc").addClass("hide");
            $(".alertError").addClass("hide");
            $(".alertSuccTaken").addClass("hide");
            $(".alertDetailEdit").addClass("hide");

            let preis = $("#total").val();
            console.log(liste);

            // check status
            if( liste.status != "übernommen" ){
                $(".alertErrorStat").removeClass("hide");
                $(".alertSucc").addClass("hide");
                $(".alertError").addClass("hide");
                $(".alertSuccTaken").addClass("hide");
                $(".alertDetailEdit").addClass("hide");
                return;
            }

            // validate form
            let check = true;
            for (let curr of preis){
                if (isNaN(curr)){
                    if (curr != ","){
                        check = false;
                    }
                }
            }
            // Leerer String
            if (preis == ""){
                check = false;
            }

            // Eingabe passt
            if (check){
                console.log(liste.status);

                liste.status = "abgeschlossen";

                // update Total
                liste.total = preis;

                // Confirm Message
                $(".alertSucc").removeClass("hide");
                $(".alertError").addClass("hide");
                $(".alertErrorStat").addClass("hide");
                $(".alertSuccTaken").addClass("hide");
                $(".alertEdit").addClass("hide");
                $(".alertDetailEdit").addClass("hide");

                this.initDetailView();
            }
            // Eingabe ist nicht ok
            else{
                $(".alertError").removeClass("hide");
                $(".alertErrorStat").addClass("hide");
                $(".alertSucc").addClass("hide");
                $(".alertSuccTaken").addClass("hide");
                $(".alertDetailEdit").addClass("hide");
            }
        });

    }

    //deleteListeDetailClickHandler()
    // allow the user to delete the current list in
    // detailview mode after answering a control
    // question
    deleteListeDetailClickHandler(){
        $(document).on("click", ".detailDelete" , (e)=> {
            let id = liste.id;

            if (confirm('Möchtest du die Liste wirklich löschen ?')) {

                this.removeList(id);
                $(".normal").removeClass("hide");
                $(".detailview").addClass("hide");

                $(".grid").empty();
                this.printListList();
            }
        });
    }

    //deleteArtikelDetailClickHandler()
    // allow the user to delete the clicked on article in
    // detailview mode after answering a control
    // question
    deleteArtikelDetailClickHandler(){
        $(document).on("click", ".articleDeleteButton" , (e)=> {
            let id = liste.id;

            if (confirm('Möchtest du diesen Artikel wirklich löschen ?')) {


                let currArtikelId = $(e.currentTarget).parent().parent().attr('id');
                console.log(currArtikelId);

                let index = 0;
                for (let curr of liste.articles){
                    if (curr.id == currArtikelId ){
                        liste.articles.splice(index, 1);
                        console.log(this.#listlist);
                        let oldAmount = liste.amount;
                        liste.amount = oldAmount-1;
                        this.initDetailView();
                    }
                    else{
                        index++;
                    }
                }
            }
        });
    }

    // editDetailviewClickHandler()
    // shows a popup window where the user can edit the
    // metadata (name, description ...) of th current list
    // in detailview mode
    editDetailviewClickHandler(){
        $(document).on("click", ".detailEdit" , (e) => {

            //hide former Errors
            $(".nameError").addClass("hide");
            $(".beschrError").addClass("hide");
            $(".datError").addClass("hide");
            $(".datErrorpast").addClass("hide");
            $(".alertAddArtikel").addClass("hide");

            // show popup Fenster
            $(".alertDetailEdit").removeClass("hide");
            this.submitEditDetailFormClickHandler();

        });
    }

    // submitEditDetailFormClickHandler()
    // reads and validates the input from the edit
    // input field and if the input was correct
    // the detailview information gets changed
    submitEditDetailFormClickHandler(){
        $(document).on("click", ".confirmer" , (e) => {


            // read formElements
            let name = $("#changeNameDetail").val();
            let beschreibung = $("#changeBeschreibungDetail").val();
            let date = new Date ($('#changeErfüllDatum').val());


            // Date-Picker ///////////////////////////////////////////////////////
            let datetime = date.getTime();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let curDat = new Date();
            let time = curDat.getTime();

            //validate name
            if (!isNaN(name) || name=="" || name.length <3){
                $(".nameError").removeClass("hide");
                $(".beschrError").addClass("hide");
                $(".datError").addClass("hide");
                $(".datErrorpast").addClass("hide");
            }
            //validate Beschreibung
            else if ((!isNaN(beschreibung) || beschreibung=="" || beschreibung.length <3)){
                $(".nameError").addClass("hide");
                $(".beschrError").removeClass("hide");
                $(".datError").addClass("hide");
                $(".datErrorpast").addClass("hide");
            }
            // validate Date 1
            else if (isNaN(day) || isNaN(month)|| isNaN(year)){
                    $(".nameError").addClass("hide");
                    $(".beschrError").addClass("hide");
                    $(".datErrorpast").addClass("hide");
                    $(".datError").removeClass("hide");
            }
            // validate Date 2
            else if (datetime <= time){
                $(".nameError").addClass("hide");
                $(".beschrError").addClass("hide");
                $(".datErrorpast").removeClass("hide");
                $(".datError").addClass("hide");
            }
            // submit changes
            else{
                let datFormat = day + "." + month +"." + year ;
                liste.name = name;
                liste.beschreibung = beschreibung;
                liste.erfuellDatum = datFormat;
                this.initDetailView();
            }

        });
    }


}




