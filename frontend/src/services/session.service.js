import { destroy, get } from "../utils/requests";

const getSessions = () => {
  return get("sessions");
};
const destroySession = (id) => {
  return destroy(`sessions/${id}`);
};

const SessionsService = {
  getSessions,
  destroySession
};

export default SessionsService;
