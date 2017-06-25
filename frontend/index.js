import createRenderer from './state/vdom'
import initializeAppState from './state/appState'
import { Map, List } from 'immutable'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('list-root');
  const initialState = new Map({
    isAdding: false,
    cars: new List(),
    currentPage: 0,
    chart: new Map({data: new List(),
      show: false})
    })
  const render = createRenderer(root, initialState);
  const state = initializeAppState();

  state.subscribe(currentState => {
    render(currentState)
  })
})
