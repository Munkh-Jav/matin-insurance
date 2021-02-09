import React from 'react';
import {
    Button,
    Card,
    Form,
    Col,
    Row,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap";
import {connect} from "react-redux";

class UploadPicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                       
            },
            error: '',
            changed:false,
            isLoading: false,
        }
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
    }

    componentDidMount() {
        document.addEventListener('change_contact', e => {
            if(e.detail.success){
                this.props.closeModal(undefined, true);
            }else{
                this.props.closeModal(undefined, false, true);
            }
        }, false);
    }


    onSubmitContactInfo = (e) =>{
        e.preventDefault()
        this.props.onSubmit(this.state.content);
    }


    render() {
        const {error: state_error, changed} = this.state;
        const error = (this.props.error) ? this.props.error : state_error;

        return (
            <Card className={`shadow`}>
                <Form className="m-5" onSubmit={this.onSubmitContactInfo}>
                    <h1 className="ml--3 mb-3">Upload Picture</h1>

            </Form>
        

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.change_pass_error,
        message: state.auth.change_pass_message
    }
}

export default connect(mapStateToProps)(UploadPicModal);

