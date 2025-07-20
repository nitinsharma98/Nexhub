import { useState } from "react";
import API from "../../axiosconfig";

const Certification = () => {
    const [formData, setFormData] = useState({
        name: "",
        course: "",
        work: "",
        startDate: "",
        weeks: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [certificateId, setCertificateId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "weeks" ? Number(value) : value  // Ensure weeks is a number
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setCertificateId(null);

        try {
            const res = await API.post("/home/certification", formData);
            if (res.data.success) {
                setMessage(res.data.message);
                setCertificateId(res.data.certificateId);
                setFormData({ name: "", course: "", work: "", startDate: "", weeks: "" });
            }
        } catch (err) {
            console.error("Certification error:", err);
            setError(err.response?.data?.message || "Failed to generate certificate");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Generate Certificate</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
                
                <select name="work" value={formData.work} onChange={handleChange} required>
                    <option value="">Select Work Type</option>
                    <option value="Internship">Internship</option>
                    <option value="Training">Training</option>
                    <option value="Course Completion">Course Completion</option>
                    <option value="Work Experience">Work Experience</option>
                </select>

                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="number" name="weeks" placeholder="Duration (weeks)" value={formData.weeks} onChange={handleChange} required />
                
                <button type="submit">Generate Certificate</button>
            </form>

            {message && (
                <p style={{ color: "green", marginTop: "10px" }}>
                    {message} — Certificate ID: <strong>{certificateId}</strong>
                </p>
            )}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default Certification;
