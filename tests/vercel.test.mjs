import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('Vercel Turso handler supports setup, login and hierarchy',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'agridoot-vercel-'));
 process.env.TURSO_DATABASE_URL='file:'+join(dir,'cloud-test.sqlite').replaceAll('\\','/');
 delete process.env.TURSO_AUTH_TOKEN;
 const {default:handler}=await import('../api/[...path].mjs?test='+Date.now());
 let cookie='',csrf='';
 async function call(path,method='GET',body){let statusCode,headers={},payload;let req={method,query:{path:path.split('/')},body,headers:{'content-type':'application/json',...(cookie?{cookie}:{}),...(csrf?{'x-csrf-token':csrf}:{})}};let res={setHeader(k,v){headers[k.toLowerCase()]=v;return this},status(n){statusCode=n;return this},json(d){payload=d;return this}};await handler(req,res);if(headers['set-cookie'])cookie=headers['set-cookie'].split(';')[0];if(payload?.csrf)csrf=payload.csrf;return{status:statusCode,...payload}}
 assert.equal((await call('status')).setupRequired,true);
 let setup=await call('setup','POST',{name:'Agridoot Cloud',phone:'9111111111',password:'654321'});assert.equal(setup.status,201);
 assert.equal((await call('state')).nodes.length,1);
 let ngo=await call('members','POST',{name:'Cloud NGO',phone:'9222222222'});assert.equal(ngo.status,201);
 let otherCookie=cookie,otherCsrf=csrf;cookie='';csrf='';
 let activated=await call('activate','POST',{token:ngo.activationToken,password:'123456'});assert.equal(activated.status,200);assert.equal(activated.user.role,1);
 assert.equal((await call('state')).nodes.length,1);
 cookie='';csrf='';assert.equal((await call('login','POST',{phone:'9222222222',password:'123456'})).status,200);
 cookie=otherCookie;csrf=otherCsrf;assert.equal((await call('state')).nodes.length,2);
});
