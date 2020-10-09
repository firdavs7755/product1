import React, {Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Button, Col, Container, Modal, Row, Spinner, Table} from "reactstrap";
import {Link} from "react-router-dom";
class App extends Component {
    constructor() {
        super();
        this.state={
            username:'',
            password:''
        }
    }
    render() {
        return (
            <Container>
                <Row md="12" sm={12} xs={12}>
                    <Col md="6" sm={6} xs={6}>
                        <p className="text-left"><b>JWT.</b>User mavjud bulsa Token qaytadi va localStorage ga yoziladi va ma'lumot qaytariladi.</p>

                        <ul className="list-unstyled">
                            <li>username:test</li>
                            <li>password:test2020</li>
                        </ul>
                        <form>
                            <input type="text" id="username" name="username" placeholder="username" onChange={(event)=>{this.setState({username:event.target.value})}}/> <br/>
                            <input type="password" id="password" name="password" placeholder="password" onChange={(event)=>{this.setState({password:event.target.value})}}/> <br/>
                        </form>
                        <button className="btn btn-primary" onClick={()=>this.tekshir()}>login</button>
                    </Col>
                    <Col md="6" sm={6} xs={6}>
                        <Button className="btn btn-danger" onClick={()=>this.deleteToken()}>logout</Button>
                        <Link to="/" className="ml-2 btn btn-success">FnShop</Link>
                        <Link to="/comment" className="ml-2 btn btn-success">CRUD</Link>
                        <Link to="/form" className="ml-2 btn btn-success">Firdavsga xabar yozish</Link>
                    </Col>
                </Row>
                <Row>
                    <Modal isOpen={this.props.isMOpen}>
                        <Spinner animation="border" role="status">

                        </Spinner>
                    </Modal>
                </Row>
                <Row md="12" sm={12} xs={12}>
                    <Table className="table-bordered table-hover table table-active">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>city_name</th>
                            <th>dist-name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.customerList.map((item,index)=>{
                                return <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.city_name}</th>
                                    <th>{item.district_name}</th>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </Row>

            </Container>
        );
    }
    tekshir = () =>{
        if (this.state.username.length>0&&this.state.password.length>0){
            this.getToken();
        }else {
            alert("inputlarni tuldiring")
        }
    };
    getToken=()=>{
        this.props.ochModal();
        axios.post('https://api.fn-express.uz/auth/login/',{
            username:this.state.username,
            password:this.state.password
        }).then((resp)=>{
            if (resp.status===200){
                localStorage.setItem('login',resp.data.token);
                console.log('storage '+localStorage.getItem('login'));
                axios.get("https://api.fn-express.uz/customer/list/", {
                    headers:{'Authorization':'Token '+localStorage.getItem('login')}
                }).then((res,index)=>{
                    if (res.status===200){
                        this.props.setCustomers(res.data.results);
                        console.log(this.props.customerList);
                        this.props.hideModal();
                    }else {
                        console.log('hatolik')
                    }
                })
            }else {
                this.props.hideModal();
                alert("username yoki password hato")
            }
        })
    };
    deleteToken = ()=>{
       localStorage.removeItem('login');
        window.location.reload();
    };
}
const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    setCustomers: datum => dispatch({type: 'customers',datum : datum}),
    hideModal: () => dispatch({type: 'modalClose', status: false}),
    ochModal: () => dispatch({type: 'modalOpen', status: true})
});
export default connect(mapStateToProps,mapDispatchToProps) (App);