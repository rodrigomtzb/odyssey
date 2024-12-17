const getBankData = (bank, withoutId = false) => {
  return [
    { title: "ID", description: withoutId ? "" : bank.id },
    {
      title: "Tipo de Cuenta",
      description: bank.accountType.name,
    },
    {
      title: "Cuenta",
      description: bank.account,
    },
    {
      title: "Banco",
      description: bank.bank.name,
    },
    {
      title: "Descripción",
      description: bank.description,
    },
  ];
};

export default getBankData;
