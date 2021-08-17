var status=""
var object=[];
function preload(){
    img=loadImage('bag.jpeg');
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.position(450,120);
    objectDetect=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status : detecting object"
}
function draw(){
    image(img,0,0,500,500);
    if(status != ""){ 
        document.getElementById("status").innerHTML="Status : object detected";
        for( i=0;i<object.length;i++){
            fill("red");
            confidenc=floor(object[i].confidence * 100)
            text(object[i].label+" "+confidenc+"%",object[i].x+20,object[i].y+50);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
    objectDetect.detect(img , gotresults)
}
function gotresults(error,results){
   if(error){
       console.log(error);
   }
   else{
       console.log(results);
       object=results;
   }
}