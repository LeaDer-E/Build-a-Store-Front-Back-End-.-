import client from '../database';

export interface MainProduct {
  name: string;
  price: number;
}

export interface Product extends MainProduct {
  id: number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Can't Get The Product, Because: ${err}`);
    }
  }
  async create(product: MainProduct): Promise<Product> {
    const { name, price } = product;
    try {
      const sql ='INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      const { rows } = await conn.query(sql, [name, price]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Can't add The Product ${name} Because: ${err}`);
    }
  }
  async read(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Can't Find The Product ${id} Because: ${err}`);
    }
  }
  async update(id: number, productData: MainProduct): Promise<Product> {
    const { name: newName, price } = productData;

    try {
      const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [newName, price, id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Can't Update The Product ${name} Because: ${err}`);
    }
  }
  async deleteTheProduct(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Can't Delete The Product ID: ${id} Because: ${err}`);
    }
  }
}
