import React from "react";

// reactstrap components
import {
    Card, CardBody, CardHeader, CardFooter,
    Col, Container, Row, Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Button
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {getVideo, cleanVideo} from "../../actions/videoActions";
import Comment from "../../components/Groups/Comment";
import {getComments} from "../../actions/commentActions";
import getVideoDetails from "../../utils/getVideoDetails";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


class BookAppointmentPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            is_confirm_modal_open: false,
            description: "",
            selectedDate: ""
        }
        this.onSubmitAppointment = this.onSubmitAppointment.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    }

    componentDidMount() {

    }


    onChange(e) {

        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.selectedDate);

    }

    onSelectedDate(date) {
        this.setState({selectedDate: date});
    }

    onSubmitAppointment(e) {
        e.preventDefault()
        console.log(this.state.selectedDate);
    }




    render() {

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);


        const isWeekday = date => {
            const day = date.getDay();
            return day !== 0 && day !== 6;
        };

        const CustomDate = ({ value, onClick }) => (
            <>
                <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="fas fa-calendar-day"/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Select a date" value={value} onChange={this.onChange} onClick={onClick}/>
                </InputGroup>
            </>
        );

        return (
            <>


                <MainHeader/>
                <Container className="mt-4" fluid>

                    <Row>
                        <Col xl="5" style={{borderRight: '1px solid #333'}}>
                            <p style={{fontSize: '600%'}}>Book Appointment
                            </p><br/>
                            <p><em>Meet with Matin Tireh Dast</em></p>

                        </Col>
                        <Col xl="7">
                            <Form className="m-5" onSubmit={this.onSubmitAppointment}>
                                <h1 className="ml--3 mb-3">Information</h1>
                                <FormGroup className="mb-0">
                                    <Row>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="far fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="First Name" type="text" name="fname"
                                                       onChange={this.onChange}/>
                                            </InputGroup>
                                        </Col>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Last Name" type="text" name="lname"
                                                       onChange={this.onChange}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-envelope"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email address" type="text" name="email"
                                               onChange={this.onChange}/>
                                    </InputGroup>
                                    <Row>
                                        <h3 className="mt-2 ml-2">Choose a date and a time interval</h3>
                                    </Row>
                                    <Row>
                                        <Col xl="9">

                                                <DatePicker

                                                    selected={this.state.selectedDate}
                                                    onChange={date => this.onSelectedDate(date)}
                                                    timeFormat="p"
                                                    style={{width: '100%'}}
                                                    showTimeSelect
                                                    customInput={<CustomDate/>}
                                                    minDate={tomorrow}
                                                    placeholderText="dd/mm/yyyy"
                                                    filterDate={isWeekday}
                                                    timeIntervals={30}
                                                    dateFormat="Pp"
                                                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                                                    maxTime={setHours(setMinutes(new Date(), 30), 20)}
                                                />
                                        </Col>

                                    </Row>
                                </FormGroup>
                                <div className=" mt-3">
                                    <Button color="primary"
                                            type="submit"
                                            className="mt-2 center"
                                    >
                                        Book appointment
                                    </Button>
                                </div>
                            </Form>

                        </Col>
                    </Row>

                </Container>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appointment: state.appointments.appointment,
    }
}

export default connect(mapStateToProps, {getVideo})(BookAppointmentPage);
