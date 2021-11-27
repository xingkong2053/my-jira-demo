import React from 'react'
import { Select } from "antd";
import { useUser } from "../hooks/apis/user";

interface UserSelectProps extends Omit<React.ComponentProps<typeof Select>,'onChange'> {
  onChange: (value: string) => void;
}

export const UserSelect: React.FC<UserSelectProps> = (props) => {
  const { userList: users } = useUser();
  const {onChange,...restProps} = props

  return <Select onChange={value => onChange(String(value))} {...restProps}/*属性透传：将UserSelect的属性和antd.Select的属性保持一致*/>
    <Select.Option value="">负责人</Select.Option>
    {users.map(u=> {
      return <Select.Option value={u.id + ''}/*这里的u.id类型为number需要强制转换为字符串*/ key={u.id}>{u.name}</Select.Option>
    })}
  </Select>
}