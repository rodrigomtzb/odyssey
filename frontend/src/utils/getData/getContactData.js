const getContactData = (contact, withoutId = false) => {
  return [{ title: "ID", description: withoutId ? "" : contact.id }];
};

export default getContactData;
