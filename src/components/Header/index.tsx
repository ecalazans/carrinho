import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

import { FiShoppingCart } from "react-icons/fi"
import { Link } from "react-router-dom"


export function Header() {
  const { cartAmout } = useContext(CartContext)

  return (
    <header className="w-full bg-slate-200 px-1">
      <nav className="w-full max-w-5xl h-14 flex items-center justify-between mx-auto px-5">
        <Link className="font-bold text-2xl" to={'/'}>
          Dev Shop
        </Link>
        <Link className="relative" to={'/cart'}>
          <FiShoppingCart size={24} color="#121212" />
          {cartAmout > 0 && (
            <span className="absolute -top-3 -right-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white"
            >
              {cartAmout}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}