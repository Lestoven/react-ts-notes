import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { getNotes } from "../serverRequests/getNotes";
import { NoteData } from "../interfaces/NoteData";

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
            return [...notes, action.payload];
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

export default NotesProvider;