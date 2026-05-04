import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/SubscribeForm.css"

const SubscribeForm = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberNameError, setSubscriberNameError] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriberEmailError, setSubscriberEmailError] = useState("");

  const [subscriberErrorMessage, setSubscriberErrorMessage] = useState("");
  const [subscriberSuccessMessage, setSubscriberSuccessMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Dynamic styles based on screen size
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00baff',
    minHeight: isMobile ? '400px' : '460px',
    padding: isMobile ? '40px 15px' : isTablet ? '60px 30px' : '100px 20px',
    width: '100%'
  };

  const maxWidthContainerStyle = {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  };

  const whiteBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '2px',
    margin: '0 auto',
    padding: isMobile ? '30px 20px' : isTablet ? '40px 30px' : '50px 40px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headingStyle = {
    color: '#1a1a1a',
    fontSize: isMobile ? '20px' : isTablet ? '24px' : '27px',
    fontWeight: '800',
    lineHeight: isMobile ? '22px' : '24px',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const paragraphStyle = {
    color: '#464646',
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: '600',
    marginTop: isMobile ? '15px' : '20px',
    marginBottom: isMobile ? '20px' : '22px',
    padding: '0',
    textAlign: 'center',
    width: isMobile ? '95%' : isTablet ? '80%' : '70%',
    lineHeight: '1.4'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    padding: '0',
    width: isMobile ? '100%' : '90%'
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    padding: '0',
    width: '100%',
    gap: isMobile ? '15px' : '22px'
  };

  const inputStyle = {
    backgroundColor: '#ececec',
    border: 'none',
    outline: 'none',
    borderRadius: '2px',
    height: '50px',
    padding: '0 20px',
    width: isMobile ? '100%' : isTablet ? 'calc(50% - 11px)' : '415px',
    fontSize: '16px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    backgroundColor: '#00baff',
    border: '1px solid transparent',
    borderRadius: '2px',
    color: 'white',
    cursor: 'pointer',
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: '800',
    height: '50px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    width: isMobile ? '100%' : isTablet ? '200px' : '225px',
    marginTop: isMobile ? '10px' : '0',
    fontFamily: 'inherit'
  };

  const checkOnChange = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setSubscriberErrorMessage(
        <p className="SubscribeforUpdates_error__kzSBx">Email address is required</p>
      );
      setSubscriberEmailError(true);
    }
    else if (!emailRegex.test(email)) {
      setSubscriberErrorMessage(
        <p className="SubscribeforUpdates_error__kzSBx">Invalid email address</p>
      );
      setSubscriberEmailError(true);
    }
    else {
      // VALID EMAIL → CLEAR ERROR
      setSubscriberErrorMessage("");
      setSubscriberEmailError(false);
    }
  };

  const submitBtnClk = (e) => {
    e.preventDefault();

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSubscriberEmailError(false);
    setSubscriberNameError(false);
    setSubscriberErrorMessage("");
    // if (subscriberName === "") {
    //   setSubscriberErrorMessage("Name is Required")
    //   // toast.error("Name is Required", {
    //   //   position: "top-right",
    //   //   autoClose: 5000,
    //   //   hideProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   // });
    //   setSubscriberNameError('minimum 3 characters is Required!');
    // } else if (subscriberName?.length < 3) {
    //   setSubscriberErrorMessage(<p style={{ color: 'red', fontSize: '14px', fontWeight: 500, textAlign: 'left', marginTop: '2px', position: 'absolute' }}>minimum 3 characters is Required!</p>)
    //   // toast.error("minimum 3 characters is Required!", {
    //   //   position: "top-right",
    //   //   autoClose: 5000,
    //   //   hideProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   // });
    //   setSubscriberNameError(true);
    // } else 
    if (!subscriberEmail || subscriberEmail.trim() === "") {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Email address is required</p>)
      // toast.error("Email is Required", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      setSubscriberEmailError(true);
      hasError = true;
    } else if (!emailRegex.test(subscriberEmail)) {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Email address is required</p>)
      setSubscriberEmailError(true);
      hasError = true;
    } else {
      setSubscriberErrorMessage("");
    }

    if (hasError) return;

    setSubscriberSuccessMessage(<p style={{ color: 'green' }}>Subscribed Successfully</p>)
    setTimeout(() => {
      setSubscriberSuccessMessage("");
    }, 5000);

    const finalData = new FormData();
    finalData.append("subscriberName", subscriberName);
    finalData.append("subscriberEmail", subscriberEmail);

    const requestOptions = {
      method: "POST",
      body: finalData,
    };
    fetch("https://www.linq-staging-site.com/admin1/addsubscriber", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          // toast.success("Record Added Successfully.", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          setSubscriberEmail("");
          setSubscriberName("");
        } else {
          // toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        // toast.error("There was an error, Please try again later.", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = '#00baff';
      e.target.style.borderColor = '#00baff';
    } else {
      e.target.style.backgroundColor = '#00baff';
      e.target.style.color = 'white';
      e.target.style.borderColor = 'transparent';
    }
  };

  return (
    <div className="SubscribeforUpdates_updatesContainer__DD3wT">
      <div>
        <div>
          <h2>SUBSCRIBE FOR UPDATES</h2>
          <p>By submitting, you agree to receive email communications from the event organizers, including upcoming promotions and discounted tickets, new, and access to related events.</p>
          <form className="WDRM_2025_subscribe_form row g-3 needs-validation subForm form_WDRM" encType="multipart/form-data" method="POST" data-hs-cf-bound="true" onSubmit={submitBtnClk}>
            <div className="SubscribeforUpdates_from__REPoW">
              <input name="name" placeholder="Name" value={subscriberName} onChange={(e) => {
                setSubscriberName(e.target.value);
                setSubscriberNameError(false);
              }}></input>
              <div>
                <input name="email" placeholder="Email address" value={subscriberEmail} onChange={(e) => {
                  setSubscriberEmail(e.target.value);
                  if (subscriberErrorMessage) checkOnChange(e.target.value);
                  setSubscriberEmailError(false);
                  setSubscriberErrorMessage("");
                }}></input>
                {subscriberErrorMessage}
              </div>
              <button type="submit">Join</button>
            </div>
          </form>
          {subscriberSuccessMessage}
        </div>
      </div>
    </div>
    // <div style={containerStyle}>
    //   <div style={maxWidthContainerStyle}>
    //     <div style={whiteBoxStyle}>
    //       <h2 style={headingStyle}>
    //         SUBSCRIBE FOR UPDATES
    //       </h2>
    //       <p style={paragraphStyle}>
    //         By submitting, you agree to receive email communications from the
    //         event organizers, including upcoming promotions and discounted
    //         tickets, new, and access to related events.
    //       </p>
    //       <form style={formStyle} onSubmit={submitBtnClk}>
    //         <div style={inputContainerStyle}>
    //           <input
    //             style={inputStyle}
    //             name="name"
    //             type="text"
    //             placeholder="Name *"
    //             required
    //             value={subscriberName}
    //             onChange={(e) => {
    //               setSubscriberName(e.target.value);
    //               setSubscriberNameError(false);
    //             }}
    //           />
    //           <input
    //             style={inputStyle}
    //             name="email"
    //             type="email"
    //             placeholder="Email Address *"
    //             required
    //             value={subscriberEmail}
    //             onChange={(e) => {
    //               setSubscriberEmail(e.target.value);
    //               setSubscriberEmailError(false);
    //             }}
    //           />
    //           <button
    //             style={buttonStyle}
    //             type="submit"
    //             onMouseEnter={(e) => handleButtonHover(e, true)}
    //             onMouseLeave={(e) => handleButtonHover(e, false)}
    //           >
    //             Join
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SubscribeForm;