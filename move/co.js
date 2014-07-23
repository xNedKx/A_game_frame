function Xcollision(x1,w1,x2,w2){
  if((x1<=x2&&x2<=x1+w1-1)||(x2<=x1&&x1<=x2+w2-1)){return true;}else{return false;}
}
function Ycollision(y1,h1,y2,h2){
  if((y1<=y2&&y2<=y1+h1-1)||(y2<=y1&&y1<=y2+h2-1)){return true;}else{return false;}
}
function collision(x1,y1,w1,h1,x2,y2,w2,h2){
  if(Xcollision(x1,w1,x2,w2)&&Ycollision(y1,h1,y2,h2)){return true;}else{return false;}
}
function DOMcollision(d1,d2){
  if(collision(d1.offsetLeft,d1.offsetTop,d1.offsetWidth,d1.offsetHeight,d2.offsetLeft,d2.offsetTop,d2.offsetWidth,d2.offsetHeight)){
    return true;
  }else{return false;}
}
var o=document.createElement('div');
o.style.width='20px';
o.style.height='20px';
o.style.backgroundColor='#000';
o.style.position='absolute';
o.style.transition='background-color 0.01s linear';
o.style.zIndex='10000';
var DOM=document.body;
DOM.appendChild(o);
DOM.style.overflow='hidden';
DOM.style.position='relative';
var spd=10;
function move(dom,obj,dir){
  switch(dir){
  case 'up':
    if(obj.offsetTop>dom.offsetTop){m=(Number(obj.style.top.slice(0,-2))-spd);m=m<0?0:m;obj.style.top=m+'px';}
  break;
  case 'down':
    if(obj.offsetTop+obj.offsetHeight<dom.offsetTop+dom.offsetHeight){m=(Number(obj.style.top.slice(0,-2))+spd);m=m+obj.offsetHeight>dom.offsetHeight?dom.offsetHeight-obj.offsetHeight:m;obj.style.top=m+'px';}
  break;
  case 'left':
    if(obj.offsetLeft>dom.offsetLeft){m=(Number(obj.style.left.slice(0,-2))-spd);m=m<0?0:m;obj.style.left=m+'px';}
  break;
  case 'right':
    if(obj.offsetLeft+obj.offsetWidth<dom.offsetLeft+dom.offsetWidth){m=(Number(obj.style.left.slice(0,-2))+spd);m=m+obj.offsetWidth>dom.offsetWidth?dom.offsetWidth-obj.offsetWidth:m;obj.style.left=m+'px';}
  break;
  }
}
function keyMove(){
  if(keyCache[38]!=keyCache[40]&&keyCache[37]!=keyCache[39]){spd*=0.7}
  if(keyCache[38]&&!keyCache[40]){
    move(DOM,o,'up');
  }else if(keyCache[40]&&!keyCache[38]){
    move(DOM,o,'down');
  }
  if(keyCache[37]&&!keyCache[39]){
    move(DOM,o,'left');
  }else if(keyCache[39]&&!keyCache[37]){
    move(DOM,o,'right');
  }
  if(keyCache[38]!=keyCache[40]&&keyCache[37]!=keyCache[39]){spd/=0.7}
  mc();
}
var obs=[];
function mc(){
  var co=false;
  window.setTimeout(function(){
  for(var i=0;i<obs.length;i++){
    if(DOMcollision(o,obs[i])){
      obs[i].style.backgroundColor='#900';
      co=true;
    }else{
      obs[i].style.backgroundColor='#F00';
    }
    if(co){
      o.style.backgroundColor='#0F0';
    }else{
      o.style.backgroundColor='#000';
    }
  }
  },20);
}
var keyCache={};
var mt;
function kd(e){
  if(!keyCache[e.keyCode]){
    keyCache[e.keyCode]=true;
    //console.log('down: '+JSON.stringify(keyCache));
    if(JSON.stringify(keyCache).match(/:/g).length==1){
      mt=window.setInterval(keyMove,20);
      //console.log('start: '+mt);
    }
  }
}
function ku(e){
  if(keyCache[e.keyCode]){
    delete keyCache[e.keyCode];
    //console.log('up: '+e.keyCode);
  }
  if(!(JSON.stringify(keyCache).match(/:/g))){
    window.clearInterval(mt);
    //console.log('end: '+mt);
  }
}
document.body.onkeydown=kd;
document.body.onkeyup=ku;
for(var i=0;i<20;i++){
  obs[i]=document.createElement('div');
  obs[i].style.width=Math.floor(Math.random()*30+Math.random()*10+10)+'px';
  obs[i].style.height=Math.floor(Math.random()*30+Math.random()*10+10)+'px';
  obs[i].style.position='absolute';
  DOM.appendChild(obs[i]);
  var y=Math.floor(Math.random()*DOM.offsetHeight);
  var x=Math.floor(Math.random()*DOM.offsetWidth);
  obs[i].style.top=((y+obs[i].offsetHeight>DOM.offsetTop+DOM.offsetHeight)?DOM.offsetHeight-obs[i].offsetHeight:y)+'px';
  obs[i].style.left=((x+obs[i].offsetWidth>DOM.offsetLeft+DOM.offsetWidth)?DOM.offsetWidth-obs[i].offsetWidth:x)+'px';
  obs[i].style.backgroundColor='#F00';
  obs[i].style.transition='all 0.01s linear';
}