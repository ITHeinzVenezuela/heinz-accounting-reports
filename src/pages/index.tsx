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
import NotificationModal from '@/components/widgets/NotificationModal'

const Home = () => {

  const [loading, setLoading] = useState(false)

  const [notification, setNotification] = useState<NotificationProps>({
    show: false,
    type: "success",
    title: "",
    message: "",
  })

  const [state, setState] = useState({
    dateFrom: "",
    dateTo: "",
  })
  
  const closeNotification: MouseEventHandler<HTMLButtonElement> = () =>{
    setNotification({
      ...notification,
      show: false,
    })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const target: any = event.target

    const { dateFrom, dateTo } = state

    const body = {
      dateFrom: getJDEdwardsJulianDate(dateFrom),
      dateTo: getJDEdwardsJulianDate(dateTo),
    }

    try {
      setLoading(true)
      const API_URL = "/api/accounting-movements"
      
      const response = await axios.post<Register[]>(API_URL, body)
      console.log(response.data);
      
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(response.data)

      XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
      XLSX.writeFile(workbook, `registros-de-movimientos-contables-(${dateFrom} - ${dateTo}).xlsx`)

      target.reset()
      
      setNotification({
        show: true,
        type: "success",
        title: "¡Excelente!",
        message: "Se creado con éxito el archivo de registros contables",
      })

    } catch (error) {
      console.log(error)
      setNotification({
        show: true,
        type: "danger",
        title: "¡Error!",
        message: "Ha habido un error con la generación del archivo Excel. ¡Intente de nuevo!",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-20 sm:px-20" >

      <section className="main_container">

        {/* <h1 className="font-bold text-2xl mb-10 uppercase">Obtener regsitros de movimientos contables</h1> */}
        <div className="flex justify-center mx-5 sm:mx-0">
          <KraftHeinz className='brand-logo' />
        </div>

        <form className="mt-10 sm:mt-20" onSubmit={handleSubmit} onInvalid={() => { }} action="">
          <h1 className="font-bold text-lg sm:text-2xl sm:col-start-1 sm:col-end-3">
            Obtener registros de movimientos contables
          </h1>

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

          <Button type="submit" loading={loading} noSpinner>
            Obtener Registros
          </Button>

          {
            loading &&
            <span className="justify-self-center sm:col-start-1 sm:col-end-3 text-blue-500 font-bold">
              <Spinner size="small" badgeColor="fill-white" circleColor="fill-blue-500" />
              <span>Esto puede durar varios segundos...</span>
            </span>
          }

          <NotificationModal
            {...notification}
            closeNotification={closeNotification}
          />

        </form>

      </section>

    </main>
  )
}

export default Home;
