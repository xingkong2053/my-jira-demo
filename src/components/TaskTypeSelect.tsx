import React from "react";
import { Select } from "antd";
import { useTaskTypes } from "../hooks/apis/taskType";

interface TaskTypeSelectProps extends Omit<React.ComponentProps<typeof Select>,'onChange'> {
  onChange?: (value: number) => void;
  defaultOptionName?: string;
}

export const TaskTypeSelect: React.FC<TaskTypeSelectProps> = (props) => {
  const { data: taskTypes } = useTaskTypes();
  const {onChange,...restProps} = props

  return <Select onChange={value => onChange?.(Number(value))} {...restProps}/*属性透传：将UserSelect的属性和antd.Select的属性保持一致*/>
    {taskTypes?.map(taskType=> {
      return <Select.Option value={taskType.id}/*这里的u.id类型为number需要强制转换为字符串*/ key={taskType.id}>{taskType.name}</Select.Option>
    })}
  </Select>
}

export default TaskTypeSelect
