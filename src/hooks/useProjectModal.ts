import { useClearQueryParam, useUrlQueryParam } from "./useUrlQueryParam";
import { useProjectDetail } from "./apis/project";

// 使用urlParam来管理ProjectModal状态
export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  const [{editingProjectId},setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const clearQueryParam = useClearQueryParam();
  const {data: projectDetail, isLoading} = useProjectDetail(Number(editingProjectId))

  // 打开创建项目
  const open = () => setProjectCreate({projectCreate: true})
  // 打开编辑项目
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  const close = () => {
    clearQueryParam(['projectCreate','editingProjectId'])
  }

  return {
    modalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    projectDetail,
    isLoading
  }
}
