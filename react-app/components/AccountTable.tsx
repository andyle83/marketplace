import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type AccountDataEntry = {
    token: string;
    balance: number;
    value: number;
    exchange: number;
    baseCurrency: string;
};

function formatSmallValue(value: number): string {
    if (value < 1e-8) return `${(value * 1e9).toFixed(3)} n`;
    if (value < 1e-5) return `${(value * 1e6).toFixed(3)} μ`;
    if (value < 1e-2) return `${(value * 1e3).toFixed(3)} m`;
    return value.toFixed(3) + " ";
}

function formatValue(value: number): string {
    return `$${value.toFixed(2)}`;
}

const AccountTable: React.FC<{ rows: AccountDataEntry[] }> = ({ rows }) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Estimated Value</TableCell>
            <TableCell align="right">Estimated Exchange</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <TableRow
              key={row.token}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.token}
              </TableCell>
              <TableCell align="right">{row.balance < 0.01 ? formatSmallValue(row.balance) : row.balance.toFixed(2) + " "}{row.token}</TableCell>
              <TableCell align="right">{formatValue(row.value)}</TableCell>
              <TableCell align="right">{formatValue(row.exchange)} / {row.token}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
export default AccountTable;
