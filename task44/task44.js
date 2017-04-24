(function(){
    //n表示多少列，其中空隙有5列
//  var n=4;
  var arrhei=[100,150,50,200];
  var container=document.getElementsByClassName("container")[0];
  var totalWidth=document.defaultView.getComputedStyle(container,null)["width"];
  var colWidth=0;
  var arrheight=[];
  function init(col){
    //计算每列的宽度
    //var colWidth=(parseInt(totalWidth)-16*(n+1))/n+"px";
    colWidth=(parseInt(totalWidth)-16*(col+1))/col+"px";
    //初始化N列div
    for(var k=0;k<col;k++){
      var div=document.createElement("div");
      div.className="div"+(k+1);
      div.innerText=(k+1);
      //container.style.
      //给每个div
      addEvent(div,"click",function(){
          cover.style.display="block";
          cover.style.height=document.body.scrollHeight+"px";
          console.log(document.body.scrollHeight);
          var selfDiv=document.getElementsByClassName("self")[0];
          selfDiv.style.display="block";
          disDiv(this);
      });
      container.appendChild(div);
    }
    //获取所有container底下的div
    var divs=container.getElementsByTagName("div");
    for(var i=0,len=divs.length;i<len;i++){
      divs[i].style.width=colWidth;

      divs[i].style.marginTop="16px";
      //colheight=Math.floor(Math.random()*100+50)+"px";
      var arrindex=Math.floor(Math.random()*4);
      var colheight=arrhei[arrindex]+"px";
      divs[i].style.height=colheight;

      //divs[i].style.lineHeight=colheight;
      arrheight.push(parseInt(colheight)+16);
      var maxHeight=findMaxHei(arrheight);
      container.style.height=maxHeight+"px";
    }
  }
var initbtn=document.getElementById("init");
var flag=0;//表示有没有初始化
addEvent(initbtn,"click",function(){
  if(flag==0){
    var cloum=document.getElementById("textcol");
    var textcol=parseInt(cloum.value);
    console.log(textcol);
    init(textcol);
  }else{
    window.alert("you should reset first");
  }
  flag=1;
});
//  init();
  function addNewDiv(){
    var divs=container.getElementsByTagName("div");
    var len=divs.length+1;
    var minindex=findMinHei(arrheight);
    var newdiv=document.createElement("div");
    var newindex=Math.floor(Math.random()*4);
    var newcolheight=arrhei[newindex]+"px";
    newdiv.style.width=colWidth;
    newdiv.style.height=newcolheight;
    newdiv.style.lineHeight=newcolheight;
    newdiv.innerText=len;
  //  newdiv.style.marginTop="16px";
    newdiv.style.position="absolute";
    newdiv.style.left=(16+parseInt(colWidth))*(minindex)+"px";
    newdiv.style.top=arrheight[minindex]+16+"px";
    //给每个div
    addEvent(newdiv,"click",function(){
        cover.style.display="block";
        cover.style.height=document.body.scrollHeight+"px";
        console.log(document.body.scrollHeight);
        var selfDiv=document.getElementsByClassName("self")[0];
        selfDiv.style.display="block";
        disDiv(this);
    });
    container.appendChild(newdiv);
    //window.alert(newdiv.style.position);
    //更新记录四列总高度不算margin
    arrheight[minindex]=arrheight[minindex]+arrhei[newindex]+16;
    //变化container的高度
    var maxheight=findMaxHei(arrheight);
    console.log(maxheight);
    container.style.height=maxheight+"px";
    //container.style.overflow="hidden";
  }
  //动态创建div并放在合适的位置
  //找出上一行中最小的height
  function findMinHei(arrheight){
    var minHei,minindex=0;
    minHei=arrheight[0];
    for (var i = 1; i < arrheight.length; i++) {
      if(arrheight[i]<minHei){
        minHei=arrheight[i];
        minindex=i;
      }
    }
    return minindex;
  }
  //找出最大的高度，为了container的border动态变化
  function findMaxHei(arrheight){
    var maxHei,maxindex=0;
    maxHei=arrheight[0];
    for (var i = 1; i < arrheight.length; i++) {
      if(arrheight[i]>maxHei){
        maxHei=arrheight[i];
        maxindex=i;
      }
    }
    return maxHei;
  }
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
  var btn=document.getElementById("btn");
  addEvent(btn,"click",function(){
    if(flag===1){
      addNewDiv();
    //  flag=0;
    }

  });
  //点击遮罩层并隐藏
  var cover=document.getElementsByClassName("cover")[0];
  addEvent(cover,"click",function(){
    cover.style.display="none";
    var selfDiv=document.getElementsByClassName("self")[0];
    selfDiv.style.display="none";
  });
  //获取点击的div的宽和高，并将其显示在遮罩层上方
  function disDiv(div){
    var nowWid=div.style.width;
    var nowHei=div.style.height;
    //var newDiv=document.createElement("div");
    var selfDiv=document.getElementsByClassName("self")[0];
    selfDiv.style.width=nowWid;
    selfDiv.style.height=nowHei;
    selfDiv.style.lineHeight=nowHei;
    //newDiv.style.bacgroundColor="red";
    selfDiv.innerText=div.innerText;
    //newDiv.style.position="absolute";
    selfDiv.style.top=window.innerHeight/2-parseInt(nowHei)/2+"px";
    selfDiv.style.left=window.innerWidth/2-parseInt(nowWid)/2+"px";
  //  selfDiv.style.left="300px";
  //  cover.appendChild(newDiv);
  }
  var reset=document.getElementById("reset");
  addEvent(reset,"click",function(){
    var cloum=document.getElementById("textcol");
    cloum.value="";
    container.innerHTML="";
    container.style.height="0px";
    flag=0;
    arrheight=[];
  });
}());
