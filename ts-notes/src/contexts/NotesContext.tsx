import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { getNotes } from "../serverRequests/getNotes";
import { NoteData } from "../interfaces/NoteData";
import { NewNoteData } from "../interfaces/NewNoteData";

import { saveNote } from "../serverRequests/saveNote";
import { toast, Slide } from 'react-toastify';
import { getCurrentUserID } from "../serverRequests/getCurrentUserID";

type NotesAction =
    | { type: "set"; payload: NoteData[] } 
    | { type: "create"; payload: NoteData }
    | { type: "update"; payload: NoteData }
    | { type: "delete"; payload: { id: number } };

const NotesContext = createContext<{notes: NoteData[], isLoading: boolean } | undefined>(undefined);
const NotesDispatchContext = createContext<React.Dispatch<NotesAction> | undefined>(undefined);

const NotesProvider = ({children}: {children: ReactNode}) => {
    const initialNotes: NoteData[] = [];

    const [notes, dispatch] = useReducer(notesReducer, initialNotes);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNotes() {
            const notesData: NoteData[] = await getNotes();
            dispatch({type: "set", payload: notesData});
            setIsLoading(false);
        };

        fetchNotes();
    }, []); // we have to send a request to the server to get the notes


    return (
        <NotesContext.Provider value={{notes: notes, isLoading: isLoading}}>
            <NotesDispatchContext.Provider value={dispatch}>
                {children}
            </NotesDispatchContext.Provider>
        </NotesContext.Provider>
    );
};

export function useNotes() {
    return useContext(NotesContext);
};

export function useNotesDispatch() {
    return useContext(NotesDispatchContext);
};

function notesReducer(notes: NoteData[], action: NotesAction): NoteData[] {
    switch(action.type) {
        case 'set': {
            return action.payload;
        }
        case 'create': {
            return [action.payload, ...notes];
        }
        case 'update': {
            return notes.map(note => note.id === action.payload.id ? action.payload : note);
        }
        case 'delete': {
            return notes.filter(note => note.id !== action.payload.id);
        } 
        default : {
            const _exhaustiveCheck: never = action
            return _exhaustiveCheck;
        }
    };
};

export async function handleNoteSave(newNoteData: NewNoteData, dispatch: React.Dispatch<NotesAction>) {
    const noteData = {
        ...newNoteData,
        id: -Date.now(), // generate temporary id
        dateCreated: new Date(),
        dateUpdated: null,
        owner: getCurrentUserID()
    };

    dispatch({ type: "create", payload: noteData }); // display the new note on the UI (Notes state will be updated causing a re-render)

    try {
        const resultNode = await saveNote(noteData);

        // display success toast message
        toast.success("Note saved successfully!", {
            position: "bottom-center",
            type: "success",
            isLoading: false,
            autoClose: 2500,
            transition: Slide,
            closeOnClick: true,
        });
        dispatch({ type: 'update', payload: resultNode }); // Update the new note to have the ID generated by the server.
    } catch (error) {
        // display error toast message
        toast.error("Failed to save note!", {
            position: "bottom-center",
            type: "error",
            isLoading: false,
            autoClose: 2500,
            transition: Slide,
            closeOnClick: true,
        });
        dispatch({ type: 'delete', payload: { id: noteData.id } }); // Remove the "new note" from the UI
    }
}

export default NotesProvider;