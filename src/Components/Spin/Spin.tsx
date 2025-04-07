import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./Spin.scss";

const Spiner: React.FC = () => (
  <div className="spiner">
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  </div>
);

export default Spiner;
