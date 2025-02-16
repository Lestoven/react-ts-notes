import { ReactNode } from "react";

export interface ModalData {
    isOpen: boolean,
    title: string,
    content: ReactNode
};