import { BehaviorSubject } from "rxjs";

export interface ITodoItem {
    itemID: number;
    itemName: string;
    signCompleted: boolean;
    itemEdit: boolean;
}


