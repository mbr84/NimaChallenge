import Rx from 'rxjs'
import { localStorageAsync } from '../utils/utils'

const nextPageSubject = new Rx.Subject()

export const nextPageClickStream = nextPageSubject
  .map(() => state => {
    const newPage = +state.get('currentPage') + 1
    localStorageAsync(newPage)
    return state.set('currentPage', newPage)
  })
  
export const nextPage = () => nextPageSubject.next()

const lastPageSubject = new Rx.Subject()

export const lastPageClickStream = lastPageSubject
  .map(() => state => {
    const newPage = state.get('currentPage') - 1
    localStorageAsync(newPage)
    return state.set('currentPage', newPage)
  })
  
export const lastPage = () => lastPageSubject.next()
