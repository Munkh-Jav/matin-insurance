import React from "react";

// reactstrap components
import {
    Col, Container, Row, FormGroup, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import DetailModal from "../../components/Modals/DetailModal";
import {connect} from 'react-redux';
import Comment from "../../components/Groups/Comment";
import getVideoDetails from "../../utils/getVideoDetails";
import _ from "lodash";
import ChangePassModal from "../../components/Modals/ChangePassModal";

import ChangeUserInfoModal from "components/Modals/ChangeUserInfoModal";
import UploadPicModal from "components/Modals/UploadPicModal";
import {changeAvatar, changePass, changeEmail} from "../../actions/userActions";
import validateEmail from "../../utils/validateEmail";
import filepath from "../../filepath";


class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "" ,
            is_modal_open: false,
            is_confirm_modal_open: false,
            is_contact_modal_open: false,
            is_upload_modal_open: false,
            description: "",
            content: {
                new_comment: ''
            },
            error: '',
            isLoading: false,
            user : this.props.user,
            imageSrc: filepath + `/profile-pics/${this.props.user.profile_img}`,
            imageHash: Date.now()
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        if (this.state.description.length === 0 && !_.isEmpty(this.props.video)) {
            this.getVideoDetails();
        }
    }

    componentDidMount() {
        document.addEventListener('change_avatar', e => {
            if (e.detail.success) {
                this.showSnackBar("Image Updated !");
                this.setState({imageSrc: filepath + `/profile-pics/${this.props.user.profile_img}`, imageHash: Date.now()})
            } else {
                this.showSnackBar("Something went wrong");
            }
        }, false);
        document.addEventListener('change_email', e=> {
            if(e.detail.success){
              this.showSnackBar("Email updated !");
            }else{
              this.showSnackBar("Something went wrong");
            }
          }, false);
    }

    updateEmail = e => {
        e.preventDefault();
        if(!validateEmail(this.state.email) || this.state.email.length < 5)
          return this.showSnackBar("Invalid Email");
        this.props.changeEmail(this.state.email);
    }
  
    //Password Modal Handlers
    openPassModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_pass_modal_open: true});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    closePassModal = (e, updated, error) => {
        if (e)
            e.preventDefault();
        this.setState({is_pass_modal_open: false})
        if (updated)
            this.showSnackBar("Password updated !");
        if (error)
            this.showSnackBar("Something went wrong");
    }

    modalSubmitPass = (formContent) => {
        this.props.changePass(formContent);
    }
    //Contact Modal Handlers
    openContactModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_contact_modal_open: true});
    }

    closeContactModal = (e, updated) => {
        if (e)
            e.preventDefault();
        this.setState({is_contact_modal_open: false})
        if (updated)
            this.showSnackBar("Info updated !");
    }

    modalSubmitContact = (formContent) => {
        this.props.updateAdminInfo(formContent);
    }

    //Upload Picture Modal Handlers
    openUploadModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_upload_modal_open: true});
    }

    closeUploadModal = (e, updated) => {
        if (e)
            e.preventDefault();
        this.setState({is_upload_modal_open: false})
        if (updated)
            this.showSnackBar("Info updated !");
    }

    modalUploadSubmit = (file) => {
        if (file.length <= 0) {
            return this.showSnackBar("Please upload a file.")
        }
        this.props.changeAvatar(file[0]);
    }


    showSnackBar(message) {
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
        this.setState({snackbar_message: message})
    }


    render() {
        return (
            <>
                <MainHeader/>
                <Container className="mt-4" fluid>
                    <Row>
                        <Col xs="4" style={{borderRight: '1px solid #333'}}>
                <span className="ml-4 mt-4 avatar avatar-xl rounded-circle">
                      <img
                          alt="..."
                          src={`${this.state.imageSrc}?${this.state.imageHash}`}
                      />
                </span>
                            <div className="ml-5 mt-5">
                                <Button
                                    style={{color: "#f5365c", border: '2px solid #f5365c'}}
                                    onClick={this.openUploadModal}
                                >
                                    Upload Picture
                                </Button>
                            </div>
                            <DetailModal
                                isOpen={this.state.is_upload_modal_open}
                                onRequestClose={this.closeUploadModal}
                            >
                                <UploadPicModal
                                    closeModal={this.closeUploadModal}
                                    onSubmit={this.modalUploadSubmit}
                                />
                            </DetailModal>

                        </Col>

                        <Col xs="8">
                            <Form>
                                <h6 className="heading-small text-muted mb-4">
                                    Connection and Security
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-email"
                                                >
                                                    Email address
                                                </label>

                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-email"
                                                    placeholder="Enter new email address"
                                                    name="email"
                                                    type="email"
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                />

                                            </FormGroup>

                                        </Col>
                                        <Col lg="6">
                                            <FormGroup className="update-btn">
                                                <Button
                                                    color="primary"
                                                    className="btn bg-red"
                                                    onClick={this.updateEmail}
                                                    size="sm"
                                                >
                                                    Update
                                                </Button>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-password"
                                                >
                                                    Password
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-password"
                                                    defaultValue="******"
                                                    disabled
                                                />
                                            </FormGroup>
                                            <Button
                                                color="primary"
                                                className="btn bg-red mb-4"
                                                onClick={this.openPassModal}
                                                size="sm"
                                            >
                                                Change password
                                            </Button>
                                        </Col>
                                    </Row>
                                    <DetailModal
                                        isOpen={this.state.is_pass_modal_open}
                                        onRequestClose={this.closePassModal}
                                    >
                                        <ChangePassModal
                                            closeModal={this.closePassModal}
                                            onSubmit={this.modalSubmitPass}
                                        />
                                    </DetailModal>
                                    <Row>
                                    <h6 className="heading-small text-muted mb-4">
                                        Personal Information
                                    </h6>
                                    </Row>
                                    <Row>
                                   
                                       
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fname"
                                                    >
                                                        First Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-fname"
                                                        value={(this.props.user.name)?this.state.user.name.split(" ")[0]: ""}
                                                        placeholder="First Name"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-lname"
                                                    >
                                                        Last Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lname"
                                                        value={(this.state.user.name && this.state.user.name.split(" ")[1])?this.state.user.name.split(" ")[1]: ""}
                                                        placeholder="Last Name"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                             <Col lg="4">
                                                    <Button
                                                        color="primary"
                                                        className="btn bg-red mb-5"
                                                        onClick={this.openContactModal}
                                                        value="blabla"
                                                        size="sm"
                                                    >
                                                        Change Information
                                                    </Button>
                                                </Col>
                                        </Row>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    <DetailModal
                        isOpen={this.state.is_contact_modal_open}
                        onRequestClose={this.closeContactModal}
                    >
                        <ChangeUserInfoModal
                            info={this.state.info}
                            closeModal={this.closeContactModal}
                            onSubmit={this.modalSubmitContact}
                        />
                    </DetailModal>
                </Container>
                <div id="snackbar">{this.state.snackbar_message}</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.user.email,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {changeAvatar, changeEmail, changePass})(UserProfilePage);
