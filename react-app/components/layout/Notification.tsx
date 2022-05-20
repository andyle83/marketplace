import * as React from "react";
import {useSelector, RootStateOrAny } from "react-redux";

const Notification = ():JSX.Element => {
  const [isLoading, message] = useSelector(
    (state:RootStateOrAny) => [state.app.notification.isLoading, state.app.notification.message]
  );

  return isLoading && (message != "") && (
    <div className="alert alert-warning sticky-top mt-2" role="alert">
      <span id="notification">{message}</span>
    </div>
  );
}

export default Notification;
