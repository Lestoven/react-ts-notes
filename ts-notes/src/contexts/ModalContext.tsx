import { useReducer, createContext, useContext, ReactNode } from "react";
import BasicModal from "../components/BasicModal";
import { ModalData } from "../types/modal";

type ModalAction =
    | { type: "open", title: string, content: ReactNode }
    | { type: "close" };

const ModalContext = createContext<ModalData | undefined>(undefined);
const ModalDispatchContext = createContext<React.Dispatch<ModalAction> | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalData, dispatch] = useReducer(modalReducer, { isOpen: false, title: "", content: null });

    return (
        <ModalContext.Provider value={modalData}>
            <ModalDispatchContext.Provider value={dispatch}>
                {children}
                <BasicModal />
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    );
};

export function useModal() {
    return useContext(ModalContext);
};

export function useModalDispatch() {
    return useContext(ModalDispatchContext);
}

function modalReducer(modalData: ModalData, action: ModalAction): ModalData {
    switch (action.type) {
        case "open": {
            return {isOpen: true, title: action.title, content: action.content};
        }
        case "close": {
            return {...modalData, isOpen: false};
        }
        default: {
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
        }
    }
}

export default ModalProvider;