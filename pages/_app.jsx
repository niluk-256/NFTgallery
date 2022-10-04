// import React from "react";
// import NAVIGATION from "../pages/navigation";
// export default function App() {
//   return (
//     <div className="App">
//       <NAVIGATION />
//     </div>
//   );
// }
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
