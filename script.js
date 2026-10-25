const K=Object.keys(D),L="ABCD";let T=10,pm="p";
const CN=["África","América","Ásia","Europa","Oceania","Antártida"],COL=["#ffc43d","#2fb86a","#e5484d","#3aa0ff","#ff8fc7","#8f5cff"];
const $=i=>document.getElementById(i);let q=[],i=0,s=0,lock=false,cur,mode="p",run=0;
const sh=a=>{a=[...a];for(let j=a.length-1;j>0;j--){const k=Math.random()*(j+1)|0;[a[j],a[k]]=[a[k],a[j]]}return a};
const lab=c=>qm=="p"?D[c][0]:D[c][1];
let st=(()=>{try{return localStorage.getItem("fq_st")||"s"}catch(e){return"s"}})(),sOn=(()=>{try{return localStorage.getItem("fq_snd")!=="0"}catch(e){return true}})(),paused=false,pend=false,lifeMode=false,lives=7,qm="p",cfgFrom="start",AC;const SC=()=>st=="s"?"fimg shd":"fimg flat",SI=()=>st=="s"?3:2;let sc6=sh(K).slice(0,6),log=[];
function strip(){$("strip").innerHTML=sc6.map(c=>`<div class="${SC()}" style="background-image:url(${D[c][SI()]})"></div>`).join("")}strip();
function setStyle(x){st=x;try{localStorage.setItem("fq_st",x)}catch(e){}document.querySelectorAll(".seg button[data-s]").forEach(b=>b.classList.toggle("on",b.dataset.s==x));strip();if(cur&&$("fl")){$("fl").className=SC();$("fl").style.backgroundImage=`url(${D[cur][SI()]})`}}
document.querySelectorAll(".seg button[data-s]").forEach(b=>b.onclick=()=>setStyle(b.dataset.s));
function setSnd(v,q){sOn=v;try{localStorage.setItem("fq_snd",v?"1":"0")}catch(e){}document.querySelectorAll("#seg2 button").forEach(b=>b.classList.toggle("on",(b.dataset.v=="1")==v));if(v&&!q)tone([[660,0,.08]])}
document.querySelectorAll("#seg2 button").forEach(b=>b.onclick=()=>setSnd(b.dataset.v=="1"));
function tone(n,type="sine",vol=.18){if(!sOn)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state=="suspended")AC.resume();const t0=AC.currentTime;n.forEach(([f,at,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,t0+at);g.gain.exponentialRampToValueAtTime(.001,t0+at+d);o.connect(g);g.connect(AC.destination);o.start(t0+at);o.stop(t0+at+d+.02)})}catch(e){}}
const sOk=()=>tone([[523,0,.15],[659,.09,.15],[784,.18,.3]],"triangle"),sBad=()=>tone([[190,0,.18],[140,.14,.3]],"sawtooth",.12),sWin=()=>tone([[523,0,.15],[659,.12,.15],[784,.24,.15],[1047,.36,.5]],"triangle"),sLose=()=>tone([[392,0,.2],[330,.18,.2],[262,.36,.4]],"triangle");
setStyle(st);setSnd(sOn,1);
function show(id){$("pz").classList.remove("on");["start","modes","qty","cfg","play-area","end"].forEach(x=>$(x).classList.toggle("on",x===id))}
const T1="BR US CA MX AR GB FR DE IT ES PT NL RU CN JP KR IN AU EG ZA TR SA CH SE NO GR UY CL CO PE CU IE PL BE AT JM NZ UA".split(" "),T2="DK FI IS IL IR IQ ID TH VN PH MY SG PK BD NG KE MA DZ TN GH ET AO MZ VE EC BO PY PA CR DO HT HR RS CZ HU RO BG SK KP LB JO SY AE QA KW TW HK LU AF CY MT MC LK NP".split(" "),T3="AL AM AZ BY KZ GE EE LV LT SI BA MK ME MD KH LA MN UZ MM BH OM YE CM CI SN SD LY UG TZ ZW ZM MG NA BW CD CG GA ML NE TD LR CV BS BB TT GT HN SV NI BZ GY SR FJ PG AD LI SM VA PR GL".split(" ");
const dif=c=>(T1.includes(c)?.1:T2.includes(c)?.35:T3.includes(c)?.65:.9)+Math.random()*.16-.08;
function ramp(pool,n){const sc={};pool.forEach(c=>sc[c]=dif(c));const left=sh(pool),out=[];n=Math.min(n,left.length);
 for(let k=0;k<n;k++){const d=n>1?k/(n-1):0;left.sort((a,b)=>Math.abs(sc[a]-d)-Math.abs(sc[b]-d));out.push(left.splice(Math.random()*Math.min(4,left.length)|0,1)[0])}return out}
function start(m,n){mode=m;lifeMode=m=="s";lives=7;T=n||T;run++;log=[];q=ramp(mode=="c"||mode=="s"?K.filter(c=>D[c][1]):K,T);T=q.length;i=0;s=0;show("play-area");next()}
function head(){$("rd").textContent=lifeMode?`Bandeira ${i+1} · ❤️ ${lives}/7`:`Bandeira ${i+1} de ${T}`}
function next(){
 lock=false;const c=q[i];cur=c;qm=mode=="s"?["p","c","f"][Math.random()*3|0]:mode;const f=qm=="f";
 const right=f?c:lab(c);
 const others=f?sh(K.filter(x=>x!==c)).slice(0,3):qm=="p"?sh(K.filter(x=>x!==c)).slice(0,3).map(lab):sh(CN.filter(x=>x!==right)).slice(0,3);
 const o=sh([right,...others]);
 $("fc").classList.remove("hit");$("fc").classList.toggle("nm",f);$("fx").innerHTML="";
 $("fl").className=SC();$("fl").style.backgroundImage=`url(${D[c][SI()]})`;
 if(f)$("cap").innerHTML=`<small>Qual é a bandeira de…</small>${D[c][0]}`;else $("cap").textContent=qm=="c"?D[c][0]:"";
 head();$("sc").textContent=`Pontos: ${s}`;$("pg").style.width=(i/T*100)+"%";
 $("op").className="opts"+(f?" fg":"");
 $("op").innerHTML=o.map((x,n)=>f?`<button class="opt fo" data-c="${x}" aria-label="Bandeira ${L[n]}"><b>${L[n]}</b><div class="${SC()}" style="background-image:url(${D[x][SI()]})"></div></button>`:`<button class="opt" data-c="${x}"><b>${L[n]}</b><span>${x}</span></button>`).join("");
 $("op").querySelectorAll(".opt").forEach(b=>b.onclick=()=>pick(b));
}
function celebrate(){
 const fc=$("fc"),fx=$("fx");fc.classList.remove("hit");void fc.offsetWidth;fc.classList.add("hit");
 let h='<div class="plus">+1</div>';
 for(let n=0;n<28;n++){const a=Math.random()*6.283,r=90+Math.random()*130;
  h+=`<i style="background:${COL[n%6]};--dx:${Math.cos(a)*r|0}px;--dy:${Math.sin(a)*r-40|0}px;--r:${Math.random()*720-360|0}deg"></i>`}
 fx.innerHTML=h;
 const p=$("sc");p.classList.remove("bump");void p.offsetWidth;p.classList.add("bump");
}
function pick(b){
 if(lock||paused)return;lock=true;const r=qm=="f"?cur:lab(cur),ok=b.dataset.c===r,my=run;log.push({c:cur,ok});
 if(ok){s++;b.classList.add("ok");celebrate();sOk()}else{sBad();if(lifeMode){lives--;head()}b.classList.add("bad");[...$("op").children].find(x=>x.dataset.c===r).classList.add("ok")}
 $("op").querySelectorAll(".opt").forEach(x=>x.disabled=true);$("sc").textContent=`Pontos: ${s}`;
 setTimeout(()=>{if(my!==run)return;if(paused){pend=true;return}adv()},ok?1100:1500);
}
function adv(){i++;i<T&&!(lifeMode&&lives<=0)?next():fim()}
function fim(){
 $("pg").style.width="100%";const lf=lifeMode,win=lf?s>=25:s>=T*.4;show("end");(win?sWin:sLose)();
 if(lf){const all=lives>0&&i>=T;
  $("ee").textContent=all||s>=80?"🏆":s>=50?"🎉":s>=25?"🙂":"🌍";
  $("et").textContent=all?"Você zerou o jogo!":s>=80?"Lendário!":s>=50?"Incrível!":s>=25?"Mandou bem!":"Bom começo!";
  $("es").textContent=all?`Você acertou ${s} bandeiras sem perder as 7 vidas!`:`Acabaram as vidas! Você acertou ${s} ${s==1?"bandeira":"bandeiras"}.`}
 else{
  $("ee").textContent=s==T?"🏆":s>=T*.7?"🎉":s>=T*.4?"🙂":"🌍";
  $("et").textContent=s==T?"Perfeito!":s>=T*.7?"Mandou bem!":s>=T*.4?"Quase lá!":"Vamos treinar mais!";
  $("es").textContent=`Você acertou ${s} de ${T} bandeiras.`}
 $("rc").innerHTML=log.map(x=>`<div class="ri ${x.ok?"":"r"}"><img src="${D[x.c][4]}" alt=""><span>${D[x.c][0]}</span><b>${x.ok?"✓":"✗"}</b></div>`).join("");
}
setInterval(()=>{const n=performance.now();document.querySelectorAll(".fimg").forEach(e=>{const s=e.classList.contains("shd"),f=s?(n/110|0)%8:(n/80|0)%16;e.style.backgroundPosition=`${(f%4)*100/3}% ${(f>>2)*(s?100:100/3)}%`})},40);
document.addEventListener("click",e=>{if(e.target.closest("button")&&!e.target.closest(".opt")&&!e.target.closest("#seg2"))tone([[600,0,.06]],"square",.06)});
$("play").onclick=()=>show("modes");$("bk1").onclick=()=>show("start");
$("mp").onclick=()=>{pm="p";show("qty")};$("mc").onclick=()=>{pm="c";show("qty")};$("mf").onclick=()=>{pm="f";show("qty")};$("ms").onclick=()=>start("s",9999);$("bk3").onclick=()=>show("modes");
document.querySelectorAll(".qb").forEach(b=>b.onclick=()=>start(pm,b.dataset.n=="all"?9999:+b.dataset.n,b.dataset.v=="1"));
$("again").onclick=()=>start(mode,T,lifeMode);$("menu").onclick=()=>show("start");
function pause(){if(paused)return;paused=true;$("pz").classList.add("on")}
function resume(){paused=false;$("pz").classList.remove("on");if(pend){pend=false;adv()}}
function quit(){paused=false;pend=false;run++;show("start")}
$("pbtn").onclick=pause;$("pr").onclick=resume;$("pm2").onclick=quit;
$("gbtn").onclick=()=>{pause();openCfg("pause")};$("pc").onclick=()=>openCfg("pause");
$("cfgbtn").onclick=()=>openCfg("start");
function openCfg(f){cfgFrom=f;show("cfg")}
$("cfgok").onclick=()=>{if(cfgFrom=="pause"){show("play-area");$("pz").classList.add("on")}else show("start")};
addEventListener("keydown",e=>{const n=L.indexOf(e.key.toUpperCase());if(e.key=="Escape"&&$("play-area").classList.contains("on")){paused?resume():pause();return}if(e.key.length==1&&n>=0&&$("play-area").classList.contains("on")&&!lock&&!paused){const b=$("op").querySelectorAll(".opt")[n];b&&pick(b)}});
