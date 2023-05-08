// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from '@/libs/mssql';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server';

type Data = {
  name: string,
  url: string | null,
  data: unknown
}

const PLACEHOLDER_HOST = "https://localhost:3000"

const indexHandler = async (request: NextRequest, response: NextApiResponse<Data>) => {

  const { searchParams } = new URL(`${PLACEHOLDER_HOST}${request.url}`);

  const dateFrom = searchParams.get("dateFrom")
  const dateTo = searchParams.get("dateTo")
  
  // const [data, length] = await sequelize.query("SELECT * FROM dbo.tbl_carrera")
  try {
    const [data, length] = await sequelize.query("SELECT * FROM dbo.Paises")
  
    response.status(200).json({ name: 'John Doe', url: "", data })
    
  } catch (error) {
    
    console.error(error)
    
    response.status(500).json({ name: 'ERROR', url: "", data: {} })
  }
}

export default indexHandler;
