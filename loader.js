function Background(){

}
function Characters(){

}
function Options(){

}
function Frame(){
  //vars
  var container,BGdiv,CHdiv,dialog,optionlist,canvas,BGcanvas,data,pointer,frameWidth,frameHeight,frameFontSize,characters,backgrounds,rawData;
  ajax=new XMLHttpRequest();
  backgrounds={};
  characters={};
  frame=this;
  //functions
  function error(str){
    window.console.error(str);
    return false;
  }
  function valid(str){
    return true;//這裡要放資源路徑驗證
  }
  function cleanStr(str){
    return str;//以後要清除injection
  }
  function check(obj){
    return obj;//以後要確認物件資訊
  }
  function loadData(url){
    if(valid(url)){
      //以下方式可用於chrome離線，但只接受script，所以不能用完全符合JSON的格式儲存資料，算是JSONP?
      scriptContain=document.createElement('iframe');
      scriptContain.id='scriptLoader'+(ran=Math.ceil(Math.random()*10000));
      scriptContain.style.display='none';
      scriptLoad=document.createElement('script');
      scriptLoad.onload=function(){
        sIfr=document.getElementById('scriptLoader'+ran);
        data=check(sIfr.contentWindow.rawData);
        this.parentNode.removeChild(this);
        sIfr.parentNode.removeChild(sIfr);
      };
      scriptLoad.src=url;
      document.body.appendChild(scriptContain);
      scriptContain.contentDocument.body.appendChild(scriptLoad);//暫時先這樣..
    }else{
      return false;
    }
  }
  function setStage(keepParam){
    
  }
  function checkEP(p){
    
  }
  function chBG(color,src){//暫時
    BGcanvas.clearRect(0,0,canvas.width,canvas.height);
    try{imageObj = new Image();
    imageObj.onload = function(){BGcanvas.drawImage(this,0,0);};
    imageObj.src=src;}catch(e){}
    BGdiv.style.backgroundColor=color;
  }
  function chCH(character,type){
    
  }
  function chDL(spkr,line){//暫時
    names=[];
    if(typeof(spkr)=="string"){
      names.push(cleanStr(spkr))
    }else{
      for(var i in spkr){names.push(cleanStr(i));};
    }
    dialog.innerHTML='<p>'+names.join('、')+'</p><p>'+cleanStr(line)+'</p>'
  }
  function chPA(character,param,change){
    
  }
  function condition(character,param,condition,acts){
    
  }
  function nextEP(){
    if(typeof(data.episode[pointer[0]][pointer[1]+1])=="object"){
      pointer[1]++;
      checkEP(pointer);
    }else if(typeof(data.episode[pointer[0]+1][0])=="object"){
      pointer[0]++;
      pointer[1]=0;
      checkEP(pointer);
    }else{
      error("");
    }
  }
  function toEP(epAr){
    if(typeof(epAr)=="array" && epAr.length==2 && typeof(data.episode[epAr[0]][epAr[1]])=="object"){
      pointer=epAr;
      return pointer;
    }else{
      error("");
    }
  }
  function endEP(){
    
  }
  function nextStage(){
    
  }
  //PROPERTIES
  //METHODS
  this.createFrame=function(FW,FH,FFS){
  //create startup elements & style setting
  frameWidth=FW?FW:800;
  frameHeight=FH?FH:600;
  frameFontSize=FFS?FFS:16;
  //建立tag
  container=container?container:document.createElement('div');
  BGdiv=BGdiv?BGdiv:document.createElement('div');
  canvas=canvas?canvas:document.createElement('canvas');
  CHdiv=CHdiv?CHdiv:document.createElement('div');
  dialog=dialog?dialog:document.createElement('div');
  optionlist=optionlist?optionlist:document.createElement('div');
  //CSS設定
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
  BGdiv.style.transition='all 0.6s';//暫時先設定有漸變
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
  //組合!!
  container.appendChild(BGdiv);
  BGdiv.appendChild(canvas);
  container.appendChild(CHdiv);
  container.appendChild(dialog);
  container.appendChild(optionlist);
  //BG的canvas
  BGcanvas=canvas.getContext("2d");
  BGcanvas.font=(frameFontSize+'px 新細明體');
  BGcanvas.fillStyle='rgba(255,255,255,1)';//預設填色
  }
  this.appendTo=function(DOM){
    try{DOM.appendChild(container);}
    catch(e){return false;}
  }
  //目前debug用
  this.say=chDL;
  this.changeBG=chBG;
  this.load=loadData;
  this.showData=function(){console.log(data);alert('chapter: '+data['chapter']);}
  //測試用
  this.toggleOptionlist=function(){
    optionlist.style.display=(optionlist.style.display=='none')?'block':'none';
  }
  this.toggleCHdiv=function(){
    CHdiv.style.display=(CHdiv.style.display=='none')?'block':'none';
  }
  this.beta=function(){
    //測試填入
    CHdiv.innerHTML='角色圖層';
    optionlist.style.backgroundColor='rgba(200,50,50,0.3)';
    optionlist.innerHTML='選單框框';
    chDL('測試','對話框');
    BGcanvas.fillText('背景',0,frameFontSize/2+6);
  }
}