import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';

export default class ServiceProviders extends Component {
  static propTypes = {
    fsdId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    purpose: PropTypes.string,
    address: PropTypes.string,
    classification: PropTypes.string,
    contactAvailability: PropTypes.string,
    name: PropTypes.string.isRequired,
    website: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    hideMoreDetails: PropTypes.bool,
  };

  render() {
    const {
      fsdId,
      purpose,
      address,
      classification,
      contactAvailability,
      name,
      website,
      email,
      phoneNumber,
      userLatitude,
      userLongitude,
      providerLatitude,
      providerLongitude
    } = this.props;

    return (
      <section className="service">
        <ServiceHeader
          fsdId={fsdId}
          address={address}
          contactAvailability={contactAvailability}
          name={name}
          website={website}
          email={email}
          phoneNumber={phoneNumber}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
          providerLatitude={providerLatitude}
          providerLongitude={providerLongitude}
        />

        {purpose && <blockquote className="service__purpose">{purpose}</blockquote>}

        <footer className="service__footer">
          {classification && 
            <ServiceClassification classification={classification} />
          }
        </footer>
      </section>
    );
  }
}
