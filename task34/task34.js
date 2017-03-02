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
var head=targetDiv.getElementsByTagName('div')[0];
var flag=0;//标志蓝色的朝向，上右下左，0 1 2 3
var angle=0;
addEvent(btn,"click",function(){
  var val=inputText.value.trim();
  switch (val) {
    case 'GO':go();break;
    case 'TUN LEF':turnLeft();break;
    case 'TUN RIG':turnRight();break;
    case 'TUN BAC':turnBack();break;
    case 'TRA LEF':travelLeft();break;
    case 'TRA RIG':travelRight();break;
    case 'TRA TOP':travelTop();break;
    case 'TRA BOT':travelBottom();break;
    case 'MOV LEF':moveLeft();break;
    case 'MOV TOP':moveTop();break;
    case 'MOV RIG':moveRight();break;
    case 'MOV BOT':moveBottom();break;
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
      newPos=oldTop-40-2;
        if(newPos>=41){
          targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
        }else{
          return;
        }
      break;
    case 3:
      newPos=oldLeft-40-2;
      if(newPos>=41){
        targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
      }else{
        return;
      }
      break;
    case 2:
    newPos=oldTop+40+2;
    if(newPos<=419){
      targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
    }else{
      return;
    }
    break;
    case 1:
    newPos=oldLeft+40+2;
    if(newPos<=419){
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
  switch (flag) {
    case 0:head.className='left';break;
    case 1:head.className='top';break;
    case 2:head.className='right';break;
    case 3:head.className='bottom';break;
    default:window.alert('无法转向');break;
  }
  if (flag===0) {
    flag=3;
  }else {
    flag-=1;
  }
  //angle=angle-90;
  //targetDiv.style.transform='rotate(' + angle+ 'deg)';
}
function turnRight(){
  switch (flag) {
    case 0:head.className='right';break;
    case 1:head.className='bottom';break;
    case 2:head.className='left';break;
    case 3:head.className='top';break;
    default:window.alert('无法转向');break;
  }
  if (flag===3) {
    flag=0;
  }else {
    flag+=1;
  }
}
function turnBack(){
  switch (flag) {
    case 0:flag=2;head.className='bottom';break;
    case 1:flag=3;head.className='left';break;
    case 2:flag=0;head.className='top';break;
    case 3:flag=1;head.className='right';break;
    default:
    console.log("something wrong!");
    break;
  }
//  angle=angle+180;
//  targetDiv.style.transform='rotate(' + angle+ 'deg)';
}
function travelLeft(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldLeft-40-2;
  if(newPos>=41){
    targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
  }else{
    return;
  }
}
function travelRight(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldLeft+40+2;
  if(newPos<=419){
    targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
  }else{
    return;
  }
}
function travelTop(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldTop-40-2;
    if(newPos>=41){
      targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
    }else{
      return;
    }
}
function travelBottom() {
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldTop+40+2;
  if(newPos<=419){
    targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
  }else{
    return;
  }
}
function moveLeft(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldLeft-40-2;
  if(newPos>=41){
    targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
    head.className="left";
    flag=3;
  }else{
    return;
  }
}
function moveTop(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldTop-40-2;
    if(newPos>=41){
      targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
      head.className="top";
      flag=0;
    }else{
      return;
    }
}
function moveRight(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldLeft+40+2;
  if(newPos<=419){
    targetDiv.style.left=newPos+'px';//同是需减去外边距和边框
    head.className="right";
    flag=1;
  }else{
    return;
  }
}
function moveBottom(){
  var oldLeft=targetDiv.offsetLeft;
  var oldTop=targetDiv.offsetTop;
  var newPos=0;
  newPos=oldTop+40+2;
  if(newPos<=419){
    targetDiv.style.top=newPos+'px';//同是需减去外边距和边框
    head.className="bottom";
    flag=2;
  }else{
    return;
  }
}
var cmdDiv=document.getElementsByClassName('cmd')[0];
var order=cmdDiv.getElementsByTagName('button');
addEvent(order[0],"click",go);
addEvent(order[1],"click",turnLeft);
addEvent(order[2],"click",turnRight);
addEvent(order[3],"click",turnBack);
addEvent(order[4],"click",travelLeft);
addEvent(order[5],"click",travelTop);
addEvent(order[6],"click",travelRight);
addEvent(order[7],"click",travelBottom);
addEvent(order[8],"click",moveLeft);
addEvent(order[9],"click",moveTop);
addEvent(order[10],"click",moveRight);
addEvent(order[11],"click",moveBottom);
