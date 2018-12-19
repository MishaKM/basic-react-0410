import createHistory from 'history/createBrowserHistory'

const history = createHistory()

//dev only, remove in PROD!
window.routerHistory = history

export default history
