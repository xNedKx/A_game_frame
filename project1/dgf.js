/*Programed By YzC*/
function loadData(url){
  if(url.toString().match(/^(https?:\/\/|\.{0,2}\/)(.*?)\.js$/)){
    scriptLoad=document.createElement('script');
    scriptLoad.onload=function(){
      this.parentNode.removeChild(this);
    }
    scriptLoad.src=url;
    document.body.appendChild(scriptLoad);
    return true;
  }else{
    return false;
  }
}
var pointer=0;
var lines=['Lines.'];
var tit=['Title','START',''];
var vars={};
function pointerN(go){
  if(typeof go!='number'){
    pointer++;
  }else if(go<lines.length&&go>=0){
    pointer=go;
  }else if(go<0&&lines.length+go-1>=0){
    pointer=lines.length+go-1;
  }else{
    return false;
  }
  return true;
}
function Cwait(){
  skip=false;
  nextP=null;
  hint.style.display='block';
  hint.style.opacity=0;
  if(sel){
    con.onclick=null;
    hintBlink();
    sels=con.getElementsByClassName('gt');
    for(var op=0;op<sels.length;op++){
      if(sels[op].hasAttribute('gt')){
        sels[op].gt=Number(sels[op].getAttribute('gt'));
        sels[op].onclick=function(e){e.stopPropagation();if(pointerN(this.gt)){nextC();}};
        sels[op].onmouseover=function(){this.style.backgroundColor='rgba(255,255,255,0.4)';};
        sels[op].onmouseout=function(){this.style.backgroundColor='rgba(0,0,0,0)';};
        sels[op].removeAttribute('gt');
        preloadImg(sels[op].gt);
      }
    }
  }else{
    if(pointer<lines.length){
      hintBlink();
      con.onclick=function(){nextC();}
      con.style.cursor='pointer';
      preloadImg(pointer);
    }
  }
}
function Csing(){
  hint.style.display='none';
  con.onclick=function(){skip=true;};
  con.style.cursor='default';
  window.clearTimeout(bl);
}
function nextC(){
  var ins;
  if(pointer<lines.length){
    ins=document.getElementsByTagName('input');
    for(var i=0;i<ins.length;i++){
      vars[removeNU(ins[i].id)]=removeNU(ins[i].value);
    }
    sel=false;
    if(!keepL){while(line.firstChild){line.removeChild(line.firstChild);}}
    while(img.firstChild){img.removeChild(img.firstChild);}
    spd=[dspd];
    nextA=false;
    keepL=false;
    show(lines[pointer],line);
  }
}
var bl;
function hintBlink(){
  if(hint.style.display!='none'){
    var inte;
    if(hint.style.opacity!=0){
      hint.style.opacity=0;inte=500;
    }else{
      hint.style.opacity=1;
      inte=500;
    }
   bl=window.setTimeout(hintBlink,inte);
  }
}
function removeTag(str,tag,sub){
  var count=0;
  str=str.replace(RegExp('^<'+tag+'.*?>'),'');
  for(var cc=0;cc<str.length;cc++){
    if(str.substr(cc).match(RegExp('^</'+tag+'>'))){
      if(count==0){break;}else{count--;}
    }else if(str.substr(cc).match(RegExp('^<'+tag+'.*?>'))){count++;}
  }
  return str.substr(0,cc)+sub+str.substr(cc+(('</'+tag+'>').length));
}
function addGt(str,dom){
  if(gt=str.match(/\sgt(=(-?\d+))?(\s|$)/)){
    if(gt[2]){
      if(gt[2].substr(0,1)=='-'){gtn=lines.length+Number(gt[2])-1;}else{gtn=Number(gt[2]);}
      sel=true;
      dom.setAttribute('gt',gtn);
      dom.className+=' gt';
      dom.style.cursor='pointer';
    }else{
      sel=true;
      dom.setAttribute('gt',pointer+1);
      dom.className+=' gt';
      dom.style.cursor='pointer';
    }
  }
  return dom;
}
var imgPL=[];
function preloadImg(pt){
  pl=lines[pt];
  while(r1=pl.match(/(<img.*?src=('|").*?\2.*?>|<bg=('|").*?\3.*?>)/)){
    dup=false;
    if(r1[0].substr(1,1)=='i'){
      if(r2=r1[0].match(/(\s|"|')src=('|")(.*?)\2/)){
        for(var i=0;i<imgPL.length;i++){
          if(imgPL[i].src==r2[3]){
            dup=true;
            break;
          }
        }
        if(!dup){
          imgPL.push(ipl=new Image());
          ipl.src=r2[3];
        }
      }
    }else if(r1[0].substr(1,1)=='b'){
      if(r2=r1[0].match(/^<bg=('|")(.*?)\1/)){
        for(var i=0;i<imgPL.length;i++){
          if(imgPL[i].src==r2[2]){
            dup=true;
            break;
          }
        }
        if(!dup&&r2[2]!=''){
          imgPL.push(ipl=new Image());
          ipl.src=r2[2];
        }
      }
    }
    pl=pl.replace(/(<img.*?src=('|").*?\2.*?>|<bg=('|").*?\3.*?>)/,'');
  }
}
function setVar(vns,vvs){
var vvr,vvn;
  if(vvr=vvs.match(/^(['"])(.*?)\1$/)){
    if(vvn=vvr[2].match(/^([+*\-\/])(\d*.?\d+)$/)){
    vars[vns]=isNaN(vars[vns])?0:Number(vars[vns]);
      switch(vvn[1]){
      case '+':
        vars[vns]+=Number(vvn[2]);
      break;
      case '-':
        vars[vns]-=Number(vvn[2]);
      break;
      case '*':
        vars[vns]*=Number(vvn[2]);
      break;
      case '/':
        vars[vns]/=Number(vvn[2])!=0?Number(vvn[2]):1;
      }
    }else if(vvn=vvr[2].match(/^[+](.*?)$/)){
      vars[vns]=vars.hasOwnProperty(vns)?vars[vns]+vvn[1]:vvn[1];
    }else{
      vars[vns]=vvr[2];
    }
  }else if(vvr=vvs.match(/^(.*?)(\s|\/?$)/)){
    if(vvn=vvr[1].match(/^([+\-*\/])?(.*?)$/)){
      switch(vvn[1]){
      case '+':
        if(vars.hasOwnProperty(vvn[2])){
          if(isNaN(vars[vns])){
            if(isNaN(vars[vvn[2]])){vars[vns]+=vars[vvn[2]];}
            else{vars[vns]=Number(vars[vvn[2]]);}
          }else{
            if(!isNaN(vars[vvn[2]])){vars[vns]+=Number(vars[vvn[2]]);}
          }
        }else if(vvn[2].match(/^\d*.?\d+$/)){
          if(isNaN(vars[vns])){vars[vns]=Number(vvn[2]);}
          else{vars[vns]+=Number(vvn[2]);}
        }else{
          console.log('add vars error.');
        }
      break;
      case '-':
        if(vars.hasOwnProperty(vvn[2])){
          if(!isNaN(vars[vvn[2]])){
            if(!isNaN(vars[vns])){vars[vns]-=Number(vars[vvn[2]]);}
            else{vars[vns]=-Number(vars[vvn[2]]);}
          }else{
            console.log('minus vars error.');
          }
        }else if(vvn[2].match(/^\d*.?\d+$/)){
          if(isNaN(vars[vns])){vars[vns]=-Number(vvn[2]);}
          else{vars[vns]-=Number(vvn[2]);}
        }else{
          console.log('minus vars error.');
        }
      break;
      case '*':
        if(vars.hasOwnProperty(vvn[2])){
          if(!isNaN(vars[vvn[2]])){
            if(!isNaN(vars[vns])){vars[vns]*=Number(vars[vvn[2]]);}
            else{vars[vns]=0;}
          }else{
            console.log('multiply vars error.');
          }
        }else if(vvn[2].match(/^\d*.?\d+$/)){
          if(!isNaN(vars[vns])){vars[vns]*=Number(vvn[2]);}
          else{console.log('multiply vars error.');}
        }else{
          console.log('multiply vars error.');
        }
      break;
      case '/':
        if(vars.hasOwnProperty(vvn[2])){
          if(!isNaN(vars[vvn[2]])){
            if(!isNaN(vars[vns])){
              vars[vns]/=Number(vars[vvn[2]])==0?1:Number(vars[vvn[2]]);
            }else{
              vars[vns]=0;
            }
          }else{
            console.log('devide vars error.');
          }
        }else if(vvn[2].match(/^\d*.?\d+$/)){
          if(!isNaN(vars[vns])){
            vars[vns]/=Number(vvn[2])==0?1:Number(vvn[2]);
          }else{
            console.log('devide vars error.');
          }
        }else{
          console.log('devide vars error.');
        }
      break;
      default:
        if(vvn[2]=='rnd'){vars[vns]=Math.random();}
        else if(vars.hasOwnProperty(vvn[2])){vars[vns]=vars[vvn[2]];}
        else if(vvn[2].match(/^\d*.?\d+$/)){vars[vns]=Number(vvn[2]);}
        else{console.log('set vars error.');}
      }
    }
  }
}
function condition(n,c,v){//c:M|L|E
  var vs;
  if(vars.hasOwnProperty(n)){
    if(vs=v.match(/^(['"])(.*?)\1$/)){
      v=vs[2];
    }else if(vs=v.match(/^(.*?)(\s|\/?$)/)){
      if(vars.hasOwnProperty(vs[1])){
        v=vars[vs[1]];
      }else{
        return false;
      }
    }
    switch(c){
    case 'E':
      if(vars[n]==v){return true;}else{return false;}
    break;
    case 'M':
      if(!isNaN(vars[n])&&!isNaN(v)&&vars[n]>v){return true;}else{return false;}
    break
    case 'L':
      if(!isNaN(vars[n])&&!isNaN(v)&&vars[n]<v){return true;}else{return false;}
    break;
    case 'ME':
    case 'EM':
      if(!isNaN(vars[n])&&!isNaN(v)&&vars[n]>=v){return true;}else{return false;}
    break;
    case 'LE':
    case 'EL':
      if(!isNaN(vars[n])&&!isNaN(v)&&vars[n]<=v){return true;}else{return false;}
    break;
    default:
      return false;
    }
  }else{
    return false;
  }
}
function display(str,dom){
  if(str.length>0){
    switch(str.substr(0,1)){
    case sc['sT']:
      spd.pop();
    case sc['tT']:
      dom=dom.parentNode;
    break;
    case '\n':
      dom.innerHTML+='<br>';
    break;
    case ' ':
      dom.innerHTML+='&nbsp;';
    break;
    default:
      dom.innerHTML+=str.substr(0,1);
    }
  }
  show(str.substr(1),dom);
}
function removeNU(str){
return str.toString().replace(/[^\s_0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,'').trim();
}
var tags=['a','div','span','p','img','input','var','if','spd','next','keep','skip','bg','color','lh','audio','reset'];
var tf={next:snext,keep:skeep,skip:sskip,spd:sspd,color:scolor,lh:slh,var:svar,if:sif,bg:sbg,img:simg,input:sinput,audio:saudio,a:stag,span:stag,div:stag,p:stag};
function snext(str,tag,d){
  var tmp;
  nextA=true;
  if(tmp=tag.match(/\sspd=(\d+)(\s|\/?$)/)){
    spd.push(Number(tmp[1]));
  }
  if(tmp=tag.match(/^=(\d+)(\s|\/?$)/)){
    nextP=parseInt(tmp[1]);
  }
  return [str.replace(/^<next.*?>/,''),d];
}
function skeep(str,t,d){
  keepL=true;
  return [str.replace(/^<keep.*?>/,''),d];
}
function sskip(str,t,d){
  skip=true;
  return [str.replace(/^<skip.*?>/,''),d];
}
function sspd(str,tag,d){
  var tmp;
  if(tmp=tag.match(/^=(\d+)\s*\/?$/)){
    spd.push(Number(tmp[1]));
  }
  return [str.replace(/^<spd.*?>/,''),d];
}
function scolor(str,tag,d){
  var tmp;
  if(tmp=tag.match(/^=(['"])(.*?)\1\s*\/?$/)){
    line.style.color=tmp[2];
  }
  return [str.replace(/^<color=.*?>/,''),d];
}
function slh(str,tag,d){
  var tmp;
  if(tmp=tag.match(/^=(\d+)(\s|\/?$)/)){
    line.style.top=(600-parseInt(tmp[1]))+'px';
  }else{
    line.style.top=dlh+'px';
  }
  if(tmp=tag.match(/\sbgc=(['"])(.*?)\1/)){
    line.style.backgroundColor=tmp[2]?tmp[2]:dlbgc;
  }
  return [str.replace(/^<lh.*?>/,''),d];
}
function svar(str,tag,d){
  var vn,vv;
  var vs='';
  if(vn=tag.match(/\sn=(['"])(.*?)\1/)){
    if(vv=tag.match(/\sv=((['"])(.*?)\2|([+*\-\/]?[\w_]+[_\d\w]*)(\s|\/?$))/)){
      setVar(removeNU(vn[2]),vv[1]);
    }
    if(vars.hasOwnProperty(vn[2])&&tag.match(/\ss(how)?(\s|\/?$)/)){
      vs=vars[removeNU(vn[2])];
    }
  }
  return [str.replace(/^<var.*?>/,vs),d];
}
function sif(str,tag,d){
  var ivn,ic,iv,igt;
  var ir=false;;
  if(ivn=tag.match(/\sn=(['"])(.*?)\1/)){
    if(ic=tag.match(/\sc=(['"])(.*?)\1/)){
      if(iv=tag.match(/\sv=((['"])(.*?)\2|([+*\-\/]?[\w_]+[_\d\w]*)(\s|\/?$))/)){
        if(condition(ivn[2],ic[2],iv[1])){
          if(igt=tag.match(/\sgt=(\d+)(\s|\/?$)/)){
            if(!isNaN(igt[1])){
              nextP=parseInt(igt[1]);
              nextA=true;
            }
          }
          ir=true;
        }
      }
    }
  }
  if(str.match(/<if.*?>(.*?)<\/if>/)){
    str=removeTag(str,'if',sc['ifEnd']);
    if(!ir){
      return [str.replace(RegExp('^.*?'+sc['ifEnd']),''),d];
    }else{
      return [str.replace(sc['ifEnd'],''),d];
    }
  }else{
    return [str.replace(/^<if.*?>/,''),d];
  }
}
function sbg(str,tag,d){
  var bg,url,p,w,h,tmp;
  if(bg=tag.match(/^=(['"])(.*?)\1.*?$/)){
    if(url=bg[2].match(/^(https?:\/\/|\.{0,2}\/)(.*?)(\.jpg|\.png|\.gif)$/)){
      con.style.backgroundImage='url("'+url[0]+'")';
      if(tmp=tag.match(/\sp=(['"])(.*?)\1/)){p=tmp[2];}
      if(tmp=tag.match(/\sw=(\d+)(\s|\/?$)/)){w=tmp[1]+'px';}
      if(tmp=tag.match(/\sh=(\d+)(\s|\/?$)/)){h=tmp[1]+'px';}
    }else{
      con.style.backgroundImage='none';
      p='initial'
      w='';
      h='';
    }
    con.style.backgroundPosition=p;
    con.style.backgroundSize=w?(h?+" "+h:w+' auto'):(h?'auto '+h:'auto');
  }
  return [str.replace(/^<bg=(['"]).*?\1.*?>/,''),d];
}
function simg(str,tag,d){
  var imgt,url,tmp,nimg,w,h,x,y,cls,css;
  if(imgt=tag.match(/\ssrc=(['"])(.*?)\1/)){
    img.appendChild(tmp=document.createElement('div'));
    if(url=imgt[2].match(/^(https?:\/\/|\.{0,2}\/)(.*?)(\.jpg|\.png|\.gif)$/)){
      nimg=new Image();
      nimg.src=url[0];
      tmp.appendChild(nimg);
      tmp.style.overflow='hidden';
    }
    tmp.style.position='absolute';
    if(w=tag.match(/\sw=(\d+)(\s|\/?$)/)){
      tmp.style.width=w[1]+'px';
      nimg.width=w[1];
    }
    if(h=tag.match(/\sh=(\d+)(\s|\/?$)/)){
      tmp.style.height=h[1]+'px';
      nimg.height=h[1];
    }
    if(x=tag.match(/\sx=(-?\d+)(\s|\/?$)/)){
      if(x[1].substr(0,1)=='-'){
        tmp.style.right=x[1].substr(1)+'px';
      }else{
        tmp.style.left=x[1]+'px';
      }
    }
    if(y=tag.match(/\sy=(-?\d+)(\s|\/?$)/)){
      if(y[1].substr(0,1)=='-'){
        tmp.style.bottom=y[1].substr(1)+'px';
      }else{
        tmp.style.top=y[1]+'px';
      }
    }
    if(cls=tag.match(/\sclass=(['"])(.*?)\1/)){
      tmp.className=cls[2];
    }
    if(css=tag.match(/\sstyle=(['"])(.*?)\1/)){
      nimg.style.cssText+=css[2];
    }
   tmp=addGt(tag,tmp);
  }
  return [str.replace(/^<img.*?>/,''),d];
}
function sinput(str,tag,dom){
  var inp,inpt,inpv,inpm,css;
  if(inp=tag.match(/\sn=(['"])(.*?)\1/)){
    dom.appendChild(inpt=document.createElement('input'));
    inpt.className="input";
    inpt.id=removeNU(inp[2]);
    inpt.onmousedown=function(e){e.stopPropagation();};
    inpt.onclick=function(e){e.stopPropagation();};
    if(inpv=tag.match(/\sv=(['"])(.*?)\1/)){
      inpt.value=removeNU(inpv[2]);
    }else if(inpv=tag.match(/\sv=(.*?)(\s|\/?$)/)){
      if(inpv[1]=='rnd'){
        inpt.value=Math.random(); 
      }else if(vars.hasOwnProperty(inpv[1])){
        inpt.value=vars[inpv[1]];
      }
    }
    if(inpm=tag.match(/\smaxL=(\d+)(\s|\/?$)/)){
      inpt.maxLength=parseInt(inpm[1]);
    }else{
      inpt.maxLength=24;
    }
    if(css=tag.match(/\sstyle=(['"])(.*?)\1/)){
      inpt.style.cssText=css[2];
      if(!css[2].match(/(^|\s|;)width:(.*?)(;|$)/)){
        inpt.style.width='160px';
      }
    }
  }
  return [str.replace(/^<input.*?>/,''),dom];
}
function saudio(str,tag,dom){
  var au,at;
  if(au=tag.match(/^=(['"])((https?:\/\/|\.{0,2}\/).*?(\.mp3|\.ogg))\1/)){
    if(tag.match(/\sbg(m)?(\s|\/?$)/)){
      while(aud.firstChild){aud.removeChild(aud.firstChild);}
      aud.appendChild(at=document.createElement('audio'));
      at.autoplay=true;
    }else{
      dom.appendChild(at=document.createElement('audio'));
    }
    if(tag.match(/\sl(oop)?(\s|\/?$)/)){
      at.loop=true;
    }
    at.src=au[2];
    at.play();
  }
  return [str.replace(/^<audio.*?>/,''),dom];
}
function stag(str,tag,dom){
  var tmp,css,gt,sp,nt;
  if(nt=str.match(/^<(a|div|span|p).*?>(.|\n)*<\/\1>/)){
    dom.appendChild(tmp=document.createElement(nt[1]));
    if(css=tag.match(/\sstyle=(['"])(.*?)\1/)){
      tmp.style.cssText=css[2];
    }
    if(gt=nt[0].match(/^<a(.*?)>(.|\n)*<\/a>/)){
      tmp=addGt(gt[1],tmp);
    }
    if(sp=tag.match(/\sspd=(\d+)(\s|\/?$)/)){
      spd.push(Number(sp[1]));
      return [removeTag(str,nt[1],sc['sT']),tmp];
    }else{
      return [removeTag(str,nt[1],sc['tT']),tmp];
    }
  }else{
    return [str.replace(nt[1],sc['null']+nt[1]),dom];
  }
}
var dspd=100;
var spd=[dspd];
var skip=false;
var nextA=false;
var nextP=null;
var keepL=false;
var sel=false;
var con,line,hint;
var sc={sT:'\u001a',tT:'\u001b',ifEnd:'\u001c',null:'\u0000'};
function show(str,DOM){
  var tag,res;
  if(str.length>0){
    str=str.toString();
    res=[str,DOM];
    while(tag=res[0].match(RegExp('^<('+tags.join('|')+')(\\s+[^\\s]+.*?|=.*?|\\/?)>'))){
      if(tag[1]=='reset'){return reset();}
      if(tf.hasOwnProperty(tag[1])){
        res=tf[tag[1]](res[0],tag[2],res[1]);
      }else{
        res[0]=res[0].replace(/^</,'<'+sc['null']);
      }
    }
    Csing();
    if(!skip){
      window.setTimeout(function(){display(res[0],res[1]);},spd[spd.length-1]);
    }else{
      display(res[0],res[1]);
    }
  }else{
    pointerN(nextP);
    Cwait();
    if(nextA){nextC();}
  }
}
var con,img,line,hint,aud,lines,tit;
var cw=800;
var ch=600;
var dlh=420;
var dlbgc='rgba(255,255,255,0.8)';
var fs=18;
function initial(){
  if(con){
    while(img.firstChild){img.removeChild(img.firstChild);}
    while(line.firstChild){line.removeChild(line.firstChild);}
    while(aud.firstChild){aud.removeChild(aud.firstChild);}
    while(con.firstChild){con.removeChild(con.firstChild);}
    con.parentNode.removeChild(con);
    pointer=0;
    vars=[];
    imgPL=[];
  }
  document.body.appendChild(con=document.createElement('div'));
  con.style.width=cw+'px';
  con.style.height=ch+'px';
  con.style.position='relative';
  con.style.backgroundColor='#000';
  con.style.color='#333';
  con.style.margin='10px auto';
  con.style.overflow='hidden';
  con.style.backgroundRepeat='no-repeat';
  con.style.fontFamily='consolas';
  con.style.fontSize=fs+'px';
  con.style.cursor='default';
  con.appendChild(img=document.createElement('div'));
  img.style.width=cw+'px';
  img.style.height=ch+'px';
  img.style.position='absolute';
  img.style.top='0';
  img.style.left='0';
  img.style.overflow='hidden';
  img.onmousedown=function(e){e.preventDefault();}
  con.appendChild(line=document.createElement('div'));
  line.style.width=(cw-40)+'px';
  line.style.height=(ch-22)+'px';
  line.style.position='absolute';
  line.style.top=ch+'px';
  line.style.left='0';
  line.style.borderTop='2px ridge rgba(255,255,255,0.9)';
  line.style.backgroundColor=dlbgc;
  line.style.wordBreak='break-all';
  line.style.overflow='hidden';
  line.style.padding='10px 20px';
  line.style.zIndex='9999';
  line.style.transition='top 0.3s ease';
  line.onmousedown=function(e){e.preventDefault();}
  con.appendChild(hint=document.createElement('div'));
  hint.style.width=(fs-2)+'px';
  hint.style.height=(fs-2)+'px';
  hint.style.position='absolute';
  hint.style.top=(ch-fs+2)+'px';
  hint.style.left=(cw-fs+2)+'px';
  hint.style.backgroundColor='rgba(0,0,0,0.4)';
  hint.style.zIndex='19999';
  hint.style.display='none';
  con.appendChild(aud=document.createElement('div'));
  aud.style.display='none';
  hint.style.position='absolute';
  con.appendChild(menu=document.createElement('div'));
  menu.style.width='0px';
  menu.style.height='0px';
  menu.style.position='absolute';
  menu.style.top='0px';
  menu.style.right='0px';
  menu.style.zIndex='29999';
  menu.style.backgroundColor='rgba(255,255,255,0.6)';
  menu.style.transition='all 0.1s ease';
}
function title(){
  var tmp;
  img.appendChild(tmp=document.createElement('div'));
  tmp.style.position='absolute';
  tmp.style.width=(cw*0.75)+'px';
  tmp.style.height=(ch*0.25)+'px';
  tmp.style.top=(ch*0.36)+'px';
  tmp.style.left=(cw*0.125)+'px';
  tmp.style.color='#EDEDED';
  tmp.style.textAlign='center';
  tmp.innerHTML=tit[0];
  img.appendChild(tmp=document.createElement('div'));
  tmp.style.position='absolute';
  tmp.style.width=(cw*0.2)+'px';
  tmp.style.height=(ch*0.1)+'px';
  tmp.style.top=(ch*0.72)+'px';
  tmp.style.left=(cw*0.4)+'px';
  tmp.style.color='#EDEDED';
  tmp.style.textAlign='center';
  tmp.style.border='1px solid #EDEDED';
  tmp.style.cursor='pointer';
  tmp.innerHTML=tit[1];
  tmp.onclick=function(e){e.stopPropagation();start();}
  tmp=tit[2].split(',');
  while(tmp.length>0){
    if(tmp[0]!=''&&!isNaN(tmp[0])){preloadImg(parseInt(tmp[0]));}
    tmp=tmp.slice(1);
  }
}
function start(){
  while(img.firstChild){img.removeChild(img.firstChild);}
  line.style.top=dlh+'px';
  nextC();
}
function reset(){
  initial();
  title();
}