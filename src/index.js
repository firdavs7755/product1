import React from 'react';
import ReactDOM from 'react-dom';
import Product from "./products/Product";
import * as serviceWorker from './serviceWorker';
import reducer from './reducer/MyReducer'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from "react-redux";
import {createStore} from "redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/products/main.css'
import ProductsDesc from "./products/ProductsDesc";
import Comment from "./comment/Comment";
import App from "./stroges/App";
import Form from "./email/Form";

ReactDOM.render(
    <Provider store={createStore(reducer,
        {
            customerList:[{}],
            distList:[],
            regionList:[],
            regId:0,
            // rasmlar:{images:[]},
            isMOpen:false,
            descIsOpen:false,
            productList:[],
            desc:[{}],
            currentSlug:'',
            currentProductsImg:[],
            commentList:[],
            isCMOpen:false,
            firstName:null,lastName:null,
            phone:null,regName:null,distName:null,
            commentId:0,commentText:null,
        }
    )}>
        <Router>
            <Switch>
                <Route exact path={'/productDesc/:slug'} component={ProductsDesc}/>
                <Route exact path={'/'} component={Product}/>
                <Route exact path={'/app'} component={App}/>
                <Route exact path={'/comment'} component={Comment}/>
                <Route exact path={'/form'} component={Form}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
