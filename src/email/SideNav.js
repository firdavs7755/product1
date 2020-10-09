import React, {Component} from 'react';
import {Button, Col, Navbar, Row} from "reactstrap";
import {MDBCollapse} from "mdbreact";
import {Link} from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/all";
const mql = window.matchMedia(`(min-width: 900px)`);

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            sideNavLeft: false,
            isBarsOpen: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    mediaQueryChanged() {
        this.setState({sidebarDocked: mql.matches, sidebarOpen: false});
    }

    render() {
        return (
            <div>
                <Row className="mt-4 zIndex">
                    <Col>
                        <MDBCollapse className="float-left" isOpen={mql.matches ? this.state.isShowBtn : !this.state.isShowBtn}>
                            <Button className="btn bg" onClick={() => this.setState({isSideBar: !this.state.isSideBar})}> {this.state.isSideBar ? <FaTimes/> : <FaBars/>}  </Button>
                        </MDBCollapse>
                        <MDBCollapse isOpen={this.state.isSideBar} className="resp85 zIndex">
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="bg" >
                                    <ul>
                                        <li>
                                            <Button className="float-right bg" onClick={() => this.setState({isSideBar: false})}><FaTimes/></Button>
                                        </li>
                                    </ul>

                                    <ul className="list-unstyled">
                                        <li className={!mql.matches?"ml-5":""}><b><Link to={"/"} className="nav-link onHover"> FnShop</Link></b></li>
                                        <li className={!mql.matches?"ml-5":""}><b><Link to={"/app"} className="nav-link onHover">JWT</Link></b></li>
                                        <li className={!mql.matches?"ml-5":""}><b><Link to={"/comment"} className="nav-link onHover">CRUD</Link></b></li>
                                        <li className={!mql.matches?"ml-5":""}><b><Link to={"/form"} className="nav-link onHover" >Firdavsga xabar yozish</Link></b></li>
                                    </ul>
                                </Col>
                            </Row>
                        </MDBCollapse>
                    </Col>
                </Row>

                <MDBCollapse isOpen={!mql.matches?false:true}>
                    <Row className="bg" xs={12} sm={12} md={12}>
                        <Col className="ml-5" xs={12} sm={12} md={12}>
                            <Navbar  className="nav">
                                <ul className={mql.matches?"navbar list-unstyled":"list-unstyled"}>
                                    <li className={!mql.matches?"ml-5":""}><b><Link exact to={"/"} className="nav-link  onHover"> FnShop</Link></b></li>
                                    <li className={!mql.matches?"ml-5":""}><b><Link to={"/app"} className="nav-link onHover">JWT</Link></b></li>
                                    <li className={!mql.matches?"ml-5":""}><b><Link to={"/comment"} className="nav-link onHover">CRUD</Link></b></li>
                                    <li className={!mql.matches?"ml-5":""}><b><Link exact to={"/form"} className="nav-link onHover" >Firdavsga habar</Link></b></li>
                                </ul>
                            </Navbar>
                        </Col>
                    </Row>
                </MDBCollapse>
            </div>




        );
    }
}

export default SideNav;