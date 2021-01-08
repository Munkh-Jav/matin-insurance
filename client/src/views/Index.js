
import React from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import {connect} from 'react-redux';

import {getAppointments} from "../actions/appointmentActions";

import Header from "components/Headers/Header.js";
import TableCard from "../components/Cards/TableCard";
import tableContentFromTasks from "../utils/tableContentFromComments";
import DetailModal from "../components/Modals/Modal";
import TaskModal from "../components/Modals/TaskModal";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      selected_appointment: {}
    }
  }

  openModal = (e, appointment_id) => {
    e.preventDefault();
    const appointment = this.props.appointments[this.props.appointments.findIndex(x => x._id === appointment_id)]
    this.setState({is_modal_open: true, selected_appointment: appointment});
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({is_modal_open:false, selected_appointment : {}})
  }


  componentDidMount() {
    this.getAppointments();
  }

  getAppointments(){
    this.props.getAppointments();
  }

  filterAppointments(appointments){
    return appointments;
  }

  addAppointment = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <TableCard
                  title="This week's tasks"
                  top_button="Assign new task"
                  top_callback={this.addAppointment}
                  cols={["Title", "State", "Team Members", "Progress", "Deadline", "Actions"]}
                  rows={tableContentFromTasks(this.filterAppointments(this.props.tasks), ["state", "users", "progress", "deadline"],[{title:"action"}])}
                  with_images={false}
                  openModal={this.openModal}
                  dark={localStorage.getItem("dark") === 'true'}
              />
              <DetailModal
                  isOpen={this.state.is_modal_open}
                  onRequestClose={this.closeModal}
              >
                  <TaskModal
                      dark={localStorage.getItem("dark") === 'true'}
                      task={this.state.selected_appointment}
                  />
              </DetailModal>
            </Col>
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

export default connect(mapStateToProps, {getAppointments})(Index);
