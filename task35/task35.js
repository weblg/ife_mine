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
/*addEvent(btn,"click",function(){
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
})*/
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
/*var cmdDiv=document.getElementsByClassName('cmd')[0];
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
addEvent(order[11],"click",moveBottom);*/
//获取一些元素
var area=document.getElementById('area');
var numbers=document.getElementById('numbers');
var carryout=document.getElementsByClassName('carryout');
carryout=carryout[0].getElementsByTagName('input');
var doIt=carryout[0];
var refresh=carryout[1];
var newOrder=[];
//给area添加keyup事件，记录指令并显示列表
addEvent(area,'keyup',getValue);
function getValue(){
  var val=area.value;
   newOrder=val.split('\n');//将获取的指令按照换行存入数组
  var arr=[];//存数字列表html
  var top=area.scrollTop;
  for(var i=0;i<newOrder.length;i++){
    arr.push("<li class='wrong'>"+(i+1)+"</li>");//push函数写错了
  }
  numbers.innerHTML=arr.join('');
  numbers.scrollTop=top;
  //numbers.style.top=top;
}
addEvent(area,'scroll',function(){
  var top=area.scrollTop;
  //numbers.style.top=top;
  numbers.scrollTop=top;
});
/*var str='GO 3  '
var array=str.split(" ");
window.alert(array+array.length);*/
//执行按钮添加点击执行命令
var j=0;//记录当前的li
addEvent(doIt,'click',replaceFor);
function replaceFor(){
  var value=area.value;
  var array=value.split('\n');
  var i=1;
  carryOut(0,array[0]);//指令的数目
  //每隔500ms执行一行命令
  var timer=setInterval(function(){
    if(i<array.length){
      carryOut(i,array[i]);
      ++i;
    }else {
      clearInterval(timer);
    }
  },1000);
}
function carryOut(i,newOrder){
  //window.alert("doit");
  //for(var i=0;i<newOrder.length;i++){
    j=i;
    var array=newOrder.split(" ");
    var count=parseInt(array[array.length-1]);
    //array.pop();//去掉最后的数字
    //var str=array.join('');//获取指令
    if(!isNaN(count)){//是一个数的时候
      array.pop();//去掉最后的数字
      nameCheck(count,array.join(' '));
    }else{
      nameCheck(1,array.join(' '));
    }

//  }
}
function nameCheck(count,str){
  switch(str){
    case 'GO':
    for(var i=0;i<count;i++){
      go();
    }
    break;
    case 'TUN LEF':
      for(var i=0;i<count;i++){
        turnLeft();
      }
    break;
    case 'TUN RIG':
    for(var i=0;i<count;i++){
      turnRight();
    }
    break;
    case 'TUN BAC':
      for(var i=0;i<count;i++){
      turnBack();
    }
      break;
    case 'TRA LEF':
      for(var i=0;i<count;i++){
        travelLeft();
      }
    break;
    case 'TRA RIG':
      for(var i=0;i<count;i++){
        travelRight();
      }
    break;
    case 'TRA TOP':
      for(var i=0;i<count;i++){
        travelTop();
      }
    break;
    case 'TRA BOT':
    for(var i=0;i<count;i++){
      travelBottom();
    }
    break;
    case 'MOV LEF':
      for(var i=0;i<count;i++){
        moveLeft();
      }
    break;
    case 'MOV TOP':
      for(var i=0;i<count;i++){
        moveTop();
      }
    break;
    case 'MOV RIG':
      for(var i=0;i<count;i++){
        moveRight();
      }
    break;
    case 'MOV BOT':
      for(var i=0;i<count;i++){
        moveBottom();
      }
    break;
    default:
    numbers.getElementsByTagName('li')[j].style.backgroundColor="red";
      break;
  }
}
addEvent(refresh,'click',function(){
  area.value="";
  numbers.innerHTML="";
});
