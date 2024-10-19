const AlertBubble = ({ notificationCount }) => {
  return (
    <div className="alert-bubble bg-gd position-fixed">
      <i className="bi bi-bell-fill"></i>
      {notificationCount > 0 && (
        <span className="badge rounded-pill bg-danger notification-count">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default AlertBubble;
