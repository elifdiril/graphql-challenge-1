export const User = {
  events: (parent, _, { db }) =>
    db.events.filter((event) => event.user_id === parent.id),
};

