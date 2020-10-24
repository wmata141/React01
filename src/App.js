import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Index from './modules/index'
import About from './modules/about'
import Fecha from './modules/fecha'
import CountriesClass from './modules/countriesClass'
import CountriesHook from './modules/countriesHook'
import EdTodoList from './modules/edTodoList'
import BookShop from './modules/shop/bookShop'
import CarShop from './modules/shop/carShop'
// import HotelHome from "./modules/hotelHome";

const AppRouter = () => {  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/about" component={About} />        
        <Route path="/fecha" component={Fecha} />
        <Route path="/countriesClass" component={CountriesClass} />
        <Route path="/countriesHook" component={CountriesHook} />
        <Route path="/edTodoList" component={EdTodoList} />
        <Route path="/bookShop" component={BookShop} />
        <Route path="/carShop" component={CarShop} />
        {/* <Route path="/hotelHome" component={HotelHome} /> */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

const App = () => {
  return (
    <AppRouter />
  );
}

export default App;



