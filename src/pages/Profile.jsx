import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

function Profile() {

    const { user, updateProfile } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setForm(user);
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {

        const result = updateProfile(
            form.name,
            form.email,
            form.password
        );

        if (result.success) {
            setEditing(false);
            alert("Profile updated!");
        }

    };

    return (
        <div className="p-10 max-w-md">

            <h2 className="text-2xl font-bold mb-6">
                Profile
            </h2>

            <div className="flex flex-col gap-4">

                <input name="name" value={form.name} disabled={!editing} onChange={handleChange} className="border p-2 rounded"/>

                <input name="email" value={form.email} disabled={!editing} onChange={handleChange} className="border p-2 rounded"/>

                <input name="password" value={form.password} disabled={!editing} onChange={handleChange} className="border p-2 rounded"/>

                {!editing ? (
                    <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white p-2 rounded">
                        Edit Profile
                    </button>
                ) : (
                    <button onClick={handleSave} className="bg-green-600 text-white p-2 rounded">
                        Save Changes
                    </button>
                )}

            </div>

        </div>
    );
}

export default Profile;