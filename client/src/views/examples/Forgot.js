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
            email: "",
            error: '',
            loading: false
        }
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if(prevState.email !== this.state.email){
            this.setState({changed:true});
          }
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
                <small>Enter the e-mail address linked to your account</small>
              </div>
              <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email"  onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button color="primary" type="submit">
                    Send code
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
