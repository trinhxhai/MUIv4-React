import React from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import LandingPage from "./LandingPage";
import Services from "./Services";

import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";
import theme from "./ui/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  console.log(theme);

  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LandingPage
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            }
          />
          <Route
            exact
            path="/services"
            element={
              <Services
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            }
          />
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
        <Footer setValue={setValue} setSelectedIndex={setSelectedIndex} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
