import http from "./httpServices";
const apiEndPoint = "http://localhost:3000/chat";

export async function startChatServer(user) {
  const customUser = {
    participantId: user._id,
  };

  return http.post(`${apiEndPoint}/chatPermissions`, customUser);
}

export async function exitChatRoom() {
  return http.get(`${apiEndPoint}/chatRoom/close`);
}
