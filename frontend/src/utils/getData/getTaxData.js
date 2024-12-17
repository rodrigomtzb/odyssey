const getTaxData = (data, withoutId = false) => {
  return [
    {
      title: "ID",
      description: withoutId ? "" : data.id,
    },
    {
      title: "Tipo de Persona",
      description:
        data.personType === "M" ? "PERSONA MORAL" : "PERSONA FÍSICA",
    },
    {
      title: "Nombre Completo",
      description: data.fullName,
    },
    {
      title: "Nombre Comercial",
      description: data.businessName,
    },
    {
      title: "Nombre Legal",
      description: data.legalName,
    },
    {
      title: "RFC",
      description: data.mxRfc || data.mxRfcCompany,
    },
  ];
};

export default getTaxData;
