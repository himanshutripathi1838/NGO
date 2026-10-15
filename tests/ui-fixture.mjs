// Isolated browser QA fixture. Never uses the real database.
import { createApp } from '../server.mjs';
const app=createApp({dbPath:':memory:',port:5181});await app.listen();
const origin='http://127.0.0.1:5181',password='UI-test-only-password!';
function client(){return{cookie:'',csrf:'',async call(path,data){let r=await fetch(origin+'/api/'+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',Cookie:this.cookie,'X-CSRF-Token':this.csrf},body:JSON.stringify(data)}),d=await r.json();if(!r.ok)throw Error(d.error);if(r.headers.get('set-cookie'))this.cookie=r.headers.get('set-cookie').split(';')[0];if(d.csrf)this.csrf=d.csrf;return d}}}
let admin=client();await admin.call('setup',{name:'QA Agridoot',phone:'9111111100',password});
async function child(p,name,phone){let r=await p.call('members',{name,phone}),c=client();c.user=(await c.call('activate',{token:r.activationToken,password})).user;return c}
let ngo=await child(admin,'QA Smridhi NGO','9111111101'),fpo=await child(ngo,'QA Ramnagar','9111111102'),crp=await child(fpo,'QA Suresh','9111111103'),farmer=await child(crp,'QA Rakesh','9111111104');
await farmer.call('crops',{crop:'Wheat',season:'Rabi',year:2026,area:2,area_unit:'acre',output:40,output_unit:'quintal',inputs:[{item:'Seeds',quantity:20,unit:'kg',amount:2000,date:'2026-10-13'}]});
console.log('Isolated browser QA ready on http://127.0.0.1:5181. Data is in memory only.');
