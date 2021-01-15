
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
import {getAppointments} from "../../actions/appointmentActions";
import {connect} from 'react-redux';
import filterAppointments from "../../utils/filterAppointments";

class Appointments extends React.Component {

  componentDidMount() {
    this.props.getAppointments();
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
                    rows={tableContentFromAppointments(this.props.appointments, ["status", "date", "time", "buttons"],[{title:"Accept"}, {title:"Deny", class:"bg-danger"}])}
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

export default connect(mapStateToProps, {getAppointments})(Appointments);


