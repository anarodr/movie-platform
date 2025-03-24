import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Movies from './movies/containers/Movies'
import Header from './shared/components/Header'
import CreateMovie from './movies/containers/CreateMovie'
import { Provider } from 'react-redux'
import { store } from './store'
import EditMovie from './movies/containers/EditMovie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './home/components/Home'

function App() {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <div className='m-4'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/movies' element={<Movies />} />
                            <Route path='/movies/new' element={<CreateMovie />} />
                            <Route path='/movies/:id/edit' element={<EditMovie />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App
