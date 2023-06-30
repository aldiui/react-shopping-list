import styles from '../css/SearchInput.module.css';

const SearchInput = ({ onSubmit, onChange, value }) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input onChange={onChange} value={value} type="text" className={styles.input} placeholder="List" />
            <button type="submit" className={styles.addButton}>
                add
            </button>
        </form>
    );
};

export default SearchInput;
