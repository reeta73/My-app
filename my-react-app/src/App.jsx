import { useState } from "react";

import "./App.css";
import { use } from "react";
import { ThemeContext, TextColorContext } from "./context/ThemeContext";
import Home from "./Pages/Home";

function App() {
  const [theme, setTheme] = useState();
  const [color, setColor] = useState();

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <TextColorContext value={{color,setColor}}>
           <Home />
        </TextColorContext>
       
      </ThemeContext.Provider>
    </>
  );
}

export default App;
