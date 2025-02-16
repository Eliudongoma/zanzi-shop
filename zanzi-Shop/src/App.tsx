import { Grid, GridItem, Heading } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import { BrowserRouter as Routes } from 'react-router-dom'

function App() {

  return (

    <Routes>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav" color={'white'} bg={'gray.800'} p={5}>
          <NavBar />
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
    </Routes>
  )
}

export default App
