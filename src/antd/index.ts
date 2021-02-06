import { message, notification, Modal } from "antd";

const showMessage = (msg: string, type: string = "success") => {
  message[type](msg);
};

const showNotification = (message, type: string = "success") => {
  notification[type]({
    message,
  });
};

const showModal = (content, type: string = "success") => {
  Modal[type]({
    title: "温馨提示",
    content,
    okText: "确认",
    cancelText: "取消",
  });
};

const showConfirm = (content, onOk: Function, onCancel?: Function) => {
  Modal.confirm({
    title: "温馨提示",
    content,
    okText: "确认",
    cancelText: "取消",
    onOk,
    onCancel,
  });
};

const Antd = {
  showMessage,
  showNotification,
  showModal,
  showConfirm,
};

export {
  showMessage,
  showNotification,
  showModal,
  showConfirm,
  Antd as default,
};
