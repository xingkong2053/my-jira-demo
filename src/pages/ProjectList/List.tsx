import React, { FunctionComponent } from 'react';
import { User } from "./SearchPanel";
import { Project } from "./Index";

interface OwnProps {
  users: User[],
  list: Project[]
}

type Props = OwnProps;

const List: FunctionComponent<Props> = (props) => {
  let { list, users } = props;
  return (<table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
    {
      list.map(project=><tr key={project.id}>
        <td>{project.name}</td>
        <td>{users.find(user=>user.id === project.personId)?.name||'未知'}</td>
      </tr>)
    }
    </tbody>
  </table>);
};

export default List;
