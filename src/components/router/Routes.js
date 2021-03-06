import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from '../Home'
import LoginFederated from '../auth/LoginFederated'

//TODO Adicionar metodo de validacao para rotas privadas
export default ({childProps}) =>
    <Switch>
        <Route path="/" exact component={LoginFederated} props={childProps}/>
        <Route path="/home" exact component={Home} props={childProps}/>
        {/* <Route path='/federated' exact component={LoginFederated} props={childProps} /> */}
    </Switch>;
