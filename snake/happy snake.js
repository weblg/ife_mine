//console.log("ready");
var score=document.getElementById("score");
//创建地图
var map=document.getElementById("snake_map");
var rowNumber=25;
var columnNumber=25;
var mapWidth=columnNumber*20+"px";
var mapHeight=rowNumber*20+"px";
map.style.width=mapWidth;
map.style.height=mapHeight;
//map.style.backgroundColor="green";
//记录所有的div
var mapArrayPosition=[];
for(var i=0;i<rowNumber;i++){
  var myRow=document.createElement("div");
  myRow.className="row";
  map.appendChild(myRow);
  var rowArray=[];
  for(var j=0;j<columnNumber;j++){
    var myCol=document.createElement("div");
    myCol.className="col";
    myRow.appendChild(myCol);
    rowArray.push(myCol);
  }
  mapArrayPosition.push(rowArray);
}
//初始化一个snake，其实只是障眼法改变背景
var snake=[];
//初始化长度为3,并显示在第一行
for(var i=0;i<3;i++){
mapArrayPosition[0][i].className="col activeSnake";
snake[i]=mapArrayPosition[0][i];
}
//创建蛇移动的函数
//蛇的初始位置，初始移动方向
var x=2;
var y=0;
var eggX=0;
var eggY=0;
var direction="right";
var scoreCount=0;
//判断是否需要改变蛇的方向，意思是在一格还没有移动完时，不要改方向
var changeDir=true;
var delayTimer=null;
//添加键盘事件，用键盘指挥snake移动；
document.onkeydown=function(event){
  if(!changeDir){
    return;
  }
  var event=event||window.event;
  //判断是否需要改变方向
  //如果正在像左向右移动，按左右键不管用
  if(direction=="right"&&event.keyCode==37){
    return;
  }
  if(direction=="left"&&event.keyCode==39){
    return;
  }
  if(direction=="up"&&event.keyCode==40){
    return;
  }
  if(direction=="down"&&event.keyCode==38){
    return;
  }
  //根据keyCode给direction赋值
  switch(event.keyCode){
    case 37:
   direction = 'left';// 向左
   break;
 case 38:
   direction = 'up';// 向上;
   break;
 case 39:
   direction = 'right';// 向右
   break;
 case 40:
   direction = 'down';// 向下
   break;
  }
  changeDir=false;
  delayTimer=setTimeout(function(){
    changeDir=true;
  },300);
};
//snake移动的逻辑函数
function snakeMove(){
//根据方向判断xy的值
switch(direction){
  case 'left':
  x--;
  break;
case 'right':
  x++;
  break;
case 'up':
  y--;
  break;
case 'down':
  y++;
  break;
};
//判断gameover
if(x<0||y<0||x>=columnNumber||y>=rowNumber){
  alert("Game Over");
  clearInterval(moveTimer);
  return;
}
//吃到自己也gameover,理解了，将蛇头的移动后的位置与蛇身进行比较
for(var i=0;i<snake.length;i++){
  if(snake[i]==mapArrayPosition[y][x]){
    alert("Game Over");
    clearInterval(moveTimer);
    return;
  };
}
//没有egg时的移动，障眼法，改变尾巴，改变snakehead颜色，

if(eggX == x && eggY == y){
  mapArrayPosition[eggY][eggX].className="col activeSnake";
  snake.push(mapArrayPosition[eggY][eggX]);
  scoreCount++;
  score.innerHTML=scoreCount;
  createNewEgg();
  //mapArrayPosition[eggX][eggY].className="col";
}else{
  snake[0].className="col";
  snake.shift();
  mapArrayPosition[y][x].className="col activeSnake";
  snake.push(mapArrayPosition[y][x]);
};
};
var moveTimer=setInterval("snakeMove()",300);
//随机生成egg的部分
//var eggX=0;
//var eggY=0;
//生成一个min到max之间随机数的公式，高级程序上有
function random(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
//产生蛋及蛋消失的条件
function createNewEgg(){
  eggX = random(0, columnNumber - 1);
 eggY = random(0, rowNumber - 1);
  if(mapArrayPosition[eggY][eggX].className=="col activeSnake"){
    createNewEgg();
  }else{
    mapArrayPosition[eggY][eggX].className="col egg";
  }
}
createNewEgg();
//添加按钮事件
var pauseBtn=document.getElementById("pause");
var startBtn=document.getElementById("start");
var resertBtn=document.getElementById("refresh");
var speedBtn=document.getElementById("speed");
var speed1=300;
pauseBtn.onclick=function(){
clearInterval(moveTimer);
};
startBtn.onclick=function(){
  clearInterval(moveTimer);
  moveTimer=setInterval("snakeMove()",speed1);
};
resertBtn.onclick=function(){
window.location.reload();
};
speedBtn.onclick=function(){
speed1-=20;
clearInterval(moveTimer);
moveTimer=setInterval("snakeMove()",speed1);
};
