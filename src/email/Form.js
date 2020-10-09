import React from 'react';
import {Col, Container, Input, Row} from "reactstrap";
import {Link} from "react-router-dom";

const mql = window.matchMedia(`(min-width: 900px)`);

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            text:'',
            name: 'firdavs7755',
            email: 'firdavs0603@gmail.com',
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            sideNavLeft: false,
            isBarsOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={6}></Col>
                    <Col md="6" sm="12" xs={12} className="mt-2 float-left">
                        <Link to={"/"} className="float-right btn btn-success">Fnshop</Link>
                        <Link to={"/app"} className="float-right btn btn-success">JWT</Link>
                        <Link to={"/comment"} className="mr-4 float-right btn btn-success">CRUD</Link>
                    </Col>
                </Row>
                <Row md={12} xs={12} sm={12} className="mt-5">
                    <Col md={{size:6,offset:3}} xs={12} sm={12} className="text-center mt-5">
                       <div className="border p-4 card bg-info mt-5">
                           <form>
                               <h1><b>Firdavs</b>ga xabar yozish</h1>
                               <Input
                                   id="name"
                                   name="name"
                                   onChange={this.handleChange}
                                   placeholder="Ismingiz"
                                   required
                                   value={this.state.feedback}/>
                               <textarea name="text" id="text" type="text"
                                         className="mt-2 btn-block"
                                         onChange={this.handleChangeText}
                                         placeholder="Xabar matni"
                                         required
                                         value={this.state.text}/>
                               <input type="button" value="Junatish" className="btn btn-success mt-3 btn-block" onClick={this.handleSubmit}/>
                           </form>
                       </div>
                    </Col>

                </Row>
            </Container>

        )
    }

    handleChange(event) {
        this.setState({feedback: event.target.value})
    }

    handleChangeText(event) {
        this.setState({text:event.target.value})
    }


    handleSubmit (event) {
        const templateId = 'template_t1zopub';

        this.sendFeedback(templateId, {value: this.state.feedback+" "+this.state.text})
    }

    sendFeedback (templateId, variables) {
        const userId = 'user_KwxHCnB0M0fP3RcALePHl';
        window.emailjs.send(this.state.name, templateId,{name:this.state.feedback,text:this.state.text, from_name: this.state.name, reply_to: this.state.email},userId)
            .then(res => {
                console.log('Email successfully sent!')
                alert("habar yuborildi!!!")
        })
        // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('hatolik:', err))
    }

}