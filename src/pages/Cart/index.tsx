import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
      ...product,
      price: formatPrice(product.price),
      priceAmount: formatPrice(product.price * product.amount),
      productOrigin: product
  }));

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + ( product.amount * product.price)
      }, 0)
    )

  function handleProductIncrement({productId, amount}: {productId: number, amount: number}) {
    updateProductAmount({ productId, amount: amount + 1})
  }

  function handleProductDecrement({productId, amount}: {productId: number, amount: number}) {
    if(amount - 1 > 0){
      updateProductAmount({ productId, amount: amount - 1})
    }
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => {
            return (
              <tr data-testid="product" key={product.id}>
                <td>
                    <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title} </strong>
                  <span>{product.price}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement({productId: product.id, amount: product.amount})}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount} 
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement({productId: product.id, amount: product.amount})}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.priceAmount}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            )
          })}
          
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
