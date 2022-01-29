export const Participant = {
  user: (parent, _, { db }) =>
    db.users.find((user) => user.id === parent.user_id),
  event: (parent, _, { db }) =>
    db.events.find((event) => event.id === parent.event_id),
};

