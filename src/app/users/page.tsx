'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '../../../lib/api';

export default function UsersPage() {
const queryClient = useQueryClient();
const { data: users, isLoading } = useQuery({
queryKey: ['users'],
queryFn: () => api.get('/users').then(res => res.data),
});
console.log(users);

const deleteMutation = useMutation({
mutationFn: (id: string) => api.delete(`/users/${id}`),
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['users'] });
},
});

if (isLoading) return <div>Loading...</div>;

return (
<div className="p-4 max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/users/create" className="bg-green-500 text-white px-4 py-2 rounded">
        Add User
        </Link>
    </div>
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
            <thead>
                <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user: any) => (
                <tr key={user._id}>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">
                        <button onClick={()=> deleteMutation.mutate(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                            >
                            Delete
                        </button>
                        <Link href={`/users/edit/${user._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                        </Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
);
}