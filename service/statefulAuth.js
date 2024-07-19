const sessionidToUserMap = new Map();

async function setUser(id, user) {
  sessionidToUserMap.set(id, user);
}
async function getUser(id) {
  return sessionidToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
