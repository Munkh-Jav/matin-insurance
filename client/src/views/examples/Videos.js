
import React from "react";
import _ from 'lodash';

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
import tableContentFromVideos from "../../utils/tableContentFromVideos";
import {getVideos} from "../../actions/videoActions";
import {connect} from 'react-redux';
import FormModal from "../../components/Modals/FormModal";
import DetailModal from "../../components/Modals/DetailModal";

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
          videos: this.props.videos,
          videoTableContent: [{
            title: "Loading...",
            italic : true,
            donTrim : false,
            contents: []
          }]
        }
      }

  componentDidMount() {
    this.props.getVideos();
    this.getVideoDetails();
  }
  getVideoDetails = async() =>{
    const content = await tableContentFromVideos(this.state.videos, ["title", "views", "likes", "dislikes"]);
    this.setState({videos: this.props.videos, videoTableContent : content})
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevState.videos, this.props.videos)){
      this.getVideoDetails();
    }
  }


  getVideoDetails = async() =>{
    const content = await tableContentFromVideos(this.state.videos, ["title", "views", "likes", "dislikes"]);
    this.setState({videos: this.props.videos, videoTableContent : content})
  }


  videoClick = (e, id) => {
    e.preventDefault();
    const url = this.props.videos[this.props.videos.findIndex(x => x.id === id)].video_url;
    const win = window.open(url, '_blank');
    win.focus();
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({is_modal_open: true});
  }
  
  
  

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ is_modal_open:false})
  }

  

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <TableCard
                    title="Video Activity"
                    top_button="Add Video"
                    top_callback={this.openModal}
                    hide_top_button = {false}
                    add_new_vid = {true}
                    cols={["", "Title", "Views", "Likes", "Dislikes"]}
                    with_images={true}
                    rows={this.state.videoTableContent}
                    rowClick={this.videoClick}
                    dark={localStorage.getItem("dark") === 'true'}
                />
                 <DetailModal
                  isOpen={this.state.is_modal_open}
                  onRequestClose={this.closeModal}
              >
                  <FormModal
                      dark={localStorage.getItem("dark") === 'true'}
                      closeModal={this.closeModal}
                  />
              </DetailModal>
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col">
              {/* TODO: PUT CALENDAR SCHEDULE IN HERE */ }
            </div>
          </Row>
         
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

export default connect(mapStateToProps, {getVideos})(Videos);


