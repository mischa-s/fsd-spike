import React, { Component } from 'react';

export default class SearchCriteria extends Component {
  render() {
    /* Note that numOfResults is currently ignored, in favour of
    numOfResultsDisplayed. This reflects the default limit of 50 search provider
    results displayed in index.js.

    If pagination of results is added in future numOfResults will become useful
    again to show the total number of results found across all pages, for
    example "Showing ${numOfResultsDisplayed} of {numOfResults} results". */
    // eslint-disable-next-line no-unused-vars
    const {
      keyword,
      address,
      region,
      category,
      numOfResultsDisplayed,
    } = this.props;
    const searchCriteria = createSearchCriteria(
      keyword,
      address,
      region,
      category,
    );

    return (
      <section className="search__criteria">
        <p>
        {searchCriteria}
        {' '}
        {searchCriteria &&
          <span>
          ({numOfResultsDisplayed} results)
          </span>
        }
        </p>
      </section>);
  }
}

function createSearchCriteria(keyword, address, region, category) {
  const search = ['Searching'];

  if (keyword) search.push(
      <span key={`k:${keyword}`}>{' '} for: <b>{keyword}</b>{' '}</span>,
    );
  if (address || region) search.push(
      <span key={`a:${address || region}`}>{' '} near: <b>{address || region}</b></span>,
    );
  if (category) search.push(
      <span key={`c:${category}`}>{' '} in: <b>{category}</b></span>,
    );
  if (search.length < 2) return null;

  return search;
}
