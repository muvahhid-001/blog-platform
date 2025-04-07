import React from "react";
import { Alert } from "antd";

const AlertMsg: React.FC = () => (
  <div className="ERROR">
    <Alert
      message="Error"
      description="Please check console, ERROR..."
      type="error"
      showIcon
    />
  </div>
);

export default AlertMsg;
