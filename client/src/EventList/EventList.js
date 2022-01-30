import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "./queries";
import { List, Divider } from "antd";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function EventList() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data.events);

  return (
    <div className={styles.eventList}>
      <Divider orientation="center">Events</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`/event/${item.id}`}>
                  {item.title}
                </Link>
              }
              description={
                <Link to={`/event/${item.id}`} className={styles.link}>
                  {item.desc}
                </Link>
              }
            />
            {item.date}
          </List.Item>
        )}
      />
    </div>
  );
}

export default EventList;
