//在这里面封装一个可以渲染表格并实现一定功能的模块
var table=(function(){
  var allData;
  function init(optis){
    return new Table(optis);
  }
  function Table(optis){
    allData=optis;
    var table=document.getElementById('tab');
    this.addth(table);
    this.addtr(table);
    var thRow=table.children[0];
    var eletop=table.offsetTop;
    var eleHeight=table.offsetHeight;
    //判断table是否固定
    this.addEvent(document,'scroll',function(){
      //
      if(window.scrollY>eletop){
      //  console.log("可以定位了");
        thRow.style.position="fixed";
        thRow.style.top="0px";
        thRow.nextSibling.style.display="";
      }else{
      //  console.log("不需要定位");
      thRow.style.position="static";
      thRow.nextSibling.style.display="none";
      }
      //判断table是否隐藏
      if(window.scrollY>(eletop+eleHeight)){
          //console.log("ddd");
          thRow.style.display="none";
      }else{
        //thRow.style.display="";
        thRow.style.display="";
      }
    });
  }

  Table.prototype={
    //添加事件响应函数
    addEvent:function(obj,eve,fun){
      if(obj.attachEvent){
        obj.attachEvent("on"+eve,fun);
      }else if(obj.addEventListener){
        obj.addEventListener(eve,fun,false);
      }else{
        obj["on"+eve]=fun;
      }
    },
    //用于渲染单元格的函数，传入数据父元素即可
    addtd:function(index,tr,data){
      for(var i=0;i<allData.thData.length;i++){
        var mytd=document.createElement('td');
        mytd.innerText=data[i];
        tr.appendChild(mytd);//每创建一个td就给加到本行中
      }
    },
    //给th的某些单元格添加上下箭头
    addTopArrow:function(){
      var myTop=document.createElement('div');
      myTop.className='toparrow';
      return myTop;
    },
    addBotArrow:function(){
      var myBot=document.createElement('div');
      myBot.className='bottomarrow';
      return myBot;
    },
    //添加表格内容的方法
    addtr:function(table){
      var myspace=document.createElement('tr');
      var mycell=document.createElement('td');
      myspace.style.display="none";
      //myspace.style.backgroundColor="red";
      myspace.appendChild(mycell);
      table.appendChild(myspace);
      var len=allData.tdData.length;//共有多少内容行
      for (var i = 0; i <len ; i++) {
        var mytr=document.createElement('tr');
        this.addtd(i,mytr,allData.tdData[i]);
        table.appendChild(mytr);
      }
    },
    clickEvent:function(){
    //
    //  console.log(num);
    },
    //添加表头的方法
    addth:function (table){
      var myth=document.createElement('tr');
      this.addtd(0,myth,allData.thData);
      table.appendChild(myth);
      /*var myspace=document.createElement('tr');
      myspace.style.display="display";
      myspace.style.backgroundColor="red";
      table.appendChild(myspace);*/
      //给th的后四个单元格添加上下箭头
      var td=myth.cells;
      for(var i=1;i<td.length;i++){
        var myTop=this.addTopArrow();
        var myBot=this.addBotArrow();
        td[i].appendChild(myTop);
        td[i].appendChild(myBot);
      //  给箭头添加点击事件
        this.addEvent(myTop,'click',function(num){
          return function(){
            clickEvent(num,true);
          }
        }(i));
        this.addEvent(myBot,'click',function(num){
          return function(){
             clickEvent(num,false);
          }
        }(i));
      }
      function clickEvent(index,flag){
      //  console.log(index);
        var newarr=[];
        var oldarr=[];
        var temparr=[];
        var temp;
        //获取的点击的当前列的数值
        for(var i=1;i<allData.tdData.length+1;i++){
          newarr.push(table.rows[i].cells[index].innerText);
        }
        newarr.sort(sortNumber);
        if(!flag){//如果是向下箭头被点击，需逆序
          newarr.reverse();
        }
        for(var j=0;j<newarr.length;j++){
          for(var k=0;k<newarr.length;k++){
            temparr.push(table.rows[k+1].cells[index].innerText);
          }
          var newindex=temparr.indexOf(newarr[j]);
          if(newindex!=j){//此时应该进行行的交换
           temp=table.rows[j+1].innerHTML;
            table.rows[j+1].innerHTML=table.rows[newindex+1].innerHTML;
            table.rows[newindex+1].innerHTML=temp;
            //交换完之后将temparr清空
            temparr.splice(0);
          }
        }
      }
      function sortNumber(a,b){
        return a-b;//从小到大进行排序，逆序
      }
    }

  };
  return {
    //init:init;这块不应该用分号，毕竟是在对象里面
    init:init
  }
}());
table.init({
  tabId:"tab",
  thData:['姓名','语文','数学','英语','总分'],
  tdData:[
    ['小明',8,9,7,24],
    ['小红',9,6,8,23],
    ['小亮',6,10,7,23],
    ['小强',10,7,8,25],
    ['小张',9,6,10,25],
    ['小李',6,7,9,22]
  ]
});
