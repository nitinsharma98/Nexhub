import { useEffect, useState } from "react";
import API from "../../axiosconfig";
import Loader from "../Utility/Loader";

const Getapplies = () => {
    const [applies, setApplies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplies = async () => {
            try {
                const res = await API.get("/home/getapplies");
                setApplies(res.data.reverse()); // show latest first
            } catch (err) {
                console.error("Error fetching applies:", err);
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchApplies();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Work With Us Applications</h2>
            {applies.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {applies.map((apply, index) => (
                        <li
                            key={index}
                            style={{
                                background: "#f5f5f5",
                                marginBottom: "15px",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                            }}
                        >
                            <p><strong>Name:</strong> {apply.name}</p>
                            <p><strong>Email:</strong> {apply.email}</p>
                            <p><strong>Phone:</strong> {apply.phone}</p>
                            <p><strong>Work Type:</strong> {apply.work}</p>
                            <p><strong>Domain:</strong> {apply.domain}</p>
                            <p><strong>Experience:</strong> {apply.experience || "None"}</p>
                            <p><strong>Last LPA:</strong> {apply.lastLPA || "N/A"}</p>
                            <p><strong>College:</strong> {apply.college || "N/A"}</p>
                            <p><strong>Current CGPA:</strong> {apply.currentCGPA}</p>
                            <p><strong>Passing Year:</strong> {new Date(apply.passingYear).getFullYear()}</p>
                            <p><strong>Submitted On:</strong> {new Date(apply.createdAt).toLocaleDateString()}</p>
                            {apply.about && <p><strong>About:</strong> {apply.about}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Getapplies;
