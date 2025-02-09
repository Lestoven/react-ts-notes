import { Checklist } from "../types/Checklist"

export interface NewNoteData {
    title: string,
    content: string | Checklist,
    shared_with: number[], // userids
    color: string,
    isPinned: boolean
}