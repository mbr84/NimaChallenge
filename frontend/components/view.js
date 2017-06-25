import { main, h1 } from 'snabbdom-helpers'
import addCarForm from './addCarForm'
import carList from './carList'
import navButtons from './tableNav'
import chartView from './chart'

const view = state =>
  main({
    inner: [
      h1({inner: "Your Car Lot"}),
      addCarForm(state.get('isAdding')),
      carList(state),
      navButtons(state),
      chartView(state.get('chart'))
    ]
  })

export default view
