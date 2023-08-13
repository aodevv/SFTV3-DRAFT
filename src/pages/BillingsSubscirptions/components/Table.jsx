import { useTable } from "react-table"
import {COLUMNS} from "./columns"
import { userData } from "./userData"
import { useMemo } from "react"
import "./table.css"

export const Table = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => userData, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        rows, 
        prepareRow

    } = tableInstance

  return (
    <table {...getTableProps()}>
        <thead>
           {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>{column.render('Header')}</th>
              ))}    
            </tr>
           ))}   
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()} key={cell.getCellProps().key}>{cell.render('Cell')}</td>
                      })}
                        
                    </tr>
                )
            })
                
            }
            
        </tbody>
    </table>
  )
}
