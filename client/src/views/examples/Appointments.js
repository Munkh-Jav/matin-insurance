
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import TableCard from "../../components/Cards/TableCard";
import tableContentFromAppointments from "../../utils/tableContentFromAppointments";
import {getAppointments, updateAppointment} from "../../actions/appointmentActions";
import {connect} from 'react-redux';
import _ from "lodash";

class Appointments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: []
    }
  }
  componentDidMount() {
    this.props.getAppointments();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevProps.appointments, this.props.appointments)){
      this.setState({loading: []});
    }
  }

  acceptButton = (appointment) => {
    switch (appointment.status){
      case 0 :
         const newAppointment = {...appointment};
         newAppointment.status = 1;
        this.setState({loading: [...this.state.loading, newAppointment.id]});
        this.props.updateAppointment(newAppointment);
        break;
      case 1:
      case 2:
      default:
        this.props.emailPerson();
        break;
    }
  }

  denyButton = (appointment) => {
    switch (appointment.status){
      case 0 :
      case 1:
      case 2:
      default:
        const newAppointment = {...appointment};
        newAppointment.status = 2;
        this.setState({loading: [...this.state.loading, newAppointment.id]});
        this.props.updateAppointment(newAppointment);
        break;
    }
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <TableCard
                    title="All Appointments"
                    top_button="Show All"
                    hide_top_button={true}
                    top_callback={this.showMoreAppointments}
                    cols={["With", "Status", "Date", "Time", "Actions"]}
                    rows={tableContentFromAppointments(this.props.appointments, ["status", "date", "time", "buttons"],[{callback: this.acceptButton}, {callback: this.denyButton}])}
                    loading={this.state.loading}
                    with_images={false}
                    rowClick={e => e.preventDefault()}
                    dark={localStorage.getItem("dark") === 'true'}
                />
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col">
              {/* TODO: PUT CALENDAR SCHEDULE IN HERE*/ }
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    appointments: state.appointments.appointments
  }
}

export default connect(mapStateToProps, {getAppointments, updateAppointment})(Appointments);


