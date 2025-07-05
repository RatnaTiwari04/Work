import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowcaseForm from "./pages/ShowcaseForm";
import Example2 from "./pages/Example2";
import Example3 from "./pages/Example3";
import Example4 from "./pages/Example4";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ShowcaseForm />} />
      <Route path="/Example2" element={<Example2 />} />
      <Route path="/Example3" element={<Example3 />} />
      <Route path="/Example4" element={<Example4 />} />
    </Routes>
  </Router>
);

export default App;
