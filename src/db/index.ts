import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

let db: Database | null = null;

export const initializeDatabase = async (): Promise<Database> => {
  if (db) return db;
  
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('palombaggia360.db', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(db!);
    });
  });
};

export const saveDatabase = async (): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  return new Promise((resolve, reject) => {
    db!.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

export const dbRun = (sql: string, params: any[] = []): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  return new Promise((resolve, reject) => {
    db!.run(sql, params, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

export const dbGet = (sql: string, params: any[] = []): Promise<any> => {
  if (!db) throw new Error('Database not initialized');
  
  return new Promise((resolve, reject) => {
    db!.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

export const dbAll = (sql: string, params: any[] = []): Promise<any[]> => {
  if (!db) throw new Error('Database not initialized');
  
  return new Promise((resolve, reject) => {
    db!.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

export const dbExec = (sql: string): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  return new Promise((resolve, reject) => {
    db!.exec(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};