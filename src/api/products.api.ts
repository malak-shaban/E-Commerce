export default async function allProducts() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    const { data } = await res.json();
    console.log(data);
    return data;
}