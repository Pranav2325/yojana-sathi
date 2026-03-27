import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Working from '../components/Working'

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
       <Hero/>
       <Working/>
    </div>
  )
}

export default LandingPage