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
var confirm=document.getElementsByClassName('confirm')[0];
var cancle=document.getElementsByClassName('cancle')[0];
var mask=document.getElementsByClassName('mask')[0];
var main=document.getElementsByClassName('main')[0];
var close=document.getElementsByTagName('span')[0];
var show=document.getElementsByClassName('click')[0];
var topTarget=document.getElementsByClassName('top1')[0];
//var close=top.getElementsByTagName('span')[0];
addEvent(confirm,'click',function(){
  window.alert('这是一个浮出层；');
});
addEvent(cancle,'click',disappear);
addEvent(close,'click',disappear);
addEvent(mask,'click',disappear);
function disappear(){
  window.alert('we will disappear');
  mask.style.display="none";
  main.style.display="none";
}
addEvent(show,'click',showWin);
function showWin(){
  mask.style.display="block";
  main.style.display="block";
}

function setDrag(event) {
    var disX, disY;
    event = event || window.event;
    disX = event.clientX - main.offsetLeft;
    disY = event.clientY - main.offsetTop;
    document.onmousemove = function(event) {
        event = event || window.event;
        tempX=event.clientX-disX;
        tempY=event.clientY-disY;
        var width=document.documentElement.clientWidth-main.offsetWidth;
        var height=document.documentElement.clientHeight-main.offsetHeight;
        //clearTimeout(timer);
        if(tempX>width){
          tempX=width;
        }else if(tempX<0){
          tempX=0;
        }
        if(tempY>height){
          tempY=height;
        }else if(tempY<0){
          tempY=0;
        }
        main.style.left = tempX +150+ "px";
        main.style.top = tempY +100+ "px";
    };
    document.onmouseup = function() {
        document.onmousedown = null;
        document.onmousemove = null;
    }
}
addEvent(topTarget,'mousedown',setDrag);
//运行此函数目的：在于先创建一小块可拖动的div，在给其添加各种函数。
resizable(main);//此函数用于创建向右拖动的div，并给其添加mousedown函数；
function resizable(obj){
  var myDivRig=document.createElement('div');
  var myDivBot=document.createElement('div');
  var myDivRB=document.createElement('div');
  myDivRig.className='resizable-right resizable-box';
  myDivBot.className='resizable-bottom resizable-box';
  myDivRB.className='resizable-RB resizable-box';
  obj.appendChild(myDivRig);
  obj.appendChild(myDivBot);
  obj.appendChild(myDivRB);
//  addEvent(myDivRig,'mousedown',OnMouseDown);
  addEvent(myDivRig,'mousedown',function(e){
    OnMouseDown(e,myDivRig,obj,'r',myDivRB);
  });//涉及函数传参的方法
  addEvent(myDivBot,'mousedown',function(e){
    OnMouseDown(e,myDivBot,obj,'b',myDivRB);
  });
  addEvent(myDivRB,'mousedown',function(e){
    OnMouseDown(e,myDivRB,obj,'br',myDivRig,myDivBot);
  });
}
function OnMouseDown(e,obj,parent,type,obj1,obj2){
  var deltaX=e.clientX-obj.offsetLeft;
  var deltaY=e.clientY-obj.offsetTop;
  document.onmousemove=function(e){
    var e=e||window.event;
    var tempX=e.clientX-deltaX;
    var tempY=e.clientY-deltaY;
    var width=document.documentElement.clientWidth-parent.offsetLeft-50;
    var height=document.documentElement.clientHeight-parent.offsetTop-50;
    if(tempX<300){
      tempX=300;
    }
    if(tempX>width){
      tempX=width;
    }
    if(tempY<200){
      tempY=200;
    }
    if(tempY>height){
      tempY=height;
    }
    switch(type){
      case 'r':
      obj.style.left=tempX+'px';
      parent.style.width=tempX+'px';
      obj1.style.left=tempX+'px';break;
      case 'b':
      obj.style.top=tempY+'px';
      parent.style.height=tempY+'px';
      obj1.style.top=tempY+'px';break;
      case 'br':
      obj.style.top=tempY+'px';
      parent.style.height=tempY+'px';
      obj.style.left=tempX+'px';
      parent.style.width=tempX+'px';
      obj1.style.left=tempX+'px';
      obj2.style.top=tempY+'px';
      break;
    }

    //obj.style.top=tempY+'px';
    //这两句是后来才加上的

  //  parent.style.top=tempY+'px';
  }
  document.onmouseup=function(){
    obj.onmousedown=null;
    document.onmousemove=null;
  }
}
