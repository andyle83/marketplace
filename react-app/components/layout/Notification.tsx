import * as React from "react";
import {useSelector, RootStateOrAny } from "react-redux";

export default function Notification() {
  const [isLoading, notificationMessage] = useSelector(
    (state:RootStateOrAny) => [state.app.isLoading, state.app.notificationMessage]
  );

  return isLoading && (notificationMessage != "") && (
    <div className="alert alert-warning sticky-top mt-2" role="alert">
      <span id="notification">{notificationMessage}</span>
    </div>
  );
}
