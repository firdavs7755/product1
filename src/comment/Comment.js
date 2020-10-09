import React, {Component} from 'react';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'
import {Button, Col, Container, Input, Label, Modal, ModalBody, ModalHeader, Row, Table} from "reactstrap";
import {connect} from 'react-redux'
import fri from '../img/men.jpg'
import axios from "axios";
import {Link} from "react-router-dom";
class Comment extends Component {
    componentDidMount() {
        this.getRegList();
        this.getDistList();
    }

    state = {
        regionId: 0,
        distId: 0,
        regionNomi: null,
        distNomi: null
    };
    render() {
        let son = 1;
        return (
            <Container>
                <Row md={12} xs={12} className="">
                    <Col>
                        <Link to="/" className="btn btn-success">FnShop</Link>
                        <Link to="/app" className="btn btn-success">JWT</Link>
                        <Link to="/form" className="btn btn-success">Firdavsga xabar yozish</Link>
                    </Col>
                </Row>
                <Row md="12" xs={12} sm={12} className="mt-5 mb-3">
                    <Col md={8} xs={12} sm={12}>
                        <AvForm>
                            <AvInput type="text" id="fName" name="fName" placeholder="Enter first name" required/>
                            <AvInput type="text" id="lName" name="lName" placeholder="Enter last Name" required/>
                            <AvInput type="text" id="phone" defaultValue="+998" name="phone" placeholder="Enter phone number" required/>
                            <AvInput type="text" id="comment" name="comment" placeholder="Enter short Comment" required/>
                            <AvGroup>
                                <Label>Region</Label>
                                <Input type="select" onChange={() => this.inputChanged()} id="region" name="region"
                                       required>
                                    <option>select region</option>
                                    {this.props.regionList.map((reg, index) => {
                                            return <option key={index} value={reg.id}>{reg.name}</option>
                                        }
                                    )}
                                </Input>
                                <AvFeedback>Region Should be filled</AvFeedback>
                            </AvGroup>
                            <hr/>
                            <AvGroup className={this.state.regionId > 0 ? "" : "d-none"}>
                                <Label>District</Label>
                                <AvField type="select" onChange={() => this.inputChanged2()} id="district"
                                         name="district" required>
                                    <option>---------</option>
                                    {this.props.distList.filter(district => parseInt(district.city) === parseInt(this.state.regionId)).map((dist, index) => {
                                            return <option key={index} value={dist.id}>
                                                {dist.name_uz}
                                            </option>
                                        }
                                    )}
                                </AvField>
                                <AvFeedback>District Should be filled</AvFeedback>
                            </AvGroup>

                            <Button className="float-right  mt-2 btn btn-success"
                                    onClick={() => this.saveCommenter()}>Save</Button>
                        </AvForm>
                    </Col>
                    <Col md={4} sm={12} xs={12} className="mt-2">
                        <img src={fri} className="rounded-circle img-thumbnail" height="300px" width="300px" alt="Firdavs"/>
                        <span className="badge badge-dark rounded fa-bell"><h5>BU PAGE DA CRUD ni TEST QILIB KURING!</h5></span>
                        <p>kamchiliklar bo'lsa uzr</p>
                    </Col>
                </Row>
                <Row md={12} xs={12} sm={12}>
                     <Col md={12} xs={12} sm={12}>
                         <Table>
                             <thead>
                             <tr>
                                 <th>id</th>
                                 <th>first name</th>
                                 <th>last name</th>
                                 <th>phone</th>
                                 <th>comment</th>
                                 <th>region</th>
                                 <th>district</th>
                                 <th>Actions</th>
                             </tr>
                             </thead>
                             <tbody>
                             {
                                 this.props.commentList.map((commenter, index) => {
                                     return <tr key={index}>
                                         <th>{son++}</th>
                                         <th>{commenter.fName}</th>
                                         <th>{commenter.lName}</th>
                                         <th>{commenter.phone}</th>
                                         <th>{commenter.commentText}</th>
                                         <th>{commenter.regName}</th>
                                         <th>{commenter.distName}</th>
                                         <th>
                                             <Button color="warning" onClick={
                                                 () => this.props.editComment(
                                                     commenter.id,
                                                     commenter.fName,
                                                     commenter.lName,
                                                     commenter.phone,
                                                     commenter.commentText,
                                                 )}>Edit</Button>
                                             <Button color="danger"
                                                     onClick={() => this.delete(commenter.id)}>Delete</Button>
                                         </th>
                                     </tr>
                                 })
                             }
                             </tbody>
                         </Table>
                     </Col>
                 </Row>

                <Row md={12} xs={12} sm={12}>
                    <Col md={12} xs={12} sm={12}>
                        <Modal isOpen={this.props.isCMOpen} toggle={this.props.cMClose}>
                            <ModalHeader>
                                Edit
                            </ModalHeader>
                            <ModalBody>
                                <AvForm>
                                    <AvInput id="editFName" name="editFName" placeholder="Editing first name" required
                                             defaultValue={this.props.firstName}/>
                                    <AvInput id="editLName" name="editLName" placeholder="Editing last name" required
                                             defaultValue={this.props.lastName}/>
                                    <AvInput id="editPhone" name="editPhone" placeholder="Editing phone number" required
                                             defaultValue={this.props.phone}/>
                                    <AvInput id="editCText" name="editCText" placeholder="Editing short comment" required
                                             defaultValue={this.props.commentText}/>
                                    <AvGroup>
                                        <Label>Region</Label>
                                        <AvField type="select" onChange={() => this.editReg()} id="editRegion" name="editRegion" required>
                                            {
                                                this.props.regionList.map((reg,index)=>{
                                                    if (reg.id === this.state.regionId) {
                                                        return <option key={index} value={reg.id}>{reg.name_ru}</option>
                                                    }
                                                })
                                            }
                                            {
                                                this.props.regionList.map((reg, i) => {
                                                    return <option key={i} value={reg.id}>{reg.name_ru}</option>
                                                })
                                            }
                                        </AvField>
                                        <AvFeedback>Region Should be filled</AvFeedback>
                                    </AvGroup>
                                    <hr/>
                                    <AvGroup>
                                        <Label>District</Label>
                                        <AvField type="select" onChange={() => this.editDist()} id="editDistrict"
                                                 name="editDistrict" required>
                                            {this.props.distList.filter(district => parseInt(district.city)===parseInt(this.state.regionId)).map((dist, index) => {
                                                    return <option key={index} value={dist.id}>
                                                        {dist.name_uz}
                                                    </option>
                                                }
                                            )}
                                        </AvField>
                                        <AvFeedback>District Should be filled</AvFeedback>
                                    </AvGroup>
                                    <Button onClick={() => this.saveEditingComment()}>save</Button>
                                    <Button onClick={this.props.cMClose}>cancel</Button>
                                </AvForm>
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        );
    }

    delete = (id) => {
        let list = [];
        this.props.commentList.map((comment, index) => {
            if (comment.id !== id) {
                list.push(comment);
            }
        });
        this.props.delComment(list);
        console.log(id)
    };
    editReg = () => {
        let newRegId = document.getElementById('editRegion').value;
        this.setState({
            regionId: newRegId
        });
    };
    editDist = () => {
        let newDistId = document.getElementById('editDistrict').value;
        this.setState({
            distId: newDistId
        });
    };
    saveCommenter = () => {
        let id = 0;
        let firstName = document.getElementById("fName").value;
        let lastName = document.getElementById("lName").value;
        let phoneNumber = document.getElementById("phone").value;
        let comment = document.getElementById("comment").value;

        let region = this.props.regionList.map((reg, index) => {
            if (reg.id === this.state.regionId) {
                return reg.name_ru;
            }
        });
        let district = this.props.distList.map((dist, index) => {
            if (dist.id === this.state.distId) {
                return dist.name_uz;
            }
        });
        console.log(region);
        if (firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0 && comment.length > 0) {
            this.props.commentList.map(comment => {
                if (comment.id > id) {
                    id = comment.id;
                }
            });
            id++;
            let comments = {
                id: id, fName: firstName, lName: lastName, phone: phoneNumber,
                commentText: comment, regName: region, distName: district
            };
            this.props.saveText(comments);
        }
        this.setState({
            regionNomi: region,
            distNomi: district
        });
    };
    saveEditingComment = () => {
        if (this.props.commentText !== null && this.props.firstName !== null && this.props.lastName !== null && this.props.phone !== null) {
            console.log(this.props.commentText);
            let newFName = document.getElementById("editFName").value;
            let newLName = document.getElementById("editLName").value;
            let newPhone = document.getElementById("editPhone").value;
            let newCText = document.getElementById("editCText").value;
            let regionId = document.getElementById("editRegion").value;
            let districtId = document.getElementById("editDistrict").value;
            let region = this.props.regionList.map((reg, index) => {
                if (parseInt(reg.id) === parseInt(regionId)) {
                    return reg.name_ru;
                }
            });
            let district = this.props.distList.map((dist, index) => {
                if (parseInt(dist.id) === parseInt(districtId)) {
                    return dist.name_uz;
                }
            });
            if (newFName.length > 0 && newLName.length > 0 && newPhone.length > 0 && newCText.length > 0) {
                this.delete(this.props.commentId);
                let id = 0;
                this.props.commentList.map(comment => {
                    if (comment.id > id) {
                        id = comment.id;
                    }
                });
                id++;

                let comments = {
                    id: id - 1, fName: newFName, lName: newLName,
                    phone: newPhone, commentText: newCText, regName: region, distName: district
                };
                this.props.saveText(comments);
                this.props.cMClose();
            }
        }
    };
    getRegList = () => {
        axios.get("https://api.fn-express.uz/city/list/")
            .then(data => {
                this.props.getRegs(data.data.results);
                console.log(data);
            })
    };
    getDistList = () => {
        axios.get("https://api.fn-express.uz/district/list/?limit=1000")
            .then(data => {
                this.props.getDists(data.data.results);
                console.log(data)
            })
    };

    inputChanged = () => {
        let selectedItemId = document.getElementById("region").value;
        let id = parseInt(selectedItemId);
        console.log(id + '-' + typeof id);
        this.setState({
            regionId: id
        });
    };

    inputChanged2 = () => {
        let selectedItemId = document.getElementById("district").value;
        let id = parseInt(selectedItemId);
        console.log(id + '-' + typeof id);
        this.setState({
            distId: id
        });

    }
}

const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    saveText: comments => dispatch({type: 'comment', comments: comments}),
    delComment: list => dispatch({type: 'delComment', delComment: list}),
    cMClose: () => dispatch({type: 'isClose', status: false}),
    editComment: (id, fName, lName, phone, commentText, regName, distName) => dispatch({
        type: 'edit',
        status: true,
        cId: id,
        fName: fName,
        lName: lName,
        phone: phone,
        commentText: commentText
    }),
    getRegs: data => dispatch({type: 'regList', data: data}),
    getDists: data => dispatch({type: 'distList', data: data}),
    regId: (id) => dispatch({type: 'rId', rId: id}),
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);


