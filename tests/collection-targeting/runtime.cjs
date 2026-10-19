// Functional DOM/event harness. It tests the embedded runtime without external network resources.
// It does not emulate browser layout or pixel rendering.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../../TAHSILAT-HEDEFLEME-DEMO.html'),'utf8');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const decode=s=>String(s||'').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const plain=x=>JSON.parse(JSON.stringify(x));
const storage=new Map,blobs=new Map,downloads=[],listeners={};
const nodes=new Map;let allNodes=[];
const errors=[];
function parseInto(s,owner){
 owner.children=[];
 for(const m of s.matchAll(/<(input|select|button|div|span|b|nav|dialog)\b([^>]*)>/g)){
  const attrs=Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(x=>[x[1],decode(x[2])]));
  const n=new Element(attrs.id||'',m[1]);n.value=attrs.value||'';n.checked=/(?:^|\s)checked(?:\s|$)/.test(m[2]);n.disabled=/(?:^|\s)disabled(?:\s|$)/.test(m[2]);n.classes=(attrs.class||'').split(' ');
  n.dataset=Object.fromEntries(Object.entries(attrs).filter(([k])=>k.startsWith('data-')).map(([k,v])=>[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v]));
  n.parentElement={firstChild:{textContent:''}};
  if(m[1]==='select'){
   const body=s.slice(m.index+m[0].length).split('</select>')[0];const options=[...body.matchAll(/<option\b([^>]*)>([^<]*)<\/option>/g)];
   const option=options.find(x=>/\sselected(?:\s|$)/.test(x[1]))||options[0];n.value=decode(option?.[1].match(/value="([^"]*)"/)?.[1]||'');
  }
  owner.children.push(n);allNodes.push(n);if(n.id)nodes.set(n.id,n);
 }
}
class Element{
 constructor(id='',tag='div'){this.id=id;this.tagName=tag.toUpperCase();this.value='';this.checked=false;this.disabled=false;this.style={};this.dataset={};this._html='';this.textContent='';this.open=false;this.children=[];this.classes=[];this.classList={contains:x=>this.classes.includes(x)};}
 set innerHTML(s){this._html=s;parseInto(s,this);}get innerHTML(){return this._html;}
 showModal(){this.open=true;}close(){this.open=false;}
 querySelector(s){return s.startsWith('#')?nodes.get(s.slice(1))||null:null;}
 querySelectorAll(s){if(s==='.sheetpick:checked')return this.children.filter(x=>x.classes.includes('sheetpick')&&x.checked);return [];}
 focus(){}setSelectionRange(){}closest(s){if(s==='button'&&this.tagName==='BUTTON'||s==='[data-action]'&&this.dataset.action)return this;return null;}
 click(){if(this.tagName==='A'){downloads.push({name:this.download,blob:blobs.get(this.href)});return;}this.onclick?.();}
}
const root=new Element('root');parseInto(html,root);
for(const m of scripts){const id=m[1].match(/id="([^"]*)"/)?.[1];if(id){const el=new Element(id,'script');el.textContent=m[2];nodes.set(id,el);}}
const document={querySelector:s=>nodes.get(s.slice(1))||null,getElementById:id=>nodes.get(id)||null,addEventListener:(name,f)=>(listeners[name]||=[]).push(f),createElement:tag=>new Element('',tag),documentElement:{cloneNode:()=>({querySelector:s=>new Element(s.slice(1)),outerHTML:html.replace(/^<!doctype html>/i,'')})}};
const fakeURL={createObjectURL:blob=>{const url='blob:test-'+blobs.size;blobs.set(url,blob);return url;},revokeObjectURL(){}};
class Worker{
 constructor(url){this.url=url;this.terminated=false;}
 async postMessage(data){try{const src=await blobs.get(this.url).text();const ctx={console,ArrayBuffer,Uint8Array,Date,setTimeout,postMessage:value=>this.onmessage?.({data:value})};ctx.self=ctx;vm.createContext(ctx);vm.runInContext(src,ctx);ctx.onmessage({data});}catch(e){this.onerror?.(e);}}
 terminate(){this.terminated=true;}
}
const ctx={console,document,Blob,URL:fakeURL,Worker,crypto:require('crypto').webcrypto,TextEncoder,TextDecoder,ArrayBuffer,Uint8Array,
 setTimeout:(fn,n)=>n>=6500?0:setTimeout(fn,n),clearTimeout,atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64'),
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)}};
ctx.window=ctx;ctx.self=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const [i,m]of scripts.entries())if(!/type="text\/plain"/.test(m[1]))vm.runInContext(m[2],ctx,{filename:'embedded-'+i+'.js'});
const run=s=>vm.runInContext(s,ctx);
const get=s=>plain(run(s));
function click(action){const node=new Element('','button');node.dataset.action=action;for(const f of listeners.click||[])f({target:node,stopImmediatePropagation(){}});}
function input(id,value){const n=nodes.get(id);assert.ok(n,id);n.value=String(value);for(const f of listeners.input||[])f({target:n});}
const E=ctx.HedefEngine,clone=plain,eyo=E.EYO[0];
function makeFixture(opts={}){
 const s={version:8,demo:false,params:{...clone(E.defaults),scope:'all',min:.9,max:.9,methodApproved:true,sourceApproved:true,orgApproved:true},files:[],scenarios:[],audit:[]};
 function add(role,kind,q,rows){const id='fixture-'+s.files.length;s.files.push({id,name:id+'.xlsx',role,kind,quarter:q,scale:1,format:'EN',columns:[...E.contracts[role]],stockDefinition:'Anapara bakiyesi',collectionDefinition:'Anapara + masraf + sabit / işleyen faiz',rows:E.normalize(rows,{id,format:'EN',scale:1}),hash:id});}
 add('branches','','',[{SUBEKODU:'S1',SUBE_ADI:'Bir',IL_KODU:'01',IL_ADI:'Birinci il'},{SUBEKODU:'S2',SUBE_ADI:'İki',IL_KODU:'02',IL_ADI:'İkinci il'},{SUBEKODU:'S3',SUBE_ADI:'Üç',IL_KODU:'03',IL_ADI:'Üçüncü il'}]);
 add('units','','',[{TAKIPBIRIMKODU:'R1',BIRIM_ADI:'Bölge 1',BIRIM_TIPI:'BOLGE'},{TAKIPBIRIMKODU:'R2',BIRIM_ADI:'Bölge 2',BIRIM_TIPI:'BOLGE'},{TAKIPBIRIMKODU:'M1',BIRIM_ADI:'Merkez 1',BIRIM_TIPI:'MERKEZ'}]);
 for(const q of E.quarters(s.params.quarter)){
  const [start,end]=E.bounds(q),meta={ENVANTER_TARIHI:start,ILK_TARIH:start,SON_TARIH:end,NULL_BILESEN_ADEDI:0,MUKERRER_HESAP_ADEDI:0,EKSIK_ALAN_ADEDI:0,ENVANTER_SATIR_ADEDI:100,VERI_DURUMU:'KONTROL_EDILEBILIR'};
  add('A','history',q,[{...meta,SUBEKODU:'S1',TAKIPBIRIMKODU:'R1',EYO:eyo,STOK:100e6,TAHSILAT:4e6,ANAPARA_TAHSILATI:3e6},{...meta,SUBEKODU:'S2',TAKIPBIRIMKODU:'R2',EYO:eyo,STOK:100e6,TAHSILAT:12e6,ANAPARA_TAHSILATI:10e6}]);
  add('B','history',q,[{...meta,SUBEKODU:'S1',TAKIPBIRIMKODU:'M1',EYO:E.EYO[6],KIRILIM:'1',EYBT:'1',STOK:50e6,TAHSILAT:40e6,ANAPARA_TAHSILATI:35e6}]);
 }
 const [start,end]=E.bounds(s.params.quarter),meta={ENVANTER_TARIHI:start,ILK_TARIH:start,SON_TARIH:end,NULL_BILESEN_ADEDI:0,MUKERRER_HESAP_ADEDI:0,EKSIK_ALAN_ADEDI:0,ENVANTER_SATIR_ADEDI:100,VERI_DURUMU:'KONTROL_EDILEBILIR'};
 add('A','current',s.params.quarter,[{...meta,SUBEKODU:'S1',TAKIPBIRIMKODU:'R1',EYO:eyo,STOK:100e6,TAHSILAT:0,ANAPARA_TAHSILATI:0},{...meta,SUBEKODU:'S2',TAKIPBIRIMKODU:'R2',EYO:eyo,STOK:100e6,TAHSILAT:0,ANAPARA_TAHSILATI:0}]);
 add('B','current',s.params.quarter,[{...meta,SUBEKODU:'S1',TAKIPBIRIMKODU:'M1',EYO:E.EYO[6],KIRILIM:'1',EYBT:'1',STOK:50e6,TAHSILAT:0,ANAPARA_TAHSILATI:0}]);
 Object.assign(s.params,opts);
 return s;
}
const ah=s=>s.files.filter(f=>f.role==='A'&&f.kind==='history');

function setFixture(){ctx.fixture=makeFixture();run('state=fixture;page="overview";filter="";selectedUnit="";recalc();');}
let passed=0;
function test(name,fn){fn();passed++;console.log('PASS',name);}
async function atest(name,fn){await fn();passed++;console.log('PASS',name);}
async function main(){
 test('Embedded runtime initializes with V8 demo',()=>{assert.ok(nodes.get('view').innerHTML.includes('Tahsilat hedeflerine genel bakış'));assert.equal(get('state.params.compositeEnabled'),true);});
 setFixture();
 test('All 12 existing pages render with the unchanged assignment bridge',()=>{
  for(const page of get('Object.keys(names)')){click('nav:'+page);assert.ok(nodes.get('view').innerHTML.length>200,page);}
  assert.equal(get('PAM_BRIDGE().branches.length'),3);
 });
 test('Parameter sections expose independent weights and real quarter labels',()=>{
  click('nav:params');assert.equal(nodes.get('commonW0').value,'20');assert.equal(nodes.get('blendLocal').value,'50');assert.ok(nodes.get('view').innerHTML.includes('2026-Q1 ortak EYO ağırlığı'));
  input('pquarter','2027-Q1');assert.equal(nodes.get('commonW0').parentElement.firstChild.textContent,'2026-Q2 ortak EYO ağırlığı (%)');input('pquarter','2026-Q4');
 });
 test('Blank or invalid weights show errors and never mutate active params',()=>{
  const before=get('JSON.stringify(state.params)');input('commonW0','');click('saveparams');assert.equal(get('JSON.stringify(state.params)'),before);assert.equal(nodes.get('weightValidation').hidden,false);assert.ok(nodes.get('toast').textContent.includes('boş'));
  input('commonW0',-10);click('saveparams');assert.equal(get('JSON.stringify(state.params)'),before);input('commonW0',20);input('blendLocal',75);click('saveparams');assert.equal(get('JSON.stringify(state.params)'),before);input('blendCommon',25);click('saveparams');assert.deepEqual(get('state.params.blendWeights'),[.75,.25]);assert.deepEqual(get('state.params.weights'),[.2,.3,.5]);
 });
 test('Changing only common weights preserves local controls',()=>{
  input('commonW0',100);input('commonW1',0);input('commonW2',0);click('saveparams');assert.deepEqual(get('state.params.commonWeights'),[1,0,0]);assert.deepEqual(get('state.params.weights'),[.2,.3,.5]);
 });
 test('Search and unit display filters leave shared pool and final targets unchanged',()=>{
  const a=get('JSON.stringify(result.commonPool)'),b=get('result.final');click('nav:region');input('search','Birinci');const unit=nodes.get('unitfilter');unit.value='R1';for(const f of listeners.change||[])f({target:unit});assert.equal(get('JSON.stringify(result.commonPool)'),a);assert.equal(get('result.final'),b);
 });
 test('Target details show local/compound rates, dates and effective weights',()=>{
  click('nav:explain');const select=nodes.get('detailrow');select.value=String(get('result.rows.findIndex(x=>x.BIRIM_TIPI==="BOLGE")'));for(const f of listeners.change||[])f({target:select});const body=nodes.get('detailbody').innerHTML;for(const text of ['İl + EYO ikame öncesi','Bölgeler geneli aynı EYO','Efektif bileşik ağırlıklar','2026-07-01','Yüklenen Bölge havuzu'])assert.ok(body.includes(text),text);
 });
 test('Scenario captures new params, result details and common pool',()=>{
  click('saveScenario');input('scenarioName','V8 deneme');nodes.get('yesmodal').onclick();assert.equal(get('state.scenarios.length'),1);assert.deepEqual(get('state.scenarios[0].snapshot.params.commonWeights'),[1,0,0]);assert.deepEqual(get('state.scenarios[0].snapshot.params.blendWeights'),[.75,.25]);assert.equal(get('state.scenarios[0].resultSnapshot.commonPool.length'),36);
 });
 await atest('Excel uses embedded ExcelJS and reads back with embedded SheetJS',async()=>{
  await run('excel(false)');const d=downloads.at(-1);assert.ok(d.name.endsWith('.xlsx'));const buf=Buffer.from(await d.blob.arrayBuffer());
  const X=ctx.XLSX;const wb=X.read(buf,{type:'buffer'});for(const name of ['Bileşik EYO Açıklamaları','Ortak EYO Havuzu','Yerel EYO Dönemleri','Parametreler','Şube Hedef Listesi'])assert.ok(wb.SheetNames.includes(name),name);
  const rows=X.utils.sheet_to_json(wb.Sheets['Bileşik EYO Açıklamaları'],{header:1});const labels=rows[1];assert.ok(labels.includes('EYO bileşik oranı'));assert.ok(labels.includes('Efektif ortak ağırlık'));assert.ok(rows.slice(2).some(r=>r[labels.indexOf('EYO bileşik oranı')]===.05));
  const params=X.utils.sheet_to_json(wb.Sheets.Parametreler,{header:1});assert.ok(params.some(r=>r[0]==='Bileşik ağırlıklar (yerel, ortak)'&&r[1]==='[0.75,0.25]'));
  const local=X.utils.sheet_to_json(wb.Sheets['Yerel EYO Dönemleri'],{header:1});assert.ok(local.some(r=>r.includes('2026-09-30')));
 });
 await atest('JSON backup and actual restore action preserve params and totals',async()=>{
  const before=get('result.final');click('backup');nodes.get('yesmodal').onclick();const d=downloads.at(-1),text=await d.blob.text();assert.equal(JSON.parse(text).scenarios.length,1);run('state.params.blendWeights=[1,0];recalc();');ctx.restoreFile={text:async()=>text};await run('restoreBackup(restoreFile)');nodes.get('yesmodal').onclick();assert.equal(get('result.final'),before);assert.deepEqual(get('state.params.blendWeights'),[.75,.25]);
 });
 test('Opening an old approved scenario does not enable V8 or rewrite approval',()=>{
  ctx.oldState=get('E.demo()');ctx.oldState.version=7;delete ctx.oldState.params.compositeEnabled;run('state.scenarios.push({name:"Eski",date:"2026-09-01",approved:true,total:123,approvalDate:"2026-09-01",snapshot:oldState,resultSnapshot:{final:123}});');
  const node=new Element('','button');node.dataset.restoreScenario='1';for(const f of listeners.click||[])f({target:node,stopImmediatePropagation(){}});nodes.get('yesmodal').onclick();assert.equal(get('state.params.compositeEnabled'),false);assert.equal(get('state.scenarios[1].approved'),true);assert.equal(get('state.scenarios[1].total'),123);
 });
 test('Local storage includes new parameter groups',()=>{setFixture();storage.set('fintek.demo.targeting.v8.persist','1');run('persist()');assert.equal(JSON.parse(storage.get('fintek.demo.targeting.v8.project')).params.compositeEnabled,true);assert.deepEqual(JSON.parse(storage.get('fintek.demo.targeting.v8.project')).params.blendWeights,[.5,.5]);});
 await atest('Standalone download retains all inline code with no data snapshots',async()=>{
  run('htmlDownload()');const d=downloads.at(-1);assert.equal(d.name,'TAHSILAT-HEDEFLEME-DEMO.html');const out=await d.blob.text();assert.ok(out.includes('function compositeRow'));assert.ok(out.includes('commonWeights'));assert.ok(!out.includes('fixture-'));assert.ok(!/<(?:script|link|img)[^>]+(?:src|href)=["']https?:/i.test(out));assert.ok(!/\bfetch\(/.test(out));
 });
 await atest('Synthetic CSV bytes load through embedded worker, mapping and source commit',async()=>{
  click('nav:upload');nodes.get('role').value='branches';const csv='SUBEKODU,SUBE_ADI,IL_KODU,IL_ADI\nS1,Bir,01,Birinci il\nS2,İki,02,İkinci il\nS3,Üç,03,Üçüncü il\n';const data=Buffer.from(csv);ctx.file={name:'sube_test.csv',arrayBuffer:async()=>data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength)};await run('readFile(file)');await new Promise(r=>setTimeout(r,30));
  assert.ok(nodes.get('modal').innerHTML.includes('Yüklenecek sayfalar'));nodes.get('sheetsnext').onclick();assert.equal(nodes.get('maprole').value,'branches');nodes.get('commitfile').onclick();assert.ok(nodes.get('modal').innerHTML.includes('Çakışan kaynağı değiştir'));nodes.get('yesmodal').onclick();assert.equal(get('state.files.filter(f=>f.role==="branches").length'),1);assert.equal(get('state.files.find(f=>f.role==="branches").rows.length'),3);
 });
 assert.equal(errors.length,0);
 console.log(`${passed} UI/runtime tests passed (functional harness; no browser layout test)`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
