import { useState } from 'react';
import { FaList, FaUser } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQuries';
import { GET_CLIENT } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutation';


const AddProjectModel = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT,{
        variables: {name, description, clientId, status},
        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({query: GET_PROJECTS});

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: [...projects, addProject]},
            });

        }
    });
    //Get Client

    const { loading, error, data } = useQuery(GET_CLIENT);

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '') {
            return alert('Please fill required field');
        }

        addProject(name, description, status);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('')
    };

    if (loading) return null;
    if (error) return 'somthing went worng';

    // const [addClient] = useMutation(ADD_CLIENT, {
    //     variables: {name, email, phone},
    //     update(cache, {data: {addClient}}){
    //         const {clients} = cache.readQuery({query: GET_CLIENT});

            // cache.writeQuery({
            //     query: GET_CLIENT,
            //     data: {clients: [...clients, addClient]},
            // });
    //     }
    // });

    return (
        <>
            {!loading && !error &&
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModel">
                        <div className="d-flex align-items-center">
                            <FaList className='icon' />
                            <div>New Project</div>
                        </div>
                    </button>
                    <div className="modal fade" id="addProjectModel" aria-labelledby="addProjectModelLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addProjectModelLabel">Add Client</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className="form-lable">Name</label>
                                            <input type="text" className='form-control' id='name' placeholder="eg: bob" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-lable">Description</label>
                                            <textarea
                                                className='form-control'
                                                id='description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-lable">Phone</label>
                                            <select className='form-select' id="status" value={status} onChange={e => setStatus(e.target.value)}>
                                                <option value="new">Not Started</option>
                                                <option value="progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-lable">Client</label>
                                            <select className='form-select' id="status" value={clientId} onChange={e => setClientId(e.target.value)}>
                                                <option value='' >- Select Client -</option>
                                                {data.clients.map(client => (
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default AddProjectModel