import API from "../../axiosconfig";
import Loader from "../Utility/Loader";
import { useEffect, useState } from "react";

const Details = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [col, setCol] = useState(""); // for form input
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await API.get("/home/getdetails");
                setData(res.data.chats);
            } catch (err) {
                console.error("Error fetching details:", err);
                setError(err.response?.data?.message || "Something went wrong");
            }
        };

        fetchDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setError("");

        try {
            const res = await API.post("/home/details", { col });
            if (res.data.success) {
                setSuccessMsg("Detail added successfully.");
                setCol(""); // clear input
                // Refresh data
                const refreshed = await API.get("/home/getdetails");
                setData(refreshed.data.chats);
            }
        } catch (err) {
            console.error("Error posting detail:", err);
            setError(err.response?.data?.message || "Failed to add detail.");
        }
    };

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!data) {
        return <Loader />;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Details</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={col}
                    onChange={(e) => setCol(e.target.value)}
                    placeholder="Enter detail"
                    required
                    style={{ padding: "8px", marginRight: "10px", width: "300px" }}
                />
                <button type="submit" style={{ padding: "8px 16px" }}>Add</button>
            </form>

            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

            <div style={{ background: "#f0f0f0", padding: "10px" }}>
                {Array.isArray(data) && data.length > 0 ? (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index} >{item.col} <br /><hr /><br /> </li> 
                        ))}
                    </ul>
                ) : (
                    <p>No details found.</p>
                )}
            </div>
                    <br /><br /><hr /><hr /><br /><br />
            <pre style={{ background: "#f0f0f0", padding: "10px" }}>
                {JSON.stringify(data, null, 2)}
                
            </pre>
        </div>
    );
};

export default Details;
