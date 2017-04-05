import React from 'react'

import GoogleMapReact from 'google-map-react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'

import {CBA_CENTER, DEFAULT_ZOOM, DEFAULT_STYLE} from '../../constants'

export const AppMap = ({center, zoom, style, onGoogleApiLoaded}) => (
  <GoogleMapReact
    center={center}
    zoom={zoom}
    style={style}
    yesIWantToUseGoogleMapApiInternals={true}
    onGoogleApiLoaded={onGoogleApiLoaded}
  />
)

export const AppMapHOC = compose(
  defaultProps({
    center: CBA_CENTER,
    style: DEFAULT_STYLE,
    zoom: DEFAULT_ZOOM
  }),
  withState(
    'library',
    'setLibrary',
    null
  ),
  withState(
    'map',
    'setMap',
    null
  ),
  withState(
    'KMLLayer',
    'setKMLLayer',
    null
  ),
  withHandlers({
    onGoogleApiLoaded: ({setLibrary, setMap}) => ({map, maps}) => {
      setLibrary(maps)
      setMap(map)
    }
  }),
  withPropsOnChange(
    ['selected'],
    ({map, library, selected, setKMLLayer, KMLLayer}) => {
      if (library) {
        if (KMLLayer) {
          KMLLayer.setUrl(selected.recurso.url)
        } else {
          setKMLLayer(new library.KmlLayer({
            url: selected.recurso.url,
            map
          }))
        }
      }
    }
  ),
  pure
)

export default AppMapHOC(AppMap)
