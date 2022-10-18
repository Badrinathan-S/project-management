import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutation';
import { GET_CLIENT } from '../queries/clientQueries';


const AddClientModel = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(name ==='' || email ==='' || phone ===''){
            return alert('Please fill required field');
        }

        addClient(name, email, phone);

        setName('');
        setEmail('');
        setPhone('');
    };

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: {addClient}}){
            const {clients} = cache.readQuery({query: GET_CLIENT});

            cache.writeQuery({
                query: GET_CLIENT,
                data: {clients: [...clients, addClient]},
            });
        }
    });

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModel">
                <div className="d-flex align-items-center">
                    <FaUser className='icon'/>
                    <div>Add Client</div>
                </div>
            </button>
            <div className="modal fade" id="addClientModel" aria-labelledby="addClientModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModelLabel">Add Client</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-lable">Name</label>  
                                <input type="text" className='form-control' id='name' placeholder="eg: bob" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-lable">Email</label>  
                                <input type="email" className='form-control' id='email' placeholder="eg: bob@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-lable">Phone</label>  
                                <input type="tel" className='form-control' id='name' placeholder="eg: 123-456-7890" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <button type="submit" className='btn btn-secondary' data-bs-dismiss="modal">Submit</button>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientModel