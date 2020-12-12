let video;
let poseNet;
let pose=['0','0'];
let fadingCount;
let isMatchingAgain;
let result;
let colorTrack;
let trackingData;
let record_TwoPeople;
let questionNo;
let start_To_Ask;
let song;

function preload(){
  song = loadSound('/thats-a-Xmas.m4a');
}

function setup() {
  createCanvas(1920, 1080);
  video=createCapture(VIDEO);
  record_TwoPeople=new record();
  questionNo=-1;
  start_To_Ask=false;
  video.size(648,480);
  video.position(0,0);
  video.style("opacity",0);
  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose', gotPoses);
  fadingCount=255;
  isMatchingAgain=false;
  video.id("myVideo");
  tracking.ColorTracker.registerColor('red', function(r, g, b) {
        if (r>130 && g<75&&b<75) {
          return true;
        }
        return false;
      });
  colorTrack=new tracking.ColorTracker(['magenta']);
  tracking.track('#myVideo', colorTrack);
  colorTrack.on('track', function(event) { //this happens each time the tracking happens
      trackingData = event.data // break the trackingjs data into a global so we can access it with p5
  });

 
}

function gotPoses(poses){
  // console.log(poses);
  // console.log(poses.length);
  if (poses.length>0){
   if(poses[0].pose.score>0.3){
     pose[0]=poses[0].pose;
   }
  }else{
     pose[0]=0;
   }
  if(poses.length>1){
    if(poses[1].pose.score>0.3){
     pose[1]=poses[1].pose;
   }
  }else{
     pose[1]=0;
   }
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
let str;
  //loopBgm();
  background(245,213,237,100);
  
  push()
  translate(width,0);
  scale(-1, 1);
  scale(width/648,height/480)
  if(trackingData){ //if there is tracking data to look at, then...
    for (var i = 0; i < trackingData.length; i++) { //loop through each of the detected colors
      // console.log( trackingData[i] )
      rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
    }
  }
  pop();

  
  push()
    textAlign(CENTER);
    noStroke();
    textSize(60)
    var number=howManyPeople(pose);
    switch(number){
      case 0:
        reset();
        fill(255,map(frameCount%200,0,150,0,255));
        text("2 people are needed!",width/2,height/8);
        break;
      case 1:
        reset();
        fill(255,map(frameCount%200,0,60,0,255));
        text("one more people are needed!",width/2,height/8);
       // record_TwoPeople.detect(trackingData,1);
        break;
      case 2:
        push()
        fill(255,fadingCount);
        text("Let get start! ",width/2,height/8);
        pop()
        song.setVolume(0.5);
        fadingCount--;
        if(fadingCount<0){
          fadingCount=0;
        }
        if (fadingCount==0&&start_To_Ask==false){
          questionNo=0;
          start_To_Ask=true;
        }
        switch(questionNo){
          case 0:
            var timer=record_TwoPeople.getTimer(questionNo);
            push()
            strokeWeight(2);
            stroke(255);
            line(map(timer,0,600,0,width),0,map(timer,0,600,0,width),height)
            line(0,map(timer,0,600,height,0),width,map(timer,0,600,height,0))
            line(0,map(timer,0,300,0,height),width,map(timer,0,300,0,height))
            line(map(timer,0,400,width,0),0,map(timer,0,400,width,0),height)
            pop()
            fill(255,map(timer,0,600,0,255));
            text("Sit tight, We are scanning your face !"+timer,width/2,height/2);
            result=isMatched(pose[0],pose[1]);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 1:
            str="1.Do you want a baby?"
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 2:
            str="2. Do you want a pet?"
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 3:
            str="3. Are you bisexual?"
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 4:
            str="4. Do you want to see your neighbour's face"
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 5:
            str="5. Wanna to kiss her/him? "
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 6:
            str="6. Wanna honeymoon with him/her? "
            askQuestion(str,record_TwoPeople.getTimer(questionNo))
            record_TwoPeople.detect(trackingData,questionNo);
            if(record_TwoPeople.getTimer(questionNo)==0){
               questionNo=questionNo+1;
               }
            record_TwoPeople.updateTimer(questionNo)
            break;
          case 7:
            var result2=record_TwoPeople.matchingPercent();
            push()
            var s=map(frameCount%800,0,1000,0,1000)
            noFill();
            stroke(255);
            strokeWeight(3);
            ellipse(width/2,height/2,s,s);
            pop()
            fill(255)
            text("Match: "+int(result*result2*100)+"%",width/2,height/2)
           // text("ans1"+record_TwoPeople.ans1,width/2,height/3);
           // text("ans"+record_TwoPeople.ans,width/2,height/4);
            break;
        }
        break;
    }
   
  pop()
  push()
  translate(width,0);
  scale(-1, 1);
  scale(width/648,height/480)
    //image(video, 0, 0,648, 480);
  for (let i=0;i<pose.length;i++){
    if(pose[i]!=0){
      stroke(253,253,233);
      strokeWeight(3);
      line(pose[i].leftEar.x,pose[i].leftEar.y,pose[i].leftEye.x,pose[i].leftEye.y);
      line(pose[i].leftEye.x,pose[i].leftEye.y,pose[i].nose.x,pose[i].nose.y)
      line(pose[i].nose.x,pose[i].nose.y,pose[i].rightEye.x,pose[i].rightEye.y);
      line(pose[i].rightEye.x,pose[i].rightEye.y,pose[i].rightEar.x,pose[i].rightEar.y)
      line(pose[i].rightEye.x,pose[i].rightEye.y,pose[i].leftEye.x,pose[i].leftEye.y)
      /*
      push()
        noStroke();
        fill(179,136,235);
        if(i==0){     //draw circle;
          if (pose[0].leftWrist.confidence>0.65){
            leftWrist_p1_x=pose[0].leftWrist.x;
            leftWrist_p1_y=pose[0].leftWrist.y;
          }
          leftWrist_p1_stable_x=lerp(leftWrist_p1_stable_x,leftWrist_p1_x,0.1);
          leftWrist_p1_stable_y=lerp(leftWrist_p1_stable_y,leftWrist_p1_y,0.1);
          ellipse(leftWrist_p1_stable_x,leftWrist_p1_stable_y,70/(width/648),70/(height/480));
        }else{
          if (pose[1].rightWrist.confidence>0.65){
            rightWrist_p2_x=pose[1].rightWrist.x;
            rightWrist_p2_y=pose[1].rightWrist.y;
          }
          rightWrist_p2_stable_x=lerp(rightWrist_p2_stable_x,rightWrist_p2_x,0.1);
          rightWrist_p2_stable_y=lerp(rightWrist_p2_stable_y,rightWrist_p2_y,0.1);
          ellipse(rightWrist_p2_stable_x,rightWrist_p2_stable_y,70/(width/648),70/(height/480));
        }
      pop()
     */ 
    }
  }
  pop()

}

function isMatched(p,p1){
  eyeDistanceOfp=dist(p.leftEye.x,p.leftEye.y,p.rightEye.x,p.rightEye.y);
  
  earDistanceOfp=dist(p.leftEar.x,p.leftEar.y,p.rightEar.x,p.rightEar.y);
  eyeDivEarOfp=eyeDistanceOfp/earDistanceOfp;
  
  eyeDistanceOfp1=dist(p1.leftEye.x,p1.leftEye.y,p1.rightEye.x,p1.rightEye.y);
  
  earDistanceOfp1=dist(p1.leftEar.x,p1.leftEar.y,p1.rightEar.x,p1.rightEar.y);
  eyeDivEarOfp1=eyeDistanceOfp1/earDistanceOfp1;
  //console.log(eyeDivEarOfp)
  //console.log(eyeDivEarOfp1)
  
  var large;
  
  if (eyeDivEarOfp>eyeDivEarOfp1){
    large=eyeDivEarOfp;
    eyeDivEarOfp=eyeDivEarOfp1;
    eyeDivEarOfp1=large;
  }
  
  return (eyeDivEarOfp/eyeDivEarOfp1) // p1 over p
  
  /*
  if (eyeDistanceOfp>eyeDistanceOfp1){
    large=eyeDistanceOfp;
    eyeDistanceOfp=eyeDistanceOfp1;
    eyeDistanceOfp1=large;
  }
  
  return (eyeDistanceOfp/eyeDistanceOfp1) // p1 over p
  */
}

function outputMatchingResult(isAgain){
  if(isAgain==false){
    textSize(50);
    stroke(255);
    strokeWeight(3);
    text(isMatched(pose[0],pose[1]),width/2,height/2);
    console.log(isMatched(pose[0],pose[1]))
  }
}

function isTwoPeople(){
  let p1=false;
  let p2=false;
  if (keyIsDown(65)){ //key A
    p1=true;
  }
  if (keyIsDown(66)){
    p2=true;
  }
  return p1&&p2;
}

function howManyPeople(p){
  if (p[0]==0&&p[1]==0){
    return 0;
  }else if (p[0]!=0&&p[1]!=0){
    return 2;
  }else{
    return 1;
  }
}

function Region(rec){
  var x=rec.x+rec.width/2;  ///center of rec
  var y=rec.y+rec.height/2
  var temp=0;
  if(x<648/2&&y<480/2){ //top left
    temp=3;
  }else if (x<648/2&&y>480/2){ // top left
    temp=4;
  }else if (x>648/2&&y<480/2){//up left 
    temp=1;
  }else {
    temp=2;//left down
  }
  
  return temp;
}

function askQuestion(str,timer){
  push();
  translate(width/2,height/2);
  angleMode(DEGREES);
  rotate(timer%360);
  ellipse(0,250,10,10)
  pop();
  
  push();
  var a=map(timer,0,600,50,255)
  fill(255,a)
  text(str,width/2,height/2);
  pop();
}
function reset(){
  song.setVolume(1);
  record_TwoPeople=new record(); //reset the record
  questionNo=-1; // reset the question flow
  fadingCount=255; // reset the alpha
  start_To_Ask=false;
  isMatchingAgain=false; // reset the matching flow
}

function loopBgm(){
  if (song.isPlaying()==false){
    song.play();
  }
}
