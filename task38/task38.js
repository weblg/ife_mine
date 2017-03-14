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
//要渲染表格的数据
var tableData={
  thData:['姓名','语文','数学','英语','总分'],
  tdData:[
    ['小明',80,90,70,240],
    ['小红',90,60,90,240],
    ['小亮',60,100,70,230],
    ['小强',100,70,80,250]
  ],
  colnum:5,
  rownum:5
};
var table=document.getElementsByTagName('table')[0];
addth();
addtr();
//先添加th吧
function addth(){
  var myth=document.createElement('tr');
  addtd(0,myth,tableData.thData);
  table.appendChild(myth);
  //给th的后四个单元格添加上下箭头
  var td=myth.cells;
//  var myTop=addTopArrow();
//  var myBot=addBotArrow();
  for(var i=1;i<td.length;i++){
    var myTop=addTopArrow();
    var myBot=addBotArrow();
    td[i].appendChild(myTop);
    td[i].appendChild(myBot);
  //  给箭头添加点击事件
    addEvent(myTop,'click',function(num){
      return function(){
         clickEvent(num,true);
      }
    }(i));
    addEvent(myBot,'click',function(num){
      return function(){
         clickEvent(num,false);
      }
    }(i));
  }
}
//var th=addth();
//table.appendChild(th);
//var tr=addtr();
//table.appendChild(tr);
function clickEvent(index,flag){
  //window.alert(index);
  var newarr=[];
  var oldarr=[];
  var temparr=[];
  var temp;
  //获取的点击的当前列的数值
  for(var i=1;i<tableData.rownum;i++){
    newarr.push(table.rows[i].cells[index].innerText);
    //oldarr.push(table.rows[i].cells[index].innerText);
  }
  newarr.sort(sortNumber);
  if(!flag){//如果是向下箭头被点击，需逆序
    newarr.reverse();
  }

  //var newindex=newarr.indexOf(oldarr[1]);
  //console.log(newindex);
  for(var j=0;j<newarr.length;j++){
    for(var k=0;k<newarr.length;k++){
      temparr.push(table.rows[k+1].cells[index].innerText);
    }

    //temparr.push();
    var newindex=temparr.indexOf(newarr[j]);
    if(newindex!=j){//此时应该进行行的交换
     temp=table.rows[j+1].innerHTML;
      table.rows[j+1].innerHTML=table.rows[newindex+1].innerHTML;
      table.rows[newindex+1].innerHTML=temp;
      //交换完之后将temparr清空
      temparr.splice(0);
    }
  }
  //console.log(oldarr);
  //console.log(newarr);
}
//排序函数
function sortNumber(a,b){
  return a-b;//从小到大进行排序，逆序
}
//addth();
//addtr();
function addtr(){
  var len=tableData.tdData.length;//共有多少内容行
  for (var i = 0; i <len ; i++) {
    var mytr=document.createElement('tr');
    addtd(i,mytr,tableData.tdData[i]);
    table.appendChild(mytr);
  }
  //return mytr;
}

function addtd(index,tr,data){
  //var len=tableData.data[0].length;//共有多少列
  //var text="";
  for(var i=0;i<tableData.colnum;i++){
    var mytd=document.createElement('td');
    mytd.innerText=data[i];
    tr.appendChild(mytd);//每创建一个td就给加到本行中
  }
}
function addTopArrow(){
  var myTop=document.createElement('div');
  myTop.className='toparrow';
  return myTop;
}

function addBotArrow(){
  var myBot=document.createElement('div');
  myBot.className='bottomarrow';
  return myBot;
}
