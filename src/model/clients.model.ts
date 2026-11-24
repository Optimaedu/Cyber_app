import db from "../config/db.js";
import generateUniqueId from 'generate-unique-id'; 
import jwt from "jsonwebtoken"
  

export async function registerClientsModel(username:string) {
  if(!process.env.JWT_SECRET) {
    return
  }
  const id = generateUniqueId();
  const hash = jwt.sign({id: id, name: username}, process.env.JWT_SECRET)
  try {
    const api_client = await db.query(`INSERT INTO api_clients ( name, api_key_hash, player_id) VALUES ('${username}', '${hash}', '${id}') `) 
    return id
  } catch (error) {
    console.log(error)
    return error
  } 
}

export async function validateClient(hash:string) {
  if(!process.env.JWT_SECRET) {
    return
  }
  const payload = jwt.verify(hash, process.env.JWT_SECRET) as {id:string}
  if (typeof payload === "string" || typeof payload.id !== "string") return null;
  try {
    console.log(payload)
    const client = await db.query("SELECT player_id, name FROM api_clients WHERE player_id = $1", [payload.id])
    return client.rows[0] ?? null
  } catch (error) {
    console.log(error)
    return error
  }
 
}
