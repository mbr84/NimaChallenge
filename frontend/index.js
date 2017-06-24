import createRenderer from './vdom'
import initializeAppState from './appState'
import { Map, List } from 'immutable'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('list-root');
  const render = createRenderer(root, new Map({ adding: false, cars: new List() }).get('cars'));
  const state = initializeAppState();

  state.subscribe(currentState => {
    currentState.get('cars')
    render(currentState.get('cars'))
  })
})
