import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../css/Todos.module.css';
import plusIcon from '../assets/plus-icon.svg';
import minusIcon from '../assets/minus-icon.svg';

const Todos = ({ todos, onAddition, onSubtraction, onEdit }) => {
    const [editableIndex, setEditableIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleEdit = (index, title) => {
        setEditableIndex(index);
        setEditValue(title);
    };

    const handleSave = (index) => {
        if (!editValue.trim()) {
            alert('List cannot be blank');
            return;
        }

        const isDuplicate = todos.some((todo, i) => i !== index && todo.title === editValue.trim());
        if (isDuplicate) {
            alert('List already exists');
            return;
        }

        onEdit(index, editValue.trim());
        setEditableIndex(null);
        setEditValue('');
    };

    return (
        <div className={styles.todos}>
            {todos.map((todo, index, arr) => {
                const isEditable = index === editableIndex;

                return (
                    <div key={index} className={`${styles.todo} ${arr.length === index + 1 ? '' : styles.todoDivider}`}>
                        {isEditable ? (
                            <input type="text" className={styles.input} value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => handleSave(index)} autoFocus />
                        ) : (
                            <div onClick={() => handleEdit(index, todo.title)}>{todo.title}</div>
                        )}
                        <div className={styles.todoIconWrapper}>
                            <button onClick={() => onAddition(index)} className={styles.todoActionButton}>
                                <img src={plusIcon} alt="plus icon" />
                            </button>
                            <div className={styles.todoCount}>{todo.count}</div>
                            <button className={styles.todoActionButton} onClick={() => onSubtraction(index)}>
                                <img src={minusIcon} alt="minus icon" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

Todos.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            count: PropTypes.number,
        })
    ),
    onSubtraction: PropTypes.func,
    onAddition: PropTypes.func,
    onEdit: PropTypes.func,
};

export default Todos;
