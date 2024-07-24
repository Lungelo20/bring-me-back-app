import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/ReportList.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const settings = {
  dots: true, 
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
};

const ReportList = ({ reports }) => {
  const reportsArray = reports && reports.$values && Array.isArray(reports.$values)
    ? reports.$values
    : [];

  const ImageURL = "http://localhost:5157/";
  const useSlider = reportsArray.length > 1;

  return (
    <div className="report-list">
      {useSlider ? (
        <Slider {...settings}>
          {reportsArray.map(report => (
            <div key={report.reportId} className="report-slide">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  className="card-img-top"
                  src={report.recentPhotos && report.recentPhotos.$values
                    ? `${ImageURL}${report.recentPhotos.$values}`
                    : "https://placehold.co/600x400.png"}
                  alt={report.fullName || report.itemName || 'Image'}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {report.fullName || report.itemName || 'Name not specified'}
                  </h5>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {report.foundLocation || report.lastSeenLocation || report.lastKnownLocation || 'Location not specified'}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faExclamationCircle} /> {report.conditionWhenFound || report.medicalConditions || report.uniqueIdentifiers || 'Condition not specified'}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(report.foundDateTime || report.lastSeenDateTime).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {report.reportType}
                  </p>
                  <Link to={`/report/${report.reportId}`}>
                    <Button variant="primary" className="mr-2">Details</Button>
                  </Link>
                  <Link to={`/report/edit/${report.reportId}`}>
                    <Button variant="info" className="mr-2">Edit</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        reportsArray.map(report => (
          <div key={report.reportId} className="report-slide">
            <div className="card" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={report.recentPhotos || "https://placehold.co/600x400.png"}
                alt={report.fullName || report.itemName || 'Image'}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {report.fullName || report.itemName || 'Name not specified'}
                </h5>
                <p className="card-text">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {report.foundLocation || report.lastSeenLocation || report.lastKnownLocation || 'Location not specified'}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faExclamationCircle} /> {report.conditionWhenFound || report.medicalConditions || report.uniqueIdentifiers || 'Condition not specified'}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(report.foundDateTime || report.lastSeenDateTime).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Status:</strong> {report.reportType}
                </p>
                <Link to={`/report/${report.reportId}`}>
                  <Button variant="primary" className="mr-2">Details</Button>
                </Link>
                <Link to={`/report/edit/${report.reportId}`}>
                  <Button variant="info" className="mr-2">Edit</Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReportList;
