import React, { FunctionComponent } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectModalOpen } from "../ProjectList/ProjectList.slice";

interface OwnProps {
  open: boolean,
  onClose: ()=>void
}

type Props = OwnProps;

const ProjectModal: FunctionComponent<Props> = () => {
  // 获取根状态树状态
  const modalOpen = useSelector(selectModalOpen)
  const dispatch = useDispatch()
  const onClose = () => dispatch(projectListActions.closeModal())
  return <Modal visible={modalOpen} onOk={onClose} onCancel={onClose}>
    <h1>ProjectModal</h1>
  </Modal>;
};

export default ProjectModal;
