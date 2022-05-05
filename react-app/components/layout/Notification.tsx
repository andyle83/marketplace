import * as React from "react";

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  return (
    <div className="alert alert-warning sticky-top mt-2" role="alert">
      <span id="notification">{message}</span>
    </div>
  );
}
