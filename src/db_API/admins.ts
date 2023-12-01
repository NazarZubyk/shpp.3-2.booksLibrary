import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const addAdminScriptPath =  path.join( 'sqlscripts/operation', 'create_admin.sql');
const getAdminPassScriptPath =  path.join( 'sqlscripts/operation', 'get_pass_admin.sql');
const deleteAdminScriptPath =  path.join( 'sqlscripts/operation', 'delete_admin.sql');

export async function  addAdmin(
    username: string,
    password: string
) {
    
    try {
        let sqlScript = fs.readFileSync(addAdminScriptPath, 'utf-8');
        await (await connection).query(sqlScript, [username, password])
        return true;
    } catch (error) {
        return false;
    }
    
}

export async function  getAdminPass(
    username: string
) {
    let sqlScript = fs.readFileSync(getAdminPassScriptPath, 'utf-8');
    const pass =  await (await connection).query(sqlScript, [username])
    return pass[0]as any as Array<{password:string}>
}

export async function  deleteAdmin(
    username: string
) {
    let sqlScript = fs.readFileSync(deleteAdminScriptPath, 'utf-8');
    await (await connection).query(sqlScript, [username])
}

