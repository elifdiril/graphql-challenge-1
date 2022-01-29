export const Event = {
  user: (parent, _, { db }) =>
    db.users.find((user) => user.id === parent.user_id),

  location: (parent, _, { db }) =>
    db.locations.find((location) => location.id === parent.location_id),

  participants: (parent, _, { db }) =>
    db.participants.filter((participant) => participant.event_id === parent.id),
};

