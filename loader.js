function Background(){

}
function Characters(){

}
function Options(){

}
function Frame(){
  //vars
  var container,BGdiv,CHdiv,dialog,optionlist,canvas,BGcanvas,data,pointer;
  ajax=new XMLHttpRequest();
  //functions
  function valid(str){
    return true;//這裡要放資源路徑驗證
  }
  function cleanStr(str){
    return str;//清除injection
  }
  //之後改成內部function
  this.say=function(characters,line){
    names=[];
    if(typeof(characters)=="string"){
      names.push(cleanStr(characters))
    }else{
      for(var i in characters){names.push(cleanStr(i));};
    }
    dialog.innerHTML='<p>'+names.join('、')+'</p><p>'+cleanStr(line)+'</p>'
  }
  //暫時function
  this.changeBG=function(color,src){
    BGcanvas.clearRect(0,0,canvas.width,canvas.height);
    imageObj = new Image();
    imageObj.onload = function(){BGcanvas.drawImage(this,0,0);};
    imageObj.src=src;
    BGdiv.style.backgroundColor=color;
  }
  //測試用，為了外部存取方便設成method
  this.toggleOptionlist=function(){
    optionlist.style.display=(optionlist.style.display=='none')?'block':'none';
  }
  this.toggleCHdiv=function(){
    CHdiv.style.display=(CHdiv.style.display=='none')?'block':'none';
  }
  //PROPERTIES
  this.backgrounds={};
  this.characters={};
  //METHODS
  this.createFrame=function(frameWidth,frameHeight,frameFontSize){
  //create startup elements & style setting
  frameWidth=frameWidth?frameWidth:800;
  frameHeight=frameHeight?frameHeight:600;
  frameFontSize=frameFontSize?frameFontSize:16;
  
  container=container?container:document.createElement('div');
  BGdiv=BGdiv?BGdiv:document.createElement('div');
  canvas=canvas?canvas:document.createElement('canvas');
  CHdiv=CHdiv?CHdiv:document.createElement('div');
  dialog=dialog?dialog:document.createElement('div');
  optionlist=optionlist?optionlist:document.createElement('div');
  
  container.style.width=frameWidth+'px';
  container.style.height=frameHeight+'px';
  container.style.overflow='hidden';
  container.style.position='relative';
  container.style.fontSize=frameFontSize+'px';
  container.style.border='1px solid rgba(200,200,200,1)';
  container.style.backgroundColor='rgba(50,50,50,1)';
  container.style.margin='80px auto 0';
  BGdiv.style.width=frameWidth+'px';
  BGdiv.style.height=frameHeight+'px';
  BGdiv.style.transition='all 0.6s';//暫時先設定漸變
  canvas.width=frameWidth;
  canvas.height=frameHeight;
  CHdiv.style.width=frameWidth+'px';
  CHdiv.style.height=frameHeight+'px';
  CHdiv.style.position='absolute';
  CHdiv.style.left='0px';
  CHdiv.style.top='0px';
  CHdiv.style.zIndex='20';
  dialog.style.width=frameWidth+'px';
  dialog.style.height=Math.floor(frameHeight*3/10-1)+'px';
  dialog.style.borderTop='1px solid rgba(200,200,200,1)';
  dialog.style.position='absolute';
  dialog.style.left='0px';
  dialog.style.top=Math.ceil(frameHeight*7/10)+'px';
  dialog.style.backgroundColor='rgba(255,255,255,0.4)';
  dialog.style.zIndex='50';
  optionlist.style.position='absolute';
  optionlist.style.width=frameWidth*0.65+'px';
  optionlist.style.height=frameHeight+'px';
  optionlist.style.top='0px';
  optionlist.style.left=frameWidth*0.175+'px';
  optionlist.style.zIndex='100';
  
  container.appendChild(BGdiv);
  BGdiv.appendChild(canvas);
  container.appendChild(CHdiv);
  container.appendChild(dialog);
  container.appendChild(optionlist);
  
  BGcanvas=canvas.getContext("2d");
  BGcanvas.font=(frameFontSize+'px 新細明體');
  BGcanvas.fillStyle='rgba(255,255,255,1)';//預設填色
  
  //測試填入
  CHdiv.innerHTML='角色圖層';
  optionlist.style.backgroundColor='rgba(200,50,50,0.3)';
  optionlist.innerHTML='選單框框';
  this.say('測試','對話框');
  BGcanvas.fillText('背景',0,frameFontSize/2+6);
  }
  this.appendTo=function(DOM){
    try{DOM.appendChild(container);}
    catch(e){return false;}
  }
  this.loadData=function(url){
    if(valid(url)){
      try{rawData=$.get(url);}//我還不清楚jquery的ajax載入方法(PS:這樣離線會無法使用，另外chrome不支援include本機檔案)
      catch(e){return false;}
      try{data=JSON.parse(rawData);}
      catch(e){return false;}
      return data;
    }else{
      return false;
    }
  }
}