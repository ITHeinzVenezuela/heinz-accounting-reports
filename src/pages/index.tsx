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
import Select from '@/components/widgets/Select'
import NotificationModal from '@/components/widgets/NotificationModal'


type registerType = "JE" | "PV" | "Todos"

const types: SelectOptionsValue[] = [
  { name: "JE", value: "JE" },
  { name: "PV", value: "PV" },
  { name: "Todos", value: "" },
]

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
    type: "",
  })

  const openNotification = (notification: OpenNotificationProps): void => {
    setNotification({
      ...notification,
      show: true,
    })
    setTimeout(() => (closeNotification as () => void)(), 10000)
  }

  const closeNotification: MouseEventHandler<HTMLButtonElement> = () => {
    setNotification({
      ...notification,
      show: false,
    })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { name, value } = event.currentTarget
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const target: any = event.target

    const today = (new Date()).toISOString().substring(0, 10)

    const { dateFrom, dateTo, type } = state

    const body = {
      type,
      dateFrom: getJDEdwardsJulianDate(dateFrom),
      dateTo: getJDEdwardsJulianDate(dateTo),
    }


    const NOT_TODAY = !(dateFrom === today && dateTo === today)
    const NOT_GREATER_THAN_TODAY = (dateFrom <= today && dateTo <= today)

    try {
      if (NOT_TODAY && NOT_GREATER_THAN_TODAY) {

        setLoading(true)
        const API_URL = "/api/accounting-movements"

        const response = await axios.post<Register[]>(API_URL, body)
        console.log(response.data);

        if (response.data.length === 0) {
          openNotification({
            type: "warning",
            title: "¡Notificación!",
            message: "No existe ningún registro contable correspondiente a los valores proporcionados",
          })
        } else {
          const workbook = XLSX.utils.book_new()
          const worksheet = XLSX.utils.json_to_sheet(response.data)

          XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
          XLSX.writeFile(workbook, `registros de movimientos contables (${type})(${dateFrom} - ${dateTo}).xlsx`)

          openNotification({
            type: "success",
            title: "¡Excelente!",
            message: "Se creado con éxito el archivo de registros contables",
          })
        }

      } else {
        openNotification({
          type: "warning",
          title: "Advertencia",
          message: "Intervalo de fechas no valido. ¡Intelo de nuevo!",
        })
      }


    } catch (error) {
      target.reset()
      console.log(error)
      openNotification({
        type: "danger",
        title: "¡Error!",
        message: "Ha habido un error con la generación del archivo Excel. ¡Intente de nuevo!",
      })
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <main className="min-h-screen" >
        <section className="main_container sm:px-20 py-20">

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

            <Select
              name="type"
              options={types}
              // value={id_equipo}
              title="Tipo de movimiento contable"
              defaultOption="Selecciona un tipo"
              className="Select"
              onChange={handleChange}
            />

            <Button type="submit" loading={loading} noSpinner>
              Obtener Registros
            </Button>

            {
              loading &&
              <span className="loading-message">
                <Spinner size="small" badgeColor="fill-white" circleColor="fill-blue-500" />
                <span>Esto puede tardar varios minutos...</span>
              </span>
            }

            <NotificationModal
              {...notification}
              closeNotification={closeNotification}
            />

          </form>

        </section>

        <footer className="px-5 py-4 bg-slate-100">
          <span>© 2023 - KraftHeinz I.T. Venezuela 💻</span>
        </footer>
      </main>
    </>
  )
}

export default Home;
