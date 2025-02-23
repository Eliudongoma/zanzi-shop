import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import noImage from "../assets/no-image.webp"; 

type ProductProps = {
  imageUrl: string,
  name: string
}

const ProductImage = ({imageUrl, name} : ProductProps) => {
  return (
    <LazyLoadImage/>

  )
}

export default ProductImage
