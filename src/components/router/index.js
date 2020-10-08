import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Páginas internas
const Login = () => {
  return <h2>Login</h2>
}

const About = () => {
  return <h2>About</h2>
}

const Users = () => {
  return <h2>Users</h2>
}

// Función del router
function AppRouter() {
  return (
    <BrowserRouter>
      <div className={"site-content"}>
        // Menú de navegación
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>        
        <Route path="/" exact component={Login} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </BrowserRouter>
  )
}
export default AppRouter;