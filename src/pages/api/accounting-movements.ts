// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from '@/libs/mssql';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';

type Data = unknown

const PLACEHOLDER_HOST = "https://localhost:3000"

type BodyProps = {
  dateFrom: number;
  dateTo: number;
}

const indexHandler = async (request: NextApiRequest, response: NextApiResponse<Data>) => {

  // const { searchParams } = new URL(`${PLACEHOLDER_HOST}${request.url}`);

  const { dateFrom, dateTo }: BodyProps = request.body

  try {
    // const QUERY = "SELECT * FROM dbo.Paises"

    const QUERY = ` 
      SELECT 
      GLCO as COMPANIA ,
      GLICU as NO_BATCH, 
      GLPN as PERIODO, 
      GLDCT as TIPO,  
      B.c6001ISO as FECHA,
      GLDOC as DOCUMENTO,
      GLANI as CUENTA,
      GLAN8 as N_DIR,
      GLEXA  as  DESCRIPCION, 
      CONVERT (numeric (18,2),(glaa/100)) as MONTO, 
      GLUPMT as ULT_ACT,
      GLCRCD as MONEDA,
      GLTORG as USUARIO_ORG, 
      GLUSER as USUARIO_APROB,
      glicut as TIPO_BATCH 
      FROM openquery (jde, 
        '
          select * from proddta.f0911 where GLCO 
          in (''07200'')
          and GLPOST in (''P'') 
          and GLLT in (''AA'') 
          and GLDCT in (''JE'') 
          and GLDGJ 
          between ${dateFrom} and ${dateTo} 
        '
      )
      A JOIN OPENQUERY(HVEOW001,'select * from hlib60.h60cf01') B ON (A.GLDGJ = B.C6001JDE)
    `
    const [data] = await sequelize.query(QUERY)
    response.status(200).json(data)

  } catch (error) {

    console.error(error)
    response.status(500).json({ name: 'ERROR', error })
  }
}

export default indexHandler;

