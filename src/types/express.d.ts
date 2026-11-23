declare global {
  namespace Express {
    interface Request {
      user?: { player_id: string; name: string };
    }
  }
}
export {};