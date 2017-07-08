import { init }                 from 'snabbdom'
import h                        from 'snabbdom/h'
import view                     from '../components/view'

const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/eventlisteners').default,
]);

const createRenderer = (root, initialState, actions) => {
  let vnode = patch(root, view(initialState, actions))
  return (state, actions) => {
    vnode = patch(vnode, view(state, actions));
  }
}

export default createRenderer
