let users = [];
let idCounter = 1;

export function resetUsers() {
  users = [];
  idCounter = 1;
}
export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = (req, res) => {
  const user = {
    id: idCounter++,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.status(201).json(user);
};

export const updateUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;

  res.json(user);
};

exports.updateRoom = (req, res) => {
  const roomId = req.params.id;

  Room.updateRoom(roomId, req.body, function (err) {
    if (err) return res.status(500).json(err);

    if (this.changes === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room updated successfully" });
  });
};

export const deleteUser = (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.json({ message: "User deleted" });
};
