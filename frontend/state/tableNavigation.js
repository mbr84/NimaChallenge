import Rx from 'rxjs'
import { localStorageAsync } from '../utils/utils'

const changePage = delta => state => {
  const newPage = +state.get('currentPage') + delta
  localStorageAsync(newPage)
  return state.set('currentPage', newPage)
}

const nextPageSubject = new Rx.Subject()
const nextPageClickStream = nextPageSubject.map(() => changePage(1))
export const nextPage = () => nextPageSubject.next()

const lastPageSubject = new Rx.Subject()
const lastPageClickStream = lastPageSubject.map(() => changePage(-1))
export const lastPage = () => lastPageSubject.next()

export const streams = Rx.Observable.merge(nextPageClickStream, lastPageClickStream)
