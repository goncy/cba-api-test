import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'

import AppMap from './components/AppMap'
import Sidebar from './components/Sidebar'
import Spinner from './components/Spinner'
import ErrorBox from './components/ErrorBox'

import {RESOURCE_URL} from './constants'

import './App.css'

export const App = ({data, selected, setSelected, status}) => (
  <div className="App">
    {/* PENDING */}
    {['init', 'pending'].includes(status) && <Spinner />}

    {/* SUCCESS */}
    {status === 'success' && data && (
      <div className='layout'>
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          data={data}
        />
        <AppMap
          selected={selected}
          data={data}
        />
      </div>
    )}

    {/* FAILURE */}
    {status === 'failure' && (
      <ErrorBox error='Hubo un error obteniendo los datos, por favor, recargue la pagina o intente nuevamente mas tarde' />
    )}
  </div>
)

export const AppHOC = compose(
  withState(
    'selected',
    'setSelected',
    null
  ),
  withState(
    'data',
    'setData',
    null
  ),
  withState(
    'status',
    'setStatus',
    'init'
  ),
  lifecycle({
    async componentDidMount () {
      const request = await fetch(RESOURCE_URL)
      const response = await request.json()
      if (response.results) {
        this.props.setStatus('success')
        this.props.setData(response)
      } else {
        this.props.setStatus('failure')
      }
    }
  })
)

export default AppHOC(App)
