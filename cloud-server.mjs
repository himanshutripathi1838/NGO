import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,join,normalize} from 'node:path';
import handler from './api/[...path].mjs';

const root=join(process.cwd(),'public');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};

function decorate(res){res.status=function(code){this.statusCode=code;return this};res.json=function(value){if(!this.headersSent)this.setHeader('Content-Type','application/json; charset=utf-8');this.end(JSON.stringify(value));return this};return res}
async function parseBody(req){let chunks=[],size=0;for await(const chunk of req){size+=chunk.length;if(size>1024*1024)throw Object.assign(new Error('Request body is too large.'),{status:413});chunks.push(chunk)}if(!chunks.length)return undefined;try{return JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{throw Object.assign(new Error('Invalid JSON request.'),{status:400})}}
async function serveFile(req,res,url){if(!['GET','HEAD'].includes(req.method)){res.statusCode=405;return res.end('Method not allowed')}let pathname=decodeURIComponent(url.pathname),relative=pathname==='/'?'index.html':pathname.replace(/^\/+/,''),safe=normalize(relative);if(safe.startsWith('..')||safe.includes(':')){res.statusCode=403;return res.end('Forbidden')}try{let file=join(root,safe),data=await readFile(file);res.statusCode=200;res.setHeader('Content-Type',types[extname(file).toLowerCase()]||'application/octet-stream');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('Cache-Control',extname(file)==='.html'?'no-cache':'public, max-age=86400');return res.end(req.method==='HEAD'?undefined:data)}catch{res.statusCode=404;return res.end('Not found')}}

export function createAppServer(){return createServer(async(req,res)=>{decorate(res);try{let url=new URL(req.url,'http://localhost');if(url.pathname.startsWith('/api/')){req.query={path:url.pathname.slice(5).split('/').filter(Boolean)};if(['POST','PUT','PATCH','DELETE'].includes(req.method))req.body=await parseBody(req);return await handler(req,res)}return await serveFile(req,res,url)}catch(error){console.error(error);if(!res.headersSent)res.status(error.status||500).json({error:error.status?error.message:'Something went wrong.'});else res.end()}})}

if(process.argv[1]&&import.meta.url===new URL(process.argv[1],'file:').href){const port=Number(process.env.PORT)||10000;createAppServer().listen(port,'0.0.0.0',()=>console.log(`Agridoot cloud server listening on ${port}`))}
