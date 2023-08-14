import { Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
        <div class="pages">
          <Routes>
            <Route 
              path='/'
              element={<Home />}
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;
