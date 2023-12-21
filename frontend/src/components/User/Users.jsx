// Import the CSS file
import "./user.css";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getUsers } from "../../services/userService";
import ChatWindow from "./../Chat Window/ChatWindow";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers();
        console.log(data);

        // Assuming the data structure includes an array of users
        setUserData(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChatButtonClick = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
    <div className="main-container">
      {/* {isChatOpen ? (
          <ChatWindow user={selectedUser} onCloseChat={handleCloseChat} />
      ) : null}  */}
      {/* <div className={`${isChatOpen ? "blur-container" : ""}`}> */}
        <TableContainer
          component={Paper}
          className={`tableContainer  ${isChatOpen ? "blur-container" : ""}`}
          sx={{ width: "70%" }}
        >
          <Table aria-label="simple table" className="table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHeadCell" sx={{ width: "30%" }}>
                  #
                </TableCell>
                <TableCell className="tableHeadCell" sx={{ width: "30%" }}>
                  Username
                </TableCell>
                <TableCell
                  align="right"
                  className="tableHeadCell"
                  sx={{ width: "30%" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user, index) => (
                <TableRow
                  key={user._id}
                  className="tableRow"
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableBodyCell"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {user.username}
                  </TableCell>
                  <TableCell align="right" className="tableBodyCell">
                    <Button
                      variant="contained"
                      className="button"
                      onClick={() => handleChatButtonClick(user)}
                    >
                      Chat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      {isChatOpen && (
        <ChatWindow
          user={selectedUser}
          onCloseChat={handleCloseChat}
          className="chat-window"
        />
      )}
    </div>
    </>
  );
}
