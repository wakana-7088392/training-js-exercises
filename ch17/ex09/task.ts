// typeで型定義
type User = { id: number, name: string };
type Task = { title: string, completed: boolean, user: User };
type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する
// objはany
function isUserObject(obj: any) {
    return (
        typeof obj === "object" &&
        typeof obj["id"] === "number" &&
        typeof obj["name"] === "string"
    );
}

export class TaskManager<T extends Task> {
    // privateを追加し、_tasksをTask型の配列に指定する
    private _tasks: T[] = [];

    // タスクを追加する
    add(task: T): void {
        this._tasks.push(task);
    }

    // タスクを完了にする
    // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
    // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
    // targetの型をUser | stringと定義
    completeTask(target: User | string): void {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)
                .forEach((t) => (t.completed = true));
        } else {
            this._tasks
                .filter((t) => t.title === target)
                .forEach((t) => (t.completed = true));
        }
    }

    // 引数の関数にマッチするタスクを返す
    // 引数を省略した場合はすべてのタスクを返す
    getTasks(predicate?: (task: T) => boolean): T[] {
        if (predicate === undefined) {
            return this._tasks;
        } else {
            return this._tasks.filter(predicate);
        }
    }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
    return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
// 任意の型Tを受け取る関数fを引数に取り、その型Tを引数に取る新しい関数を返す
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
    return (arg: T) => !f(arg);
}
