import { gql, useQuery } from "@apollo/client"

const GET_CLIENT = gql`
    query getClients {
        clients {
        id
        name
        email
        phone
        }
    }
`

const Clients = () => {
  
  const {loading, error, data} = useQuery(GET_CLIENT);
  
  if(loading){
    return <p>loading</p>
  }
  if(error){
    return <p>Error</p>
  }


  return (
    <>{!loading && !error && <table className="table table-hover mt-3"></table>}</>
  )
}

export default Clients;