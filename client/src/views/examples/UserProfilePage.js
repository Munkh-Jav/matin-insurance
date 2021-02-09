import React from "react";

// reactstrap components
import {
    Card, CardBody, CardHeader, CardFooter,
    Col, Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import DetailModal from "../../components/Modals/DetailModal";
import {connect} from 'react-redux';
import ContentCard from "../../components/Cards/ContentCard";
import {getVideo, cleanVideo} from "../../actions/videoActions";
import Comment from "../../components/Groups/Comment";
import {addComment, getComments} from "../../actions/commentActions";
import getVideoDetails from "../../utils/getVideoDetails";
import _ from "lodash";
import {changePass, changeEmail} from "../../actions/userActions";
import ChangePassModal from "../../components/Modals/ChangePassModal";

import authCheck from "../../utils/authCheck";
import validateEmail from "../../utils/validateEmail";
import ChangeUserInfoModal from "components/Modals/ChangeUserInfoModal";
import UploadPicModal from "components/Modals/UploadPicModal";


class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            is_confirm_modal_open: false,
            is_contact_modal_open: false,
            is_upload_modal_open: false,
            description: "",
            content: {
                new_comment: ''
            },
            error: '',
            isLoading: false
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        if (this.state.description.length === 0 && !_.isEmpty(this.props.video)) {
            this.getVideoDetails();
        }
    }

    componentDidMount() {
        this.props.cleanVideo();
        this.props.getVideo(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
        document.addEventListener('post_comment', e=> {
            if(e.detail.success){
                this.showSnackBar("Comment submitted for approval");
            }else{
                this.showSnackBar("Something went wrong");
            }
        }, false);
    }

    async getVideoDetails() {

        var videoData = await getVideoDetails(this.props.video.video_url);
        if (videoData.items.length < 1) {
            return;
        }
        var videoDescription = videoData.items[0].snippet.description;

        this.setState({description: videoDescription});

    }

    getComments = () => {
        return this.filterComments(this.props.comments).map(comment => {
            return <Comment key={comment.id} comment={comment} hide_buttons={true}/>
        })
    }

    filterComments = (comments) => {
        if(comments.length === 0)
            return []
        return comments.filter(function(comment) {
            return comment.status === 1;
        });
    }

    //Password Modal Handlers
  openPassModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open: true});
  }

  onChange(e) {
    this.setState({  [e.target.name]: e.target.value});
  }

  closePassModal = (e, updated, error) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open:false})
    if(updated)
      this.showSnackBar("Password updated !");
    if(error)
      this.showSnackBar("Something went wrong");
  }

  modalSubmitPass = (formContent) => {
    this.props.changePass(formContent);
  }
   //Contact Modal Handlers 
  openContactModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_contact_modal_open: true});
  }

  closeContactModal = (e, updated) => {
    if(e)
      e.preventDefault();
    this.setState({is_contact_modal_open:false})
    if(updated)
      this.showSnackBar("Info updated !");
  }

  modalSubmitContact = (formContent) => {
    this.props.updateAdminInfo(formContent);
  }

   //Upload Picture Modal Handlers 
   openUploadModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_upload_modal_open: true});
  }

  closeUploadModal = (e, updated) => {
    if(e)
      e.preventDefault();
    this.setState({is_upload_modal_open:false})
    if(updated)
      this.showSnackBar("Info updated !");
  }

  modalUploadSubmit = (formContent) => {
    this.props.updateAdminInfo(formContent);
  }


    showSnackBar(message){
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        this.setState({snackbar_message: message})
    }


    render() {
        return (
            <>
                <MainHeader/>
                <Container className="mt-4" fluid>
                <Row>
                <Col xs = "4" style={{borderRight: '1px solid #333'}}>
                <span className="ml-4 mt-4 avatar avatar-xl rounded-circle">
                      <img
                        alt="..."
                        src={process.env.PUBLIC_URL + `/profile-pics/petitsaoud.PNG`}
                      />
                </span>
                <div className="ml-5 mt-5">
                    <Button
                    style={{color:"#f5365c",   border: '2px solid #f5365c'}}
                    onClick = {this.openUploadModal}
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
                          <FormGroup >
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
                <h6 className="heading-small text-muted mb-4">
                      Personal Information
                    </h6>
                    <div className="pl-lg-4">
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
                              value="blabla"
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
                              value="blabla"
                              placeholder="Last Name"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                       
                        
                       
                        
                    
                        <Row>                   
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
                    </Row>
                    
                    </div>
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
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        user : state.auth.user
    }
}

export default connect(mapStateToProps, {getVideo, getComments, cleanVideo, addComment})(UserProfilePage);
