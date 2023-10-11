import { useState, useEffect } from "react";
import Breadcrumb from "../../components/UI/Breadcrumbs/Breadcrumb";
import { useParams } from "react-router-dom";
import useProductApi from "../../service/product/useProductApi";
import ProductCarousel from "../../components/UI/Carousel/ProductCarousel";
import useLikeStore from "../../store/useLikeStore";

const ProductItem = () => {
  let [product, setProduct] = useState([]);
  let { slug } = useParams();
  const { likeProdFunc } = useLikeStore();

  const [isLike, setIsLike] = useState(false);

  const state = () => {
    useProductApi.getOneItem(slug).then((res) => {
      setProduct(res.data[0]);
      console.log(res.data[0]);
    });
  };

  const setLikeFun = () => {
    setIsLike(!isLike);
    likeProdFunc(product, isLike, setIsLike);
  };

  useEffect(() => {
    state();
    console.log(JSON.parse(localStorage.getItem("LIKE_COLLECTION")));
  }, [slug]);

  return (
    <section id="item" className="my-8">
      <div className="container mx-auto">
        <Breadcrumb product={product} />
      </div>

      <div className="container mx-auto mt-4">
        <div className="flex">
          <div className="w-[508px] h-[554px]">
            <ProductCarousel image={product.images} />
          </div>
          <div className="info grow p-4">
            <div className="flex justify-between">
              <span>123 sotuvda bor</span>
              <button
                onClick={() => setLikeFun()}
                className="flex items-center h-[24px] gap-[10px]"
              >
                <span>
                  {!JSON.parse(localStorage.getItem("LIKE_COLLECTION"))?.find(
                    (pr) => pr._id === product._id
                  ) ? (
                    <i className="pi pi-heart text-md mt-1"></i>
                  ) : (
                    <i className="pi pi-heart-fill text-xl mt-1"></i>
                  )}
                </span>
                <div>
                  {" "}
                  {!JSON.parse(localStorage.getItem("LIKE_COLLECTION"))?.find(
                    (pr) => pr._id === product._id
                  ) ? (
                    <p className="text-md">Tanlash</p>
                  ) : (
                    <p>Tanlangan</p>
                  )}{" "}
                </div>
              </button>

            </div>
            <h1 className=" text-[20px] my-4">{product.name}</h1>

            <ul>
              <li className=" flex gap-x-3 items-center my-8">
                <span>Yetkazib berish:</span>
                <span className=" text-gray-600">1 kun bepul</span>
              </li>
            </ul>


            <ul>
              <li className=" flex items-end gap-x-2">
                <div>
                  <p className=" text-[16px]">narxi:</p>
                  <h2 className=" text-lg">{product.price}</h2>
                </div>
                <span className="text-gray-500 line-through">{product.price + product.price * 0.13} so'm</span>
              </li>

              <li className=" my-8 border p-[10px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md">
                <div>
                  <span className=" p-1 px-3 bg-[#ff0] me-4 rounded-2xl">
                    {String(Math.floor(product.price / 3)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    so'm 3 x oy
                  </span>
                  <span>mudatli to'lov</span>
                </div>
              </li>
              <div className=" flex justify-between gap-2 font-semibold text-white text-[18px]">
                <button className=" border rounded-lg w-full p-3 bg-blue-800">Savatga qo'shish</button>
                <button className=" border rounded-lg w-full p-3 border-blue-900 text-blue-800">Tugmani bir bosishda xarid qilish</button>
              </div>
              <div className=" mt-4">
                <h1 className=" text-[16px] border w-full p-2 rounded-lg bg-orange-100">Bu haftada 3800 kishi sotib oldi</h1>
              </div>
            </ul>


          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
