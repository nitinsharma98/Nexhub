import API from "../../axiosconfig";
import { useRef , useState} from "react";
import imga from "../../images/download.png";
import Upbtn from "../Utility/Upbtn"

const Certificate = () => {

    const idRef = useRef();
    const [Data , setData] = useState(null);

    const fetchCertificate = async () => {
    const id = idRef.current?.value;    

    try {
      if (!id) return alert("Please enter an ID");
      const res = await API.get(`/home/certificate/${id}`);
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching certificate:", error.response?.data || error.message);
    alert("Certificate not found or an error occurred.");
    }

    idRef.current.value = "";
  };
  

  const currenturl = window.location.href;
  const url =Data ?  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currenturl}/${Data._id}` : "";
  

    return (
        <>

       
            <div
  className="input-group shadow"
  style={{
    width: '60vw',
    maxWidth: '700px',
    margin: '5vh auto',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }}
>
  <input
    type="text"
    ref={idRef}
    className="form-control"
    required
    placeholder="Enter your Certificate ID..."
    style={{
      padding: '1rem',
      fontSize: '1rem',
      border: '1px solid #ced4da',
      borderRight: 'none',
    }}
  />
  <button
    onClick={fetchCertificate}
    className="btn btn-danger"
    type="button"
    style={{
      padding: '0 1.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      fontSize: '1rem',
    }}
  >
    Confirm
  </button>
</div>


        <br /><br />

       {Data && 
        <div
  style={{
    height: 'auto',
    width: '100%',
    padding: '3% 8%',
    backgroundColor: '#fff',
    border: '10px solid #333',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    fontFamily: 'Georgia, serif',
    color: '#222',
    lineHeight: 1.8,
  }}
>
  <h2 style={{ textAlign: 'center', fontSize: '2rem', textTransform: 'uppercase', color: '#EF0D00', marginBottom: '2rem' }}>
    {Data.work} Certificate
  </h2>

  <div style={{ fontSize: '1rem', textAlign: 'justify', padding: '0 1rem' }}>
    <p style={{ textAlign: 'right', fontSize: '0.9rem' }}>
      Date: {new Date(Date.now()).toLocaleDateString('en-GB')}
    </p>

    <p style={{ fontSize: '1.1rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '1.5rem' }}>
      This is to certify that Mr./Mrs. {Data.name}
    </p>

    <p>
      Has been working with us at <strong>Nexhub Development Pvt. Ltd.</strong>, Hisar, Haryana, India – 125033, on a <strong>{Data.course}</strong> for a duration of <strong>{Data.weeks}</strong> weeks, from <strong>{new Date(Data.startDate).toLocaleDateString('en-GB')}</strong> to <strong>{new Date(Data.endDate).toLocaleDateString('en-GB')}</strong>.
    </p>

    <p>
      He/She has shown sincerity, dedication, and eagerness to learn. We acknowledge his/her excellent conduct and character, and we have no hesitation in recommending him/her for future endeavors.
    </p>

    <br />

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', marginTop: '2rem' }}>
      <div>
        <p>Sincerely,</p>
        <p style={{ fontWeight: 'bold' }}>{Data.name}</p>
        <p>{Data.work}</p>
        <p>ID: {Data._id}</p>
      </div>
      <div style={{display:'flex' , flexDirection:'column'}}>
        {/* <img src={url} style={{ height: '7rem', width: '7rem', border: '1px solid #000', padding: '4px' }} /> */}
        <img src={imga} style={{height:'4rem' , width:'7rem'}}/>
      </div>
    </div>
  </div>
</div>

        }
        <br /><br />

        <Upbtn/>
        </>
    )
}

export default Certificate;