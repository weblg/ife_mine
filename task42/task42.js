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
  //渲染表格
  renderCalendar(totalDay,week);
}
function createTrTd(){
  for (var i = 0; i < 6 ; i++) {
    var mytr=document.createElement('tr');
    for(var j=0;j<7;j++){
      var mytd=document.createElement('td');
      mytd.className='currentColor';
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
var flagtext=[];//记录时间段的首尾
var tempday;//记录放入时间段数组中的数
function renderCalendar(totalDay,week){
  createTrTd();
  var td=table.getElementsByTagName('td');
  var len=td.length;
  var flag=false;//标志当月的第一天是不是周天
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
      var select=document.getElementsByClassName("select1")[0];
      var selectVal=select.options[select.selectedIndex].value;
      if(selectVal==="1"){
        alert("只能选择当月日期");
        return;
      }
      temp=this;
      temptext=temp.innerText;
      tempday=temptext;
      notCurrentEvent(premonth,preyear,temptext);
      //window.alert("回调函数");
        console.log("上月的点击");
    });
  }
  var jdate=1;//记录当前月的日期
  var deadline=week+totalDay;
  //len的长度为42即所有td的数量
  for(var i=week;i<len;i++){
    //var deadline=week+totalDay;
    //防止从第一行第一列开始显示日期
    if(flag){
     i=7;
     deadline=deadline+7;
     flag=false;
    }
    //这句话用来给当月日历填值
    td[i].innerText=jdate;
    //如果是周六或周日字体颜色为红,此week只代表了当月的第一天
  //  holidayCss(td,i,deadline,week);
    //给日期加红色背景。白色字体
    if(jdate==temptext&&i<deadline){
      td[i].style.backgroundColor='#C81B01';
      td[i].style.color='white';
    }
    //若下一月或上一月没有当月的日期，使1号有红色背景
    if(temptext>totalDay){
      if(jdate==1&&i<deadline){
        td[i].style.backgroundColor='#C81B01';
        td[i].style.color='white';
        temptext=1;
      }
    }
    //给本月添加点击事件
    if(i<deadline){
      var flagtext1,flagtext2;
      //var tempday;
      addEvent(td[i],'click',function(){
        temp=this;
        temptext=temp.innerText;
        var day=new Date();
        day.setFullYear(extractNum().year,extractNum().month,temptext);
        //如果选取的是时间段则不清除样式
        var select=document.getElementsByClassName("select1")[0];
        var selectVal=select.options[select.selectedIndex].value;
        if(selectVal=="0"){
          //清空之前的日期的背景等样式，
          //只显示当前点击的日期的样式
          clearCurrentMonth(deadline,i,day);
          tempday=temptext;
          //flagtext=[];
          //选择日期的时候点击在文本框中显示，选择时间段用另外一种方法
          //将当前的日期显示到文本框中
          var daynow=temptext<10?('0'+temptext):temptext;
          var monthnow=extractNum().month<10?('0'+extractNum().month):extractNum().month;
          var text=document.getElementById("text");
          text.value=extractNum().year+"年"+monthnow+"月"+daynow+"日";
        }
        this.style.backgroundColor='#C81B01';
        this.style.color='white';
      //  flagtext1=temptext;
        if(selectVal=="1"){

          /*$("select").change(function(){
              $(this).css("background-color","#FFFFCC");
              selectChange();
            });*/
          //clearCurrentMonth(deadline,i,day);
          //tempday用于记录时间段首次选之前日历上的值
          if(tempday){
            flagtext.push(tempday);
            tempday="";
          }
          flagtext.push(temptext);
          if(flagtext.length>2){
            flagtext.shift();
          }
          if(flagtext.length==2){
                //找出这列数中的最大值
                var flagtext2 = Math.max.apply(Math, flagtext);
                //找出这列数中的最小值
                var flagtext1 = Math.min.apply(Math, flagtext);
                var td=document.getElementsByTagName("td");
                for(var k=week;k<deadline;k++){
                  if(parseInt(td[k].innerText)>flagtext1&&parseInt(td[k].innerText)<flagtext2){
                    td[k].style.backgroundColor="pink";
                    td[k].style.color="black";
                  }else {
                    if(td[k].innerText!=flagtext1&&td[k].innerText!=flagtext2){
                         td[k].style.backgroundColor="";
                         td[k].style.color="black";
                    }
                  }
                }
              }
        }
         flagtext1=temptext;
        //将当前的日期显示到文本框中
      /*  var daynow=temptext<10?('0'+temptext):temptext;
        var monthnow=extractNum().month<10?('0'+extractNum().month):extractNum().month;
        var text=document.getElementById("text");
        text.value=extractNum().year+"年"+monthnow+"月"+daynow+"日";*/
          console.log("本月的点击");
      });
    }
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
        var select=document.getElementsByClassName("select1")[0];
        var selectVal=select.options[select.selectedIndex].value;
        if(selectVal=="1"){
          alert("只能选择当月日期");
          return;
        }
        temp=this;
        temptext=temp.innerText;
        tempday=temptext;
        notCurrentEvent(nextmonth,nextyear,temptext);
        //window.alert("回调函数");
        console.log("下月的点击");
      });
    }
  }
}

//currentMONTH当月点击之前请清空
function clearCurrentMonth(deadline,index,day){
  var td=table.getElementsByTagName('td');
  var len=td.length;
  for(var i=0;i<len;i++){
      td[i].style.backgroundColor='';
      td[i].style.color='';
  }
}
//给month添加事件处理函数
function notCurrentEvent(month,year,day){
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
  //获取当前的日期并显示在文本框中
  day=day<10?('0'+day):day;
  var text=document.getElementById("text");
  text.value=year+'年'+month+'月'+day+'日';
  //等一秒后隐藏
  /*setTimeout(function(){
    calen.style.display="none";
  },1000);*/
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
//给toggle添加点击显示隐藏日历
var toggle=document.getElementById("toggle");

addEvent(toggle,'click',function(){
  //var style=document.defaultView.getComputedStyle(calen,null)["display"];
  if(calen.style.display=="none"){
    calen.style.display="block";
  }else{
    calen.style.display="none";
  }
});
//在选择时间段的时候给calendar加入“确认”取消按
$("select").change(function(){
  var select=document.getElementsByClassName("select1")[0];
  var selectVal=select.options[select.selectedIndex].value;
  if(selectVal=="1"){
    //先将文本框中的内容清空
    var text=document.getElementById("text");
    text.value="";
    /*$(this).css("background-color","#FFFFCC");*/
    //用于改变文本框中的内容
    //buttonConfirm(text);
    selectChange();
  }else{
    if(document.getElementsByTagName("button")){
      $("button").remove();
    }
    var text=document.getElementById("text");
    text.value="";
    //清空样式
    clearCurrentMonth();
    flagtext=[];
  }
  });
function  selectChange(){
  //如果创建了button
  if(document.getElementsByTagName("button")){
    //$(".calen").remove("<button>");
    $("button").remove();
    console.log("YOU按钮");

  }
  $("<button>").text("确认").addClass("confirm").click(function(){
    console.log("点击确认");
    buttonConfirm();
  }).appendTo(".calen");
  $("<button>").text("取消").addClass("cancel").click(function(){
    console.log("点击取消");
    buttonCancel();
  }).appendTo(".calen");
}
//给取消按钮添加事件；
function buttonCancel(){
  setTimeout(function(){
    calen.style.display="none";
  },1000);
}
//给确认添加响应程序
function buttonConfirm(text){
  var text=document.getElementById("text");
  //text.value="";
  //获取表头上的年月
  var control=document.getElementsByClassName("control")[0];
  var contrlText=control.children[1].innerText;
  if(flagtext.length==2){
    //找出这列数中的最大值
    var flagtext2 = Math.max.apply(Math, flagtext);
    //找出这列数中的最小值
    var flagtext1 = Math.min.apply(Math, flagtext);
    var flagtext1=parseInt(flagtext1)<10?('0'+flagtext1):flagtext1;
    var flagtext2=parseInt(flagtext2)<10?('0'+flagtext2):flagtext2;
    text.value=contrlText+flagtext1+"日"+"--"+contrlText+flagtext2+"日";
  }
  setTimeout(function(){
    calen.style.display="none";
  },1000);
}
