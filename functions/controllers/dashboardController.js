// Simple in-memory data store
let dataStore = [];

// Get all data
export const getData = (req, res) => res.json({ success: true, data: dataStore });

// Add data
export const addData = (req, res) => {
  const { title, description } = req.body;
  const newItem = { id: Date.now(), title, description, user: req.user.uid };
  dataStore.push(newItem);
  return res.json({ success: true, data: newItem, message: "Item added" });
};

// Update data
export const updateData = (req, res) => {
  const { id, title, description } = req.body;
  const itemIndex = dataStore.findIndex((d) => d.id === id && d.user === req.user.uid);
  if (itemIndex === -1) return res.status(404).json({ success: false, message: "Item not found" });
  dataStore[itemIndex] = { ...dataStore[itemIndex], title, description };
  return res.json({ success: true, data: dataStore[itemIndex], message: "Item updated" });
};

// Delete data
export const deleteData = (req, res) => {
  const { id } = req.body;
  dataStore = dataStore.filter((d) => !(d.id === id && d.user === req.user.uid));
  return res.json({ success: true, message: "Item deleted" });
};
