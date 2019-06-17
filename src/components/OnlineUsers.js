import React from 'react'
import Avatar from 'react-avatar';


class OnlineUsers extends React.Component {
    render() {
        console.log("props", this.props.users);
        const onlineUsers = this.props.users.map(eachUser =>
            !eachUser.is_online &&
            <div>                
                <div className="message-username">
                    <Avatar size={30} name={eachUser.name} />
                    {eachUser.name}
                </div>
            </div>
        )        

        return (
            <div className="online-User">
                <h3>OnlineUsers:</h3>
                {onlineUsers}                
            </div>
        )
    }
}

export default OnlineUsers
