import Component from './Component';

describe('Component', () => {

  describe('hasLabel', () => {
    Component.TYPES_WITH_LABELS.forEach(type => {
      it(`should return true for a type of '${type}'`, () => {
        const OPTIONS = { type };
        expect(Component.hasLabel(OPTIONS)).toEqual(true);
      });
    });
    it('should return false if options is undefined', () => {
      expect(Component.hasLabel(undefined)).toEqual(false);
    });
    it('should return false if options is null', () => {
      expect(Component.hasLabel(null)).toEqual(false);
    });
    it('should return false if options has no type', () => {
      expect(Component.hasLabel({ bob: 'Bob' })).toEqual(false);
    });
    it(`should return false if options has a type of 'hidden'`, () => {
      expect(Component.hasLabel({ type: 'hidden' })).toEqual(false);
    });
  });

});
