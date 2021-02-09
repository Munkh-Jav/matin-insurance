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

class ChangeUserInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
               /* fname : this.props.info.fname,
                lname : this.props.info.lname,
                phone : this.props.info.phone,
                address : this.props.contact.address,
                pcode : this.props.info.pcode,
                country : this.props.info.country, 
                city : this.props.info.city  */            
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
                    <h1 className="ml--3 mb-3">Change Personal Information</h1>

                <Col xs="12">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-signature" />

                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New First Name" type="text" name="fname" value={this.state.content.fname} onChange={this.onChange}/>
                </InputGroup>
                </Col>
                <Col xs="12">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-signature"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New New Last Name" type="text" name="lname" value={this.state.content.lname} onChange={this.onChange}/>
                </InputGroup>
                </Col>

                    
                    {error && <p style={{color: 'red', fontSize: 12}}>{error}</p>}
              <div className=" mt-3">
                  <Button color="primary"
                   type="submit" 
                   className="center"
                   >
                        Change
                  </Button>
                </div>
              
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

export default connect(mapStateToProps)(ChangeUserInfoModal);

