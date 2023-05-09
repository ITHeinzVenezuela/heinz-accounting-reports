const xl = require("excel4node")

export const createExcelWorkbook = (list: any): any =>{
  const getTitles = (object: any): any =>{
    let titles = {}
    const labelsList = Object.keys(object)
    
    // Se obtienen los nombres de cada campo se pasan a un objeto
    labelsList.forEach(item =>{
      titles = {
        ...titles,
        [item]: item,
      }  
    })
    
    return titles;
  }
  
  const titles = getTitles(list[0]) 
  
  //Se añaden los titulos de cada columna al array que se va imprimir en el excel
  list.unshift(titles)
  
  const workbook = new xl.Workbook()
  const worksheet = workbook.addWorksheet("Hoja 1")
  
  list.forEach((item: any, index: number) => {
    const ROW = index + 1;
    const values = Object.values(item)
  
    // Se imprime cada fila de la tabla
    values.forEach((value, index) => {
      const COLUMN = index + 1
      
      // Se obtiene el tipo de valor para usar la función adecuada de la librería de excel en cada campo
      const valueType = typeof value;
  
      // Se imprime la celda
      worksheet.cell(ROW, COLUMN)[valueType](value)
    })
  })
  
  return workbook;
}
