import { Grid, GridItem, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Routes } from "react-router-dom";
import { useState } from "react";
import { useCustomColor } from "./hooks/useCustomColor";
import ProductGrid from "./components/Product/ProductGrid";
// import Dashboard from "./pages/Admin/Dashboard";
import { Toaster } from "react-hot-toast";

export interface ProductQuery {
  search: string;
}

function App() {
  const [productQuery, setProductQuery] = useState<ProductQuery>(
    {} as ProductQuery
  );
  const { textColor, asideBg, mainBg}= useCustomColor();
  return (
    <Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav" color={textColor} p={5} >
          <NavBar
            onSearch={(search) => setProductQuery({ ...productQuery, search })}
          />
        </GridItem>
        <GridItem
          area="aside"
          px={5}
          color={textColor}
          bg={asideBg}
          display={{ base: "none", lg: "block" }}
        >
          <Heading>Aside</Heading>
        </GridItem>
        <GridItem area="main" color={textColor} bg={mainBg} p={5}>
          {/* <Dashboard/> */}
          <ProductGrid productQuery={productQuery}/>
        </GridItem>
      </Grid>
    </Routes>
  );
}

export default App;
