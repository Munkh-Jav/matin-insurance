import React from 'react';
import {Button, Col, Row} from "reactstrap";
import countdown from "../../utils/countdown";

class Comment extends React.Component{

    getDate (date){
        let value = countdown(date, true);
        if(value.substring(value.length - 6, value.length) === "{none}") {
            return value.substring(0, value.length - 6);
        }
        return countdown(date, true) + " ago";
    }


    render() {
        const {user_avatar, comment_text, user_name, date} = this.props.comment;

        return (
            <Row className="mb-4">
                <Col className="comment">
                    <Row className="align-items-center">
                        <div className="col" style={{width: "36px"}}>
                        <span className="avatar avatar-sm rounded-circle">
                            <img src={process.env.PUBLIC_URL + `/profile-pics/${user_avatar}`}/>
                        </span>

                            <h3 className="mb-0 name">{user_name}</h3>
                            <h5 className="mb-0 video">In Video 5</h5>

                    </div>
                            <div className="text-right date">
                                {this.getDate(date)}
                            </div>
                    </Row>
                    <Row>
                        <div className="col comment-content">
                        {comment_text}
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Comment;