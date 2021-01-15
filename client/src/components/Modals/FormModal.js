import React from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap"; 
import {addVideo} from "../../actions/videoActions"

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            dark: this.props.dark,
            video : {
                video_title : "",
                video_url : ""
            }
        }
    this.submitVideo = this.submitVideo.bind(this);
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ video: { ...this.state.video, [e.target.name]: e.target.value} });
    }

    toggleTheme= (e) =>{
        e.preventDefault();
        localStorage.setItem("dark", (!this.state.dark).toString());
        this.setState({dark: !this.state.dark})
    }

    submitVideo(e) {
        e.preventDefault();
        this.props.addVideo(this.state.video);
        this.props.closeModal(e);
    }

    render() {
        return (
            <Card className={`${this.state.dark && 'bg-default'} shadow`}>

                <Form className="m-5" onSubmit={this.submitVideo}>
                    <h1 className="ml--3 mb-3">Add a video</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-signature" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Video Title" type="text" name="video_title" value={this.state.video.video_title} onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fab fa-youtube" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="YouTube URL" type="text" name="video_url" value={this.state.video.video_url}  onChange={this.onChange}/>
                </InputGroup>
              </FormGroup>
              <div className=" mt-3">
                  <Button color="primary" type="submit" >
                    Add Video
                  </Button>
                </div>
              
            </Form>
        

            </Card>
        );
    }
}

export default connect(null, {addVideo})(FormModal);
