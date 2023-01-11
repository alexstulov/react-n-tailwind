import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Reset from './components/Reset'
import './App.css'
import Chat from './components/Chat'

const App = () => {
    return (
        <div className="app">
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App

// import Chat from './components/Chat';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import Login from './components/Login'
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Route path="/" element={<Login />} />
//       </Router>
//       <NavigationBar />
//   <Chat />
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1> */}
//     </div>
//   );
// }

// export default App;
