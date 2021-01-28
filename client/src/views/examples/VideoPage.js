
import React from "react";

// reactstrap components
import {
  Card, CardBody, CardHeader, CardFooter,
  Col, Container, Row
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import DetailModal from "../../components/Modals/DetailModal";
import {connect} from 'react-redux';
import ContentCard from "../../components/Cards/ContentCard";
import {getVideo, cleanVideo} from "../../actions/videoActions";
import Comment from "../../components/Groups/Comment";
import {getComments} from "../../actions/commentActions";
import {CLEAN_VIDEO} from "../../actions/types";
import getVideoDetails from "../../utils/getVideoDetails";
import ReactPlayer from "react-player";
import _ from "lodash";
import UserAddCommentModal from "components/Modals/UserAddCommentModal";



class VideoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      is_confirm_modal_open: false,
      description: ""
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

    if(this.state.description.length === 0 && !_.isEmpty(this.props.video)){
      this.getVideoDetails();
    }
  }
  componentDidMount() {
    this.props.cleanVideo();
    this.props.getVideo(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
    
  }

  async getVideoDetails() {
    
      var videoData = await getVideoDetails(this.props.video.video_url);
      if(videoData.items.length < 1){
        return;
      }
      var videoDescription = videoData.items[0].snippet.description;

    this.setState({description: videoDescription});

  }

  getComments = () => {
    return this.props.comments.map(comment => {
      return <Comment key={comment.id} comment={comment} hide_buttons={true}/>
    })
  }

  onChange(e) {
    this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
}

openModal = (e) => {
  if(e)
    e.preventDefault();
  this.setState({is_modal_open: true});
}

closeModal = (e) => {
  e.preventDefault();
  this.setState({is_modal_open:false})
}

openConfirmModal = (video) => {
  this.setState({is_confirm_modal_open: true});
}

closeConfirmModal = () => {
  this.setState({is_confirm_modal_open:false})
}


 
  render() {

    return (
      <>
          <MainHeader/>
          <Container className="mt-4" fluid>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Row className="mr-6 ml-6">
                      <div>
                          <ReactPlayer url={this.props.video.video_url}/>
                      </div>
                  </Row>

                  <Row className="align-items-center">
                      <div className="col">
                          <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Video
                          </h6>
                          <h2 className="mb-0">{this.props.video.video_title}</h2>
                          <hr/>
                          <p style={{fontSize :'0.7rem'}}>{this.state.description}</p>
                      </div>
                  </Row>
              </div>
          </Container>
          <Container className="mt-4">
              <div style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Row >
                      <div style={{width : '100%'}}>
                        
                          <ContentCard
                              title="Comments"
                              top_button="Add Comment"
                              top_callback={this.openModal}
                              toggleComments={true}
                          >
                              {this.getComments()}
                          </ContentCard>
                      </div>
                      
                  </Row>
                  <DetailModal
                          isOpen={this.state.is_modal_open}
                          onRequestClose={this.closeModal}
                          >
                            <UserAddCommentModal
                                  closeModal={this.closeModal}
                                  onSubmit={this.submitSomething}
                              />
                      </DetailModal>
              </div>
          </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, {getVideo, getComments, cleanVideo})(VideoPage);
