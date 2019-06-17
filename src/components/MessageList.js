import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom= node.scrollTop +node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if(this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render() {     
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        
        const newMessage = this.props.messageDetails.map(eachMessage => 
        <Message key={eachMessage.id} messagetxt={eachMessage.parts[0].payload.content} sender={eachMessage.senderId} />
            );
        return (
            <div className="message-list">
                {newMessage}
            </div>
        )
    }
}

export default MessageList