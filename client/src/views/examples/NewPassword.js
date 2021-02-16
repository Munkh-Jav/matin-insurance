import React from "react";

// reactstrap components
import {
    Card, CardBody, CardHeader, CardFooter,
    Col, Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import _ from "lodash";
import history from "../../history";


class Forgot extends React.Component {

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

       
    }

    componentDidMount() {
      
    }

   

    onChange(e) {
        this.setState({content: {...this.state.content, [e.target.name]: e.target.value}});
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
                <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Choose a new password </small>
              </div>
              <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-unlock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New password" name="email" type="email"  onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-unlock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Confirm new password" name="email" type="email"  onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button color="primary" type="submit">
                    Update Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          </Col>
                
                <div id="snackbar">{this.state.snackbar_message}</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        video: state.videos.video,
        video_error: state.videos.videos_error,
        comments: state.comments.comments,
        user : state.auth.user
    }
}

export default connect(mapStateToProps, {})(Forgot);
