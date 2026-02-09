import { get } from "../utils/requests";

const getMonitorLog = ( fechaInicio, fechaFin) => {

    let queryStr = "";
    let numVariables = 0;

    if(fechaInicio != null && fechaInicio !== undefined){
        if(numVariables == 0){
            queryStr+="?";
        }else{
            queryStr+="&";
        }
        queryStr+="fechaInicio="+fechaInicio;
    }

    if(fechaFin != null && fechaFin !== undefined){
        if(numVariables == 0){
            queryStr+="?";
        }else{
            queryStr+="&";
        }
        queryStr+="fechaFin="+fechaFin;
    }

    if(numVariables == 0){
        queryStr+="?limit=20";
    }

    return get("agent-monitor/log"+queryStr);
  };


  const AgentMonitorLogService = {
    getMonitorLog,
  };
  
  export default AgentMonitorLogService;