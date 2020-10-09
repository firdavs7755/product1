import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container, Row,
    UncontrolledCollapse
} from "reactstrap";

import axios from "axios"
import {connect} from 'react-redux'
import logo from "../img/Logo3.png"
import map from "../img/map.png"
import f_official from "../img/f_official.jpg"
import {Link} from "react-router-dom";
import {MDBCard, MDBCardHeader, MDBCollapse} from "mdbreact";
import {FaAngleDown, FaAngleUp, FaPhone, FaSms, FaTelegram} from "react-icons/all";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: ""
        }
    }

    componentDidMount() {
        this.getList();
    }

    toggleCollapse = collapseID => () =>
        this.setState(collapse => ({
            collapseID: collapse.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        return (
            <Container>
                <Row md="12" sm="12" xs={12} className="mt-3">
                    <Col md="6" sm="6" xs={6} className="mb-4">
                        <img src={logo} onClick={() => this.getList()} width="170" height="50" alt="logo"/>
                    </Col>
                    <Col md="6" sm="6" xs={6} className="mt-2 float-left">
                        <Link to={"/app"} className="float-right btn btn-success">JWT</Link>
                        <Link to={"/comment"} className="mr-4 float-right btn btn-success">CRUD</Link>
                        <Link to={"/form"} className="mr-4 float-right btn btn-success">Firdavsga habar yozish</Link>
                    </Col>
                </Row>
                <Row md="12" sm="12" xs={12}>
                    <Col md="6" sm="12" xs={12}>
                        <h4><b>
                            FutureNet Express - Служба курьерской доставки.
                        </b></h4>
                        <h6>
                            Доставка товаров любого вида по всему Республики Узбекистан. Мы доставим ваш груз быстро,
                            оперативно и качественно.Постоянные маршруты обеспечивают скорость доставки по всему
                            территории Узбекистана.
                        </h6>
                    </Col>
                    <Col md="6" sm="12" xs={12} className="mb-5">
                        <img src={map} width="300px" alt=""/>
                    </Col>
                </Row>
                <hr/>
                <Row className="text-left" md="6" sm="6" xs={6}>
                    <Col md={3} sm={6} xs={6}><h5><b>Бесплатная доставка</b></h5><p>Бесплатная доставка при покупке
                        товара от 99$</p></Col>
                    <Col md={3} sm={6} xs={6}><h5><b>Гарантия возврата денег</b></h5><p>100% гарантия возврата денег</p>
                    </Col>
                    <Col md={3} sm={6} xs={6}><h5><b>Товары в подарок!</b></h5><p>Различные бонусы за покупку три или
                        более товаров</p></Col>
                    <Col md={3} sm={6} xs={6}><h5><b>Онлайн-Поддержка 24/7</b></h5><p>+998(95) 479-07-07</p></Col>
                </Row>
                <hr/>
                <Row md="12" sm="12" xs={12}>
                    <Col md="12" sm="12" xs={12}>
                        <div>
                            <Button color="primary" className="float-left collap" id="toggler" style={{marginBottom: '1rem'}}>
                                more...
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis cum
                                    ducimus illo illum repellendus ullam. A aliquam cum eveniet illum iure mollitia
                                    quidem quos rationeacilis iste labore laboriosam molestiae
                                    necessitatibus nemo, odit porro qui quis quo reiciendis repellat reprehenderit saepe
                                    aperiam architecto debitis dicta, dignissimos ducimus eos est excepturi explicabo
                                    inventore, ipsum itaque magnam magni nam obcaecati optio perferendis recusandae
                                    reprehenderit, veniam veritatis.</p>
                            </UncontrolledCollapse>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        this.props.productList.map((item, index) => {
                            return <Col key={index}>
                                <Link to={"/productDesc/" + item.slug}>
                                    <Card key={index} className="text-left card">
                                        <div>
                                            <FaPhone/>
                                            {/*<img src={item.images?item.images[parseInt(0)].image:<FaPhone/>} height="180px" alt=""/>*/}
                                            {/*{console.log(item.images?item.images[0].id:"nullll")}*/}
                                        </div>
                                        <CardBody>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-center text-dark">
                                                    <h3>{item.brand}</h3></li>
                                                <li className="list-group-item list-group-flush"><b>{item.name}</b></li>
                                                <li className="list-group-item text-danger"><b>{item.price}$</b></li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                        })
                    }
                </Row>

                <Row md={12} xs={12} sm={12} className="mt-5">
                    <Col md={12} xs={12} sm={12} className="text-center">
                        <h2 className="text-center mt-3 text-uppercase">Вопросы и ответы</h2>
                        <Row md={12} xs={12} sm={12} className="mb-3 pl-5 pr-5">
                            <Col md={7} xs={12} sm={12} className="mt-5 p-3">
                                <MDBCard className="mb-3 collap">
                                    <MDBCardHeader className={this.state.collapseID === "collapse1" ? "bg" : "bgWhite"}
                                                   onClick={this.toggleCollapse("collapse1")}>
                                        <h5>Как мне определить услуги?<h4
                                            className="float-right">{this.state.collapseID !== "collapse1" ?
                                            <FaAngleDown/> : <FaAngleUp/>}</h4></h5>
                                    </MDBCardHeader>
                                    <MDBCollapse id="collapse1" isOpen={this.state.collapseID}>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae minima
                                            nihil reprehenderit veniam! Cum debitis doloremque facilis iure maiores,
                                            maxime necessitatibus officiis. Deleniti eligendi esse facilis obcaecati,
                                            porro voluptates.
                                        </p>
                                    </MDBCollapse>
                                </MDBCard>

                                <MDBCard className="mb-3 collap">
                                    <MDBCardHeader className={this.state.collapseID === "collapse2" ? "bg" : "bgWhite"}
                                                   onClick={this.toggleCollapse("collapse2")}>
                                        <h5>Какие дополнительные услуги?<h4
                                            className="float-right">{this.state.collapseID !== "collapse2" ?
                                            <FaAngleDown/> : <FaAngleUp/>}</h4></h5>
                                    </MDBCardHeader>
                                    <MDBCollapse id="collapse2" isOpen={this.state.collapseID}>
                                        <p>
                                            nte ea proident. Ad vegan excepteur
                                            butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                                            heard of them accusamus labore sustainable VHS.
                                        </p>
                                    </MDBCollapse>
                                </MDBCard>

                                <MDBCard className="mb-3 collap">
                                    <MDBCardHeader className={this.state.collapseID === "collapse3" ? "bg" : "bgWhite"}
                                                   onClick={this.toggleCollapse("collapse3")}>
                                        <h5>Как сделать заказ?<h4
                                            className="float-right">{this.state.collapseID !== "collapse3" ?
                                            <FaAngleDown/> : <FaAngleUp/>}</h4></h5>
                                    </MDBCardHeader>
                                    <MDBCollapse id="collapse3" isOpen={this.state.collapseID}>
                                        <p>
                                            consectetur adipisicing elit. Ducimus, rerum. Ad vegan excepteur
                                            butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                                            heard of them accusamus labore sustainable VHS.
                                        </p>
                                    </MDBCollapse>
                                </MDBCard>

                                <MDBCard className="mb-3 collap">
                                    <MDBCardHeader className={this.state.collapseID === "collapse4" ? "bg" : "bgWhite"}
                                                   onClick={this.toggleCollapse("collapse4")}>
                                        <h5>Как получить заказ?<h4
                                            className="float-right">{this.state.collapseID !== "collapse4" ?
                                            <FaAngleDown/> : <FaAngleUp/>}</h4></h5>
                                    </MDBCardHeader>
                                    <MDBCollapse id="collapse4" isOpen={this.state.collapseID}>
                                        <p>
                                            DucimusLorem dolor sit amet, consectetur adipisicing elit. , rerum. Ad egan
                                            excepteur
                                            butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                                            heard of them accusamus labore sustainable VHS.
                                        </p>
                                    </MDBCollapse>
                                </MDBCard>

                                <MDBCard className=" collap">
                                    <MDBCardHeader className={this.state.collapseID === "collapse5" ? "bg" : "bgWhite"}
                                                   onClick={this.toggleCollapse("collapse5")}>
                                        <h5>Какой компании довериться?<h4
                                            className="float-right">{this.state.collapseID !== "collapse5" ?
                                            <FaAngleDown/> : <FaAngleUp/>}</h4></h5>
                                    </MDBCardHeader>
                                    <MDBCollapse id="collapse5" isOpen={this.state.collapseID}>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, rerum. Ad
                                            vegan excepteur
                                            butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                                            heard of them accusamus labore sustainable VHS.
                                        </p>
                                    </MDBCollapse>
                                </MDBCard>
                            </Col>
                            <Col className="mt-5" md={5} xs={12} sm={12}>
                                <h4 className="text-left mt-3 text-uppercase">как правильно пользоваться пылесосом?</h4>
                                <p className="text-left">Влажная уборка помещения является незаменимым средством, с
                                    помощью которого можно достичь наилучших результатов в борьбе за чистоту и в заботе
                                    о здоровье человека. Эта сфера в современном мире, как и многое другое, получила
                                    роизводителей, среди которых именитые Zelmer (Зелмер), Karcher (Керхер) и Thomas
                                    (Томас), предлагают моющие устройства исключительного качества, которые смогли
                                    оценить миллионы хозяек во всем мире. Для достижения оптимального результата при
                                    механизированной влажной уборке недостаточно просто знать о том, какие аксессуары
                                    для пылесосов необходимо применять. Нужно также уметь правильно пользоваться этим
                                    прибором.</p>
                                <Button className="btn bg collap float-left" style={{color: "black"}}>читать далше</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Row md="3" sm="2" xs="1" height="1000px" className="mt-5">
                    <Col>
                        <Card style={{padding: 0}}>
                            <CardHeader>
                                <b>Developer</b><br/>
                                <p>Maxsutaliyev Firdavs</p>
                            </CardHeader>
                            <CardBody>
                                <img className="collap" src={f_official} width="250px" alt=""/>
                            </CardBody>
                            <CardFooter className="bg-info">
                                <Button color="success" className="text-center" id="toggler"
                                        style={{marginBottom: '1rem'}}>
                                    More...
                                </Button>
                                <UncontrolledCollapse toggler="#toggler">
                                    <ul className="list-group text-left list-unstyled">
                                        <li className="list-group-item"><FaSms/>:firdavs0603@gmai.com</li>
                                        <li className="list-group-item"><FaPhone/>:+998902237755</li>
                                        <li className="list-group-item"><FaTelegram/>:@firdavs7755</li>
                                    </ul>
                                </UncontrolledCollapse>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    getList = () => {
        axios.get("https://api.fnshop.uz/product-list/")
            .then(inform => {
                // console.log(inform.data.results.images)
                console.log(inform.data.results);
                this.props.getResults(inform.data.results);
            })
    };
}

const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    getResults: data => dispatch({type: 'malumot', malumot: data}),
    getProduct: datum => dispatch({type: 'currentDatum', datum: datum}),
    getSlug: slug => dispatch({type: 'slug', slug: slug}),
    descClose: () => dispatch({type: 'descClose', status: false}),
    descOpen: () => dispatch({type: 'descOpen', status: true}),
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);