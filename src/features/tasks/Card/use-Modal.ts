import { useState } from "react";
import { deleteHabit } from "../tasks-slice";
import { useAppDispatch } from "../../../store";

type useModalReturn = [
    boolean,
    () => void,
    () => void,
    () => void
]

const useModal = (id: string): useModalReturn => {
    const [isModalOpen, setIsModalsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleDeleteBtn = () => {
        setIsModalsOpen(true);
    }

    const completeDelete = () => {
        dispatch(deleteHabit(id));
        setIsModalsOpen(false);
    }

    const cancelDelete = () => {
        setIsModalsOpen(false);
    }

    return [isModalOpen, handleDeleteBtn, completeDelete, cancelDelete];
}

export default useModal;