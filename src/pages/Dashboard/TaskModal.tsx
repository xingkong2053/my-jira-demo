import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTaskModal } from "../../hooks/useTaskModal";
import { useDeleteTask, useEditTask } from "../../hooks/apis/task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/UserSelect";
import TaskTypeSelect from "../../components/TaskTypeSelect";

interface OwnProps {}

type Props = OwnProps;

const TaskModal: FunctionComponent<Props> = () => {
  const [form]=useForm()
  const { close, editTask, visible } = useTaskModal();
  const {mutateAsync,isLoading} = useEditTask()
  const {mutateAsync: deleteTask} = useDeleteTask()
  const onCancel = () => {
    close()
    form.resetFields()
  }
  const onOk = async () => {
    await mutateAsync({...editTask,...form.getFieldsValue()})
    close()
  }
  useEffect(() => {
    form.setFieldsValue(editTask)
  }, [form,editTask]);

  function startDelete() {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk(){
        close()
        return deleteTask({id: Number(editTask.id)})
      }
    })
  }
  return <Modal forceRender okText={'确认'}
          cancelText={'取消'}
          confirmLoading={isLoading}
          title={'编辑任务'}
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}>
        <Form labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={editTask} form={form}>
          <Form.Item label={'任务名'} name={'name'} rules={[{required: true,message: '请输入任务名'}]}>
            <Input/>
          </Form.Item>
          <Form.Item label={'经办人'} name={'processorId'}>
            <UserSelect defaultValue={'经办人'}/>
          </Form.Item>
          <Form.Item label={'类型'} name={'typeId'}>
            <TaskTypeSelect defaultValue={'类型'}/>
          </Form.Item>
        </Form>
        <div style={{textAlign: 'right'}}>
          <Button size={"small"} type={"text"} onClick={startDelete}>删除</Button>
        </div>
      </Modal>;
};

export default TaskModal;
