import React from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./ui/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<div>Home</div>} />
          <Route exact path="/services" element={<div>Services</div>} />
          <Route
            exact
            path="/customsoftware"
            element={<div>Custom Sofware</div>}
          />
          <Route exact path="/mobileapps" element={<div>Mobile Apps</div>} />
          <Route exact path="/websites" element={<div>Website</div>} />
          <Route exact path="/revolution" element={<div>Revolution</div>} />
          <Route exact path="/about" element={<div>About</div>} />
          <Route exact path="/contact" element={<div>Contact</div>} />
          <Route exact path="/estimate" element={<div>Estimate</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
