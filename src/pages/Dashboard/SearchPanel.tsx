import React, { FunctionComponent } from "react";
import { useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import { useClearQueryParam } from "../../hooks/useUrlQueryParam";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/UserSelect";
import TaskTypeSelect from "../../components/TaskTypeSelect";

interface OwnProps {}

type Props = OwnProps;

const SearchPanel: FunctionComponent<Props> = () => {
  const [searchParams,setSearchParams] = useTaskSearchParams();
  const clearQueryParam = useClearQueryParam();
  const reset = () => {
    clearQueryParam(['name','typeId','processorId','tagId'])
  }

  return <Row marginBottom={4} gap={2}>
    <Input
      style={{width: '20rem'}}
      placeholder={'任务名'}
      value={searchParams.name || ''}
      onChange={e=>{setSearchParams({name: e.target.value})}}/>
    <UserSelect
      defaultValue={'经办人'}
      value={searchParams.processorId}
      onChange={value=>setSearchParams({processorId:value})}
    />
    <TaskTypeSelect
      defaultValue={'类型'}
      value={searchParams.typeId}
      onChange={value => setSearchParams({typeId: value})}
    />
    <Button onClick={reset}>清除筛选器</Button>
  </Row>;
};

export default SearchPanel;
