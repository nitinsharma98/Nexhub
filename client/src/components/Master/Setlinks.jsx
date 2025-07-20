import { useState, useEffect } from "react";
import API from "../../axiosconfig";

const Setlinks = () => {
    const [instagram, setInstagram] = useState("");
    const [telegram, setTelegram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [gmail, setGmail] = useState("");
    const [contact, setContact] = useState("");
    const [github, setGithub] = useState("");
    const [linkdin, setLinkdin] = useState("");
    const [naukri, setNaukri] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // 🟢 Fetch existing data from backend
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await API.get("/home/getmasterlinks");
                const data = res.data.links;

                if (data) {
                    setInstagram(data.instagram || "");
                    setTelegram(data.telegram || "");
                    setWhatsapp(data.whatsapp || "");
                    setGmail(data.gmail || "");
                    setContact(data.contact || "");
                    setGithub(data.github || "");
                    setLinkdin(data.linkdin || "");
                    setNaukri(data.naukri || "");
                }
            } catch (err) {
                console.error("Failed to load links:", err);
                setError("Unable to fetch existing link data.");
            }
        };

        fetchLinks();
    }, []);

    const handleDone = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await API.post("/home/community/comV/updatelinks", {
                instagram,
                telegram,
                whatsapp,
                gmail,
                contact,
                github,
                linkdin,
                naukri,
            });

            if (res.data.success) {
                setMessage("Links updated successfully!");
            }
        } catch (err) {
            console.error("Error updating links:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const start = async () => {
        try {
            await API.post("/home/community/comV/start");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
                <h2 style={{ marginBottom: "1rem" }}>Set Links</h2>
                <form onSubmit={handleDone} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram URL" className="form-control" />
                    <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="Telegram URL" className="form-control" />
                    <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp Number/URL" className="form-control" />
                    <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} placeholder="Gmail Address" className="form-control" />
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone Contact" className="form-control" />
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub URL" className="form-control" />
                    <input type="text" value={linkdin} onChange={(e) => setLinkdin(e.target.value)} placeholder="LinkedIn URL" className="form-control" />
                    <input type="text" value={naukri} onChange={(e) => setNaukri(e.target.value)} placeholder="Naukri/Job Profile URL" className="form-control" />

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>

                {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>

            <br /><br /><br /><br /><hr /><br />
            <div style={{ textAlign: "center" }}>
                <button onClick={start} className="btn btn-secondary">Default</button>
            </div>
        </>
    );
};

export default Setlinks;
