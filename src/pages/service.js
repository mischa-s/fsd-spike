import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

import Page from '../containers/page';
import ServiceProvider from '../components/service-provider';
import ServiceDetails from '../components/service-details';
import MapContainer from '../containers/map-container';
import { Accordion } from 'react-accessible-accordion';
import { loadService } from '../utilities/api';
import uniqueServices from '../utilities/uniqueServices';
import UserLocation from '../utilities/userLocation';

export default class Service extends Component {
  state = {
    provider: null,
    services: [],
    userAddresss: null,
    userLatitude: '',
    userLongitude: '',
  };

  componentDidMount = async () => {
    const { 
      address: userAddress,
      latitude: userLatitude, 
      longitude: userLongitude,
    } = queryString.parse(this.props.location.search);

    const {
      provider, 
      services
    } = await loadService(this.props.match.params.id)

    this.setState({
      provider: provider,
      services: uniqueServices(services, 'SERVICE_NAME'),
      userAddress,
      userLatitude,
      userLongitude,
    });
  };

  render() {
    const {
      history: { goBack },
    } = this.props;

    const {
      provider,
      services,
      userAddress,
      userLatitude,
      userLongitude,
    } = this.state;

    const userLocation = UserLocation(
        userAddress,
        userLatitude, 
        userLongitude);

    return (
      <Page className="service__page">
        <section>
          <button className="icon-prefix__container button back-button" onClick={goBack}>
            <div className="icon-prefix__icon">
              <Icon icon={faChevronLeft} />
            </div>
            <span className="icon-prefix__label">Go back</span>
          </button>

          {(provider && services) && <Fragment>
              <ServiceProvider
                provider={provider}
                userLocation={userLocation}
              />
              <Accordion>
                {services.map((service, i) =>
                    <ServiceDetails
                      expanded={i === 0}
                      key={`service_${i}`}
                      service={service}
                    />)}
              </Accordion>
              <MapContainer 
                serviceProviders={[provider]}
                userAddress={userAddress}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
              />
            </Fragment>}
        </section>
      </Page>
    );
  }
}
