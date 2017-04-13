//动态设置html
var item=1;
function images(){
  var container=document.getElementsByClassName("container")[0];
  var mydiv=document.createElement("div");
  mydiv.className="gallery";
//  appendChild(pElement);
  var br=document.createElement("br");
  container.appendChild(mydiv);
  container.appendChild(br);
  for(var i=1;i<=item;i++){
    var image=document.createElement("img");
    image.src="image/"+i+".jpg";
    mydiv.className+=" gallery-"+item;
    mydiv.appendChild(image);
  }
  item++;
  if(item==6){
    item=1;
    clearInterval(mytimer);
  }
}
var mytimer=setInterval(images,1000);
