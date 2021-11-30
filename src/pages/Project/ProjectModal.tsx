import React, { FunctionComponent } from 'react';
import { Button, Modal } from "antd";

interface OwnProps {
  open: boolean,
  onClose: ()=>void
}

type Props = OwnProps;

const ProjectModal: FunctionComponent<Props> = (props) => {
  let { open, onClose } = props;
  return <Modal visible={open} onOk={onClose} onCancel={onClose}>
    <h1>ProjectModal</h1>
  </Modal>;
};

export default ProjectModal;
