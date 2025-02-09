import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/UI/NavBar/NavBar.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';

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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
