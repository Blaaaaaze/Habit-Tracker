import styles from './CreateForm.module.scss';
import useForm from './use-Form';

const CreateForm = () => {
    const [inputValue, selectValue, handleInput, handleCreate, handleSelect, handleKeyDown] = useForm();
    
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