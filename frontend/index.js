import createRenderer from './state/vdom'
import initializeAppState from './state/appState'
import { Map, List } from 'immutable'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('list-root');
  const initialState = new Map({
    isAdding: false,
    cars: new List(),
    currentPage: 0,
    chart: new Map({data: new List(), show: false})
  })
  const { state, actions } = initializeAppState();
  const render = createRenderer(root, initialState, actions);

  state.subscribe(currentState => {
    render(currentState, actions)
  })
})
