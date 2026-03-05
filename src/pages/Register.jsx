import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {

    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = register(
            form.name,
            form.email,
            form.password
        );

        if (result.success) {
            navigate("/");
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="p-10">

            <h2 className="text-xl mb-4">Register</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">

                <input name="name" placeholder="Name" onChange={handleChange} />

                <input name="email" placeholder="Email" onChange={handleChange} />

                <input name="password" placeholder="Password" onChange={handleChange} />

                <button className="bg-blue-500 text-white p-2"> Register </button>

            </form>

        </div>
    );
}

export default Register;