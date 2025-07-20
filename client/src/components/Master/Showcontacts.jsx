import { useEffect, useState } from "react";
import API from "../../axiosconfig";
import Loader from "../Utility/Loader";

const Showcontacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
               const res = await API.get("/home/showcontact");
                setContacts(res.data.reverse()); //  latest first
            } catch (err) {
                console.error("Error fetching contacts:", err);
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>All Contact Requests</h2>
            {contacts.length === 0 ? (
                <p>No contact submissions found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {contacts.map((contact, index) => (
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
                            <p><strong>Name:</strong> {contact.name}</p>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <p><strong>Address:</strong> {contact.address}</p>
                            <p><strong>Budget:</strong> ₹{contact.budget}</p>
                            <p><strong>Use For:</strong> {contact.usefor}</p>
                            <p><strong>Till Weeks:</strong> {contact.tillWeeks}</p>
                            <p><strong>Submitted On:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
                            {contact.about && <p><strong>About:</strong> {contact.about}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Showcontacts;
