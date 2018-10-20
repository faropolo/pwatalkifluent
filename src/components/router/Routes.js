import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from '../Home'
import Login from '../Login'

//TODO Adicionar metodo de validacao para rotas privadas
export default ({childProps}) =>
    <Switch>
        <Route path="/" exact component={Login} props={childProps}/>
        <Route path="/home" exact component={Home} props={childProps}/>
    </Switch>;
