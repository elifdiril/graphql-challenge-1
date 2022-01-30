import EventList from "./EventList/EventList";
import Event from './Event/Event';
import styles from "./styles.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
        <Route path="/event/:id">
            <div className={styles.app}>
              <Event />
            </div>
          </Route>
          <Route path="/">
            <div className={styles.app}>
              <EventList />
            </div>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
