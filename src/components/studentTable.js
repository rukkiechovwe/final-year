import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// function createData(name, email, department, gender) {
//   return { name, email, department, gender };
// }

// const rows = [
//   createData("Rukkie Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData("Ufuoma Oghenechovwe", "rukkiechowe@gmail.com", "CSC", "Female"),
//   createData(
//     "Constance Oghenechovwe",
//     "rukkiechowe@gmail.com",
//     "CSC",
//     "Female"
//   ),
// ];

function stableSort(array) {
  array.sort((a, b) => {
    return b - a;
  });
  return array;
}

const headCells = [
  {
    id: "name",
    label: "Student Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "department",
    label: "Department",
  },
  {
    id: "gender",
    label: "Gender",
  },
];

function StudentTableHead({ student, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? student : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function StudentTable({ students }) {
  const [student] = useState("asc");
  const [orderBy] = useState("name");

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <StudentTableHead student={student} orderBy={orderBy} />
          <TableBody>
            {stableSort(students).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.department}</TableCell>
                  <TableCell align="left">{row.gender}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
