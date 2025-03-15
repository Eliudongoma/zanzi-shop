import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { useCustomColor } from '../hooks/useCustomColor';
import { Outlet } from 'react-router-dom';

export interface ProductQuery {
  search: string;
}

const Layout = () => {
  const { textColor, asideBg, mainBg}= useCustomColor();
  return (
    <Grid
          templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr",
          }}
        >
          {/* <GridItem area="nav" color={textColor} p={5} >
            <NavBar
              onSearch={(search) => setProductQuery({ ...productQuery, search })}
            />
          </GridItem> */}
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
            <Outlet/>
          </GridItem>
        </Grid>
  )
}

export default Layout
