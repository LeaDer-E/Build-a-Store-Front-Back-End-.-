import { MainProduct, Product, ProductStore } from '../../models/productUnit';

const productStore = new ProductStore();

describe('Model of Product', () => {
  const product: MainProduct = {
    name: 'RAM',
    price: 2000,
  };

  async function createProduct(product: MainProduct) {
    return productStore.create(product);
  }

  async function deleteTheProduct(id: number) {
    return productStore.deleteTheProduct(id);
  }

  it('Have The Index Method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('Have The Show Method', () => {
    expect(productStore.read).toBeDefined();
  });

  it('Have The add Method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('Have The Delete Method', () => {
    expect(productStore.deleteTheProduct).toBeDefined();
  });

  it('Adding The Product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product
    });
    await deleteTheProduct(createdProduct.id);
  });

  it('Returning The List Of The Product', async () => {
    const productList: Product[] = await productStore.index();
    expect(productList).toEqual([{
        id: 1,
        name: 'CPU',
        price: 234,
      }]);
  });

  it('Returning The Correct Product', async () => {
    const createdProduct: Product = await createProduct(product);
    const productData = await productStore.read(createdProduct.id);
    expect(productData).toEqual(createdProduct);
    await deleteTheProduct(createdProduct.id);
  });

  it('Updating The Product', async () => {
    const createdProduct: Product = await createProduct(product);
    const newProduct: MainProduct = {
      name: 'New Product List',
      price: 2423,
    };
    const { name, price } = await productStore.update(createdProduct.id, newProduct);
    expect(name).toEqual(newProduct.name);
    expect(price).toEqual(newProduct.price);
    await deleteTheProduct(createdProduct.id);
  });

  it('should remove the product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      name: 'RAM',
      price: 2000,
    });
  });
});
