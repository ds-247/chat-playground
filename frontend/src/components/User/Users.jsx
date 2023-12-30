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
import { startChatServer } from "../../services/chatService";
import "./user.css";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers();

        setUserData(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChatButtonClick = async (user) => {
    try {
      // Send a request to the server to check permission
      const response = await startChatServer(user);
      setSelectedUser(user);
      if (response.status === 200) {
        setTopics(response.data);
        setIsChatOpen(true);
      } else {
        console.error("Permission denied");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  };

  const handleCloseChat = async () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <div className="main-container">
        <TableContainer
          component={Paper}
          className={`tableContainer  ${
            isChatOpen ? "user-blur-container" : ""
          }`}
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
                      disabled={isChatOpen}
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
            onChatClose={handleCloseChat}
            className="chat-window"
            topics={topics}
          />
        )}
      </div>
    </>
  );
}
