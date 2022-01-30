import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "./queries";
import { Descriptions, Divider } from "antd";
import styles from "./styles.module.css";

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Divider orientation="center"><div className={styles.divider}>Event Details</div></Divider>
      <Descriptions
        bordered
        column={{ xxl: 1}}
      >
        <Descriptions.Item label="Title">{data.event.title}</Descriptions.Item>
        <Descriptions.Item label="Host">
          {data.event.user.username} {data.event.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Date">{data.event.date}</Descriptions.Item>
        <Descriptions.Item label="Location">
          {data.event.location.name} {data.event.location.lat}{" "}
          {data.event.location.lng}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="center"><div className={styles.divider}>Participants</div></Divider>
      <Descriptions
        bordered
        column={{ xxl: 1 }}
      >
        {data.event.participants.map((item, id) => (
          <Descriptions.Item key={id} label="Participant">
            {item.user.username}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
}

export default Event;
