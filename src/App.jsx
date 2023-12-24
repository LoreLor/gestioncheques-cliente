import Home from './components/home/Home'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { allChecks } from './redux/actions/cheks';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allChecks())
    }, []);

    return (
        <>
            <Home />
        </>
    )
}

export default App
