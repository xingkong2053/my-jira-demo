import React, { FunctionComponent } from "react";
import { Modal } from "antd";
import { useProjectModal } from "../../hooks/useProjectModal";

interface OwnProps {}

type Props = OwnProps;

const ProjectModal: FunctionComponent<Props> = (props) => {
  let { close, modalOpen } = useProjectModal();
  return <Modal visible={modalOpen} onOk={close} onCancel={close}>
    <h1>ProjectModal</h1>
  </Modal>;
};

export default ProjectModal;
