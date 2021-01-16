import React from 'react';
import _ from 'lodash';
import {
    Button,
    Card,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap"; 

class ChangePassModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                old_password : "",
                new_password : "",
                new_password_conf : ""
            }
        }
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
    }

    onSubmitPassword(){
        //fait qqch sale pute t ma moune
    }


    render() {
        return (
            <Card className={`shadow`}>

                <Form className="m-5" onSubmit={(e) => this.props.onSubmit(e, this.state.content)}>
                    <h1 className="ml--3 mb-3">Change Password</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-lock"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Old Password" type="text" name="old_password"  onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-lock-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New Password" type="text" name="new_password" onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-lock-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Confirm New Password" type="text" name="new_password_confirmation" onChange={this.onChange}/>
                </InputGroup>
              </FormGroup>
              <div className=" mt-3">
                  <Button color="primary" type="submit" >
                        Change
                  </Button>
                </div>
              
            </Form>
        

            </Card>
        );
    }
}

export default ChangePassModal;
