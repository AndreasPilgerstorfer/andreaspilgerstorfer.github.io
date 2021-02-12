class PaintObj{
    constructor(posX, posY, color){ //Konstruktorfunktion
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.div = undefined;
    }

    draw($parent){
        //lege mir zusätzliches Attribute an
        this.div = $("<div class='default'></div>");
        this.div.css({ //JSON - anonymes Objekt
            position:"absolute",
            top: this.posY+"px",
            left:this.posX+"px",
            background : this.color
        });

        //einhängen in den DOM Baum
        this.setClickHandler();
        $parent.append(this.div);
    }

    setClickHandler() {
        let that = this;
        this.div.click((e) =>{
            e.stopImmediatePropagation();

            let x = e.currentTarget;
            let y = $(x).parent()[0];


            if($(x).parent()[0].className == "default") {
                $(y).addClass("clicked");
            }
            else{
                if ( this instanceof Triangle){
                    console.log("Triangle -- keine Border");
                }
                else{
                    this.div.css({
                        border: "2px solid yellow"
                    });
                }
            }

            setTimeout(function() {

                if($(x).parent()[0].className == "default clicked"){
                    if(confirm("Löschen?")){
                        $(x).parent()[0].remove();
                    }
                    else{
                        $(y).removeClass("clicked");
                    }
                }
                else{
                    if(confirm("Löschen?")){
                        $(x).remove();
                    }
                    else{
                        if ( that instanceof Triangle){
                            console.log("Triangle -- keine Border wird weggenommen");
                        }
                        else{
                            that.div.css({
                                border: "none"
                            });
                        }

                    }
                }
            },1);

        });
    }

    getWidth() {
        throw "Method abstract - please overwrite in subclass!"
    }

    getHeight() {
        throw "Method abstract - please overwrite in subclass!"
    }
}
//================================================= Square
class Square extends PaintObj {
     constructor(posX,posY, color, size){
        super(posX,posY,color)
        //neues, zusätzliches Attribute angelegt
        this.size = size;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.size+"px",
            height:this.size+"px"
        });
    }

    getWidth() {
        return this.size;
    }

    getHeight() {
        return this.size;
    }
}

//================================================= Rectangle
class Rectangle extends PaintObj{
    constructor(posX,posY, color, width,height){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.width = width;
        this.height = height;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height:this.height+"px"
        });
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}
//================================================= Frame

class Frame extends Rectangle{
    constructor(posX,posY, color) {
        super(posX,posY,color,0,0);
        this.elements = new Array();
    }

    addPaintObj(po) {
        let w = po.getWidth();
        let h = po.getHeight();

        if(this.width < po.posX + w){
            this.width = po.posX + w;
        }

        if(this.height < po.posY + h){
            this.height = po.posY + h;
        }

        this.elements.push(po);//push fügt element in Array ein
    }

    draw($parent){
        super.draw($parent);
        for(let val of this.elements){
            val.draw(this.div);
        }
    }
}
//=================================================

class Figure extends Rectangle{

    constructor(posX,posY, color, width,height){
        super(posX,posY,color, width, height);
        this.elems = new Array();

        this.head = new Oval(this.width*0.33, 0, this.color, this.width*0.33, this.height*0.33 );
        this.body = new Rectangle(this.width*0.3, this.height*0.33, this.color, this.width/2 - this.width*0.0825, this.height/2 - this.height*0.0825);
        //this.body = new Square(this.width*0.3, this.height*0.33, this.color, this.width/2 - this.width*0.0825);
        this.armL = new Rectangle(0, this.height*0.33, this.color, this.width*0.3, this.height*0.1);
        this.armR = new Rectangle(this.width*0.7, this.height*0.33, this.color,this.width*0.3, this.height*0.1 );
        this.legL = new Rectangle(this.width*0.3, this.height*0.66, this.color, this.width*0.1, this.height*0.34);
        this.legR = new Rectangle(this.width*0.618, this.height*0.66, this.color, this.width*0.1, this.height*0.34)
    }

    draw($parent) {

        this.addElem();

        super.draw($parent);
        $(this.div).css({
            background: "transparent"
        });

        for(let val of this.elems){
            val.draw(this.div);
        }

    }

    addElem(){
        this.elems.push(this.head);
        this.elems.push(this.body);
        this.elems.push(this.armL);
        this.elems.push(this.armR);
        this.elems.push(this.legL);
        this.elems.push(this.legR);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

}
//=================================================
class Triangle extends Rectangle{

    constructor(posX,posY, color, sideLength, h){
        super(posX,posY, color, 0, 0);
        this.sideLength = sideLength;
        this.h = h;
    }


    draw($parent){
        super.draw($parent);
        $(this.div).css({
            "border-left": this.sideLength +"px solid transparent",
            "border-right": this.sideLength+"px solid transparent",
            "border-bottom": this.h +"px solid" +this.color,
            "background": "transparent"
        });
    }

    getWidth() {
        return this.sideLength;
    }

    getHeight() {
        return this.h;
    }
}

//================================================= Oval

class Oval extends Rectangle{

    constructor(posX,posY, color, width,height){
        super(posX,posY,color, width, height);
    }

    draw($parent){
        super.draw($parent);
        $(this.div).css({
            "border-radius": "50" + "%"
        });
    }

    
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}




