import { post } from "../utils/requests";

const sendMailDefault = (data) => {
  return post("sendmail", data);
};

const EmailService = {
  sendMailDefault,
};

export default EmailService;
