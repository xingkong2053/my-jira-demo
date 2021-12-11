export interface Dashboard{
  id: number;
  name: string;
  projectId: number;
}

export interface Task{
  id: number;
  name: string;
  // 经办人
  processorId:number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface TaskType{
  id: number;
  name: string;
}

export interface SortProps {
  // 要重新排序的 Item
  fromId?: number;
  // 目标 Item
  referenceId?: number;
  type: "before" | "after";
  fromDashboardId?: number;
  toDashboardId?: number;
}