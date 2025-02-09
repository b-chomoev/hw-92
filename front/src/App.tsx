import { Container, CssBaseline } from '@mui/material';
import { Routes } from 'react-router-dom';
import NavBar from './components/UI/NavBar/NavBar.tsx';

const App = () => {


  return (
    <>
      <CssBaseline />
      <header>
        <NavBar />
      </header>
      <main>
        <Container maxWidth={'xl'}>
          <Routes>

          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
