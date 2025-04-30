
import styles from './StyledCheckbox.module.css';

const StyledCheckbox = ({ onChangeHandler, isChecked, id = null }) => {
    return (
        <div className={styles.checkboxWrapper}>
            <input
                id={id}
                type='checkbox'
                checked={isChecked}
                className={styles.inputStyle}
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default StyledCheckbox;