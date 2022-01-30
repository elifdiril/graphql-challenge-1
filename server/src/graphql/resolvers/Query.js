export const Query = {
  events: (_, __, { db }) => db.events,
  event: (_, args, { db }) => {
    const data = db.events.find((event) => event.id == args.id);
    return data;
  },

  locations: (_, __, { db }) => db.locations,
  location: (_, args, { db }) => {
    const data = db.locations.find((location) => location.id == args.id);
    return data;
  },

  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) => {
    const data = db.users.find((user) => user.id == args.id);
    return data;
  },

  participants: (_, __, { db }) => db.participants,
  participant: (_, args, { db }) => {
    const data = db.participants.find(
      (participant) => participant.id == args.id
    );
    return data;
  },
};

