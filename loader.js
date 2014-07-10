function Frame(){
  //vars
  var container,BGdiv,CHdiv,dialog,optionlist,canvas,BGcanvas,data,pointer,nextP,frameWidth,frameHeight,frameFontSize,characters,backgrounds,rawData;
  ajax=new XMLHttpRequest();
  backgrounds={};
  characters={};
  frame=this;
  //functions
  function error(str){
    window.console.error(str);
    return false;
  }
  function isset(v){
    if(typeof(v)!='undefined'){return true;}
    else{return false;}
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
  function setStage(removeParam){
    if(data){
      backgrounds=[];
      imageObj=[];
      for(var i in data['bg']){
		backgrounds[i]=data['bg'][i];
        imageObj[i] = new Image();
        imageObj[i].id=i;
        imageObj[i].onload = function(){backgrounds[this.id]=this; delete imageObj[this.id];};
        imageObj[i].src=data['bg'][i];
      }
      if(isset(removeParam)/*typeof(removeParam)!='undefined'*/ && removeParam){characters=[];}
      //可選擇是否清除所有之前場景的人物資料，目前玩家角色也算在內
      for(i in data['ch']){
        if(isset(characters[i])/*typeof(characters[i])=='undefined'*/){characters[i]=data['ch'][i];}
        else{
          for(var j in data['ch'][i]){
            if(isset(characters[i][j])/*typeof(characters[i][j])=='undefined'*/){
              characters[i][j]=par(data['ch'][i][j],false);
            }
          }
        }
        imageObj[i+'_p'] = new Image();
        imageObj[i+'_p'].id=i+'_p';
        imageObj[i+'_p'].onload = function(){characters[this.id.slice(0,-2)]['pic']=this;delete imageObj[this.id];};
        imageObj[i+'_p'].src=data['ch'][i]['pic'];
      }
    }
  }
  function checkEP(p){//切換背景→切換角色→台詞→預設參數變化→預設跳接→選擇→如果→執行跳接 | 章節結束
    if(typeof(p)=='object'){
      (isset(p.bg) && isset(backgrounds[p.bg]))?chBG('rgba(0,0,0,1)',backgrounds[p.bg]):null;//BG
      if(typeof(p.ch)=='array'){for(i in p.ch){isset(characters[i])?chCH(i):null;}}
      else if(typeof(p.ch)=='string'){isset(characters[p.ch])?chCH(p.ch):null;}//CH
      typeof(p.line)=='string'?chDL(isset(p.spkr)?p.spkr:'',p.line):null;//DL
      if(isset(p.act)){for(i in p.act){if(isset(characters[i])){for(j in p.act[i]){chPA(i,j,p.act[i][j])}}}}//PA
      if(typeof(p.goto)=='array' && p.goto.length==2){nextP=p.goto;}
      else if(typeof(data.episode[pointer[0]][pointer[1]+1])=="object"){nextP=[pointer[0],pointer[1]+1];}
      else if(typeof(data.episode[pointer[0]+1][0])=="object"){nextP=[pointer[0]+1,0]}
      else{error('next EP fail')};//Next
      if(isset(p.select)){selections(p.select);}
      if(isset(p.if)){condition(p.if);}
      if(isset(p.end)){endEP(p.end);}
      else if(isset(p.next)){nextEP();}
    }else{
      return error('EP data error');
    }
  }
  function chBG(color,src){//暫時
    BGcanvas.clearRect(0,0,canvas.width,canvas.height);
    if(typeof(src)=='string'){
    try{tmpIMG = new Image();
    tmpIMG.onload = function(){BGcanvas.drawImage(this,0,0);delete tmpIMG;};
    tmpIMG.src=src;}catch(e){}}
    else if(typeof(src)=='object'){BGcanvas.drawImage(src,0,0);}
    BGdiv.style.backgroundColor=color;
  }
  function addCH(chA){
    for(i in chA){
      if(characters[i] && typeof(characters[i]['pic'])=='object'){
        characters[i]['pic'].style.transition='all 0.4s';
        characters[i]['pic'].style.position='absolute';
        characters[i]['pic'].style.top='0';
        characters[i]['pic'].style.left='0';//還需要做座標整理函式
        CHdiv.appendChild(characters[i]['pic']);
      }
    }
  }
  function remCH(chA){
    for(i in chA){
      if(characters[i] && typeof(characters[i]['pic'])=='object'){
        CHdiv.removeChild(characters[i]['pic']);
      }
    }
  }
  function setCH(chA){
    while(CHdiv.firstChild){
      CHdiv.removeChild(CHdiv.firstChild);
    }
    addCH(chA);
  }
  function chCH(chStr){
    if(typeof(chStr)=='string'){
      var m=chStr.match(/^[\+\-]/);
      chA=cleanStr(chStr);
      switch(m){
        case '+':
        addCH(chA.slice(1).split(','));
        break;
        case '-':
        remCH(chA.slice(1).split(','));
        break;
        default:
        setCH(chA.split(','));
      }
    }else{
      return false;
    }
  }
  function chDL(spkr,line){//暫時
    names=[];
    if(typeof(spkr)=='string'){
      names.push(cleanStr(spkr))
    }else if(typeof(spkr)=='array'){
      for(var i in spkr){names.push(cleanStr(i));}
    }
    dialog.innerHTML='<p>'+names.join('、')+'</p><p>'+cleanStr(line)+'</p>';
  }
  function par(param,change,override){
    // + - * / = 會強制影響原數值，純數字在場景設定時會保留上一場景的數值，劇情中則等同=
    change=change.toString();
    if(change.match(/^[\+\-\*/\=0-9][0-9]*$/) && Number(param)==param){
      m=change.substr(0,1);
      param=Number(param);
      cs=Number(change.slice(1));
      switch(m){
        case '+':
        return param+cs;
        break;
        case '-':
        return param-cs;
        break;
        case '*':
        return param*cs;
        break;
        case '/':
        return Math.floor(param/cs);
        break;
        case '=':
        return cs;
        break;
        default:
        return (typeof(override)!='undefined' && override)?Number(change):param;
      }
    }else{
      return (typeof(override)!='undefined' && override)?cleanStr(change):param;
    }
  }
  function chPA(character,param,change){
    if(typeof(characters[character])!='undefined' && typeof(characters[character][param])!='undefined'){
      return characters[character][param]=par(characters[character][param],change.toString(),true);
    }else{
      return false;
    }
  }
  function selections(ops){//ops->id:{op:option,act:{ch:{pa:cha}},goto:[n,m]}
    if(isset(ops)){
      optionlist.innerText='';
      for(o in ops){
        if(!(isset(ops[o].op)&&(isset(ops[o].act)||isset(ops[o].goto)))){error('selection item error.');continue;}
        else{
          opTmp=document.createElement('div');
          opTmp.style.width=frameWidth*0.5+'px';
          opTmp.style.minHeight=frameHeight/10+'px';
          opTmp.style.height=frameHeight/ops.length+'px';
          opTmp.style.margin='auto';
          opTmp.style.textAlign='center';
          opTmp.style.backgroundColor='rgba(200,200,200,0.4)';
          opTmp.style.cursor='pointer';
          opTmp.innerText=ops[o].op;
          opTmp.op=ops[o].op;
          opTmp.onclick=function(){
            if(isset(this.op.act)){for(i in this.op.act){if(isset(characters[i])){for(j in this.op.act[i]){chPA(i,j,this.op.act[i][j])}}}}//PA
            if(typeof(this.op.goto)=='array' && this.op.goto.length==2){nextP=this.op.goto;}//Next
            pn=this.parentNode;
            while(pn.firstChild){pn.removeChild(pn.firstChild)};
            optionlist.style.display='none';
            nextEP();
          };
          optionlist.appendChild(opTmp);
        }
      }
      optionlist.style.display='block';
    }else{
      return error('selection error.')
    }
  }
  function condition(ifo){//if:{condition:{compare:'>|<|=',ch:n,param:p,data:m},act:{},goto:{}} 目前設定一次只能判定一個數值
    if(!(isset(ifo.condition.compare)&&isset(ifo.condition.data)&&(isset(ifo.act)||isset(ifo.goto))&& isset(characters[ifo.condition.ch][ifo.condition.param]))){return error('condition error.');}
    else{
      switch(ifo.ondition.compare){
      case '>':
      if(characters[ifo.condition.ch][ifo.condition.param]>Number(ifo.condition.data)){
        if(isset(ifo.act)){for(i in ifo.act){if(isset(characters[i])){for(j in ifo.act[i]){chPA(i,j,ifo.act[i][j])}}}}
        if(typeof(ifo.goto)=='array' && ifo.goto.length==2){nextP=ifo.goto;}
      }
      break;
      case '<':
      if(characters[ifo.condition.ch][ifo.condition.param]<Number(ifo.condition.data)){
        if(isset(ifo.act)){for(i in ifo.act){if(isset(characters[i])){for(j in ifo.act[i]){chPA(i,j,ifo.act[i][j])}}}}
        if(typeof(ifo.goto)=='array' && ifo.goto.length==2){nextP=ifo.goto;}
      }
      break;
      case '=':
      if(characters[ifo.condition.ch][ifo.condition.param]==Number(ifo.condition.data)){
        if(isset(ifo.act)){for(i in ifo.act){if(isset(characters[i])){for(j in ifo.act[i]){chPA(i,j,ifo.act[i][j])}}}}
        if(typeof(ifo.goto)=='array' && ifo.goto.length==2){nextP=ifo.goto;}
      }
      break;
      default:
      return error('compare error.');
      }
    }
  }
  function nextEP(){
    pointer=nextP;
    checkEP(pointer);
  }
  function endEP(end){
    if(isset(end)){
      if(isset(end.next)){nextStage(end);}
      else{title();}
    }
  }
  function nextStage(stage){
    
  }
  function title(){
  
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
  optionlist.style.display='none';
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
  this.showData=function(){console.log(data);alert(data?'chapter: '+data['chapter']:'尚未載入資料');}
  this.set=setStage;
  this.showBG=function(){console.log(backgrounds);};
  this.showCH=function(){console.log(characters);};
  this.chp=chPA;
  this.ops=selections;
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