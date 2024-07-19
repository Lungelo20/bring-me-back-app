import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../api/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'General' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            if (data && Array.isArray(data.$values)) {
                setUsers(data.$values);
            } else {
                setUsers([]);
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Set to empty array in case of error
        }
    };

    const handleCreateUser = async () => {
        try {
            await createUser(newUser);
            fetchUsers();
            setNewUser({ name: '', email: '', password: '', role: 'General' });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updateUser(selectedUser.id, selectedUser);
            fetchUsers();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSelectUser = async (id) => {
        try {
            const user = await getUserById(id);
            setSelectedUser(user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <div>
                <h3>Create New User</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="General">General</option>
                    <option value="Organization">Organization</option>
                    <option value="CommunityMember">Community Member</option>
                    <option value="FamilyMember">Family Member</option>
                    <option value="PublicAuthority">Public Authority</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="DonorSupporter">Donor Supporter</option>
                </select>
                <button onClick={handleCreateUser}>Create User</button>
            </div>
            <div>
                <h3>User List</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => handleSelectUser(user.id)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedUser && (
                <div>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={selectedUser.password}
                        onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                    />
                    <select
                        value={selectedUser.role}
                        onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    >
                        <option value="General">General</option>
                        <option value="Organization">Organization</option>
                        <option value="CommunityMember">Community Member</option>
                        <option value="FamilyMember">Family Member</option>
                        <option value="PublicAuthority">Public Authority</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="DonorSupporter">Donor Supporter</option>
                    </select>
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
