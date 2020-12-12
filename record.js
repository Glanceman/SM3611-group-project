class record{
  constructor(){
    this.ans=[1,1,1,1,1,1,1]
    this.ans1=[1,1,1,1,1,1,1]
    this.timer=[600,600,600,600,600,600,600]
    this.haveDone=false;
    this.ansOfmatching=0;
  }
  
  detect(trackingData,questionNo){
    var index=questionNo;
    if(trackingData.length>=1){
    for(let i=0;i<trackingData.length;i++){
      var result=Region(trackingData[i])
      switch(result){
        case 1:
          this.ans[index]=2;
          break;
        case 2:
          this.ans[index]=1;
          break;
        case 3:
          this.ans1[index]=1;
          break;
        case 4:
          this.ans1[index]=2;
          break;
      }
    }
    }
  }
  updateTimer(questionNo){
    var index=questionNo;
    this.timer[index]=this.timer[index]-1;
  }
  
  getTimer(questionNo){
    return this.timer[questionNo];
  }
  
  matchingPercent(){
    if(this.haveDone==false){
      var sum=0;
      var magnitude_A=0;
      var magnitude_B=0;
      for(let i=0; i<this.ans.length;i++){
        sum=sum+this.ans[i]*this.ans1[i];
        magnitude_A=magnitude_A+this.ans[i]*this.ans[i];
        magnitude_B=magnitude_B+this.ans1[i]*this.ans1[i];
      }
      this.ansOfmatching=sum/(Math.sqrt(magnitude_A)*Math.sqrt(magnitude_B))
    }
    this.haveDone=true;
    return this.ansOfmatching;
  }
}