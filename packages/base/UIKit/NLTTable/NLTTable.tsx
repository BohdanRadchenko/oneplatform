"use client"

import { FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../shadcn/ui/table'

interface IProps {
    columns: { key: string; title: string; className?: string; }[]
    data: any[]
}

export const NLTTable: FC<IProps> = ({ columns, data, }) => {
    return (
        <div className="space-y-4 w-full">
            {/* <DataTableToolbar table={table} /> */}
            <div className="rounded-md border border-cyan-900">
                <Table>
                    <TableHeader >
                        <TableRow className="bg-muted" >
                            {columns?.map((column) => (<TableHead className={column.className} key={column.key}>{column.title}</TableHead>))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.length ? data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, index) => (
                                        <TableCell key={index}>{row[column.key]}</TableCell>
                                    ))}
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}