import { useState } from "react";
import API from "../../axiosconfig";

const Uploadcode = () => {
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        about: "",
        images: "",
        instructions: "",
        links: "",
        tags: "",
        isFree: false,
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await API.post("/home/community/comV/uploadpaidcodes", formData);
            if (res.data.success) {
                setMessage("Code uploaded successfully!");
                setFormData({
                    title: "",
                    code: "",
                    about: "",
                    images: "",
                    instructions: "",
                    links: "",
                    tags: "",
                    isFree: false,
                });
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
            <h2 className="mb-3">Upload Code</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                />

                <textarea
                    name="code"
                    placeholder="Paste your code here"
                    value={formData.code}
                    onChange={handleChange}
                    rows="5"
                    className="form-control"
                    required
                />

                <textarea
                    name="about"
                    placeholder="About this code"
                    value={formData.about}
                    onChange={handleChange}
                    rows="3"
                    className="form-control"
                    required
                />

                <input
                    type="text"
                    name="images"
                    placeholder="Image URL (comma-separated)"
                    value={formData.images}
                    onChange={handleChange}
                    className="form-control"
                />

                <textarea
                    name="instructions"
                    placeholder="Instructions to use the code"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="3"
                    className="form-control"
                    required
                />

                <input
                    type="text"
                    name="links"
                    placeholder="Related Links (comma-separated)"
                    value={formData.links}
                    onChange={handleChange}
                    className="form-control"
                />

                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    className="form-control"
                />

                <div>
                    <input
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleChange}
                        id="isFree"
                    />
                    <label htmlFor="isFree" style={{ marginLeft: "8px" }}>Mark as Free</label>
                </div>

                <button type="submit" className="btn btn-success mt-3">Upload Code</button>
            </form>

            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default Uploadcode;
