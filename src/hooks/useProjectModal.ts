import { useUrlQueryParam } from "./userUrlQueryParam";

// 使用urlParam来管理ProjectModal状态
export const useProjectModal = () => {
  const [ {projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  return {
    modalOpen: projectCreate === 'true',
    open: () => setProjectCreate({projectCreate: true}),
    close: () => setProjectCreate({projectCreate: undefined})
  }
}
