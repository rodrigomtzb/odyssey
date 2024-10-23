const AlertBubble = ({ notificationCount }) => {
  return notificationCount > 0 ? (
    <div className="alert-bubble bg-gd position-fixed">
      <i className="bi bi-bell-fill"></i>
      <span className="badge rounded-pill bg-danger notification-count">
        {notificationCount}
      </span>
    </div>
  ) : (
    ""
  );
};

export default AlertBubble;
