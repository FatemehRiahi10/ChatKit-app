import React from 'react'

class SendMessageForm extends React.Component {
    state = {
        message: ''
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            message: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    placeholder="SendMessageForm"
                    type="text"
                    onChange={this.handleChange} />
                <button id="create-room-btn" type="submit" onClick={this.handleSubmit}>Send</button>
            </form>
        )
    }
}

export default SendMessageForm