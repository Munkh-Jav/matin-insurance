
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import {connect} from 'react-redux';

import {getTasks} from "../actions/taskActions";

import Header from "components/Headers/Header.js";
import TableCard from "../components/Cards/TableCard";
import tableContentFromTasks from "../utils/tableContentFromTasks";
import DetailModal from "../components/Modals/Modal";
import TaskModal from "../components/Modals/TaskModal";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      selected_task: {}
    }
  }

  openModal = (e, task_id) => {
    e.preventDefault();
    const task = this.props.tasks[this.props.tasks.findIndex(x => x._id === task_id)]
    this.setState({is_modal_open: true, selected_task: task});
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({is_modal_open:false, selected_task : {}})
  }


  componentDidMount() {
    this.getTasks();
  }

  getTasks(){
    this.props.getTasks();
  }

  filterTasks(tasks){
    return tasks;
  }

  addTask = (e) => {
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
                  top_callback={this.addTask}
                  cols={["Title", "State", "Team Members", "Progress", "Deadline", "Actions"]}
                  rows={tableContentFromTasks(this.filterTasks(this.props.tasks), ["state", "users", "progress", "deadline"],[{title:"action"}])}
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
                      task={this.state.selected_task}
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
    tasks: state.tasks.tasks
  }
}

export default connect(mapStateToProps, {getTasks})(Index);
