import createRenderer from './vdom'
import initializeAppState from './appState'
import { Map, List } from 'immutable'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('list-root');
  const initialState = new Map({ isAdding: false, cars: new List(), currentPage: 0 })
  const render = createRenderer(root, initialState);
  const state = initializeAppState();

  state.subscribe(currentState => {
    render(currentState)
  })
})
