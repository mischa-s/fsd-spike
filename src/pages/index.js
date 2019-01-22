import React, { Component } from 'react';
import queryString from 'query-string';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import MapContainer from '../containers/map-container';
import { loadResults } from '../utilities/api';
import SearchForm from '../components/search-form'

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false,
    showExtraButtons: false,
    autoSuggestValue: ''
  };
  componentDidMount () {
    this.doLoadResults()
  }

  autoSuggestOnChange (newValue) {
    this.setState({
      autoSuggestValue: newValue
    });
  };
  toggleShowMap = () => this.setState({ showMap: !this.state.showMap });

  doSetCategory = categoryName => {
    const { categoryContext: { setCategory } } = this.props;

    setCategory(categoryName);
    this.doLoadResults({category: categoryName});
  };
  doResetSearch = (form) => {
    const { history: { push, location } } = this.props;
    const { categoryContext: { setCategory } } = this.props;

    form.reset()
    push(`${location.pathname}`);
    setCategory()
    this.setState({showMap: false, serviceProviders: [], autoSuggestValue: ''})
  }

  doLoadResults(newQuery) {
    const { history: { push, location } } = this.props;

    const searchVars = queryString.parse(location.search);
    const newSearchVars = Object.assign({}, searchVars, newQuery);
    const newSearchQuery = queryString.stringify(newSearchVars);

    loadResults(newSearchVars).then(res =>
      this.setState({ serviceProviders: res })
    );

    push(`${location.pathname}?${newSearchQuery}`);
  }

  showToggleMapButton(showExtraButtons) {
    const { showMap } = this.state;

    return showExtraButtons ? (
        <button onClick={() => this.toggleShowMap()}>
          {' '}
          {showListOrMapText(showMap)}
        </button>
    ) : null;
  }

  render() {
    const { serviceProviders, showMap, autoSuggestValue } = this.state;
    const { history } = this.props;

    const showExtraButtons = Boolean(serviceProviders && serviceProviders[0])

    return (
      <Page>
        <SearchContainer>
          <ServiceCategories doSetCategory={this.doSetCategory} />
          <SearchForm
            doLoadResults={this.doLoadResults.bind(this)}
            doResetSearch={this.doResetSearch}
            autoSuggestOnChange={this.autoSuggestOnChange.bind(this)}
            autoSuggestValue={autoSuggestValue}
            showExtraButtons={showExtraButtons}
          />
          {this.showToggleMapButton(showExtraButtons)}
        </SearchContainer>
        {showMap ? (
          <MapContainer serviceProviders={serviceProviders} />
        ) : (
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
            history={history}
          />
        )}
      </Page>
    );
  }
}

function showListOrMapText(showMap) {
  return showMap ? 'Show List' : 'Show Map';
}
