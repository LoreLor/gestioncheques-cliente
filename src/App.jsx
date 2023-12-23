import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Home from './components/home/Home'
import { useEffect } from 'react';
import { allChecks } from './redux/actions/cheks';


function App() {
    const dispatch = useDispatch();
    const checks = useSelector(state => state.checks.checks)
    

    useEffect(() => {
        dispatch(allChecks())
    }, []);

    console.log('checks :>> ', checks);
    return (
        <>
            <Home />
        </>
    )
}

export default App
