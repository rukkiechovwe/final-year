import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Dot from "./common/dot";

function createData(sessionId, name, type, date, carbs, protein) {
  return { sessionId, name, type, date, carbs, protein };
}

const rows = [
  createData(84564564, "Camera Lens", "Physical", "12/3/22", 2, 40570),
  createData(98764564, "Laptop", "Online", "12/3/22", 0, 180139),
  createData(98756325, "Mobile", "Physical", "12/3/22", 1, 90989),
  createData(98652366, "Handset", "Online", "12/3/22", 1, 10239),
  createData(13286564, "Computer Accessories", "Online", "12/3/22", 1, 83348),
  createData(86739658, "TV", "Online", "12/3/22", 0, 410780),
  createData(13256498, "Keyboard", "Online", "12/3/22", 2, 70999),
  createData(98753263, "Mouse", "Physical", "12/3/22", 2, 10570),
  createData(98753275, "Desktop", "Online", "12/3/22", 1, 98063),
  createData(98753291, "Chair", "Online", "12/3/22", 0, 14001),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(session, orderBy) {
  return session === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const session = comparator(a[0], b[0]);
    if (session !== 0) {
      return session;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sessionId",
    align: "left",
    disablePadding: false,
    label: "Session Id",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Counselor Name",
  },
  {
    id: "type",
    align: "left",
    disablePadding: false,
    label: "Session Type",
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Session Date",
  },
  {
    id: "carbs",
    align: "left",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "protein",
    align: "right",
    disablePadding: false,
    label: "Meeting Link",
  },
];

function SessionTableHead({ session, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? session : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const SessionStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Pending";
      break;
    case 1:
      color = "success";
      title = "Approved";
      break;
    case 2:
      color = "error";
      title = "Rejected";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default function SessionTable() {
  const [session] = useState("asc");
  const [orderBy] = useState("sessionId");
  const [selected] = useState([]);

  const isSelected = (sessionId) => selected.indexOf(sessionId) !== -1;

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
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <SessionTableHead session={session} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(session, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.sessionId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.sessionId}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      <Link color="secondary" component={RouterLink} to="">
                        {row.sessionId}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">
                      <SessionStatus status={row.carbs} />
                    </TableCell>
                    <TableCell align="right">$70,000</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
