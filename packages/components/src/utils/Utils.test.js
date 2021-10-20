import Utils from './Utils';

describe('Utils', () => {

  describe('interpolateString', () => {

    it('should interpolate a nested object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<span>${item.label}</span>';
      const OBJECT = { item: { id: '1', label: 'Item 1' } };
      const RESULT = Utils.interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<span>Item 1</span>');
    });

    it('should interpolate multiple properties on the object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'Bob', surname: 'Smith' };
      const RESULT = Utils.interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<div>Bob Smith</div>');
    });

    it('should fallback on missing properties on the object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'William' };
      const FALLBACK = 'Fallback-Jones';
      const RESULT = Utils.interpolateString(TEMPLATE, OBJECT, FALLBACK);
      expect(RESULT).toEqual('<div>William Fallback-Jones</div>');
    });

    it('should default fallback to an empty string', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'David' };
      const RESULT = Utils.interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<div>David </div>');
    });

    it('should handle an undefined template', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const OBJECT = { forename: 'David' };
      const RESULT = Utils.interpolateString(undefined, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle a null template', () => {
      const OBJECT = { forename: 'David' };
      const RESULT = Utils.interpolateString(null, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle a non-string template', () => {
      const OBJECT = { forename: 'David' };
      const RESULT = Utils.interpolateString(3, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle an undefined object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const RESULT = Utils.interpolateString(TEMPLATE, undefined);
      expect(RESULT).toEqual('<div> </div>');
    });

    it('should handle an undefined object with a fallback', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const FALLBACK = 'Hello';
      const RESULT = Utils.interpolateString(TEMPLATE, undefined, FALLBACK);
      expect(RESULT).toEqual('<div>Hello Hello</div>');
    });

    it('should handle a null object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const RESULT = Utils.interpolateString(TEMPLATE, null);
      expect(RESULT).toEqual('<div> </div>');
    });

    it('should handle a null object with a fallback', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const FALLBACK = 'Hello';
      const RESULT = Utils.interpolateString(TEMPLATE, null, FALLBACK);
      expect(RESULT).toEqual('<div>Hello Hello</div>');
    });

  });

});
