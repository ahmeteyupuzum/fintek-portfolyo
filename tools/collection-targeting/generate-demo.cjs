'use strict';
// Reproducible synthetic fixture. Reads no user backups or private source files.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const html=fs.readFileSync(path.join(root,'TAHSILAT-HEDEFLEME-DEMO.html'),'utf8');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const m={exports:{}};new Function('module',scripts[2][2])(m);
const demo=m.exports.demo();
const destination=path.join(root,'examples/collection-targeting/demo-project.json');
fs.mkdirSync(path.dirname(destination),{recursive:true});
fs.writeFileSync(destination,JSON.stringify(demo,null,2)+'\n');
console.log('Generated synthetic project:',destination);
console.log('Sources:',demo.files.length,'Rows:',demo.files.reduce((n,f)=>n+f.rows.length,0));
