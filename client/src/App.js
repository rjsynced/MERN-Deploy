import './App.css';
import { Routes, Route } from 'react-router-dom'
import Main from './views/Main';
import NewPet from './views/NewPet';
import ViewPet from './views/ViewPet';
import UpdatePet from './views/UpdatePet';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main/>} path="/" />
        <Route element={<NewPet />} path="/pets/new" />
        <Route element={<ViewPet />} path="/pets/:id" />
        <Route element={<UpdatePet />} path="/pets/:id/edit" />
      </Routes>
    </div>
  );
}

export default App;