import React from 'react'
import logo from '../../assets/logo.png'
import './landing.css'
import bg from '../../assets/bg.jpeg'

function LangingPage() {
  return (
   <header className='py-8 bg-cover filter backdrop- bg-no-repeat bg-center bg-[url(C:\Users\Vishnu\Desktop\Glossom\client\src\assets\bg.jpeg)]'>
    <div className='container mx-auto'>
        <div>
          {/* {text} */}
          <div className='ml-20'> 
            <h1>
              GLOSSOM <span>MUSIC</span>
            </h1>
          </div>
          <div className='flex  sm:justify-start md:justify-end lg:justify-center'        >
            <img className='w-96 h-96' src={logo} alt=''/>
          </div>
        </div>
    </div>
    </header>
  )
}

export default LangingPage