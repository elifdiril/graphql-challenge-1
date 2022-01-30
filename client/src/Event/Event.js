import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "./queries";

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return(
      <div>{data.event.date}</div>
  )
}

export default Event;
