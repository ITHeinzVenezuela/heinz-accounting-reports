import React, { ChangeEventHandler, useEffect } from 'react'
import { Inter } from 'next/font/google'
import KraftHeinz from "../components/icons/KraftHeinz"

const inter = Inter({ subsets: ['latin'] })

import getJDEdwardsJulianDate from '@/utils/jde'
import { FormEventHandler } from 'react'
import { useState } from 'react'
import Input from '@/components/widgets/Input'

const Home = () => {

  useEffect(() => {

    console.log("JDE Date: 2022-09-01", getJDEdwardsJulianDate("2022-09-01"));
    console.log("JDE Date: 2023-04-30", getJDEdwardsJulianDate("2023-04-30"));

  }, [])


  const [state, setState] = useState({
    dateFrom: "",
    dateTo: "",
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget
    
    console.log(name, value);
    
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const { currentTarget } = event
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

        </form>

      </section>

    </main>
  )
}

export default Home;
