import React from 'react'

class RoomList extends React.Component {
    render () {
        const sortedRoom = this.props.rooms.sort((a,b)=> a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 )
               
        return (
            <div className="rooms-list">
                <ul className="chat-rooms">
                <h3>Rooms:</h3>                    
                    {sortedRoom.map(room => {
                        return (
                            <li key={room.id} className="room">
                                {/* <a href='googlw.com'> #{room.name}</a> */}
                                <div style={{color:(this.props.roomId === room.id) ? 'red' : 'white', cursor:'pointer'}}
                                onClick={() => this.props.subscribeToRoom(room.id)} >
                                     {room.name}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList

// className="btn"

// style={{color:(this.props.roomId === room.id) ? 'red' : 'white', cursor:'pointer'}}