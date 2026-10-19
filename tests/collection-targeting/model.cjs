const assert=require('node:assert/strict');
const fs=require('fs');
const vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../../TAHSILAT-HEDEFLEME-DEMO.html'),'utf8');
const source=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)][2][2];
const m={exports:{}};new Function('module',source)(m);const E=m.exports;
const clone=x=>JSON.parse(JSON.stringify(x));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
let passed=0;
function test(name,fn){fn();passed++;console.log('PASS',name);}
const eyo=E.EYO[0],other=E.EYO[1];
function fixture(opts={}){
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
const row=r=>r.rows.find(x=>x.SUBEKODU==='S1'&&x.BIRIM_TIPI==='BOLGE'&&x.EYO===eyo);
const center=r=>r.rows.filter(x=>x.BIRIM_TIPI==='MERKEZ');

test('Requested 4 blend examples and K=0.90, 100 million stock',()=>{
 for(const [blend,expected] of [[[.5,.5],.06],[[.75,.25],.05],[[1,0],.04],[[0,1],.08]]){
  const r=E.calculate(fixture({blendWeights:blend})),x=row(r);near(x.YEREL_KULLANILAN_ORAN,.04);near(x.ORTAK_EYO_ORANI,.08);near(x.ORAN,expected);near(x.MODEL_KATKI,100e6*expected*.9);assert.equal(r.pendingStock,0);
 }
 near(row(E.calculate(fixture())).MODEL_KATKI,5.4e6);
});
test('Common 10/20/30 percent periods give 23 percent',()=>{
 const s=fixture({blendWeights:[0,1]});ah(s).forEach((f,i)=>f.rows.forEach(x=>x.TAHSILAT=x.STOK*(i+1)*.1));
 const r=E.calculate(s);near(row(r).ORTAK_EYO_ORANI,.23);assert.deepEqual(row(r).ORTAK_EFEKTIF_AGIRLIKLAR,'2026-Q1: 20.000% / 2026-Q2: 30.000% / 2026-Q3: 50.000%');
});
test('Ratio of amounts: 20/100 and 9/900 million = 2.9 percent',()=>{
 const s=fixture();ah(s).forEach(f=>{f.rows[0].STOK=100e6;f.rows[0].TAHSILAT=20e6;f.rows[1].STOK=900e6;f.rows[1].TAHSILAT=9e6;});
 near(row(E.calculate(s)).ORTAK_EYO_ORANI,.029);
});
test('Common pool keeps EYO separate and excludes Merkez portfolios',()=>{
 const s=fixture();ah(s).forEach(f=>f.rows.push({...f.rows[0],EYO:other,TAHSILAT:100e6}));
 s.files.filter(f=>f.role==='B').forEach(f=>{f.rows[0].EYO=eyo;s.params.centerIndividual='include';});
 const r=E.calculate(s);near(row(r).ORTAK_EYO_ORANI,.08);assert.ok(r.commonPool.every(x=>!x.KAYNAK.includes('M1')));assert.ok(r.commonPool.filter(x=>x.EYO===eyo).every(x=>x.STOK===200e6));
});
test('A missing positive-weight local component uses common with effective 100 percent',()=>{
 const s=fixture();ah(s).forEach(f=>f.rows=f.rows.filter(x=>x.SUBEKODU!=='S1'));const x=row(E.calculate(s));
 assert.equal(x.YEREL_KULLANILAN_ORAN,null);near(x.ORAN,.12);assert.equal(x.EFEKTIF_YEREL_AGIRLIK,0);assert.equal(x.EFEKTIF_ORTAK_AGIRLIK,1);assert.equal(x.IL_ORANI_UYGULANDI,false);
});
test('Zero opening stock is undefined, not a zero ratio',()=>{
 const s=fixture();ah(s).forEach(f=>{f.rows[0].STOK=0;f.rows[0].TAHSILAT=0;});const x=row(E.calculate(s));assert.equal(x.YEREL_IKAME_ONCESI_ORAN,null);near(x.ORAN,.12);
});
test('Measured common zero remains valid and final zero is not province-replaced',()=>{
 const s=fixture({blendWeights:[0,1]});ah(s).forEach(f=>{f.rows.forEach(x=>x.TAHSILAT=0);f.rows.push({...f.rows[0],EYO:other,TAHSILAT:20e6});});
 const x=row(E.calculate(s));near(x.ORTAK_EYO_ORANI,0);near(x.YEREL_KULLANILAN_ORAN,.1);near(x.ORAN,0);assert.equal(x.MODEL_KATKI,0);assert.equal(x.EFEKTIF_ORTAK_AGIRLIK,1);
});
test('Local zero invokes province before blending',()=>{
 const s=fixture();ah(s).forEach(f=>{f.rows[0].TAHSILAT=0;f.rows.push({...f.rows[0],EYO:other,TAHSILAT:20e6});});const x=row(E.calculate(s));
 near(x.YEREL_IKAME_ONCESI_ORAN,0);assert.equal(x.IL_ORANI_UYGULANDI,true);near(x.YEREL_KULLANILAN_ORAN,.1);near(x.ORTAK_EYO_ORANI,.06);near(x.ORAN,.08);
});
test('Local >100 percent invokes province; common >100 percent is not clipped',()=>{
 const s=fixture();ah(s).forEach(f=>{f.rows[0].TAHSILAT=200e6;f.rows[1].TAHSILAT=200e6;f.rows.push({...f.rows[0],EYO:other,TAHSILAT:20e6});});const r=E.calculate(s),x=row(r);
 near(x.YEREL_IKAME_ONCESI_ORAN,2);near(x.YEREL_KULLANILAN_ORAN,1.1);near(x.ORTAK_EYO_ORANI,2);near(x.ORAN,1.55);assert.ok(r.issues.some(x=>x.ACIKLAMA.includes('ağırlıklı ortak oranı %100 üzerinde')));
});
test('Negative component net rate remains reported, with zero floor before blend',()=>{
 const s=fixture();ah(s).forEach(f=>{f.rows[0].TAHSILAT=-4e6;f.rows[1].TAHSILAT=20e6;});const x=row(E.calculate(s));near(x.YEREL_IKAME_ONCESI_ORAN,-.04);near(x.YEREL_KULLANILAN_ORAN,0);near(x.ORTAK_EYO_ORANI,.08);near(x.ORAN,.04);assert.equal(x.SIFIR_TABANI,true);assert.equal(x.IL_ORANI_GEREKLI,false);
});
test('Missing periods independently renormalize selected weights',()=>{
 const s=fixture({weights:[.6,.3,.1],commonWeights:[.2,.3,.5]});s.files=s.files.filter(f=>!(f.role==='A'&&f.kind==='history'&&f.quarter==='2026-Q2'));
 const x=row(E.calculate(s));near(x._weights[0],6/7);near(x._weights[2],1/7);assert.ok(x.ORTAK_EFEKTIF_AGIRLIKLAR.includes('28.571%'));assert.ok(x.ORTAK_EFEKTIF_AGIRLIKLAR.includes('71.429%'));
});
test('Zero-weight unavailable component neither blocks nor steals weight',()=>{
 const s=fixture({blendWeights:[0,1]});ah(s).forEach(f=>f.rows=f.rows.filter(x=>x.SUBEKODU!=='S1'));const r=E.calculate(s);assert.equal(r.pendingStock,0);near(row(r).ORAN,.12);
});
test('Only available periods with weight zero do not count as calculated',()=>{
 const s=fixture({weights:[1,0,0],commonWeights:[1,0,0]});s.files=s.files.filter(f=>!(f.role==='A'&&f.kind==='history'&&f.quarter==='2026-Q1'));const x=row(E.calculate(s));assert.equal(x.ORAN,null);assert.equal(x.MODEL_KATKI,null);
});
test('No usable positive-weight component: manual or pending',()=>{
 const s=fixture({blendWeights:[1,0]});ah(s).forEach(f=>f.rows=f.rows.filter(x=>x.SUBEKODU!=='S1'));let x=row(E.calculate(s));assert.equal(x.ORAN,null);s.params.manualRates[x.ORAN_ANAHTARI]=.07;x=row(E.calculate(s));near(x.ORAN,.07);assert.equal(x.MANUEL_ORAN_UYGULANDI,true);assert.equal(x.EFEKTIF_ORTAK_AGIRLIK,0);
});
test('Region parameter changes leave all Merkez result fields and performance unchanged',()=>{
 const s=fixture(),base=E.calculate(s);for(const override of [{blendWeights:[.1,.9]},{commonWeights:[1,0,0]},{compositeEnabled:false},{regionMode:'management',regionManagement:7777777.77}]){
  const r=E.calculate(s,override);assert.deepEqual(center(r),center(base));assert.deepEqual(r.performance.filter(x=>x.BIRIM_TIPI==='MERKEZ'),base.performance.filter(x=>x.BIRIM_TIPI==='MERKEZ'));assert.deepEqual(r.scopeTotals.find(x=>x.BIRIM_TIPI==='MERKEZ'),base.scopeTotals.find(x=>x.BIRIM_TIPI==='MERKEZ'));
 }
 const r=E.calculate(s,{centerMode:'management',centerManagement:1777777.77});assert.deepEqual(r.rows.filter(x=>x.BIRIM_TIPI==='BOLGE'),base.rows.filter(x=>x.BIRIM_TIPI==='BOLGE'));
});
test('Management allocation reconciles exactly to budget in cents',()=>{
 const s=fixture({regionMode:'management',regionManagement:1234567.89,centerMode:'management',centerManagement:555555.55});const r=E.calculate(s);
 for(const [type,budget] of [['BOLGE',1234567.89],['MERKEZ',555555.55]])assert.equal(r.rows.filter(x=>x.BIRIM_TIPI===type).reduce((a,x)=>a+Math.round(x.NIHAI_HEDEF*100),0),Math.round(budget*100));
});
test('Common historical weights do not alter local weights, local rate or K',()=>{
 const s=fixture(),a=E.calculate(s),b=E.calculate(s,{commonWeights:[1,0,0]});assert.deepEqual(b.params.weights,a.params.weights);near(row(a).YEREL_KULLANILAN_ORAN,row(b).YEREL_KULLANILAN_ORAN);near(row(a).K,row(b).K);
});
test('Invalid new weight groups are rejected',()=>{
 for(const p of [{commonWeights:[.2,.3,.4]},{commonWeights:[-.1,.6,.5]},{blendWeights:[0,0]},{blendWeights:[NaN,1]},{weights:[null,.5,.5]}]){const r=E.calculate(fixture(p));assert.equal(r.blocked,true);assert.equal(r.rows.length,0);assert.ok(r.issues[0].ACIKLAMA.startsWith('Parametreler geçersiz'));}
});
test('Technical failures are excluded from both local and common components',()=>{
 const s=fixture();ah(s)[0].rows[0].MUKERRER_HESAP_ADEDI=1;const r=E.calculate(s);assert.ok(r.commonPool.filter(x=>x.CEYREK==='2026-Q1').every(x=>x.STOK===null));assert.ok(row(r).ORTAK_EFEKTIF_AGIRLIKLAR.includes('37.500%'));assert.equal(row(r)._weights[0],0);
});
test('Different stock/collection measures are excluded without contaminating Merkez',()=>{
 const s=fixture(),before=center(E.calculate(s));ah(s)[0].collectionDefinition='Sadece anapara';const r=E.calculate(s);assert.ok(r.commonPool.filter(x=>x.CEYREK==='2026-Q1').every(x=>x.STOK===null));assert.deepEqual(center(r),before);assert.ok(r.issues.some(x=>x.ACIKLAMA.includes('tanımı boş veya')));
});
test('Partial dates are retained, with no extrapolation',()=>{
 const s=fixture({partialMode:true});ah(s)[2].rows.forEach(x=>x.SON_TARIH='2026-09-15');const r=E.calculate(s);assert.ok(r.commonPool.filter(x=>x.CEYREK==='2026-Q3'&&x.STOK!==null).every(x=>x.SON_TARIH==='2026-09-15'));near(row(r).ORTAK_EYO_ORANI,.08);
});
test('Full branch transfers apply consistently to local and common pool',()=>{
 const s=fixture({transferMode:'full'});s.files.push({id:'transfer',name:'transfer.csv',role:'transfers',columns:E.contracts.transfers,rows:[{ONCEKISUBEKODU:'S1',SUBEKODU:'S3'}]});s.files.find(f=>f.role==='A'&&f.kind==='current').rows[0].SUBEKODU='S3';const r=E.calculate(s),x=r.rows.find(x=>x.SUBEKODU==='S3'&&x.BIRIM_TIPI==='BOLGE');near(x.YEREL_KULLANILAN_ORAN,.04);near(x.ORTAK_EYO_ORANI,.08);assert.ok(r.commonPool.filter(x=>x.EYO===eyo).every(x=>x.IL_ADEDI===2));
});
test('New parameters round-trip through JSON, migration and scenario snapshot',()=>{
 const s=fixture({weights:[.6,.3,.1],commonWeights:[.1,.2,.7],blendWeights:[.75,.25]});const r=E.calculate(s),restored=E.migrate(JSON.parse(JSON.stringify(s)));assert.deepEqual(E.calculate(restored).rows,r.rows);assert.deepEqual(restored.params.commonWeights,[.1,.2,.7]);assert.deepEqual(restored.params.blendWeights,[.75,.25]);
});


console.log(`${passed} engine tests passed`);
