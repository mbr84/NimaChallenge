import Rx from 'rxjs'
import { localStorageAsync } from '../utils/utils'

const nextPageSubject = new Rx.Subject()

const nextPageClickStream = nextPageSubject
  .map(() => state => {
    const newPage = +state.get('currentPage') + 1
    localStorageAsync(newPage)
    return state.set('currentPage', newPage)
  })

export const nextPage = () => nextPageSubject.next()

const lastPageSubject = new Rx.Subject()

const lastPageClickStream = lastPageSubject
  .map(() => state => {
    const newPage = state.get('currentPage') - 1
    localStorageAsync(newPage)
    return state.set('currentPage', newPage)
  })

export const streams = Rx.Observable.merge(nextPageClickStream, lastPageClickStream)
export const lastPage = () => lastPageSubject.next()
