(() => {
  'use strict';
  const originalFoes = [
    {name:'Vex, karetní mág', mode:'Karetní souboj', rune:'♧', loot:'Pečeť arkány', color:'#c5a4ff', jokes:['Je to tvoje karta? Cech kouzelníků mi ukládá se zeptat.', 'Vždyť jsem to dvakrát zamíchal. Ty ses fakt učil?', 'Můj plán měl poznámky pod čarou. Nikdo je nečetl.']},
    {name:'Nyx, drak ozvěn', mode:'Úder ozvěny', rune:'✧', loot:'Krystal ozvěny', color:'#80e9db', jokes:['Kdo tě naučil to kouzlo? Chci jeho zápisky.', 'Hromadím vědomosti. A občas taky lžičky.', 'Slíbili mi, že tenhle test bude na možnosti.']}
  ];
  const foes=bossProfiles.map((p,i)=>({...p,jokes:originalFoes[i%2].jokes}));
  const css = `
  .rrFight{--accent:#c5a4ff;position:fixed;inset:0;margin:auto;width:min(760px,calc(100vw - 20px));max-width:100%;max-height:94dvh;overflow:auto;border:1px solid #49425e;border-radius:22px;background:#14141f;color:#f5f3ff;padding:0;font:500 15px/1.45 system-ui,sans-serif;box-shadow:0 35px 120px #000a;color-scheme:dark}.rrFight::backdrop{background:#070811db;backdrop-filter:blur(8px)}.rrFight *{box-sizing:border-box}.rrFight .rrTop,.rrFight .rrRow{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}.rrFight .rrTop{padding:10px 17px;background:#1a1927;border-bottom:1px solid #302e40}.rrFight .rrTop b,.rrFight .rrEyebrow{font:700 11px/1.4 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;color:var(--accent)}.rrFight .rrControls{display:flex;gap:6px}.rrFight button{width:auto;margin:0;border:1px solid #49465a;background:#252333;color:#fff;border-radius:9px;cursor:pointer;padding:10px 13px;font:650 14px/1.25 system-ui;transition:transform .15s,background .2s,border-color .2s}.rrFight button:hover:not(:disabled){background:#353144;transform:translateY(-2px);border-color:var(--accent)}.rrFight button:focus-visible,.rrFight input:focus-visible,.rrFight textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.rrFight .rrSmall{font-size:12px;padding:6px 9px}.rrFight .rrScene{height:clamp(140px,24vh,228px);position:relative;overflow:hidden;background:#151323;isolation:isolate}.rrFight .rrScene canvas{width:100%;height:100%;object-fit:cover;image-rendering:pixelated}.rrFight .rrScene:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#13131ef9,transparent 62%);z-index:0;pointer-events:none}.rrFight .rrIdentity{position:absolute;bottom:14px;left:22px;right:22px;z-index:1}.rrFight .rrIdentity h2{font-size:clamp(20px,3vw,30px);line-height:1.2;margin:2px 0 7px;letter-spacing:-.04em}.rrFight progress{display:block;width:100%;height:7px;appearance:none;border:0;border-radius:9px;overflow:hidden;background:#363144}.rrFight progress::-webkit-progress-bar{background:#363144}.rrFight progress::-webkit-progress-value{background:var(--accent);transition:width .4s}.rrFight progress::-moz-progress-bar{background:var(--accent)}.rrFight .rrBody{padding:18px 22px 22px}.rrFight .rrStats{font:600 12px/1.5 ui-monospace,monospace;color:#beb9cc;padding-bottom:14px;margin-bottom:16px;border-bottom:1px solid #343141}.rrFight h3{font:700 clamp(20px,3.3vw,26px)/1.25 system-ui;letter-spacing:-.025em;margin:9px 0 14px;overflow-wrap:anywhere}.rrFight .rrGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.rrFight .rrGrid button{padding:13px;text-align:left;white-space:normal;overflow-wrap:anywhere;display:flex;align-items:center;gap:10px}.rrFight .rrKey{display:inline-grid;place-items:center;flex:none;width:24px;height:27px;border:1px solid #716286;border-radius:5px;color:var(--accent);font:700 11px ui-monospace,monospace}.rrFight .rrMain{background:#c5f66e;border-color:#c5f66e;color:#19210e}.rrFight .rrMain:hover:not(:disabled){background:#d7ffa1}.rrFight .rrActions{margin-top:13px;display:flex;gap:8px;flex-wrap:wrap}.rrFight textarea{width:100%;display:block;resize:vertical;min-height:62px;padding:12px;border:1px solid #585267;background:#0f1019;color:#fff;border-radius:10px;font:inherit}.rrFight .rrRunes{display:flex;flex-wrap:wrap;gap:7px}.rrFight .rrTray{padding:10px;min-height:52px;border:1px dashed #60576f;border-radius:9px;margin:9px 0 12px;color:#a9a2b7}.rrFight .rrMuted,.rrFight .rrQuote{color:#b8b2c5;font-size:13px;margin:6px 0}.rrFight .rrSource{border-left:2px solid var(--accent);padding:5px 12px;margin:12px 0;color:#cbc5d6;overflow-wrap:anywhere;white-space:pre-wrap}.rrFight .rrPop{position:absolute;right:12%;top:19%;font:900 24px system-ui;color:#edffbc;background:#161920dd;border-radius:8px;padding:4px 10px;z-index:3;pointer-events:none;animation:rrFloat .9s forwards}.rrFight .rrImpact canvas{animation:rrShake .38s both}.rrFight .rrSpell{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(135deg,transparent 43%,var(--accent) 49%,white 50%,transparent 54%);animation:rrSwipe .38s both}.rrFight .rrRelic{font-size:44px;color:var(--accent);text-shadow:0 0 18px var(--accent)}.rrFight .rrContinue{margin-top:13px}.rrFight .rrAnswer{white-space:pre-wrap;overflow-wrap:anywhere}.rrFight .rrQuiz{animation:rrEnter .22s ease-out}.rrFight .rrDanger{color:#ffc197}

  dialog.rrFight{width:min(1540px,100vw);height:min(950px,100dvh);max-height:100dvh;padding:0;border:0;border-radius:0;background:#111621;color:#f1eede}
  dialog.rrFight[open]{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(340px,1fr);grid-template-rows:52px 1fr}
  .rrFight .rrTop{grid-column:1/-1;background:#121720;border-color:#35394a}
  dialog.rrFight .rrScene{height:100%;width:100%;background:#192333;align-self:stretch}
  .rrFight .rrIdentity,.rrFight .pilot{position:absolute;top:20px;bottom:auto;z-index:3;width:41%;color:white;text-shadow:0 1px 4px #111}.rrFight .rrIdentity{right:4%;left:auto;text-align:right}.rrFight .pilot{left:4%;font:700 12px monospace}.rrFight .pilot progress{margin-top:8px;--accent:#88f2af}.rrFight .rrIdentity h2{font-size:17px}
  .rrFight .rrBody{overflow:auto;padding:clamp(18px,3vw,42px);background:linear-gradient(150deg,#232836,#131823 65%)}.rrFight .rrBody[hidden]{display:none}.rrFight .rrScene .duelLayer{object-fit:fill}.rrFight .rrQuiz h3{font-family:Georgia,serif;font-weight:500;font-size:clamp(22px,3vw,40px)}
  .rrFight .spellbook{grid-template-columns:1fr 1fr}.rrFight .rrDanger{color:#ffad94}.aimTrack{position:relative;border-radius:8px;height:28px;background:#39384b;margin:24px 0}.aimTrack span{position:absolute;left:62%;width:21%;height:100%;background:#64c994}.aimTrack i{position:absolute;width:4px;height:36px;top:-4px;background:white;box-shadow:0 0 9px white}
  @media(max-width:800px){dialog.rrFight[open]{display:block;overflow:auto}.rrFight .rrTop{min-height:44px}dialog.rrFight .rrScene{height:32dvh;min-height:180px}.rrFight .rrBody{overflow:visible}.rrFight .rrIdentity,.rrFight .pilot{top:8px}}
  @keyframes rrShake{20%,70%{transform:translateX(-6px)}45%,90%{transform:translateX(5px)}}@keyframes rrSwipe{0%{transform:translateX(-80%);opacity:0}35%{opacity:.8}100%{transform:translateX(80%);opacity:0}}@keyframes rrFloat{0%{opacity:0;transform:translateY(10px)}25%{opacity:1}100%{opacity:0;transform:translateY(-26px)}}@keyframes rrEnter{from{opacity:.2;transform:translateY(6px)}to{opacity:1;transform:none}}@media(max-width:530px){.rrFight .rrBody{padding:14px}.rrFight .rrGrid{grid-template-columns:1fr}.rrFight .rrScene{height:135px}}@media(prefers-reduced-motion:reduce){.rrFight *{animation-duration:.001ms!important;transition-duration:.001ms!important}}
  `;
  const node=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!=null)x.textContent=text;return x};
  const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const clean=s=>String(s).normalize('NFKC').replace(/−/g,'-').trim().replace(/[.!?]+$/u,'').replace(/\s+/g,' ');
  function matches(guess,answer){
    const a=clean(answer),g=clean(guess);
    // Chemical formulae and symbols have case-sensitive meanings (Co vs CO).
    const formula=/^(?:[A-Z][a-z]?\d*|[()[\]+-])+$/;
    return formula.test(a)?g===a:g.toLocaleLowerCase()===a.toLocaleLowerCase();
  }
  let audio,muted=false;
  try{muted=localStorage.getItem('recallRaid-muted')==='1'}catch{}
  function tone(notes){
    if(muted)return;
    try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});notes.forEach((hz,i)=>{const osc=audio.createOscillator(),amp=audio.createGain(),t=audio.currentTime+i*.075;osc.type='triangle';osc.frequency.value=hz;amp.gain.setValueAtTime(.0001,t);amp.gain.exponentialRampToValueAtTime(.07,t+.012);amp.gain.exponentialRampToValueAtTime(.0001,t+.14);osc.connect(amp);amp.connect(audio.destination);osc.start(t);osc.stop(t+.15)})}catch{}
  }
  function action(text,fn,cls){const b=node('button',cls,text);b.type='button';b.onclick=fn;return b}
  window.startCombat=function({cards,boss=0,target=80,onWin=()=>{}}){
    if(document.querySelector('.rrFight')||!cards?.length)return;
    if(!document.getElementById('rrFightStyle')){const style=node('style','',css);style.id='rrFightStyle';document.head.append(style)}
    const enemy=foes[boss]||foes[0],deck=shuffle(cards).map(c=>({...c,stage:0,seen:0,due:0,wrong:0})),needed=Math.ceil(deck.length*Math.min(100,Math.max(1,target))/100);
    let turn=0,current,streak=0,best=0,attempts=0,errors=0,won=false,answered=false;
    const modal=node('dialog','rrFight');modal.style.setProperty('--accent',enemy.color);modal.setAttribute('aria-label','Souboj s protivníkem '+enemy.name);
    const top=node('div','rrTop'),controls=node('div','rrControls'),scene=node('div','rrScene'),canvas=node('canvas'),identity=node('div','rrIdentity'),hp=node('progress'),hpLabel=node('span','rrEyebrow');
    hp.setAttribute('aria-label','Zbývající štít protivníka');hp.max=needed*14+10;
    identity.append(hpLabel,node('h2','',enemy.name),hp);scene.append(canvas,identity);
    const body=node('div','rrBody'),stats=node('div','rrStats rrRow'),master=node('span'),combo=node('span'),quiz=node('div','rrQuiz');stats.append(master,combo);body.append(stats,quiz);modal.append(top,scene,body);
    const exit=()=>{arena.stop();modal.close();modal.remove()};let exitPanel;
    function cancelExit(){if(exitPanel){exitPanel.remove();exitPanel=null;body.hidden=false}}
    function leave(){if(won)return exit();if(exitPanel){cancelExit();return}exitPanel=node('div','rrBody');exitPanel.append(node('h3','','Opustit souboj?'),node('p','rrMuted','Rozehraný souboj se ukončí. Balíček zůstane uložený.'),action('Bojovat dál',cancelExit,'rrMain'),action('Odejít',exit));body.hidden=true;modal.append(exitPanel)}
    const sound=action('',()=>{muted=!muted;try{localStorage.setItem('recallRaid-muted',muted?'1':'0')}catch{}sound.textContent=muted?'Zvuk vypnutý':'Zvuk zapnutý';if(!muted)tone([392,523])},'rrSmall');sound.textContent=muted?'Zvuk vypnutý':'Zvuk zapnutý';
    controls.append(sound,action('Ukončit výpravu',leave,'rrSmall'));top.append(node('b','',enemy.rune+'　'+enemy.mode),controls);
    modal.oncancel=e=>{e.preventDefault();leave()};document.body.append(modal);modal.showModal();canvas.remove();
    const arena=duelStage(scene,boss);let life=hp.max,mana=0,ward=0,burn=0,mark=0,busy=false,casts=0;
    const manaGauge=node('progress','manaGauge');manaGauge.max=12;manaGauge.setAttribute('aria-label','Nabitá energie');stats.append(manaGauge);
    let health=100;const player=node('div','pilot'),heart=node('progress'),heartLabel=node('b');heart.max=100;player.append(heartLabel,heart);scene.append(player);
    const mastered=()=>deck.filter(c=>c.stage===2).length;
    function update(){
      heart.value=health;heartLabel.textContent='STRÁŽCE　'+health+' / 100';manaGauge.value=mana;hp.value=life;hpLabel.textContent='Životy · '+life+' / '+hp.max;
      master.textContent='Zvládnuto '+mastered()+' / '+deck.length+' · cíl '+target+' %';
      combo.textContent='⚡ '+mana+'/12　◈ '+ward+' štít　✦ série '+streak;
    }
    function fx(label){
      scene.classList.remove('rrImpact');void scene.offsetWidth;scene.classList.add('rrImpact');
      const pop=node('span','rrPop',label),spell=node('i','rrSpell');scene.append(pop,spell);setTimeout(()=>{pop.remove();spell.remove()},950);
    }
    function finish(){
      if(won)return;won=true;const xp=needed*20+Math.min(50,best*3);onWin(xp);tone([392,494,587,784]);fx('VÍTĚZSTVÍ');quiz.replaceChildren();
      quiz.append(node('span','rrRelic',enemy.rune),node('div','rrEyebrow','Získaná relikvie · '+enemy.loot),node('h3','','Protivník poražen!'),node('p','',mastered()+' z '+deck.length+' karet zvládnuto dvakrát. Počet chyb: '+errors+'. Seslaná kouzla: '+casts+'.'),node('p','rrQuote','“'+enemy.jokes[(turn+1)%3]+'”'),action('Zpět do arény · +'+xp+' XP',exit,'rrMain'));
      const missed=deck.filter(c=>c.wrong>0);if(missed.length){const d=node('details');d.append(node('summary','','Projít otázky s chybou ('+missed.length+')'));missed.forEach(c=>d.append(node('p','rrAnswer',c.q+'　→　'+c.a)));quiz.append(d)}
    }
    async function resolve(ok,typed=''){
      if(answered||won)return;answered=true;attempts++;
      if(ok){current.stage=Math.min(2,current.stage+1);mana=Math.min(12,mana+3+(streak>=2?1:0));streak++;best=Math.max(best,streak);tone(streak>=3?[392,523,659]:[392,523]);}
      else{current.stage=0;errors++;current.wrong++;streak=0;tone([196,147])}
      current.seen++;current.due=turn+Math.min(3,deck.filter(c=>c.stage<2).length);update();quiz.replaceChildren();
      quiz.append(node('div','rrEyebrow',ok?(current.stage===2?'Učivo zvládnuto':'Energie nabita'):'Chyba · protiútok'),node('h3','',ok?(current.stage===2?'Správně i zpaměti!':'Máš iniciativu.'):'Průlom obrany'));
      if(typed&&!ok)quiz.append(node('p','rrMuted','Tvoje odpověď: '+typed));
      quiz.append(node('p','rrAnswer',current.q+'　→　'+current.a));
      if(current.source)quiz.append(node('blockquote','rrSource',current.source));
      if(ok&&streak%3===0)quiz.append(node('p','rrQuote','“'+enemy.jokes[Math.floor(streak/3-1)%3]+'”'));
      if(!ok){
        const hit=ward?0:(boss%2?24:20)+(phase()?5:0);if(ward)ward--;health=Math.max(0,health-hit);update();
        await arena.play('enemy',enemy.color);if(!modal.isConnected)return;
        if(!health){won=true;tone([220,147,98]);quiz.prepend(node('h3','','Strážce padl'),node('div','rrEyebrow','PORÁŽKA · Bez odměny'));quiz.append(action('Odveta se stejným učivem',()=>{exit();window.startCombat({cards,boss,target,onWin})},'rrMain'),action('Do arény',exit));return}
        quiz.append(node('p','rrDanger',hit?'Přímý zásah: −'+hit+' zdraví. Přicházíš o tento tah.':'Záštita zachytila zásah.'),action('Znovu do střetu',play,'rrMain'));return
      }
      if(streak%3===0){health=Math.min(100,health+8);quiz.append(node('p','rrMuted','Tři odpovědi v řadě · obnova 8 zdraví'));update()}
      if(!life&&mastered()>=needed){finish();return}
      actionMenu();
    }
    const spells=[
      ['Hvězdný šíp',2,5,'bolt','#a8ffcf','Rychlý zásah'],
      ['Měsíční čepel',3,8,'blade','#fecee8','Výpad přes arénu'],
      ['Trojvýstřel',4,11,'volley','#ffd68a','Tři střely prolomí iluzi protivníka'],
      ['Ledová pečeť',3,4,'mark','#8deaff','Další zásah získá +6 síly'],
      ['Žhavá nova',5,9,'nova','#ff9b60','Další dvě akce způsobí po 4 poškození'],
      ['Hvězdná záštita',2,0,'ward','#b3f9fc','Zastaví dva výpady protivníka'],
      ['Bouřkový řetěz',7,20,'storm','#b4a8ff','Blesk využije slabinu nabíjejícího se protivníka'],
      ['Paprsek zatmění',10,34,'beam','#fff39f','Soustředěná energie prorazí iluzi']
    ];
    const phase=()=>life>0&&life<=hp.max/2;
    const intent=()=>!life?'Protivník je omráčený':(phase()?'Druhá fáze · silnější protiútok · ':'')+(boss%2?(turn%3===0?(boss===3?'Výboj parohů · ohrozí 4 energie':'Dračí dech · ohrozí 4 energie'):turn%3===2?(boss===3?'Parohy nabíjejí proud · slabina vůči blesku':'Nyx nabíjí dech · slabina vůči blesku'):(boss===3?'Výpad parohy · ohrozí 1 energii':'Dráp · ohrozí 1 energii')):(turn%3===1?'Zrcadlení · běžné zásahy působí polovinu':turn%3===2?(boss===2?'Ignis rozevírá křídla · prostor k nabití':'Vex míchá karty · prostor k nabití'):(boss===2?'Sluneční erupce · ohrozí 3 energie':'Karetní bouře · ohrozí 3 energie')));
    function actionMenu(){
      quiz.append(node('div','rrEyebrow','Protivník · '+intent()),node('h3','','Vyber svou akci'));
      const grid=node('div','spellbook');
      for(const spell of spells){let [name,cost,power,,,desc]=spell;let btn=action('',()=>aim(spell));btn.disabled=mana<cost;btn.append(node('b','',name),node('small','','⚡ '+cost+' · síla '+power),node('span','',desc));grid.append(btn)}
      quiz.append(grid,action('Uchovat energii a pokračovat',()=>cast(null),'rrContinue'));
    }
    function aim(spell){
      if(spell[3]==='ward')return cast(spell);
      quiz.replaceChildren();quiz.append(node('div','rrEyebrow','TECHNIKA · '+spell[0]),node('h3','','Zasáhni v okamžiku průniku'),node('p','rrMuted','Zastav ukazatel v zeleném poli pro zásah ×1,5. Mimo pole útok způsobí základní poškození.'));
      const track=node('div','aimTrack'),needle=node('i'),zone=node('span');track.append(zone,needle);quiz.append(track);
      let fired=false;const start=performance.now(),position=()=>1-Math.abs(((performance.now()-start)/1050)%2-1);
      function animate(){if(fired||!needle.isConnected)return;needle.style.left=position()*100+'%';requestAnimationFrame(animate)}
      const fire=action('Udeřit　␣',()=>{if(fired)return;fired=true;const pos=position();cast(spell,pos>=.62&&pos<=.83)},'rrMain');quiz.append(fire);fire.focus({preventScroll:true});animate()
    }
    async function cast(spell,critical=false){
      if(busy||won||(spell&&mana<spell[1]))return;busy=true;quiz.replaceChildren();
      const [name,cost,base,kind,color]=spell||['Soustředění',0,0,'rest','#fff'];mana-=cost;
      let damage=critical?Math.ceil(base*1.5):base;if(base&&mark){damage+=6;mark=0}
      if(boss%2===0&&turn%3===1&&!['volley','beam'].includes(kind))damage=Math.ceil(damage/2);
      if(boss%2===1&&turn%3===2&&kind==='storm')damage+=9;
      if(burn){damage+=4;burn--}if(kind==='nova')burn=2;if(kind==='mark')mark=1;if(kind==='ward')ward=2;
      quiz.append(node('div','rrEyebrow',critical?'PŘESNÝ ZÁSAH ×1,5':'AKCE'),node('h3','',name));if(spell){casts++;tone([185+cost*20,320+cost*40]);await arena.play(kind,color)}
      if(!modal.isConnected)return;
      life=Math.max(0,life-damage);update();if(!life&&mastered()>=needed){finish();return}
      let loss=boss%2?([4,1,0][turn%3]):([3,0,0][turn%3]);
      if(loss&&life){if(phase())loss++;quiz.append(node('p','','Protiútok · '+intent()));await arena.play('enemy',enemy.color);if(!modal.isConnected)return;if(ward){ward--;loss=0}mana=Math.max(0,mana-loss)}
      busy=false;update();quiz.replaceChildren();quiz.append(node('h3','',damage?'Zásah za '+damage:'Energie připravena'),node('p','rrMuted',!life?'Protivník je omráčený. Dokonči svůj studijní cíl.':('Další kolo · '+(burn?'dohořívání '+burn+'　':'')+(mark?'aktivní pečeť　':'')+'zbývá '+mana+' energie.')),action('Další kolo →',play,'rrMain'));
    }
    function typed(){
      const box=node('textarea');box.rows=2;box.placeholder='Napiš odpověď zpaměti…';box.setAttribute('aria-label','Tvoje odpověď');box.spellcheck=false;box.autocomplete='off';
      const submit=()=>{const value=box.value.trim();if(!value){box.focus();return}
        if(matches(value,current.a))return resolve(true,value);
        // Long definitions can have several valid phrasings. Explicitly self-assess after an attempt.
        if(current.a.trim().split(/\s+/).length>=4){quiz.replaceChildren();quiz.append(node('div','rrEyebrow','Porovnej svou odpověď'),node('h3','','Vystihl jsi celý význam?'),node('p','rrAnswer','Tvoje odpověď: '+value),node('blockquote','rrSource','Vzorová odpověď: '+current.a),node('p','rrMuted','Bod si přičti, pokud tvoje původní odpověď obsahuje všechny podstatné myšlenky.'),action('Něco mi chybělo',()=>resolve(false,value)),action('Význam sedí',()=>resolve(true,value),'rrMain'));return}
        resolve(false,value)
      };
      box.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();submit()}};
      const actions=node('div','rrActions');actions.append(action('Seslat odpověď　↵',submit,'rrMain'),action('Ukázat odpověď',()=>resolve(false)));quiz.append(box,actions);box.focus({preventScroll:true});
    }
    function play(){
      turn++;answered=false;const alive=deck.filter(c=>c.stage<2),ready=alive.filter(c=>c.due<=turn);
      // Due reviews come back between fresh concepts, while ties keep their shuffled order.
      current=(alive.length?(ready.length?ready:alive):[...deck]).sort((a,b)=>ready.length?(a.due-b.due||a.seen-b.seen):a.due-b.due)[0];
      const choices=shuffle([...new Set(deck.map(c=>c.a))].filter(a=>!matches(a,current.a))).slice(0,3);
      const mode=current.stage>=1||boss%2===1?'recall':choices.length?'cards':'recall';
      update();quiz.replaceChildren();quiz.append(node('p','rrMuted','Správně: nabiješ útok. Chyba: ztratíš tah a životy. '+intent()),node('span','rrEyebrow','Kolo '+turn+'　/　'+({recall:'Útok zpaměti',forge:'Poskládej runy',cards:'Vyber kartu'})[mode]),node('h3','',current.q));
      if(mode==='cards'){const grid=node('div','rrGrid');shuffle([...choices,current.a]).forEach((a,i)=>{const btn=action('',()=>resolve(matches(a,current.a),a));btn.append(node('span','rrKey',String.fromCharCode(65+i)),node('span','',a));grid.append(btn)});quiz.append(grid)}
      else typed();
    }
    play();
  };
})();
