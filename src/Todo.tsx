import { TodoType } from "./types/todo";

export const Todo = (props: Omit<TodoType, "id">) => {
  const { userId, title, completed = false } = props;
  const completedMark = completed ? "[完]" : "[未]";

  return <p>{`${completedMark} ${title} (ユーザーid : ${userId})`}</p>;
};
