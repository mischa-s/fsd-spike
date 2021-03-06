import { 
  getRelativePath, 
  getQueryParams, 
  getFragment,
} from '../hashRoutedUrls';

describe('parseHashRouterUrl.js', () => {
  describe ('when the URL has no fragment at all', () => {
    let url = 'http://mydomain.com/basepath/';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has a relative path only', () => {
    let url = 'http://mydomain.com/basepath/#/relative/path';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has a relative path with no leading slash', () => {
    let url = 'http://mydomain.com/basepath/#relative/path';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('relative/path');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has query params only', () => {
    let url = 'http://mydomain.com/basepath/#/?size=medium&color=red';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });

  describe('when the URL has and additional fragment only', () => {
    let url = 'http://mydomain.com/basepath/#/#top';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({});
    });
  });

  describe('when the URL has a relative path and query params', () =>{
    let url = 'http://mydomain.com/basepath/#/relative/path?size=medium&color=red';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });

  describe('when the URL has a relative path, query params, and an additional fragment', () =>{
    let url = 'http://mydomain.com/basepath/#/relative/path?size=medium&color=red#top';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getQueryParams responds correctly', () => {
      expect(getQueryParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });
});
