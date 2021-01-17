
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import ChangePassModal from "../../components/Modals/ChangePassModal";
import ChangeContactModal from "../../components/Modals/ChangeContactModal";
import DetailModal from "../../components/Modals/DetailModal";
import {changePass} from "../../actions/userActions";
import {connect} from 'react-redux'

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_pass_modal_open: false,
      is_contact_modal_open: false
    }
  }

  //Password Modal Handlers
  openPassModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open: true});
  }

  closePassModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open:false})
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

  closeContactModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_contact_modal_open:false})
  }

  modalSubmitContact = (formContent) => {
    //this.props.changePass(formContent);
    //TODO: CREATE changeContact 
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Admin Account
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
                              placeholder="jesse@example.com"
                              type="email"
                            />
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
                            />
                          </FormGroup>
                          <Button
                            color="primary"
                            className="btn bg-red"
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
                    </div>
                    <hr className="my-4" />
                    {/* Contact Info */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="CHANGER LA DEFAULT VALUE PAR LA ACTUAL VALUE"
                              id="input-address"
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
                              defaultValue="DITTO"
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
                              defaultValue="DITTO"
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
                              placeholder="DITTO"
                              type="number"
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
                              Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="DITTO"
                              type="number"
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
                            onClick={this.openContactModal}
                            size="sm"
                          >
                            Change Information
                          </Button>
                        </Col>
                        </Row>
                    </div>
                    <DetailModal
                      isOpen={this.state.is_contact_modal_open}
                      onRequestClose={this.closeContactModal}
                      >
                      <ChangeContactModal
                      closeModal={this.closeContactModal}
                      onSubmit={this.modalSubmitContact}
                     />  
              </DetailModal>
                  </Form>
                </CardBody>
              </Card>
        
      </>
    );
  }
}

export default connect(null, {changePass})(Settings);
