import { init }                 from 'snabbdom'
import h                        from 'snabbdom/h'
import carList                  from './components/carList'

const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const createRenderer = (root, initialState) => {
  let vnode = patch(root, carList(initialState))
  return state => {
    vnode = patch(vnode, carList(state));
  }
}

export default createRenderer
