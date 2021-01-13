
import React from "react";
import {getAppointments} from "../actions/appointmentActions";
import {getAllComments} from "../actions/commentActions";
import {getVideos} from "../actions/videoActions"
import tableContentFromComments from "../utils/tableContentFromComments";
import tableContentFromAppointments from "../utils/tableContentFromAppointments";
import tableContentFromVideos from "../utils/tableContentFromVideos";

import {connect} from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col, CardBody
} from "reactstrap";

// core components


import Header from "components/Headers/Header.js";
import TableCard from "../components/Cards/TableCard";
import BarGraph from "../components/Cards/BarGraph";
import ContentCard from "../components/Cards/ContentCard";
import Comment from "../components/Groups/Comment";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments : this.props.appointments
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(prevState.appointments.length === 0 && this.props.appointments.length>0)
      this.setState({appointments: this.props.appointments})
  }


  componentDidMount() {
    this.props.getAppointments();
    this.props.getAllComments();
    this.props.getVideos();
  }


  filterAppointments(appointments){

    var waitingAppointments = [];
    appointments.map(appointment => {

      if(appointment.status === 0){
        waitingAppointments.push(appointment);
      }
    })

    return waitingAppointments;
  }

  showMoreAppointments = (e) => {
    e.preventDefault();
  }

  getComments = () => {
    return this.props.comments.slice(0, 3).map(comment => {
      return <Comment key={comment.id} comment={comment}/>
    })
  }
  


  render() {
    return (
        <>
          <Header />
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">

                <TableCard
                    title="Pending Appointments"
                    top_button="Show All"
                    top_callback={this.showMoreAppointments}
                    cols={["With", "Status", "Date", "Time", "Actions"]}
                    rows={tableContentFromAppointments(this.filterAppointments(this.props.appointments), ["status", "date", "time"],[{title:"Accept"}, {title:"Deny"}])}
                    with_images={false}
                    openModal={this.openModal}
                    dark={localStorage.getItem("dark") === 'true'}
                />
              </Col>
              <Col xl="4">
                <BarGraph
                  title="Appointments"
                  subtitle="Overview"
                  size="250px"
                  appointments={this.state.appointments}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="4">
                <ContentCard
                    title="Comments"
                    top_button="See all"
                    top_callback={this.showMoreAppointments}
                >
                  {this.getComments()}
                </ContentCard>
              </Col>
              <Col xl="8">
              <TableCard
                    title="Video Activity"
                    top_button="Show All"
                    top_callback={this.showMoreAppointments}
                    cols={["", "Title", "Views", "Likes", "Dislikes"]}
                    rows={tableContentFromVideos(this.props.videos, ["title", "views", "likes", "dislikes"])}
                    openModal={this.openModal}
                    dark={localStorage.getItem("dark") === 'true'}
                />
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments.appointments,
    comments: state.comments.comments,
    videos : state.videos.videos
  }
}

export default connect(mapStateToProps, {getAppointments, getAllComments, getVideos})(Index);
