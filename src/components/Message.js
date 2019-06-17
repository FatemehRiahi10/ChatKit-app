import React from 'react'
import Avatar from 'react-avatar';


class Message extends React.Component {
    render() {
        console.log("props", this.props);

        return (
            <div className="message">
                <div className="message-username">
                    <Avatar size={30} name={this.props.sender} />
                    {this.props.sender}:
                    </div>
                <div className="message-text">
                    {this.props.messagetxt}
                </div>
            </div>
        )
    }
}

export default Message
