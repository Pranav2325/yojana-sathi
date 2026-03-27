import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
     <div className='max-w-6xl mx-auto px-6 py-16 md:py-24'>
            <div className='text-center max-w-3xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold text-gray-900 leading-tight'>
                    Know every scheme
                    <span className='text-indigo-700'> you deserve</span>
                </h1>
                <p className='mt-6 text-lg md:text-xl text-gray-500 leading-relaxed'>
                    India has 300+ goverment schemes worth crores of rupees. Most people never claim them because they don't know they qualify. YojnaSathi changes that.
                </p>
                <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link to="/register" className='bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-800'>
                    Find My Schemes
                    </Link>
                    <Link to="/schemes" className='border border-indigo-700 text-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50'>
                    Browse All Schemes
                    </Link>

                </div>

            </div>
        </div>
  )
}

export default Hero