import { DatabaseSync } from 'node:sqlite';
import { randomBytes,createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { dirname,join } from 'node:path';
import { fileURLToPath } from 'node:url';
// Local machine administrator recovery. Never expose this script through HTTP.
const root=dirname(dirname(fileURLToPath(import.meta.url))),file=process.env.AGRIDOOT_DB||join(root,'data','agridoot.sqlite');
if(!existsSync(file))throw Error('No database found.');
const db=new DatabaseSync(file);db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
const a=db.prepare('SELECT id FROM accounts WHERE role=0').get();if(!a)throw Error('Complete initial setup first.');
const token=randomBytes(32).toString('base64url'),hash=createHash('sha256').update(token).digest('hex');
db.exec('BEGIN IMMEDIATE');try{db.prepare('DELETE FROM sessions WHERE account_id=?').run(a.id);db.prepare('DELETE FROM invitations WHERE account_id=?').run(a.id);db.prepare('UPDATE accounts SET password_hash=NULL WHERE id=?').run(a.id);db.prepare('INSERT INTO invitations VALUES(?,?,?)').run(hash,a.id,Date.now()+3600000);db.prepare('INSERT INTO audit(actor_id,action,record_id,details,at) VALUES(?,?,?,?,?)').run(a.id,'local_admin_recovery',a.id,'{}',Date.now());db.exec('COMMIT')}catch(e){db.exec('ROLLBACK');throw e}db.close();
console.log('Private recovery link, valid for one hour. Open locally and set your password:');console.log(`http://127.0.0.1:${process.env.PORT||5180}/#activate=${token}`);
