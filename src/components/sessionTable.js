import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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

// function createData(sessionId, name, type, date, carbs, protein) {
//   return { sessionId, name, type, date, carbs, protein };
// }

// const rows = [
//   createData(84564564, "Camera Lens", "Physical", "12/3/22", 2, 40570),
//   createData(98764564, "Laptop", "Online", "12/3/22", 0, 180139),
//   createData(98756325, "Mobile", "Physical", "12/3/22", 1, 90989),
//   createData(98652366, "Handset", "Online", "12/3/22", 1, 10239),
//   createData(13286564, "Computer Accessories", "Online", "12/3/22", 1, 83348),
//   createData(86739658, "TV", "Online", "12/3/22", 0, 410780),
//   createData(13256498, "Keyboard", "Online", "12/3/22", 2, 70999),
//   createData(98753263, "Mouse", "Physical", "12/3/22", 2, 10570),
//   createData(98753275, "Desktop", "Online", "12/3/22", 1, 98063),
//   createData(98753291, "Chair", "Online", "12/3/22", 0, 14001),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(session, orderBy) {
//   return session === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

function stableSort(array) {
  array.sort((a, b) => {
    return b - a;
  });
  return array;
}

const headCells = [
  {
    id: "sessionId",
    label: "Session Id",
  },
  // {
  //   id: "name",
  //   label: "Student Name",
  // },
  // {
  //   id: "name",
  //   label: "Counselor Name",
  // },
  {
    id: "type",
    label: "Session Type",
  },
  {
    id: "date",
    label: "Session Date",
  },
  {
    id: "time",
    label: "Session Time",
  },
  {
    id: "status",
    label: "Status",
  },
  // {
  //   id: "location",
  //   label: "Location",
  // },
];

function SessionTableHead({ session, orderBy, userRole }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
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
      color = "primary";
      title = "Upcoming";
      break;
    case 1:
      color = "success";
      title = "Completed";
      break;
    case 2:
      color = "error";
      title = "Rejected";
      break;
    default:
      color = "warning";
      title = "Pending";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default function SessionTable({ sessions, userRole }) {
  const [session] = useState("asc");
  const [orderBy] = useState("sessionId");
  const [selected] = useState([]);
  const navigate = useNavigate();

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
          <SessionTableHead
            session={session}
            orderBy={orderBy}
            userRole={userRole}
          />
          <TableBody>
            {stableSort(sessions).map((row, index) => {
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
                  onClick={() => {
                    navigate(`/session-detail/${row.sessionId}`);
                  }}
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
                  {/* <TableCell align="left">{row.studentId}</TableCell> */}
                  {/* <TableCell align="left">
                    {userRole === 3 ? row.counselorId : row.studentId}
                  </TableCell> */}
                  <TableCell align="left">{row.sessionType}</TableCell>
                  <TableCell align="left">{row.sessionDay}</TableCell>

                  <TableCell align="left">{row.sessionTime}</TableCell>

                  <TableCell align="left">
                    <SessionStatus
                      status={
                        row.sessionStatus === "upcoming"
                          ? 0
                          : row.sessionStatus === "completed"
                          ? 1
                          : row.sessionStatus === "rejected"
                          ? 2
                          : null
                      }
                    />
                  </TableCell>
                  {/* <TableCell align="right">Uniben Center</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
