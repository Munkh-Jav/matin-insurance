
import React from "react";

// reactstrap components
import {
  Card, CardBody, CardHeader,
  Col, Container, Row
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {getVideos} from "../../actions/videoActions";
import getVideoDetails from "../../utils/getVideoDetails";


class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnails: []
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(this.state.thumbnails.length == 0 && this.props.videos.length > 0){
      this.getVideoDetails();
    }
  }

  async getVideoDetails() {
    const thumbnails = []
    await Promise.all(this.props.videos.map(async video => {
      var videoData = await getVideoDetails(video.video_url);
      if(videoData.items.length < 1){
        return;
      }
      var videoThumbnail = videoData.items[0].snippet.thumbnails.high.url;
      thumbnails.push(videoThumbnail);
    }))
    this.setState({thumbnails: thumbnails});
  }

  componentDidMount() {
    this.props.getVideos();
  }

  displayVideos() {
    return this.props.videos.map((video, i) => {
      if(!video.video_url || video.video_url.length < 5){
        return null;
      }
      var video_id = video.video_url.split('v=')[1];
      if(!video_id)
        return null;
      return (
          <Col xl="6">
            <Card className="border-5 shadow p-3 ml-4 mr-4 mb-5 bg-white rounded">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Video
                    </h6>
                    <h2 className="mb-0">{video.video_title}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="pl-3 pr-3">
                  <Col xl="12">
                    <img style={{width: '100%'}} src={this.state.thumbnails[i]}/>
                    {this.state.thumbnails[i] && <img style={{width: '100%'}} src="https://dummyimage.com/600x400/000/000000.png" className="overlay card-img-overlay"/>}
                    {this.state.thumbnails[i] &&  <div className="play"></div>}
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>
      )
    })
  }

  render() {
    return (
      <>
        <MainHeader />
        <h1>VIDEO GALLERY</h1>
        <Container className="mt-2" fluid>
            <div>
              <Col>
                <Row className="mr-6 ml-6">
                  {this.displayVideos()}
                </Row>
              </Col>
            </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos.videos
  }
}

export default connect(mapStateToProps, {getVideos})(VideoList);
