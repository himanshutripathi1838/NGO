import { DatabaseSync,backup } from 'node:sqlite';
import { mkdirSync,existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
const root=dirname(dirname(fileURLToPath(import.meta.url))),source=process.env.AGRIDOOT_DB||join(root,'data','agridoot.sqlite');
if(!existsSync(source))throw Error('Start Agridoot and complete setup before taking a backup.');
mkdirSync(join(root,'backups'),{recursive:true});
const destination=join(root,'backups','agridoot-'+new Date().toISOString().replace(/[:.]/g,'-')+'.sqlite');
const db=new DatabaseSync(source,{readOnly:true});await backup(db,destination);db.close();console.log('Backup saved: '+destination);
