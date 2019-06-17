import React from 'react'
// import Chatkit from '@pusher/chatkit'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import OnlineUsers from './components/OnlineUsers'
import TypingIndicator from './components/TypingIndicator'
import { tokenUrl, instanceLocator } from "./config"

class App extends React.Component {
    state = {
        messages: [],
        roomId: '',
        users: [],
        joinableRooms: [],
        joinedRooms: [],
        usersWhoAreTyping: [],
    }

    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.roomId })
            .catch(error => console.error('error', error))
    }

    sendMessages = (text) => {
        this.currentUser.sendSimpleMessage({
            text,
            roomId: this.state.roomId
        })
            .then(messageId => {
                console.log(`Added message to ${this.state.roomId.name}`)
            })
            .catch(err => {
                console.log(`Error adding message to ${this.state.roomId.name}: ${err}`)
            })
    }

    getRooms = () => {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('error on joinableRooms: ', err))
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            // userId: 'AtaRazavi',
            userId: 'New',
            tokenProvider: new TokenProvider({
                url: tokenUrl
            })
        })


        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser
                this.getRooms()
                console.log('currentUser', currentUser)
                // currentUser.subscribeToRoomMultipart({
                //     roomId: "19396464",
                //     messageLimit: 20,
                //     hooks: {
                //         onMessage: message => {
                //             console.log('message.text:', message);
                //             this.setState({
                //                 messages: [...this.state.messages, message]
                //             })
                //         }
                //     }
                // })

            })
    }

    subscribeToRoomMultipart = (roomId) => {
        console.log(roomId);

        this.setState({
            messages: []
        })
        this.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onUserCameOnline: this.handleInUser,

                onUserStartedTyping: user => {
                    console.log(`User ${user.name} started typing`)

                    this.setState({
                        usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                    })
                },
                onUserStoppedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                            username => username !== user.name
                        ),
                    })
                },
            }
        })
            .then(room => {
                this.setState({
                    roomId: room.id
                })
                this.getRooms()

                let new_users = [];
                room.users.forEach(user => {
                    if (user.id !== this.currentUser.id) {
                        let is_online =
                            user.presence.state === "online" ? true : false;
                        new_users.push({
                            id: user.id,
                            name: user.name,
                            is_online
                        });
                    }
                });

                this.setState({
                    userHasLoggedIn: true,
                    users: new_users
                });
            })
            .catch(err => console.log('error on subscribing to room: ', err))
    }

    handleInUser = user => {
        let currentUsers = [...this.state.users];
        let userIndex = currentUsers.findIndex(item => item.id === user.id);

        if (userIndex !== -1) {
            currentUsers[userIndex]["is_online"] = true;
        }

        if (user.id !== this.currentUser.id && userIndex === -1) {
            currentUsers.push({
                id: user.id,
                name: user.name,
                is_online: true
            });
        }

        this.setState({
            users: currentUsers
        });
    };    

    createRoom = (name) => {
        this.currentUser.createRoom({
            name: name
        })
            .then(room => this.subscribeToRoomMultipart(room.id))
            .catch(err => console.log('error with createRoom: ', err))
    }


    render() {
        return (
            <div className="app" >
                <RoomList subscribeToRoom={this.subscribeToRoomMultipart}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} roomId={this.state.roomId} />
                <OnlineUsers
                    users={this.state.users}
                    roomId={this.state.roomId}
                    messageDetails={this.state.messages}
                />
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                <MessageList
                    roomId={this.state.roomId}
                    messageDetails={this.state.messages}
                />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessages}
                    onChange={this.sendTypingEvent} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
        );
    }
}

export default App