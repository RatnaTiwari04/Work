import React from "react";
import DemoForm from "./pages/ShowcaseForm";
import "./index.css"; // global styles if any

const App: React.FC = () => {
  return (
    <div className="app-container">
      <DemoForm />
    </div>
  );
};

export default App;
