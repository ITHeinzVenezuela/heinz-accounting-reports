// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from '@/libs/mssql';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server';

type Data = unknown

const PLACEHOLDER_HOST = "https://localhost:3000"

const indexHandler = async (request: NextRequest, response: NextApiResponse<Data>) => {

  const { searchParams } = new URL(`${PLACEHOLDER_HOST}${request.url}`);

  const dateFrom = searchParams.get("dateFrom")
  const dateTo = searchParams.get("dateTo")
  
  try {
    const QUERY = "SELECT * FROM dbo.Paises"
    const [data] = await sequelize.query(QUERY)
    
    response.status(200).json(data)
    
  } catch (error) {
    
    console.error(error)
    
    response.status(500).json({ name: 'ERROR', url: "", data: {} })
  }
}

export default indexHandler;
