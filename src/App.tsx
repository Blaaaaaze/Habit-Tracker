import './App.css';
import './styles/index.scss';
import Header from './components/Header/Header';
import CreateForm from './components/CreateForm/CreateForm';
import { Provider } from 'react-redux';

import HabbitList from './features/tasks/HabbitList/HabbitList';
import { store } from './store';

// const mock: Habbit[] = [
//   {
//     id: '1',
//     title: 'Example1',
//     goal: 21,
//     score: 5,
//     status: 'progress'
//   },
//   {
//     id: '2',
//     title: 'Example2',
//     goal: 14,
//     score: 0,
//     status: 'progress'
//   },
//   {
//     id: '3',
//     title: 'Example3',
//     goal: 14,
//     score: 0,
//     status: 'progress'
//   },
//   {
//     id: '4',
//     title: 'Example4',
//     goal: 14,
//     score: 0,
//     status: 'progress'
//   }
// ]

function App() {
  // const [habbits, setHabbits] = useState<Habbit[]>([]);
  
  // const createHabbit = (title: string, goal: number) => {
  //   setHabbits([
  //     ...habbits,
  //     {
  //       id: new Date().toString(),
  //       title: title,
  //       goal: goal,
  //       score: 0,
  //       status: 'progress'
  //     }
  //   ])
  // }

  // const addProgress = (id: string, newScore: number) => {
  //   setHabbits(prevHabbits => prevHabbits.map(habbit => {
  //     if (habbit.id !== id) return habbit;
  //     return {
  //       ...habbit,
  //       score: newScore
  //     }
  //   }));
  // }

  // const changeStatus = (id: string, newStatus: HabbitStatus) => {
  //   setHabbits(habbits.map(habbit => {
  //     if (habbit.id !== id) return habbit;
  //     return {
  //       ...habbit,
  //       status: newStatus,
  //     }
  //   }))
  // }

  // const deleteHabbit = (id: string) => {
  //   setHabbits(habbits.filter(habbit => habbit.id !== id));
  // }

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
