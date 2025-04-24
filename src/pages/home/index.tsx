import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import { BsCartPlus } from "react-icons/bs"
import toast from "react-hot-toast"

import { api } from "../../services/api"
import { CartContext } from "../../contexts/CartContext"

export interface ProductProps {
  id: number;
  price: number;
  title: string;
  description: string;
  cover: string;
}

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [loading, setLoading] = useState(true)

  const { addItemCart } = useContext(CartContext)

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get("/products")

      setProducts(data)
      setLoading(false)
    }

    getProducts()
  }, [])

  function handleAddCartItem(newCart: ProductProps) {
    toast.success("Produto adicionado no carrinho.", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF"
      }
    })

    addItemCart(newCart)
  }

  return (
    <div>
      {/* oculpar 100% de no máximo 672px */}
      <main className="w-full max-w-5xl px-4 mx-auto">

        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

        {loading ?
          <div className="w-full h-screen flex justify-center">
            <span className="text-zinc-700">Carregando...</span>
          </div> :

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <section
                key={product.id}
                className="w-full max-w-xs flex flex-col justify-between mx-auto">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="w-full rounded-lg mb-2 transition duration-300 hover:scale-105 ease-in-out"
                    src={product.cover} alt={product.title}
                  />
                  <p className="font-medium mt-1 mb-2">{product.title}
                  </p>
                </Link>

                <div className="flex items-center gap-4 mt-2">
                  <strong className="text-zinc-700/90">
                    {product.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </strong>
                  <button
                    onClick={() => handleAddCartItem(product)}
                    className="bg-zinc-900 p-1 rounded cursor-pointer"
                  >
                    <BsCartPlus size={20} color="#FFF" />
                  </button>
                </div>

              </section>
            ))}
          </div>

        }
      </main >
    </div >
  )
}