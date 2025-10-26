import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Route>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Route>
  );
}

export default App;
