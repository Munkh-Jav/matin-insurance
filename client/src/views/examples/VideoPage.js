
import React from "react";

// reactstrap components
import {
  Card, CardBody, CardHeader, CardFooter,
  Col, Container, Row    
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {getVideos} from "../../actions/videoActions";
import {getVideo} from "../../actions/videoActions";
import getVideoDetails from "../../utils/getVideoDetails";
import ReactPlayer from "react-player";
import _ from "lodash";



class VideoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: ""
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

    if(this.state.description.length == 0 && !_.isEmpty(this.props.video)){
      this.getVideoDetails();
    }
  }
  componentDidMount() {
    this.props.getVideo(this.props.match.params.id);
    
  }

  async getVideoDetails() {
    
      var videoData = await getVideoDetails(this.props.video.video_url);
      if(videoData.items.length < 1){
        return;
      }
      var videoDescription = videoData.items[0].snippet.description;

    this.setState({description: videoDescription});

  }

  

 
  render() {

    return (
      <>
        <MainHeader />
        <Container className="mt-4" fluid>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}  >
                <Row className="mr-6 ml-6">
                <div >
                <ReactPlayer
                 url={this.props.video.video_url}
                     />
                     
                </div>
            </Row>
            
              <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Video
                    </h6>
                    <h2 className="mb-0">{this.props.video.video_title}</h2>
                    <hr/>
                    <p>{this.state.description}</p>
                  </div>
                </Row>

            
                    
                    
            </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.videos.video
  }
}

export default connect(mapStateToProps, {getVideo})(VideoPage);
