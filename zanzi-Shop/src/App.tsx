import { Grid, GridItem, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { useCustomColor } from "./hooks/useCustomColor";
import ProductGrid from "./components/Product/ProductGrid";
import Dashboard from "./pages/Admin/Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import { auth } from "./config/firebaseConfig";
import Login from "./components/Login";
import Register from "./components/Register";
import useUserRole from "./hooks/useUserRole";


export interface ProductQuery {
  search: string;
}

function App() {

  const {user, role} = useUserRole();
  const [productQuery, setProductQuery] = useState<ProductQuery>(
    {} as ProductQuery
  );
  const { textColor, asideBg, mainBg}= useCustomColor();
  if(user === undefined || role === null){
    return <p>Loading...</p>;
  }
  return (
    <Router>
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
    </Router>
  );
}

export default App;
