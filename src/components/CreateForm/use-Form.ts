import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useAppDispatch } from "../../store";
import { createHabit } from "../../features/tasks/tasks-slice";

type useFormReturn = [
    string,
    number,
    (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void,
    () => void,
    (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void,
    (e: KeyboardEvent<HTMLInputElement>) => void
]

const useForm = (): useFormReturn => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState(7);
    const dispatch = useAppDispatch();

    const handleInput = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        setSelectValue(+e.target.value);
    }

    const handleCreate = () => {
        if (inputValue) {
            dispatch(createHabit(inputValue, selectValue));
            setInputValue('');
            setSelectValue(7);
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            handleCreate()
        }
    }

    return [inputValue, selectValue, handleInput, handleCreate, handleSelect, handleKeyDown];
}

export default useForm;