import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import Reset from "./components/Reset"
import "./App.css"
import Chat from "./components/Chat"
import TicTacToe from "./modules/tic-tac-toe"
import Todo from "./components/Todo"
import Exercises from "./components/Exercises"
import AppIdeas from "./modules/app-ideas"
import CRUD from "./modules/crud"
import Experimental from "./modules/experimental"
import Home from "./components/Home"


const App = () => {
  return (
    <div className="app">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="chat-auth" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="tic-tac-toe" element={<TicTacToe />} />
          <Route path="todo" element={<Todo />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="app-ideas/*" element={<AppIdeas />} />
          <Route path="crud/*" element={<CRUD />} />
          <Route path="experimental" element={<Experimental />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App