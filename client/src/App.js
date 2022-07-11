import {Container} from '@mui/material';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import './index.scss'
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Container className="main-body" maxWidth='xl'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace={true}/>} />
        <Route path="/recipes" exact element={<Home />} />
        <Route path="/recipes/search" exact element={<Home />} />
        <Route path="/recipes/:id" exact element={<RecipeDetails />}/>
        <Route path="/auth" element={!user? <Auth />:<Navigate to="/recipes" replace={true} /> } />
      </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
