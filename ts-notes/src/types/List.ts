export interface ListElement {
    id: string,
    content: string
}
export interface ChecklistElement extends ListElement {
    isChecked: boolean
}

export type List = ListElement[];
export type Checklist = ChecklistElement[];