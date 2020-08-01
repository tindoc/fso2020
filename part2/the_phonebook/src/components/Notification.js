import React from 'react'

const Notification = ({notification}) => {
    // console.log('[comp Notification]', notification)
    const { messageType, message } = notification
    // console.log('[comp Notifaction]', messageType, message)

    if (messageType === null) {
        return null
    }

    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

export default Notification