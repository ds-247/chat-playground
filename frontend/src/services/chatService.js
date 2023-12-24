import http from "./httpServices";
const apiEndPoint = "http://localhost:3000/chat";

export async function startChatServer(user) {
  const customUser = {
    receiverId : user._id
  }

  return http.post(`${apiEndPoint}/chatPermissions`, customUser);
}

export async function exitChatRoom(){
  return http.get(`${apiEndPoint}/chatRoom/close`);
}

export async function chatRoom(message, receiverId){
  const data = {
    message  : message,
    receiverId : receiverId._id
  }
  return http .post(`${apiEndPoint}/chatRoom`,data)
}