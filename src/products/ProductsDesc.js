import React, {Component} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";

import axios from "axios";
import logo from "../img/Logo3.png";
import {Link} from "react-router-dom";
class ProductsDesc extends Component {
    componentDidMount() {
        console.log(this.props.match.params.slug+"--------------");
        this.getLists();
    }

    render() {
        return (
            <Container>
                <Row md="2" xs="2" sm="2">
                    <Col md={{size: 3}}>
                        <Link to="/">
                            <img src={logo} width="252" height="62" alt="logo"/>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/">
                            <Button className="btn btn-success">Back to</Button>
                        </Link>
                    </Col>
                </Row>
                <Row md="2" sm="1" xs="1">
                <Col>
                    {
                        this.props.desc.filter(items=>items.slug===this.props.match.params.slug)
                            .map((datum,index)=>{
                                return <div key={index}>
                                    <h1>{datum.brand}</h1>
                                    <hr/>
                                    <h3>{datum.name}</h3>
                                    <hr/>
                                    <h4>distCount:{datum.discount}</h4>
                                    <hr/>
                                    <b className="text-danger"><h4>{datum.price}</h4>$</b>
                                    <hr/>
                                    <h5>Color:{datum.color.color}</h5>
                                    <br/>
                                    <p>{datum.description}</p>
                                </div>
                            })
                    }
                </Col>
                <Col md={{size:4}}>
                        {
                            this.props.desc.filter(items=>items.slug===this.props.match.params.slug)
                                .map((datum,index)=>{
                                    return datum.images.map((img,index)=>{
                                        return <div key={index}>
                                            <img src={img.image} alt="" height="200px" />
                                        </div>
                                    })
                                })
                        }
                 </Col>
                </Row>
            </Container>
        );
    }
    getLists = () =>{
        axios.get("https://api.fnshop.uz/product-list/")
            .then(inform=>{
                this.props.getDesc(inform.data.results);
            });
    };

}
const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    getDesc: data => dispatch({type: 'desc', malumot : data}),
});

export default connect(mapStateToProps,mapDispatchToProps) (ProductsDesc);
