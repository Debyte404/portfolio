import { Routes, Route, useNavigate } from "react-router-dom";
// import HomePage from "./HomePage";
import HomePage from "./HomePage";
// import AboutPage from "./AboutPage";
// import { useState } from "react";
import SplashScreen from "./SplashScreen";

export function MainPage() {
//   const [showSplash, setShowSplash] = useState(true);

  const navigate = useNavigate();

  //   if (showSplash) {
  //     return (
  //       <SplashScreen
  //         onFinish={() => {
  //             setShowSplash(false)
  //             navigate('/home')
  //         }}
  //         // onFinish={() => {}}
  //         gridSize={19} // Customize grid size (default: 8)
  //         padding="1%" // Customize padding (default: 5%)
  //         displayTimes={{
  //           // Customize display times
  //           welcome: 700,
  //           to: 500,
  //           debyteExpo: 1000,
  //         }}
  //       />
  //     );
  //   }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SplashScreen
            onFinish={() => {
            //   setShowSplash(false);
              navigate("/home");
            }}
            // onFinish={() => {}}
            gridSize={19} // Customize grid size (default: 8)
            padding="1%" // Customize padding (default: 5%)
            displayTimes={{
              // Customize display times
              welcome: 700,
              to: 500,
              debyteExpo: 1000,
            }}
          />
        }
      />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<p>about</p>} />
    </Routes>
  );
}
