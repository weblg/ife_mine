//添加事件响应函数
function addEvent(obj,eve,fun){
  if(obj.attachEvent){
    obj.attachEvent("on"+eve,fun);
  }else if(obj.addEventListener){
    obj.addEventListener(eve,fun,false);
  }else{
    obj["on"+eve]=fun;
  }
}
//给btn添加点击相应函数
var btn=document.getElementsByClassName("btn")[0];
var inputText=document.getElementById("input");
var targetDiv=document.getElementsByClassName("target")[0];
var flag=0;//标志蓝色的朝向，上右下左，0 1 2 3
var angle=0;
addEvent(btn,"click",function(){
  var val=inputText.value.trim();
  switch (val) {
    case 'GO':go();break;
    case 'TUN LEF':turnLeft();break;
    case 'TUN RIG':turnRight();break;
    case 'TUN BAC':turnBack();break;
    default:
    window.alert("default");
      break;
  }
})
//指令为GO时的动作
function go(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  switch (flag) {
    case 0:
      newPos=oldTop-40-13;
        if(newPos>=30){
          targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
        }else{
          return;
        }
      break;
    case 3:
      newPos=oldLeft-40-21-2;
      if(newPos>=132){
        targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
      }else{
        return;
      }
      break;
    case 2:
    newPos=oldTop+40-11+2;
    if(newPos<=408){
      targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
    }else{
      return;
    }
    break;
    case 1:
    newPos=oldLeft+40-21+2;
    if(newPos<=511){
      targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
    }else{
      return;
    }
    break;
    default:
    console.log("其他指令");
  }

}
function turnLeft(){
  if (flag===0) {
    flag=3;
  }else {
    flag-=1;
  }
  angle=angle-90;
  targetDiv.style.transform='rotate(' + angle+ 'deg)';
}
function turnRight(){
  if (flag===3) {
    flag=0;
  }else {
    flag+=1;
  }
  angle=angle+90;
  targetDiv.style.transform='rotate(' + angle+ 'deg)';
}
function turnBack(){
  switch (flag) {
    case 0:flag=2;break;
    case 1:flag=3;break;
    case 2:flag=0;break;
    case 3:flag=1;break;
    default:
    console.log("something wrong!");
    break;
  }
  angle=angle+180;
  targetDiv.style.transform='rotate(' + angle+ 'deg)';
}
