import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { BsCartPlus } from "react-icons/bs"
import toast from "react-hot-toast"

import { ProductProps } from "../home"
import { api } from "../../services/api"
import { CartContext } from "../../contexts/CartContext"

export function Product() {
  const [product, setProduct] = useState<ProductProps>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const { id } = useParams()
  const { addItemCart } = useContext(CartContext)

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`)

      setProduct(response.data)
      setLoading(false)
    }

    getProduct()
  }, [id])

  function handleAddCartItem(item: ProductProps) {
    addItemCart(item)
    toast.success('Produto adicionado no carrinho', {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF"
      }
    })

    navigate('/cart')
  }

  return (
    <div className="w-full max-w-4xl mt-12 px-4 mx-auto">
      {loading ? <div className="w-full h-screen flex justify-center">
        <span className="text-zinc-700">Carregando...</span>
      </div> : product && (
        <section className="w-full flex flex-col gap-2 sm:flex-row sm:gap-16 items-center mx-auto">
          <img
            className="w-full max-w-sm sm:max-w-xs object-cover h-auto rounded"
            src={product?.cover} alt="AirPods" />
          <div className="flex flex-col justify-between gap-6">
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium">
              <strong>{product?.title}</strong>
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg font-extralight">
              {product?.description}
            </p>
            <div className="flex items-center gap-4">
              <strong className="text-zinc-700/90">{product?.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              })}</strong>
              <button
                onClick={() => handleAddCartItem(product)}
                className="bg-zinc-900 p-1 rounded cursor-pointer">
                <BsCartPlus size={20} color="#FFF" />
              </button>
            </div>
          </div>

        </section>
      )}
    </div>
  )
}