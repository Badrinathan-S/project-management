import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

const ClientInfo = ({ client }) => {
    return (
        <>
            <h1 className='mt-3'>Client Information</h1>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <FaIdBadge className='mr-2' /> {client.name}
                </li>
                <li className='list-group-item'>
                    <FaEnvelope className='mr-2' /> {client.email}
                </li>
                <li className='list-group-item'>
                    <FaPhone className='mr-2' /> {client.phone}
                </li>
            </ul>
        </>

    )
}

export default ClientInfo;