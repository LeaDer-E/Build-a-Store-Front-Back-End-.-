import { MainOrder, Order, OrderStore } from '../../models/orderUnit';
import { Product, ProductStore } from '../../models/productUnit';
import { User, UserStore } from '../../models/userUnit';


const orderStore = new OrderStore();

describe('The Order Model', () => {
  const userStore = new UserStore();
  const productStore = new ProductStore();

  let order: MainOrder;
  let user_id: number;
  let product_id: number;

  const createOrder = (order: MainOrder) => {
    return orderStore.create(order);
  }

  const deleteTheOrder = (id: number) => {
    return orderStore.deleteTheOrder(id);
  }

  beforeAll(async () => {
    const user: User = await userStore.create({
      username: 'EslamMustafa',
      firstname:'Eslam',
      lastname:'Mustafa',
      password: 'password123',
    });

    user_id = user.id;

    const product: Product = await productStore.create({
      name: 'CPU Product',
      price: 150,
    });

    product_id = product.id;

    order = {
      products: [{
          product_id,
          quantity: 5,
        }],
      user_id,
      status: true,
    };
  });

  afterAll(async () => {
    await userStore.deleteTheUser(user_id);
    await productStore.deleteTheProduct(product_id);
  });

  it('Have The Delete Method', () => {
    expect(orderStore.deleteTheOrder).toBeDefined();
  });

  it('Have The Show Method', () => {
    expect(orderStore.read).toBeDefined();
  });

  it('Have The Index Method', () => {
    expect(orderStore.getOrder).toBeDefined();
  });

  it('Have The Add Method', () => {
    expect(orderStore.create).toBeDefined();
  });
 
  it('Adding The Order', async () => {
    const createdOrder: Order = await createOrder(order);
    expect(createdOrder).toEqual({id: createdOrder.id, ...order,});
    await deleteTheOrder(createdOrder.id);
  });

  it('Returninjg The List Of Order', async () => {
    const createdOrder: Order = await createOrder(order);
    const orderList = await orderStore.getOrder();
    expect(orderList).toEqual([createdOrder]);
    await deleteTheOrder(createdOrder.id);
  });

  it('Show The Method That Return The correct Orders', async () => {
    const createdOrder: Order = await createOrder(order);
    const orderData = await orderStore.read(createdOrder.id);
    expect(orderData).toEqual(createdOrder);
    await deleteTheOrder(createdOrder.id);
  });

  it('Updating The Order', async () => {
    const createdOrder: Order = await createOrder(order);
    const orderData: MainOrder = {
      products: [{
          product_id,
          quantity: 20,
        }],
      user_id,
      status: false,
    };
    const { products, status } = await orderStore.update(createdOrder.id, orderData);
    expect(products).toEqual(orderData.products);
    expect(status).toEqual(orderData.status);
    await deleteTheOrder(createdOrder.id);
  });

  it('Removing The Order Item', async () => {
    const createdOrder: Order = await createOrder(order);
    await deleteTheOrder(createdOrder.id);
    const orderList = await orderStore.getOrder();
    expect(orderList).toEqual([]);
  });
});
