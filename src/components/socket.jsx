import { io } from "socket.io-client";
import { API_URL } from "../utils/apiPath";
const socket = io(`${API_URL}`);
export default socket;
