import { Checklist } from "../types/list";

/* Utility function to convert a checklist to description */
export const convertChecklistToDescription = (checklist: Checklist) => {
    return (checklist).map(c => c["content"]).join("\n");
};

/* Utility function to convert a description to a Checklist*/
export const convertDescriptionToChecklist = (description: string) => {
    return description.split("\n").map(
        txt => {
            return {
                id: crypto.randomUUID(),
                content: txt,
                isChecked: false
            }
        });
}