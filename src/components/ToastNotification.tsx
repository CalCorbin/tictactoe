import { useEffect, useState } from 'react';
import './ToastNotification.css';

interface ToastNotificationProps {
  message: string;
  deleteTime: number;
}

const ToastNotification = ({ message, deleteTime }: ToastNotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, deleteTime);
  }, [deleteTime]);

  return (
    <div className={`toast-container ${visible && 'visible'}`}>{message}</div>
  );
};

export default ToastNotification;
