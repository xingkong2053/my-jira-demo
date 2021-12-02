import React, { FunctionComponent, useEffect, useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { useProjectModal } from "../../hooks/useProjectModal";
import { UserSelect } from "../../components/UserSelect";
import { useAddProject, useEditProject } from "../../hooks/apis/project";
import { useForm } from "antd/es/form/Form";

interface OwnProps {}

type Props = OwnProps;

const ProjectModal: FunctionComponent<Props> = () => {
  const { close, modalOpen, projectDetail, isLoading } = useProjectModal();
  const {mutateAsync: mutateEdit,isLoading: loadingEdit} = useEditProject()
  const {mutateAsync: mutateAdd,isLoading: loadingAdd} = useAddProject()
  const [mutateLoading,setMutateLoading] = useState(false)
  // 踩坑：Don’t call Hooks inside loops, conditions, or nested functions.
  // https://reactjs.org/docs/hooks-rules.html
  // const useMutateProject = projectDetail ? useEditProject: useAddProject
  const [form] = useForm()
  const onFinish = (values: any)=>{
    if(projectDetail){
      mutateEdit({...projectDetail, ...values}).then(() => {
        form.resetFields()
        close()
      })
    } else {
      mutateAdd({...values}).then(() => {
        form.resetFields()
        close()
      })
    }
  }

  useEffect(() => {
    if(projectDetail){
      form.setFieldsValue(projectDetail)
    }
  }, [form,projectDetail]);

  const onCancel = () => {
    form.resetFields()
    close()
  }

  const onOk = () => {
    form.submit()
  }

  useEffect(() => {
    setMutateLoading((projectDetail && loadingEdit) || (!projectDetail && loadingAdd))
  }, [projectDetail,loadingAdd,loadingEdit]);

  return <Modal visible={modalOpen} onCancel={onCancel} onOk={onOk} forceRender okButtonProps={{loading:mutateLoading}} okText={'提交'} cancelText={'取消'}>
    {
      isLoading ? <Spin size={"large"}/> : <>
        <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 18}} onFinish={onFinish} initialValues={{personId: ""}}>
          <Form.Item wrapperCol={{offset: 6,span: 18}}>
            <h3>{projectDetail? '编辑项目':'创建项目'}</h3>
          </Form.Item>
          <Form.Item label={'名称'} name={'name'} rules={[{required: true,message: '请输入项目名'}]}>
            <Input placeholder={'请输入项目名'}/>
          </Form.Item>
          <Form.Item label={'部门'} name={'organization'} rules={[{required: true,message: '请输入部门名'}]}>
            <Input placeholder={'请输入部门名'}/>
          </Form.Item>
          <Form.Item label={'负责人'} name={'personId'} wrapperCol={{span: 6}}>
            <UserSelect/>
          </Form.Item>
        </Form>
      </>
    }
  </Modal>;
};

export default ProjectModal;
