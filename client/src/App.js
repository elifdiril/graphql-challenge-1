import EventList from "./EventList/EventList";
import Event from "./Event/Event";
import NewEvent from "./NewEvent";
import styles from "./styles.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";

function App() {
  const [current, setCurrent] = useState("event");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className={styles.app}>
      <Router>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="events">
            <Link to="/">Events</Link>
          </Menu.Item>
          <Menu.Item key="new-event">
            <Link to="/new-event">New Event</Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/event/:id">
            <div className={styles.app}>
              <Event />
            </div>
          </Route>
          <Route path="/new-event">
            <div className={styles.app}>
              <NewEvent/>
            </div>
          </Route>
          <Route path="/">
            <div className={styles.app}>
              <EventList />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
