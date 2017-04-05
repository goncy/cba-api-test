import React from 'react'

import './Sidebar.css'

const Sidebar = ({data: {results}, setSelected, selected}) => (
  <div className='Sidebar'>
    <ul>
      {results.map((result, index) => (
        <li
          key={index}
          onClick={() => setSelected(result)}
          className={result === selected ? 'selected' : ''}
        >
          <span className="title">
            {result.titulo}
          </span>
          <br/>
          <span className="subtitle">
            {result.descripcion}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

export default Sidebar
