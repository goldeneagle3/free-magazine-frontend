import React from 'react'

import './../styles/sass/main.scss'

const LandingLayout = ({children}) => {
  return (
    <div className='landing-layout' >
        {children}
    </div>
  )
}

export default LandingLayout