const flattenedItems = (items) => {
  const flattened = items
    .map((item) => {
      const baseItem = {
        id: item.id,
        sequence: item.sequence,
        icon: item.icon,
        title: item.title,
        path: item.path || "N/A",
        parentId: item.parentId,
      };
      const items = [baseItem];
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach((subItem) => {
          items.push({
            id: subItem.id,
            sequence: subItem.sequence,
            icon: "caret-right-fill",
            title: subItem.title,
            path: subItem.path || "N/A",
            parentId: subItem.parentId,
          });
        });
      }

      return items;
    })
    .flat()
    .sort((a, b) => a.sequence - b.sequence);
  return flattened;
};
export default flattenedItems;
