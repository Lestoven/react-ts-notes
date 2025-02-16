import { Box, Checkbox } from "@mui/material";
import { Checklist } from "../types/list";

const ReadonlyChecklistPanel = ({ checklistElements, onChecklistChange }:
    { checklistElements: Checklist, onChecklistChange: (newContent: Checklist) => void }) => {

    return (
        <Box sx={{ marginTop: 1 }}>
            {checklistElements.map(listItem => (
                <Box key={listItem.id} sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                    <Checkbox checked={listItem.isChecked} onChange={(e) => {
                        onChecklistChange(checklistElements.map(
                            element => element.id === listItem.id ? { ...listItem, isChecked: e.target.checked } : element)
                        );
                    }} />
                    <span>{listItem.content}</span>
                </Box>
            ))}
        </Box>
    );
};

export default ReadonlyChecklistPanel;