import { useQuery } from "@apollo/client"
import ClientRow from "./ClientRow";
import { GET_CLIENT } from "../queries/clientQueries";
import Spinner from "./Spinner";

const Clients = () => {

  const { loading, error, data } = useQuery(GET_CLIENT);

  if (loading) {
    return <Spinner/>
  }
  if (error) {
    return <p>Error</p>
  }

  return (
    <>{!loading && !error && (
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line
            data.clients.map((client) =>(<ClientRow key={client.id} client={client}/>)
              
              )}
        </tbody>
      </table>
    )}</>
  )
}

export default Clients;