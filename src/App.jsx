import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Container from './components/Container';
import SearchInput from './components/SearchInput';
import Info from './components/Info';
import Todos from './components/Todos';
import Empty from './components/Empty';

function App() {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        } else {
            // Set 3 initial todos
            const initialTodos = [
                { title: 'Susu Murni', count: 1 },
                { title: 'Tahu Sumedang', count: 1 },
                { title: 'Semangka', count: 1 },
            ];
            setTodos(initialTodos);
            localStorage.setItem('todos', JSON.stringify(initialTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            alert('No blank list');
            return;
        }

        const isDuplicate = todos.some((todo) => todo.title === value);
        if (isDuplicate) {
            alert('List already exists');
            setValue('');
            return;
        }

        const addTodos = [
            ...todos,
            {
                title: value,
                count: 1,
            },
        ];
        setTodos(addTodos);
        setValue('');
    };

    const handleAdditionCount = (index) => {
        const newTodos = [...todos];
        newTodos[index].count = newTodos[index].count + 1;
        setTodos(newTodos);
    };

    const handleSubtractionCount = (index) => {
        const newTodos = [...todos];
        if (newTodos[index].count > 0) {
            newTodos[index].count = newTodos[index].count - 1;
        } else {
            newTodos.splice(index, 1);
        }
        setTodos(newTodos);
    };

    const getTotalCounts = () => {
        const totalCounts = todos.reduce((total, num) => {
            return total + num.count;
        }, 0);
        return totalCounts;
    };

    const handleDeleteAll = () => {
        setTodos([]);
        localStorage.removeItem('todos');
    };

    return (
        <>
            <Navbar />
            <Container>
                <SearchInput onSubmit={handleSubmit} onChange={(e) => setValue(e.target.value)} value={value} />
                <Info onDelete={handleDeleteAll} totalList={todos.length} totalCounts={getTotalCounts()} />
                {todos.length > 0 ? (
                    <Todos
                        todos={todos}
                        onSubtraction={(index) => handleSubtractionCount(index)}
                        onAddition={(index) => handleAdditionCount(index)}
                    />
                ) : (
                    <Empty />
                )}
            </Container>
        </>
    );
}

export default App;
