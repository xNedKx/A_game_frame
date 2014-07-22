var co,w,h,sX,sY,bgp;
w=600;
h=100;
sX=60;
sY=10;
bgp=[0,0];
function createC(){
  if(co){while(co.firstChild){co.removeChild(co.firstChild)};co.parentNode.removeChild(co);}
  document.body.appendChild(co=document.createElement('div'));
  co.style.position='relative';
  co.style.overflow='hidden';
  co.style.margin='10px auto';
  co.style.border='1px solid #000';
  co.style.width=w+'px';
  co.style.height=h+'px';
}
function createS(){
  while(co.firstChild){co.removeChild(co.firstChild)};
  var tmp;
  for(var i=0;i<sX;i++){
    for(var j=0;j<sY;j++){
      co.appendChild(tmp=document.createElement('div'));
      tmp.style.position='absolute';
      tmp.style.top=h-(j+1)*h/sY+'px';
      tmp.style.left=i*w/sX+'px';
      tmp.style.width=w/sX+'px';
      tmp.style.height=h/sY+'px';
      tmp.className='x_'+i+' y_'+j;
      tmp.style.backgroundColor='rgba('+(Math.floor(Math.random()*100)+155)+','+(Math.floor(Math.random()*20)+35)+','+(Math.floor(Math.random()*20)+35)+','+(Math.floor(Math.random()*0.1)+0.9)+')';
      tmp.style.opacity='0.4';
      tmp.onmousedown=startSel;
      tmp.onmouseover=selection;
      tmp.onmouseup=endSel;
      co.onmouseleave=endSel;
    }
  }
}
var ss=false;
var keep=false;
var sds=[];
var dir;
function startSel(e){
  e.preventDefault();
  if(!keep){
    while(sds.length>0){
      unselect(sds[sds.length-1]);
      sds.pop();
    }
    sds=[];
  }
  ss=true;
  sds.push(this);
  selected(this);
  dir=null;
}
function selection(e){
  if(ss){
    if(sds.indexOf(this)==-1){
      if(dir=neighbor(sds[sds.length-1],this)){
        selected(this);
        switch(dir){
        case 'up':
          this.style.borderBottom='1px solid '+this.style.backgroundColor;
          sds[sds.length-1].style.borderTop='1px solid '+sds[sds.length-1].style.backgroundColor;
        break;
        case 'down':
          this.style.borderTop='1px solid '+this.style.backgroundColor;
          sds[sds.length-1].style.borderBottom='1px solid '+sds[sds.length-1].style.backgroundColor;
        break;
        case 'left':
          this.style.borderRight='1px solid '+this.style.backgroundColor;
          sds[sds.length-1].style.borderLeft='1px solid '+sds[sds.length-1].style.backgroundColor;
        break;
        case 'right':
          this.style.borderLeft='1px solid '+this.style.backgroundColor;
          sds[sds.length-1].style.borderRight='1px solid '+sds[sds.length-1].style.backgroundColor;
        break;
        }
        sds.push(this);
      }
    }else if(sds.indexOf(this)==sds.length-2){
      unselect(sds[sds.length-1]);
      sds.pop();
      selected(sds[sds.length-1]);
      if(sds.length>2){
      switch(neighbor(sds[sds.length-2],sds[sds.length-1])){
      case 'up':
        sds[sds.length-1].style.borderBottom='1px solid '+sds[sds.length-1].style.backgroundColor;
      break;
      case 'down':
        sds[sds.length-1].style.borderTop='1px solid '+sds[sds.length-1].style.backgroundColor;
      break;
      case 'left':
        sds[sds.length-1].style.borderRight='1px solid '+sds[sds.length-1].style.backgroundColor;
      break;
      case 'right':
        sds[sds.length-1].style.borderLeft='1px solid '+sds[sds.length-1].style.backgroundColor;
      break;
      }
      }
    }
  }
}
function endSel(){
  if(sds.length<=1){
    while(sds.length>0){
      unselect(sds[sds.length-1]);
      sds.pop();
    }
    sds=[];
  }
  ss=false;
}
function selected(dom){
  dom.style.width=(dom.offsetWidth-2)+'px';
  dom.style.height=(dom.offsetHeight-2)+'px';
  dom.style.border='1px solid #000';
  dom.style.opacity='1';
}
function unselect(dom,dir){
  dom.style.width=(dom.offsetWidth)+'px';
  dom.style.height=(dom.offsetHeight)+'px';
  dom.style.border='none';
  dom.style.opacity='0.4';
}
function neighbor(d1,d2){
  var d1x,d1y,d2x,d2y,x1,x2,y1,y2;
  d1x=d1.className.match(/x_(\d+)/);
  d1y=d1.className.match(/y_(\d+)/);
  d2x=d2.className.match(/x_(\d+)/);
  d2y=d2.className.match(/y_(\d+)/);
  if(d1x&&d1y&&d2x&&d2y){
    x1=parseInt(d1x[1]);
    y1=parseInt(d1y[1]);
    x2=parseInt(d2x[1]);
    y2=parseInt(d2y[1]);
    if(x1==x2){
      if(y1==y2-1){
        return 'up';
      }else if(y1==y2+1){
        return 'down';
      }
    }else if(y1==y2){
      if(x1==x2-1){
        return 'right';
      }else if(x1==x2+1){
        return 'left';
      }
    }
  }
  return false;
}
window.onload=function(){
document.body.onkeypress=function(e){if(e.keyCode==32){keep=true;}}
document.body.onkeyup=function(){keep=false;}
createC();
createS();
}