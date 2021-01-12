
import React from "react";
import {getAppointments} from "../actions/appointmentActions";
import {getAllComments} from "../actions/commentActions";
import tableContentFromComments from "../utils/tableContentFromComments";
import tableContentFromAppointments from "../utils/tableContentFromAppointments";
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
  }


  filterAppointments(appointments){
    return appointments;
  }

  showMoreAppointments = (e) => {
    e.preventDefault();
  }

  getComments = () => {
    return this.props.comments.map(comment => {
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
                    title="Latest appointments"
                    top_button="Show more"
                    top_callback={this.showMoreAppointments}
                    cols={["With", "Status", "Date", "Time", "Actions"]}
                    rows={tableContentFromAppointments(this.filterAppointments(this.props.appointments), ["status", "date", "time"],[{title:"accept"}, {title:"deny"}])}
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
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Social traffic</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                                max="100"
                                value="60"
                                barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                                max="100"
                                value="70"
                                barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                                max="100"
                                value="75"
                                barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                                max="100"
                                value="30"
                                barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                </Card>
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
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, {getAppointments, getAllComments})(Index);
