import React, {useState, useEffect } from "react";
import "../assets/css/ForumSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import speakerVideo from "../../src/assets/WebVideo/iq-hub-video.mp4";
const bgIg =
  "https://www.desalination-resource-recovery.com/api/images/1742798974985.png";

const ForumSection = () => {
  const [taglineData, setTaglineData] = useState([]);
  useEffect(() => {
    callTaglineListApi();
    // eslint-disable-next-line
  }, []);
  const callTaglineListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`http://127.0.0.1:8000/admin1/taglinedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setTaglineData(data["taglineData"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };
  return (
    <article
      className="ForumSction_forumSection__Rvsvv"
      style={{
        backgroundImage: `url(${taglineData[0]?.thirdSectionBackgroundImage})`,
      }}
    >
      <h2>{taglineData[0]?.thirdSectionFirstTitle}</h2>
      <div className="ForumSction_forumContainer__wbFFJ">
        <div className="ForumSction_forumLeft__29GMV">
          <span>
            {/* <p>
              {taglineData[0]?.thirdSectionDescription?.replace(
                /^"(.*)"$/,
                "$1"
              )}
            </p> */}
            <div
              lang="en"
              dangerouslySetInnerHTML={{
                __html: taglineData[0]?.thirdSectionDescription?.replace(
                  /^"(.*)"$/,
                  "$1"
                ),
              }}
            ></div>
          </span>
        </div>
        <div className="ForumSction_forumRight__f3wIx">
          <div className="lazyload-wrapper">
            <iframe
              src={speakerVideo}
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              className="ForumSction_iFrame__q2G3W"
            ></iframe>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ForumSection;
