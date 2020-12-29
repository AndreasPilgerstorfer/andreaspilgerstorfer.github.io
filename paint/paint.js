let $inputPosX;
let $inputPosY;
let $inputColor;
let $inputSize;
let $inputWidth;
let $inputHeight;
let $inputHeightTri;
let $inputSide;
let $inputAmount;

$(document).ready(function(){
	$inputPosX = $("#positionX");
	$inputPosY = $("#positionY") + Number(500);
	$inputColor = $("#color");
	$inputSize = $("#size");
	$inputWidth = $("#width");
	$inputHeight = $("#height");
	$inputHeightTri = $("#triHigh");
	$inputSide = $("#side") ;

	updateFormElements();
	
	$("#draw").click(function(){
		let x = "Ich bin X";
		let y = "Ich bin Y";
		validateInputAndDraw(x, y);
	});
	
	emptyButton = document.getElementById("empty");
	$("#empty").click(function(){
		$("#paintArea").children().remove();
	}); 
				
	$("#shape").change(function() {
		updateFormElements();
	});

	$("#paintArea").click(function(e){
		let x = e.pageX;
		let y = e.pageY;

		validateInputAndDraw(x, y);
	})
	
});

function updateFormElements() {
	let shape = $("#shape").val();
	switch(shape) {
		case "square":
			$inputSize.parent().show();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			$inputSide.parent().hide();
			$inputHeightTri.parent().hide();
			break;
		case "rectangle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			$inputSide.parent().hide();
			$inputHeightTri.parent().hide();
			break;
		case "frame":
			$inputSize.parent().hide();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			$inputSide.parent().hide();
			$inputHeightTri.parent().hide();
			break;
		case "oval":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			$inputSide.parent().hide();
			$inputHeightTri.parent().hide();
			break;
		case "figure":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			$inputSide.parent().hide();
			$inputHeightTri.parent().hide();
			break;
		case "triangle":
			$inputSize.parent().hide();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			$inputSide.parent().show();
			$inputHeightTri.parent().show();
			break;
		default: 
			break;
	}
}

function validateInputAndDraw(x, y) {
	let shape = document.paintForm.shape.options[document.paintForm.shape.selectedIndex].value;
	let color = checkInputField("color");
	let positionX;
	let positionY;

	if (isNaN(x) && isNaN(y)){
		positionX = checkInputField("positionX");
		positionY = checkInputField("positionY");
	}
	else{
		positionX = x;
		positionY = y;
	}
	
	switch(shape) {
		case "square":
			let size = checkInputField("size");
			let s = new Square(Number(positionX),
                Number(positionY),color,Number(size));
            s.draw($("#paintArea"));
		
			break;
		case "rectangle":
			let width = checkInputField("width");
			let height = checkInputField("height");
            let r = new Rectangle(Number(positionX),
                Number(positionY),color,Number(width), Number(height));
            r.draw($("#paintArea"));
					
			break;
		case "frame":
            let frame = new Frame(Number(positionX), Number(positionY),color);
            let r1 = new Rectangle(0,0,"#aabbcc",5,10);
            frame.addPaintObj(r1);

            let s1 = new Square(100,100,"#aaffcc",50);
            frame.addPaintObj(s1);

            frame.draw($("#paintArea"));
		
			break;

		case "oval":
			let w = checkInputField("width");
			let h = checkInputField("height");
			let o = new Oval(Number(positionX),
				Number(positionY), color, Number(w), Number(h));
			o.draw($("#paintArea"));

			break;

		case "triangle":
			let side = checkInputField("side");
			let tri = checkInputField("triHigh");
			let t = new Triangle(Number(positionX),
				Number(positionY), color, Number(side), Number(tri));
			t.draw($("#paintArea"));

			break;

		case "figure":
			let wi = checkInputField("width");
			let hi = checkInputField("height");
			let f = new Figure(Number(positionX),
				Number(positionY),color,Number(wi), Number(hi));
			f.draw($("#paintArea"));
			break;

		default: 
			break;
	}

}

function checkInputField(id) {
	let $inputField = $("#"+id);
	
	if($inputField.val() == "" ) {
		$inputField.css("border","1px solid red"); //roter Rahmen
		return "";
	} else {
		$inputField.css("border","1px solid #cdcdcd");
		return $inputField.val();
	}
}


