# graphql-challenge-1
Patika GraphQL Challenge 1

## In order to run this project in your local environment

 <br/>

```bash
git clone https://github.com/elifdiril/graphql-challenge-1.git
```

And then

```bash
npm install
```

to install all the dependencies.

Finally,

```bash
npm run dev
```

to start the development mode.


Example mutation queries: 

``` sql

mutation s {
  createEvent(
    data: {
      title: "ef"
      desc: "ef"
      date: "sdf"
      from: "sdf"
      to: "sdf"
      location_id: "1"
      user_id: "1"
    }
  ) {
    title
    desc
    date
    id
  }
}

mutation updateEvent {
  updateEvent(id: "xzk8UuoRvxbEG74UlTIJ4", data: { title: "werwer" }) {
    title
    id
  }
}

mutation deleteEvent {
  deleteEvent(id: "xzk8UuoRvxbEG74UlTIJ4") {
    title
  }
}

mutation deleteAllEvents {
  deleteAllEvents {
    count
  }
}


```