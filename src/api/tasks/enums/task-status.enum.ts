export enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  DONE = 'DONE',
  LATE = 'LATE',
  INACTIVE = 'INACTIVE',
}

export const TaskStatusMap = {
  [TaskStatus.INCOMPLETE]: 'Incompleto',
  [TaskStatus.DONE]: 'Feito',
  [TaskStatus.LATE]: 'Atrasado',
  [TaskStatus.INACTIVE]: 'Inativo',
};
