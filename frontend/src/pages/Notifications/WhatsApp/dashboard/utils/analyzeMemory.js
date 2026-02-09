export function analyzeMemory(resJson) {
    if (!resJson) return null;
  
    let sessions = new Set();
    let human = 0;
    let ai = 0;
    let tools = {};
    let aiLengths = [];
    let timeline = {};
  
    resJson.data.forEach((row) => {
  
      try {
        
        const session = row.sessionId;
        const dateRaw = row.fechaRegistro;
  
        let rawPayload = row.message;

        if (rawPayload.startsWith('"') && rawPayload.endsWith('"')) {
          rawPayload = rawPayload.substring(1, rawPayload.length - 1);
        }
        
        const cleanPayload = rawPayload.replace(/""/g, '"');
        const payload = JSON.parse(cleanPayload);

        
        sessions.add(session);
        timeline[dateRaw] = (timeline[dateRaw] || 0) + 1;
  
        if (payload.type === "human") {
          human++;
        }
  
        if (payload.type === "ai") {
          ai++;
          if (payload.content) {
            aiLengths.push(payload.content.length);
  
            if (payload.content.includes("Used tools: Tool: ")) {
              const match = payload.content.match(/Used tools: Tool: \s*(\w+)/);
              
              console.log('match: '+match);
              
              if (match) {
                tools[match[1]] = (tools[match[1]] || 0) + 1;
              }
            }
          }
        }
      } catch (e) {

        console.warn("Fila ignorada por error de formato:", e.message);
      }
    });
  
    const totalMessages = human + ai;
    const avgLen = aiLengths.length > 0 
      ? Math.round(aiLengths.reduce((a, b) => a + b, 0) / aiLengths.length) 
      : 0;
  

    console.log('tools: '+tools);
    console.log('timeline: '+timeline);

    return {
      sessions: sessions.size,
      totalMessages: totalMessages,
      human,
      ai,
      tools,
      toolUsage: ai > 0 ? Math.round((Object.values(tools).reduce((a, b) => a + b, 0) / ai) * 100) : 0,
      automationRate: totalMessages > 0 ? Math.round((ai / totalMessages) * 100) : 0,
      avgResponseLength: avgLen,
      timeline: {
        labels: Object.keys(timeline),
        values: Object.values(timeline),
      },
    };
  }
  