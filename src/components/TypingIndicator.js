
import React from 'react'

class TypingIndicator extends React.Component {
    render() {
        console.log('usersWhoAreTyping', this.props.usersWhoAreTyping)
        // const oneISTyping = () => {
        if (this.props.usersWhoAreTyping.length > 0) {
            return (
                <div >
                    <p>is typing...</p>
                    <div >
                        {`${this.props.usersWhoAreTyping
                            .slice(0, 2)
                            .join(' and ')} is typing`}
                    </div>
                </div>
            )
        }
        // }
        return (
            <div />
        )

    }
}

export default TypingIndicator
