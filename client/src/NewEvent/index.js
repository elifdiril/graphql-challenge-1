import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, GET_LOCATIONS, NEW_EVENT } from "./queries";
import { Form, Input, Button, Select, message, Divider } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

const { Option } = Select;

function NewEvent() {
  const history = useHistory();
  const [saveEvent, { loading }] = useMutation(NEW_EVENT);

  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  const { loading: get_locations_loading, data: locations_data } =
    useQuery(GET_LOCATIONS);

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      await saveEvent({
        variables: {
          data: values,
        },
      });

      message.success("Event saved!", 4);
      history.push("/");
      history.go(0);
    } catch (e) {
      console.log(e);
      message.error("Event not saved!", 8);
    }
  };

  return (
    <div className={styles.form}>
      <Divider orientation="left">
        <div className={styles.divider}>Event Details</div>
      </Divider>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input disabled={loading} size="large" placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="desc"
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input.TextArea
            disabled={loading}
            size="large"
            placeholder="Description"
          />
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please input your Date!" }]}
        >
          <Input disabled={loading} size="large" placeholder="Date" />
        </Form.Item>

        <Form.Item
          name="from"
          rules={[{ required: true, message: "Please input From info!" }]}
        >
          <Input disabled={loading} size="large" placeholder="From" />
        </Form.Item>

        <Form.Item
          name="to"
          rules={[{ required: true, message: "Please input To info!" }]}
        >
          <Input disabled={loading} size="large" placeholder="To" />
        </Form.Item>

        <Form.Item
          name="user_id"
          rules={[{ required: true, message: "Please select user!" }]}
        >
          <Select
            disabled={get_users_loading || loading}
            loading={get_users_loading || loading}
            placeholder="Select a user"
            size="large"
          >
            {users_data &&
              users_data.users.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.username}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="location_id"
          rules={[{ required: true, message: "Please select location!" }]}
        >
          <Select
            disabled={get_locations_loading || loading}
            loading={get_locations_loading || loading}
            placeholder="Select a location"
            size="large"
          >
            {locations_data &&
              locations_data.locations.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewEvent;
