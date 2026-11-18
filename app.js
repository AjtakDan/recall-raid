const $=id=>document.getElementById(id);
const encounters=bossProfiles.map(p=>[p.name,p.mode,p.desc,p.color,p.rune]);
const sample={name:'Chemie · Prvky',notes:'H: vodík\nHe: helium\nLi: lithium\nC: uhlík\nN: dusík\nO: kyslík\nNa: sodík\nFe: železo'};
let db;try{db=JSON.parse(localStorage.getItem('recallRaid-v1'))}catch{}db=db||{decks:[sample,{name:'Chemie · Názvosloví',notes:'Jaké oxidační číslo má kyslík v oxidech? | −II\nJaké oxidační číslo má síra v sulfidech? | −II\nJaké oxidační číslo má chlor v chloridech? | −I\nJaký je vzorec oxidu železitého? | Fe₂O₃\nJaký je vzorec sulfidu sodného? | Na₂S\nJaký je vzorec chloridu vápenatého? | CaCl₂'}],xp:0,wins:[0,0],selected:0,target:80};
const oldElements='H: Hydrogen\nHe: Helium\nLi: Lithium\nC: Carbon\nN: Nitrogen\nO: Oxygen\nNa: Sodium\nFe: Iron';
for(const d of db.decks){if(d.name==='Chemistry · Elements'&&d.notes===oldElements&&!d.cards?.some(c=>!c.q.startsWith('Recall the meaning of'))){Object.assign(d,sample);delete d.cards}}
if(db.wins.length===3)db.wins=[db.wins[0],db.wins[2]];
while(db.wins.length<4)db.wins.push(0);
let boss=0,goal=db.target,chosen=db.selected,previewCards=null;
function save(){try{localStorage.setItem('recallRaid-v1',JSON.stringify(db));$('storageNote').hidden=true}catch{$('storageNote').hidden=false;$('storageNote').textContent='Úložiště prohlížeče je plné nebo nedostupné. Výpravu můžeš dohrát.'}$('xp').textContent='✦ '+db.xp+' XP';$('equipped').textContent=db.decks[chosen].name}
function parseNotes(raw){
 const result=[],seen=new Set();
 function add(q,a,source){q=q.trim();a=a.trim();let k=q+'|'+a;if(q&&a&&!seen.has(k)){result.push({q,a,source});seen.add(k)}}
 for(let row of raw.split(/\n/)){
 row=row.trim().replace(/^[-*•]\s+/,'');if(!row)continue;
 const pair=row.match(/^(.{1,180}?)\s*(?:\||\t|: | = | — | – | -> )\s*(.+)$/u);
 if(pair){add(/[?？]$/.test(pair[1])?pair[1]:'Co znamená „'+pair[1]+'“?',pair[2],row);continue}
 for(const sentence of row.split(/(?<=[.!?])\s+(?=[\p{Lu}\d])/u)){
 const relation=sentence.match(/^(.{2,75}?)\s+(is defined as|is known as|refers to|consists of|contains|is|are|je označován jako|označuje|obsahuje|je|jsou)\s+(.{2,220}?)[.!?]?$/iu);
 if(relation){
 const [,subject,verb,answer]=relation;
 const prompts={'is':'Co je','are':'Co jsou','refers to':'Co znamená','consists of':'Z čeho se skládá','contains':'Co obsahuje','is defined as':'Jak bys vysvětlil pojem','is known as':'Jak se také označuje','je':'Co je','jsou':'Co jsou','obsahuje':'Co obsahuje','označuje':'Co označuje','je označován jako':'Jak se také označuje'};
 add((prompts[verb.toLowerCase()]||'Vysvětli')+' '+subject+'?',answer,sentence);continue
 }
 const tokens=[...sentence.matchAll(/[\p{L}\p{N}][\p{L}\p{M}\p{N}-]*/gu)];
 if(tokens.length<3)continue;
 const stop=/^(about|their|there|which|these|those|because|called|during|between|který|která|které|protože|pomocí|tento|jsou)$/i;
 const token=tokens.filter(t=>!stop.test(t[0])).sort((a,b)=>Number(/\d/.test(b[0]))-Number(/\d/.test(a[0]))||b[0].length-a[0].length)[0];if(!token)continue;
 add(sentence.slice(0,token.index)+' _____ '+sentence.slice(token.index+token[0].length),token[0],sentence)
 }}
 return result;
}
function el(tag,cls,txt){let e=document.createElement(tag);e.className=cls||'';if(txt!=null)e.textContent=txt;return e}
encounters.forEach(([name,mode,desc,col,icon],i)=>{let b=el('button','boss');b.style.setProperty('--accent',col);b.innerHTML='<canvas aria-hidden="true"></canvas><span class="tag">BOSS 0'+(i+1)+'</span><div class="cardbody"><div class="mode">'+icon+'　'+mode+'</div><h3>'+name+'</h3><p>'+desc+'</p></div>';b.onclick=()=>openConfig(i);$('bosses').append(b);drawPortrait(b.querySelector('canvas'),i);$('enemy').add(new Option(name+' · '+mode,i))});
drawPortrait($('heroArt'),-1);
function openConfig(i){boss=i;$('enemy').value=i;let d=db.decks[chosen];$('deckName').value=d.name;$('notes').value=d.notes;$('goal').value=goal;$('percent').textContent=goal+'%';clearReview();$('config').showModal()}
function clearReview(){previewCards=null;$('review').replaceChildren();$('err').textContent=''}
$('setup').onclick=$('edit').onclick=()=>openConfig(boss);
$('notes').oninput=clearReview;
$('goal').oninput=()=>{$('percent').textContent=$('goal').value+'%'};
$('file').onchange=async e=>{let files=Array.from(e.target.files);if(!files.length)return;let f=files[0];if(files.reduce((sum,item)=>sum+item.size,0)>5000000){$('err').textContent='Vyber soubory o celkové velikosti do 5 MB.';return}try{const parts=await Promise.all(files.map(readStudyFile));$('notes').value=parts.join('\n\n')}catch{$('err').textContent='Soubor se nepodařilo načíst. Zkopíruj jeho text do pole Učivo.';e.target.value='';return}$('deckName').value=f.name.replace(/\.[^.]+$/,'');clearReview();e.target.value=''};
$('preview').onclick=()=>{let d=db.decks[chosen];previewCards=previewCards||((d.notes===$('notes').value&&d.cards)?d.cards.map(c=>({...c})):parseNotes($('notes').value));let r=$('review');r.replaceChildren();r.append(el('p','',previewCards.length+' otázek. Před bojem můžeš upravit zadání i odpovědi.'));for(let c of previewCards){let q=el('textarea'),a=el('input');q.rows=2;q.value=c.q;a.value=c.a;q.setAttribute('aria-label','Otázka');a.setAttribute('aria-label','Odpověď');q.oninput=()=>c.q=q.value;a.oninput=()=>c.a=a.value;r.append(q,a)}};
$('fight').onclick=()=>{let notes=$('notes').value.trim(),name=$('deckName').value.trim()||'Balíček bez názvu',d=db.decks[chosen],cards=(previewCards||((notes===d.notes)&&d.cards)||parseNotes(notes)).filter(c=>c.q.trim()&&c.a.trim());if(!cards.length){$('err').textContent='Zadej dvojici jako „Fe: železo“ nebo celou větu.';return}
 let idx=db.decks.findIndex(x=>x.name===name);if(idx===0&&db.decks[0].notes!==notes&&name===sample.name){name='Můj studijní balíček';idx=db.decks.findIndex(x=>x.name===name)}if(idx<0)idx=db.decks.length;chosen=idx;db.selected=idx;db.decks[idx]={...db.decks[idx],name,notes,cards};goal=db.target=+$('goal').value;boss=+$('enemy').value;save();$('config').close();startCombat({cards,boss,target:goal,onWin:xp=>{db.xp+=Number(xp)||0;db.wins[boss]++;const deck=db.decks[idx];deck.completed=(deck.completed||0)+1;deck.lastTarget=goal;deck.reviewAt=Date.now()+86400000*[1,3,7,14][Math.min(3,deck.completed-1)];save()}})};
function page(p){$('arena').hidden=p!=='arena';$('other').hidden=p==='arena';document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.page===p));let o=$('other');o.replaceChildren();if(p==='arena')return;o.append(el('h2','',p==='decks'?'Studijní balíčky':'Pokladnice'));if(p==='decks'){db.decks.forEach((d,i)=>{let t=el('article','tile'),b=el('button','sub','Vybrat　→');b.onclick=()=>{chosen=db.selected=i;save();page('arena');openConfig(boss)};t.append(b,el('h3','',d.name),el('p','',(d.cards||parseNotes(d.notes)).length+' otázek'+(d.reviewAt?' · Poslední cíl '+d.lastTarget+'% · '+(d.reviewAt<=Date.now()?'Čas na odvetu': 'Opakování '+new Date(d.reviewAt).toLocaleDateString("cs-CZ",{month:'short',day:'numeric'})):'')));o.append(t)});let b=el('button','lime','+ Nový balíček');b.onclick=()=>{page('arena');openConfig(boss);$('notes').value='';$('deckName').value='';$('deckName').focus()};o.append(b)}else{bossProfiles.map(p=>p.loot).forEach((x,i)=>{let t=el('article','tile');t.append(el('h3','',(db.wins[i]?'✦ ':'◇ ')+x),el('p','',db.wins[i]?'Získáno · počet vítězství: '+db.wins[i]+'':'Poraz protivníka '+encounters[i][0]+' a získej tuto relikvii.'));o.append(t)})}}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>page(b.dataset.page));document.querySelector('.logo').onclick=e=>{e.preventDefault();page('arena')};save();
