import { get } from "../utils/requests";

const getWhatsAppLog = () => {

    return get("whatsapp/log");
  };


  const WhatsAppLogService = {
    getWhatsAppLog,
  };
  
  export default WhatsAppLogService;