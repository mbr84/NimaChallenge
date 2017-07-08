import { div, i } from 'snabbdom-helpers';

const navButtons = (state, actions) => {
  const hasPrevPage = state.get('currentPage') > 0
  const hasNextPage = state.get('currentPage') < state.get('totalPages')
  const { nextPage, lastPage } = actions

  return div({
    style: {display: 'flex', justifyContent: 'space-around', margin: '15px 0 35px 0'},
    inner: [
      div({ style: { width: '0'} }),
      div({
        props: { className: 'nav-button' },
        style: { visibility: hasPrevPage ? "visible" : "hidden"},
        on: { click: lastPage },
        inner: i({
          style: {fontSize: '36px', fontWeight: '600'},
          props: { className: 'material-icons'},
          inner: "chevron_left"
        })
      }),
      div({
        props: { className: 'nav-button' },
        style: { visibility: hasNextPage ? "visible" : "hidden"},
        on: { click: nextPage },
        inner: i({
          style: {fontSize: '36px', fontWeight: '600'},
          props: { className: 'material-icons'},
          inner: "chevron_right"
        })
      }),
      div({ style: { width: '10%'} })
    ]

  })
}

export default navButtons
