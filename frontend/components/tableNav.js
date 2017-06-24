import { div, i } from 'snabbdom-helpers';

const navButtons = state => {
  const currentPage = state.get('currentPage')
  const totalPages = state.get('totalPages')
  const prev = currentPage > 0
  const next = currentPage < totalPages
  const nextPage = state.get('nextPage')
  const lastPage = state.get('lastPage')

  return div({
    style: {display: 'flex', justifyContent: 'space-around', margin: '15px 0 35px 0'},
    inner: [
      div({ style: { width: '0'} }),
      div({
        props: { className: 'nav-button' },
        style: { visibility: prev ? "visible" : "hidden"},
        on: { click: lastPage },
        inner: i({
          style: {fontSize: '36px', fontWeight: '600'},
          props: { className: 'material-icons'},
          inner: "chevron_left"
        })
      }),
      div({
        props: { className: 'nav-button' },
        style: { visibility: next ? "visible" : "hidden"},
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
