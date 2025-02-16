import { Grid, GridItem, Heading } from '@chakra-ui/react'

function App() {

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav" color={'white'} bg={'gray.800'} p={5}>
        {/* <Nav
          // onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        /> */}
        <Heading>Navbar</Heading>
      </GridItem>
      {/* <Show above="base"> */}
        <GridItem area="aside" px={5} color={'white'} bg={'gray.400'}>
          <Heading>Aside</Heading>
        </GridItem>
      {/* </Show> */}
      <GridItem area="main" color={'white'} bg={'gray.200'} p={5}>
        <Heading>Main</Heading>
        
      </GridItem>
    </Grid>
  )
}

export default App
