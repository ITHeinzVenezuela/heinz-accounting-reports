import React, { ChangeEventHandler, useEffect } from 'react'
import { Inter } from 'next/font/google'
import KraftHeinz from "../components/icons/KraftHeinz"

const inter = Inter({ subsets: ['latin'] })

import getJDEdwardsJulianDate from '@/utils/jde'
import { FormEventHandler } from 'react'
import { useState } from 'react'
import Input from '@/components/widgets/Input'
import axios from 'axios'

const Home = () => {

  const [state, setState] = useState({
    dateFrom: 0,
    dateTo: 0,
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget
    setState({
      ...state,
      [name]: getJDEdwardsJulianDate(value),
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    try {
      const API_URL = "/api/accounting-movements"
      
      const response = await axios.post<Register[]>(API_URL, state)
      console.log(response.data);
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="min-h-screen py-20 sm:px-20" >

      <section className="main_container">

        <div className="flex justify-center">
          <KraftHeinz className='brand-logo' />
        </div>

        <form className="mt-10" onSubmit={handleSubmit} onInvalid={() => { }} action="">

          <Input
            id="dateFrom"
            title="Desde:"
            type="date"
            onChange={handleChange}
          />

          <Input
            id="dateTo"
            title="Hasta:"
            type="date"
            onChange={handleChange}
          />
          
          <button>
            Traer Datos  
          </button>

        </form>

      </section>

    </main>
  )
}

export default Home;
