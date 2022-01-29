import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "./queries";
import { List, Divider } from "antd";

function EventList() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data.events)

  return (
    <div>
      <Divider orientation="left">Small Size</Divider>
      <List
    itemLayout="horizontal"
    dataSource={data.events}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={item.title}
          description={item.desc}
        />
      </List.Item>
    )}
  />
    </div>
  );
}

export default EventList;
