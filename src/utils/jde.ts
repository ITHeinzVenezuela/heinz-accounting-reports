import { format, addDays } from "date-fns"

const getJDEdwardsJulianDate = (date: string) => {

  const getYear = (date: string) => {
    // string = "2023-01-02"
    const yearFormat = parseInt(date.split("-")[0])

    const JANUARY_MONTH = 0
    const DAY = 1

    const dateInstance = new Date(yearFormat, JANUARY_MONTH, DAY)
    
    const year = parseInt(format(dateInstance, "yyyy"))
    const shortYear = format(dateInstance, "yy")

    const TWENTY_ONE_CENTURY = 2000
    const ABOVE = "1"
    const BELLOW = "0"

    // const julianYear = (year >= twenty_one_century) ? `1${shortYear}` : `0${shortYear}`

    const julianYear = `${(year >= TWENTY_ONE_CENTURY) ? ABOVE : BELLOW}${shortYear}`
    return julianYear;
  }

  const getDayOfTheYear = (date: string) => {

    const ADDITIONAL_DAY = 1
    const ONE_DAY_MORE_DATE = addDays(new Date(date), ADDITIONAL_DAY);

    const dayOfTheYear = format(ONE_DAY_MORE_DATE, "DDD")
    return dayOfTheYear;
  }

  const year = getYear(date)
  const day = getDayOfTheYear(date)

  return parseInt(`${year}${day}`);
}

export default getJDEdwardsJulianDate;