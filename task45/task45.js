var Rowphoto=function(){
  this.container=document.querySelector(".rowphotoContainer");
  this.rowMinHeight="200px";
  //将boxes
  this.boxes=Array.prototype.slice.call(this.container.querySelectorAll(".rowphotoBox"));
  for(var i=0;i<this.boxes.length;i++){
    this.boxes[i].ratio=this.boxes[i].clientWidth/this.boxes[i].clientHeight;
  }
  this.compose();
}
Rowphoto.prototype={
  compose:function(){
    var rows=this.calcRow(3,6);
    var index=0;
    this.initRow(rows);
    //将所有的box添加到row中
    for(var i=0;i<this.boxes.length;i++){
      if(i>rows[index].number)index++;
      this.boxes[i].style.height="100%";
      this.boxes[i].style.width="";
      this.rows[index].appendChild(this.boxes[i]);
    }
  },
  calcRow:function(min,max){
    var height=parseInt(this.rowMinHeight.slice(0,-2));
    var width=0;//作为一个中间变量用于判断当前行的宽与container宽之间的关系
    var count=0;
    var totalWidth;//此行当前的宽度；
    var totalHeight;
    var ratio;
    var rows=[];
    for(var i=0;i<this.boxes.length;i++){
      this.boxes[i].style.height=height+"px";
      this.boxes[i].style.width=height*this.boxes[i].ratio+"px";
      width+=height*this.boxes[i].ratio;
      count++;//用于保存当前记录了几个boxes
      //注意何时算是一行，满足的条件
      if((width>this.container.clientWidth&&count>min)||count>max){
        totalWidth=width-height*this.boxes[i].ratio;//事实上-的不是加的；
        ratio=height/totalWidth;
        totalHeight=this.container.clientWidth*ratio;
        rows.push({number:i-1,height:totalHeight});
        count=1;
        width=height*this.boxes[i].ratio;
      }
    }
    rows.push({number:i,height:height});
    return rows;
  },
  initRow:function(row){
    this.rows=[];
    for(var i=0;i<row.length;i++){
      var rowDiv=document.createElement("div");
      rowDiv.style.height=row[i].height+"px";
      rowDiv.className="rowphotoRow"
      this.rows.push(rowDiv);
      this.container.appendChild(rowDiv);
    }
  }
}
//计算出这些图片可以排成几行，每行到第几个div结束；

//根据计算出来的rows初始化行,其实就是写出框架；
//储存row的框架；

//将这些图片添加到构建好的框架中；

window.onload=function(){
  var rowphoto=new Rowphoto();
}
//var str=rowMinHeight.slice(0,-2);
//console.log(str+1);
