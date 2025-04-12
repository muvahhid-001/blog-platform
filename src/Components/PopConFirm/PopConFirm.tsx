import React from "react";
import type { PopconfirmProps } from "antd";
import { Button, Popconfirm } from "antd";
import { deleteArticle } from "../Api/Api";

interface Props {
  slug: string;
  navigate: (path: string) => void;
}

const PopConFirm: React.FC<Props> = ({ slug, navigate }) => {
  const confirm: PopconfirmProps["onConfirm"] = () => {
    deleteArticle(slug, navigate);
  };

  const cancel: PopconfirmProps["onCancel"] = () => null;

  return (
    <Popconfirm
      title="Удалить статью?"
      description="Вы уверены, что хотите удалить эту статью?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Да"
      cancelText="Нет"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

export default PopConFirm;
