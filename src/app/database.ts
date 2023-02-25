import * as localForage from "localforage";
import { BlobReader, ZipReader } from "@zip.js/zip.js";

import initSqlJs from "sql.js/dist/sql-asm.js";

localForage.setDriver(localForage.INDEXEDDB);

export class Database {

  static DB_SRC: string = "https://raw.githubusercontent.com/arma7x/opendosm-parquet-to-sqlite/master/pricecatcher.zip";

  static async checkLatestRevision(): Promise<number> {
    try {
      const headerResponse: Response = await fetch(this.DB_SRC, { method: 'HEAD' });
      if (headerResponse.headers.has('content-length')) {
        return Promise.resolve(parseInt(headerResponse.headers.get('content-length') || '0'));
      }
      return Promise.reject('content-length header is missing');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getLocalRevision(): Promise<number> {
    const version: number|null = await localForage.getItem('VERSION');
    if (version == null) {
      return await localForage.setItem('VERSION', 0);
    }
    return Promise.resolve(version);
  }

  static async updateLocalRevision(version: number): Promise<number|null> {
    return await localForage.setItem('VERSION', version);
  }

  static async fetchDatabaseBlob(): Promise<Blob> {
    return await (await fetch(this.DB_SRC)).blob();
  }

  static async updateLocalDatabaseArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    try {
      const zipFileBlob = new BlobReader(blob);
      const zipReader = new ZipReader(zipFileBlob);
      const entries = await zipReader.getEntries();
      const fileStream = new TransformStream();
      const filePromise = new Response(fileStream.readable).blob();
      let entry;
      for (let i in entries) {
        if (entries[i]['filename'] == '/pricecatcher.db') {
          entry = entries[i];
          break;
        }
      }
      if (entry == null)
        return Promise.reject("Invalid archive file: ${DB_SRC}");
      else
        await entry.getData(fileStream.writable);
      await zipReader.close();
      return await localForage.setItem('DATABASE', await (await filePromise).arrayBuffer());
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getLocalDatabaseArrayBuffer(): Promise<ArrayBuffer> {
    const buffer: ArrayBuffer | null = await localForage.getItem('DATABASE');
    if (buffer == null) {
      return Promise.reject("Buffer is null");
    }
    return buffer;
  }

  static async getDatabaseSQLInstance(buffer: ArrayBuffer): Promise<any> {
    const SQL = await initSqlJs();
    return new SQL.Database(new Uint8Array(buffer));
  }

  static async init(): Promise<any> {
    try {
      const latestRevision: number = await this.checkLatestRevision();
      if (latestRevision != await this.getLocalRevision()) {
        await this.updateLocalRevision(latestRevision);
        return await this.getDatabaseSQLInstance(await this.updateLocalDatabaseArrayBuffer(await this.fetchDatabaseBlob()));
      }
      return await this.getDatabaseSQLInstance(await this.getLocalDatabaseArrayBuffer());
    } catch (_err) {
      try {
        return await this.getDatabaseSQLInstance(await this.getLocalDatabaseArrayBuffer());
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

}
