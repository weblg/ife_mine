function addEvent(obj,eve,fun){
  if(obj.attachEvent){
    obj.attachEvent("on"+eve,fun);
  }else if(obj.addEventListener){
    obj.addEventListener(eve,fun,false);
  }else{
    obj["on"+eve]=fun;
  }
}
var allData={
  thData:['日','一','二','三','四','五','六'],
};
//var table=document.getElementsByTagName('table')[0];
var calen=document.getElementsByClassName('calen')[0];
var table;
//添加当前月份的div
calenHead();
//添加星期的th
createTable();
addthead();
//添加空的单元
initial();

//创建表格
function createTable(){
  table=document.createElement('table');
  calen.appendChild(table);
}
//获取当前日期
function currentYearMonth(date){
  //var date=new Date();
  var year=date.getFullYear();
  var month=date.getMonth()+1;
  month=month>10?month:'0'+month;
  return year+'年'+month+'月';
}
//先创建日期选择的部分
function calenHead(){
  var div=document.createElement('div');
  div.className='control';
  var div1=document.createElement('div');
  var div2=document.createElement('div');
  var div3=document.createElement('div');
  var date=new Date();
  time=currentYearMonth(date);
  div2.innerText=time;
  addEvent(div1,'click',preMonth);
  addEvent(div3,'click',nextMonth);
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  calen.appendChild(div);
}
//给控制部分添加事件处理程序
function preMonth(){
  //获取div2中的文本
  var obj=extractNum();
  var year=obj.year;
  var month=obj.month;
  var control=document.getElementsByClassName('control')[0];
  //window.alert(year+''+month);
  month--;
  if(month==0){
    year--;
    month=12;
  }
  month=month>=10?month:'0'+month;
  control.children[1].innerText=year+'年'+month+'月';
  clearTable();
  getYearMonth();
}
function nextMonth(){
  //获取div2中的文本
  var obj=extractNum();
  var year=obj.year;
  var month=obj.month;
  var control=document.getElementsByClassName('control')[0];
  month++;
  if(month==13){
    year++;
    month=1;
  }
  month=month>=10?month:'0'+month;
  control.children[1].innerText=year+'年'+month+'月';
  //应该先来个清空
  clearTable();
  getYearMonth();
}
function addth(index,tr,data){
  for(var i=0;i<allData.thData.length;i++){
    var myth=document.createElement('th');
    myth.innerText=data[i];
    tr.appendChild(myth);//每创建一个td就给加到本行中
  }
}
function addthead(){
  var mythead=document.createElement('tr');
  addth(0,mythead,allData.thData);
  table.appendChild(mythead);
}
//获取当月的天数
function getDayNum(year,month){
  if(month==4||month==6||month==9||month==11){
    totalDay=30;
  }
  if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
    totalDay=31;
  }
  if(month==2){
    if((year%4==0&&year%100!=0)||year%400==0){
      totalDay=29;
    }else{
      totalDay=28;
    }
  }
  return totalDay;
}
//获取本月第一天是星期几
function getWeek(year,month){
  var curentday=new Date();
  curentday.setFullYear(year,month-1,1);
  week=curentday.getDay();
  return week;
}
//这个函数是真正的返回一个对象，包含年和月
function extractNum(){
  var control=document.getElementsByClassName('control')[0];
  var text=control.children[1].innerText;
  var year=parseInt(text.slice(0,4));
  var month=parseInt(text.slice(5,7));
  var obj={
    year:year,
    month:month
  };
  return obj;
}
//获取当前control上的年和月以及天数和星期并调用渲染表格
function getYearMonth(){
  var obj=extractNum();
  var year=obj.year;
  var month=obj.month;
  var totalDay=0;
  var week=0;
  //判断这个月有多少天
  totalDay=getDayNum(year,month);
  //判断这个月的第一天是星期几
  week=getWeek(year,month);
  //console.log('本月'+month+'天数'+totalDay);
  //渲染表格
  renderCalendar(totalDay,week);
}
function createTrTd(){
  for (var i = 0; i < 6 ; i++) {
    var mytr=document.createElement('tr');
    for(var j=0;j<7;j++){
      var mytd=document.createElement('td');
      mytd.className='currentColor';
      //mytd.innerText=data[i];
      mytr.appendChild(mytd);//每创建一个td就给加到本行中
    }
    table.appendChild(mytr);
  }
  var td=table.getElementsByTagName('td');
  //console.log('一共创建了'+td.length+'个单元格');
}
//保存日历被渲染之前点击的对象
var temp;
var temptext;
function renderCalendar(totalDay,week){
  createTrTd();
  var td=table.getElementsByTagName('td');
  var len=td.length;
  var flag=false;
  var premonth=extractNum().month-1;
  var premonthNum=getDayNum(extractNum().year,premonth);
  var preyear=extractNum().year;
  var k=0;
  //不足本月的倒着来
  if(week==0){
    flag=true;
  }
  if(flag){
    k=6;
  }else{
    k=week-1;
  }
  for(k;k>=0;k--){
    td[k].innerText=premonthNum;
    td[k].className='notcurrentColor';
    premonthNum--;
    addEvent(td[k],'click',function(){
      temp=this;
      temptext=temp.innerText;
      notCurrentEvent(premonth,preyear);
    });
  }
  var jdate=1;
  var deadline=week+totalDay;
  for(var i=week;i<len;i++){
    //var deadline=week+totalDay;
    if(flag){
     i=7;
     deadline=deadline+7;
     flag=false;
    }
    td[i].innerText=jdate;
    if(jdate==temptext&&i<deadline){
      td[i].style.backgroundColor='#C81B01';
      td[i].style.color='white';
    }
    if(temptext>totalDay){
      if(jdate==1&&i<deadline){
        td[i].style.backgroundColor='#C81B01';
        td[i].style.color='white';
        temptext=1;
      }
    }
    addEvent(td[i],'click',function(){
      temp=this;
      temptext=temp.innerText;
      clearCurrentMonth();
      this.style.backgroundColor='#C81B01';
      this.style.color='white';
    });
    jdate++;
    //超出本月的顺延
    if(jdate==totalDay+1){
      jdate=1;
    }
    if(i>=deadline){
      td[i].className='notcurrentColor';
      var obj=extractNum();
      var nextyear=obj.year;
      var nextmonth=obj.month+1;
      addEvent(td[i],'click',function(){
        temp=this;
        temptext=temp.innerText;
        notCurrentEvent(nextmonth,nextyear);
      });
    }
  }
}
//currentMONTH当月点击之前请清空
function clearCurrentMonth(){
  var td=table.getElementsByTagName('td');
  var len=td.length;
  for(var i=0;i<len;i++){
    td[i].style.backgroundColor='';
    td[i].style.color='';
  }
}
//给premonth添加事件处理函数
function notCurrentEvent(month,year){
  //改变control内容
  var control=document.getElementsByClassName('control')[0];
  if(month==0){
    year--;
    month=12;
  }
  if(month==13){
    year++;
    month=1;
  }
  month=month<10?('0'+month):month;
  control.children[1].innerText=year+'年'+month+'月';
  //重新渲染日历
  clearTable();
  getYearMonth();
  //所点击的变色
}
//切换年月的时候给表格清空,清空DOM而不是innerText
function clearTable(){
  var tr=table.getElementsByTagName('tr');
  var len = table.rows.length;
  for(var i=1;i<len;i++){
    table.deleteRow(1);
  }
}
//给所有的div添加点击函数
function initial(){
  getYearMonth();
}
