import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { Link } from "react-router-dom"

export function Cart() {
  const { cart, addItemCart, removeItemCart, total } = useContext(CartContext)


  return (
    <div className="w-full max-w-2xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      {cart.length > 0 ? cart.map((item) => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 border-gray-300">
          <img
            className="w-28"
            src={item.cover}
            alt="" />

          <strong>{item.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          })}</strong>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => removeItemCart(item)}
              className="bg-slate-600 px-2 rounded text-white cursor-pointer">
              -
            </button>
            {item.amount}
            <button
              onClick={() => addItemCart(item)}
              className="bg-slate-600 px-2 rounded text-white cursor-pointer">
              +
            </button>
          </div>

          <strong>
            Subtotal: {item.total.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </strong>

        </section>
      )) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <p>O carrinho está vazio.</p>
          <Link
            className="bg-neutral-600 px-3 py-1 rounded text-white"
            to={'/'}>Retornar a página de produtos.</Link>
        </div>
      )
      }

      {cart.length > 0 ? (
        <p className="font-bold mt-4">Total: {total}</p>
      ) : (
        <p className="font-bold mt-4">Total: R$ 0.00</p>
      )}

    </div>
  )
}