import AllProducts from "./_Component/Allproducts/AllProducts";
import CategorySlider from "./_Component/CategorySlider/CategorySlider";
import MainSlider from "./_Component/MainSlider/MainSlider";

export default function Home() {
  return (
    <>
    <div >
      <MainSlider />
      <CategorySlider />
      <AllProducts />
    </div>
    </>
  )
}
