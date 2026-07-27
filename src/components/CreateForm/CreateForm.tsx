import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import styles from './CreateForm.module.scss';
import { useAppDispatch } from '../../store';
import { createHabit } from '../../features/tasks/tasks-slice';

const CreateForm = () => {
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
    
    return (
        <div className={styles.wrapper}>
            <input 
                id='new_habbit' 
                type="text" 
                placeholder="Новая цель" 
                className={styles.form__input} 
                value={inputValue} 
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            
            <select name="goal" id="goal" className={styles.form__select} value={selectValue} onChange={(e) => handleSelect(e)}>
                <option value={7}>7</option>
                <option value={14}>14</option>
                <option value={21}>21</option>
                <option value={28}>28</option>
            </select>
            <button className={styles.form__btn} onClick={() => handleCreate()}>+</button>
        </div>
    )
}

export default CreateForm;