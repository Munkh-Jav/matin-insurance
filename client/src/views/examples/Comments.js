
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import ContentCard from "../../components/Cards/ContentCard";
import Comment from "../../components/Groups/Comment";
import {getComments} from "../../actions/commentActions";
import {updateComment} from "../../actions/commentActions";
import {connect} from 'react-redux';
import { parseConfigFileTextToJson } from "typescript";

class Comments extends React.Component {

  componentDidMount() {
    this.props.getComments();
  }

  approveComment(commentToApprove) { 
    

  }

  denyComment() {

  }


  getComments = () => {
    return this.props.comments.map(comment => {
      return <Comment
                key={comment.id} 
                comment={comment} 
                toggleComments={true} 
                hide_top_button={true} 
                approve_callback={this.approveComment}
                deny_callback={this.denyComment}
                />
    })
  }

  

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <ContentCard
                    title="Comments"
                    top_button="See all"
                    top_callback={this.showSomething}
                    toggleComments={true}
                >
                  {this.getComments()}
            </ContentCard>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, {getComments})(Comments);


