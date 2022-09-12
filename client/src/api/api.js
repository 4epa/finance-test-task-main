import io from "socket.io-client";
import ls, {get,set} from "local-storage";

const socket = io("http://localhost:4000");

const connectToServer = () => socket.emit("connection");
const startShowQoute = () => socket.emit("start");
const getSharesData = (setData) => socket.on("ticker", (quotes) => setData(quotes));
const disconnect = () => socket.off("disconnect");

const getTargetTicket = () => ls.get("targetTicket")
const setTargetTicket = (data) => ls.set("targetTicket", data)

export { connectToServer, startShowQoute, getSharesData, disconnect, getTargetTicket, setTargetTicket };
