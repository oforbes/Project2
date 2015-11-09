var moving= false;//boolean to check if the puzzle piece is moving
var empty_slot=15; //Empty piece
var count=0; //keep count of pieces the loop has gone through

var direc="none"; //direction to move
var addto=0;
var txt;

var div_array; // Array of puzzle pieces
var i; //to loop through array

//Loads puzzle pieces when webpage loads
window.onload = function(){
    var box = document.getElementById('puzzlearea').getElementsByTagName('div');
    div_array=box;
    var shuf = document.getElementById('shufflebutton');
    shuf.onclick=shuffle;
    for(i=0; i<box.length;i++){
        box[i].className = 'puzzlepiece';
        box[i].onmouseover = Move;
        box[i].onmouseout = clear;
        box[i].onclick = movePiece;

        if(i>=0 && i<=3){
            box[i].style.left+=i*100+'px';
            box[i].style.top=0+'px';
            box[i].style.backgroundPosition = -i*100+'px '+'0px';
        }else if(i>=4 && i<=7){
            box[i].style.left+=(i-4)*100+'px';
            box[i].style.top=100+'px';
            box[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
        }else if(i>=8 && i<=11){
            box[i].style.left+=(i-8)*100+'px';
            box[i].style.top=200+'px';
            box[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
        }else{
            box[i].style.left+=(i-12)*100+'px';
            box[i].style.top=300+'px';
            box[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
        }
        
    }
};

//if puzzlepiece is moveable
function Move(){
    if(!moving){
        if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top===getY()){
        this.className = this.className + " movablepiece";
        direc="right";
        }else if(parseInt(this.style.left) === (parseInt(getX())+parseInt(this.offsetWidth)) && this.style.top===getY()){
            this.className = this.className + " movablepiece";
            direc= "left";
        }else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            direc= "down";
        }else if(parseInt(this.style.top) === (parseInt(getY())+parseInt(this.offsetHeight)) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            direc= "up";
        }else{
            direc= "none";
        }
    }
    

}

//remove .moveablepiece class when mouse exits tile
function clear(){
    this.className = 'puzzlepiece';
}

//Check method for shuffle
function Moveable(elmt){
    if((parseInt(elmt.style.left)+parseInt(elmt.offsetWidth)) === parseInt(getX()) && elmt.style.top===getY()){
        direc="right";
        return "right";
    }else if(parseInt(elmt.style.left) === (parseInt(getX())+parseInt(elmt.offsetWidth)) && elmt.style.top===getY()){
        direc= "left";
        return "left";
    }else if((parseInt(elmt.style.top)+parseInt(elmt.offsetHeight)) === parseInt(getY()) && elmt.style.left===getX()){
        direc= "down";
        return "down";
    }else if(parseInt(elmt.style.top) === (parseInt(getY())+parseInt(elmt.offsetHeight)) && elmt.style.left===getX()){
        direc= "up";
        return "up";
    }else{
        direc= "none";
        return "none";
    }

}

//Puzzle piece movement
function slide(){
    var indx = 0;
    for(var i=0; i<div_array.length;i++){
        if(div_array[i].textContent===txt){
            indx=i; 
        }
    }
    
    if(addto!=100){
        if(direc==="left" || direc==="right"){
            div_array[indx].style.left=parseInt(div_array[indx].style.left)+count+'px';
        }else{
            div_array[indx].style.top=parseInt(div_array[indx].style.top)+count+'px';
        }
        addto+=1;
        moving=true;
        setTimeout("slide()", "1 * 1000");
    }else{
        addto=0;
        moving=false;
        direc="none";
    }   
    
}

//Gets the direction and then calls slide() to move puzzle piece
function movePiece(){
    if(!moving){
        if (direc=="right"){
        
        count=1;
        empty_slot-=1;
        txt=this.textContent;
        slide();
        }
        else {
        
        if (direc=="left") {
        count=-1;
        empty_slot+=1;
        txt=this.textContent;
        slide();
        }
        }
        
        if (direc=="down") {
        count=1;
        empty_slot-=4;
        txt=this.textContent;
        slide();
        }
        else {
        
        if (direc=="up") {
        count=-1;
        empty_slot+=4;
        txt=this.textContent;
        slide();
        }
        }
        

    }
    }


//Move method for shuffle
function movePiece1(elmt){
    
    switch(direc){
        case "right":
        elmt.style.left=parseInt(elmt.style.left)+100+'px';
        empty_slot-=1;
        break;
        case "left":
        elmt.style.left=parseInt(elmt.style.left)-100+'px';
        empty_slot+=1;
        break;
        case "down":
        elmt.style.top=parseInt(elmt.style.top)+100+'px';
        empty_slot-=4;
        break;
        case "up":
        elmt.style.top=parseInt(elmt.style.top)-100+'px';
        empty_slot+=4;
        break;

        default:


    }
}

//shuffles tiles
function shuffle(){

    var num=100;
    for(var i =0; i<num; i++){
        var a_list = [];
        for(var i1 =0; i1<div_array.length; i1++){
            if(Moveable(div_array[i1])!="none"){
                a_list.push(i1);
            }

        }
        if(a_list.length!=0){
            var n = a_list[Math.floor((Math.random()*a_list.length)+0)];
            Moveable(div_array[n]);
            movePiece1(div_array[n]);
        }
    }
    direc="none";
}

//Returns the 'X' vlaue for the empty puzzle piece
function getX(){
        if(empty_slot>=0 && empty_slot<=3){
            return empty_slot*100+'px';
        }else if(empty_slot>=4 && empty_slot<=7){
            return (empty_slot-4)*100+'px';
            
        }else if(empty_slot>=8 && empty_slot<=11){
            return (empty_slot-8)*100+'px';
            
        }else{
            return (empty_slot-12)*100+'px';
            
        }
        
}

//Returns the 'Y' value for the empty puzzle piece
function getY(){
    if(empty_slot>=0 && empty_slot<=3){
            return '0px';
        }else if(empty_slot>=4 && empty_slot<=7){
            return '100px';
            
        }else if(empty_slot>=8 && empty_slot<=11){
            return '200px';
            
        }else{
            return '300px';
            
        }
}
shuffle();
