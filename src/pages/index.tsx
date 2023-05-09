import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react'
const XLSX = require('../../node_modules/xlsx/xlsx.js')

import { Inter } from 'next/font/google'
import KraftHeinz from "../components/icons/KraftHeinz"

const inter = Inter({ subsets: ['latin'] })

import getJDEdwardsJulianDate from '@/utils/jde'
import { FormEventHandler } from 'react'
import { useState } from 'react'
import Input from '@/components/widgets/Input'
import axios from 'axios'
import Spinner from '@/components/widgets/Spinner'
import Button from '@/components/widgets/Button'

const Home = () => {

  const [loading, setLoading] = useState(false)

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
      // const API_URL = "/api/accounting-movements"

      // const response = await axios.post<Register[]>(API_URL, state)
      // console.log(response.data);

      // const list = [
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   },
      //   {
      //     name: "Orlando",
      //     lastname: "Mendoza",
      //     age: 23
      //   }
      // ]     

      // const workbook = XLSX.utils.book_new()
      // // const worksheet = XLSX.utils.json_to_sheet(response.data)
      // const worksheet = XLSX.utils.json_to_sheet(list)

      // XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
      // XLSX.writeFile(workbook, "nuevo1.xlsx")

      setLoading(true)
      // event.currentTarget.reset()

      setTimeout(() => {
        setLoading(false)
      }, 3000)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="min-h-screen py-20 sm:px-20" >

      <section className="main_container">

        <div className="flex justify-center fill-">
          <KraftHeinz className='brand-logo' />
        </div>

        <form className="mt-10" onSubmit={handleSubmit} onInvalid={() => { }} action="">

          <Input
            id="dateFrom"
            title="Desde:"
            type="date"
            disabled={loading}
            onChange={handleChange}
          />

          <Input
            id="dateTo"
            title="Hasta:"
            type="date"
            disabled={loading}
            onChange={handleChange}
          />

          <Button type="submit" loading={loading}>
            Traer Datos
          </Button>

        </form>

      </section>

    </main>
  )
}

export default Home;
