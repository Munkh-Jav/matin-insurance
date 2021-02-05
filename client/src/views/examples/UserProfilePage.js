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
import {CLEAN_VIDEO} from "../../actions/types";
import getVideoDetails from "../../utils/getVideoDetails";
import ReactPlayer from "react-player";
import _ from "lodash";
import UserAddCommentModal from "components/Modals/UserAddCommentModal";
import authCheck from "../../utils/authCheck";
import validateEmail from "../../utils/validateEmail";


class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            is_confirm_modal_open: false,
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

    onChange(e) {
        this.setState({content: {...this.state.content, [e.target.name]: e.target.value}});
    }

    onCommentSubmit = (e) => {
        e.preventDefault();
        if(this.state.content.new_comment.length < 1)
            return this.showSnackBar("Please write a comment to post");
        this.props.addComment(this.state.content.new_comment, this.props.user, this.props.video);
        this.setState({content : {new_comment : ""}})

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
                    </span> {/*CHANGER A USER IMAGE*/}
                </Col>
                <Col xs="8">
                <h6 className="heading-small text-muted mb-4">
                      Personal Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                      <Col md="4">
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
                        <Col md="4">
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
                       
                        <Col md="4">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-country"
                            >
                              Phone Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-phone"
                                value="blabla"
                                placeholder="Phone"
                                disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              value="blabla"
                              placeholder="Home Address"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              value="blabla"
                              id="input-city"
                              placeholder="City"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              value="blabla"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              value="blabla"
                              placeholder="Postal code"
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        </Row>
                        <Row>                   
                        <Col lg="4">
                             <Button
                            color="primary"
                            className="btn bg-red"
                            value="blabla"
                            size="sm"
                          >
                            Change Information
                          </Button>
                        </Col>
                        </Row>
                    </div>
                </Col>
                </Row>
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
