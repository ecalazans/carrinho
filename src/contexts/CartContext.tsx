import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmout: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
  // calculateSum: (cart: CartProps[]) => void;
}

export interface CartProps {
  id: number;
  price: number;
  title: string;
  description: string;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode
}

// a única opção de exportação será a cart, conforme tipado
export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState("")

  function addItemCart(newItem: ProductProps) {
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    // se item não for novo
    if (indexItem != -1) {
      // criado uma nova variável com os mesmos valores
      let cartList = [...cart]

      cartList[indexItem].amount = cartList[indexItem].amount + 1
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      calculateSum(cartList)
      return
    }

    // adiciona o item a lista
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    // passando os itens existentes... mais o novo item(data)
    setCart(products => [...products, data])
    calculateSum([...cart, data])
  }

  function calculateSum(items: CartProps[]) {
    const totalGeral = items.reduce((acc, item) => {
      return acc + item.total
    }, 0)

    const resultFormated = totalGeral.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })

    setTotal(resultFormated)
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id === product.id)

    if (cart[indexItem]?.amount > 1) {
      //diminuir apenas 1 do que tem na lista
      let cartList = cart

      cartList[indexItem].amount = cartList[indexItem].amount - 1
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

      setCart(cartList)
      calculateSum(cartList)
      return
    }

    // removendo item e criando novo array sem esse item
    const removeItem = cart.filter(item => item.id !== product.id)

    setCart(removeItem)
    calculateSum(removeItem)
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartAmout: cart.length,
      total,
      addItemCart,
      removeItemCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider