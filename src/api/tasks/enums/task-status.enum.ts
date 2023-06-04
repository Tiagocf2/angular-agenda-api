export enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  DONE = 'DONE',
  LATE = 'LATE',
}

export const TaskStatusMap = {
  [TaskStatus.INCOMPLETE]: 'Incompleto',
  [TaskStatus.DONE]: 'Feito',
  [TaskStatus.LATE]: 'Atrasado',
};
