import './styles/index.scss';
import Header from './components/Header/Header';
import CreateForm from './components/CreateForm/CreateForm';
import { Provider } from 'react-redux';

import HabbitList from './features/tasks/HabbitList/HabbitList';
import { store } from './store';

function App() {
  return (
    <>
    <Provider store={store} >
        <Header />
        <CreateForm />
        <HabbitList />
    </Provider>
    </>
  )
}

export default App
