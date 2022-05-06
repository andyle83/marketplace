import * as React from "react";
import {useSelector, RootStateOrAny } from "react-redux";

interface NotificationProps {
  message: string,
}

export default function Notification({ message }: NotificationProps) {
  const isLoading = useSelector((state:RootStateOrAny) => state.app.isLoading );

  return isLoading && (
    <div className="alert alert-warning sticky-top mt-2" role="alert">
      <span id="notification">{message}</span>
    </div>
  );
}
