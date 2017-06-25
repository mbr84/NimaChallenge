import { form, input, button, div } from 'snabbdom-helpers'
import h from 'snabbdom/h'
import $ from 'jquery'

const addCarForm = isAdding =>{
  const buttonText = isAdding ? "ADDING" : "ADD"

  return form({
    inner: [
      input({
        props: { type: 'text', id:'make', placeholder: "Make"},

      }),
      input({
        props: { type: 'text', id:'model', placeholder: "Model"},

      }),
      input({
        props: {type: 'number', id: 'year', min:"1930", max:"2018", placeholder: "Year"},

      }),
      button({
        props: { type: 'submit' },
        inner: [buttonText]
      }),
      div({ props: { className: 'error', id: 'make-error' }, inner: "Please Fill in Make Field" }),
      div({ props: { className: 'error', id: 'model-error' }, inner: "Please Fill in Model Field" }),
      div({ props: { className: 'error', id: 'year-error' }, inner: "Please Add a Valid Year" }),
      div({ props: { className: 'error' } }),

    ]
  })
}
export default addCarForm
