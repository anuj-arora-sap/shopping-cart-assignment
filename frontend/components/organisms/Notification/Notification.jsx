import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification as notificationUtil } from 'antd';
import { closeNotification } from '../../../redux/actions/notification';
// import { getNotificationMessage } from '../../constants';
import './notification.scss';

const getNotificationMessage = () => {};

const iconNameMap = {
  error: 'error-info',
  success: 'success-info',
};

function handleClose() {
  // remove from store to keep messages consistent
  this.closeNotification(this.messageKey);
}

function getDescription(restMessage, messageInfo) {
  const { message ="Something went wrong" } = messageInfo?.message;
  return message ;
}

function Notification({
  duration, messages = {}, components, isReset, ...restProps
}) {
  useEffect(() => {
    if (isReset) {
      notificationUtil.destroy();
    }
  }, [isReset]);

  useEffect(() => {
    Object.keys(messages).forEach((messageKey) => {
      const messageInfo = messages[messageKey];
      const { ...restMessage } = getNotificationMessage(messageKey, messageInfo);
      let type =  messageInfo?.message?.success ? 'success' : 'error';
      const description = getDescription(restMessage, messageInfo);
      const _restMessage = { ...restMessage, description };
      const icon = (<components.Icon name={iconNameMap[type]} />);
      // const closeIcon = (<components.Icon name="cross" />);
      const className = `Shopping-Notification ${type}`;
      notificationUtil[type]({
        ..._restMessage,
        duration,
        icon,
        // closeIcon,
        className,
        key: messageKey,
        onClose: handleClose.bind({ messageKey, closeNotification: restProps.closeNotification }),
      });
    });
  }, [messages]);
  return null;
}

Notification.defaultProps = {
  duration: 5, // open until close
};

Notification.propTypes = {
  duration: PropTypes.number,
  messages: PropTypes.object.isRequired,
  isReset: PropTypes.bool.isRequired,
  closeNotification: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
};

function mapStateToProps({ notification }) {
  return { messages: notification.messages, isReset: notification.isReset };
}

export default connect(mapStateToProps, { closeNotification })(Notification);
