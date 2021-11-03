import { getFilterFunction, getTemplates, setValue } from './Autocomplete.utils';

describe('Autocomplete', () => {
  describe('utils', () => {

    describe('getFilterFunction', () => {
      const testCallback = (filterFunction, query, expected) => {
        let callbackCalled = false;
        filterFunction(query, (results) => {
          callbackCalled = true;
          expect(new Set(results)).toEqual(new Set(expected));
        });
        expect(callbackCalled).toBeTruthy();
      };
      it('should simply return an existing source function', () => {
        const SOURCE = () => [];
        const RESULT = getFilterFunction(SOURCE, undefined);
        expect(RESULT).toEqual(SOURCE);
      });
      it('should handle an undefined source', () => {
        const RESULT = getFilterFunction(undefined, undefined);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, 'apple', []); // Should return an empty set.
      });
      it('should handle a null source', () => {
        const RESULT = getFilterFunction(null, undefined);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, 'apple', []); // Should return an empty set.
      });
      it('should return a default filter function when there is no structure', () => {
        const SOURCE = [ 'apple', 'banana', 'cherry', 'DURIAN' ];
        const RESULT = getFilterFunction(SOURCE, undefined);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, '', SOURCE); // No query.
        testCallback(RESULT, 'apple', ['apple']); // Perfect match.
        testCallback(RESULT, 'durian', ['DURIAN']); // Case insensitive.
        testCallback(RESULT, 'a', ['apple', 'banana', 'DURIAN']); // Multiple matches.
        testCallback(RESULT, 'x', []); // No matches.
      });
      it('should return a filter function appropriate to the structure', () => {
        const SOURCE = [
          { name: 'apple' },
          { name: 'banana' },
          { name: 'cherry' },
          { name: 'DURIAN' }
        ];
        const STRUCTURE = { label: 'name' };
        const RESULT = getFilterFunction(SOURCE, STRUCTURE);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, '', SOURCE); // No query.
        testCallback(RESULT, 'apple', [{ name: 'apple' }]); // Perfect match.
        testCallback(RESULT, 'durian', [{ name: 'DURIAN' }]); // Case insensitive.
        testCallback(RESULT, 'a', [{ name: 'apple' }, { name: 'banana' }, { name: 'DURIAN' }]); // Multiple matches.
        testCallback(RESULT, 'x', []); // No matches.
      });
      it(`should handle a declared structure that doesn't match the source structure`, () => {
        const SOURCE = [
          { name: 'apple' },
          { name: 'banana' },
          { name: 'cherry' },
          { name: 'DURIAN' }
        ];
        const STRUCTURE = { label: 'label' };
        const RESULT = getFilterFunction(SOURCE, STRUCTURE);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, 'apple', []); // Should return an empty set.
      });
      it('should handle a structure that includes formatting', () => {
        const SOURCE = [
          { id: 'A', name: 'apple' },
          { id: 'B', name: 'banana' },
          { id: 'C', name: 'cherry' },
          { id: 'D', name: 'DURIAN' }
        ];
        const STRUCTURE = { format: '${id} - ${name}' };
        const RESULT = getFilterFunction(SOURCE, STRUCTURE);
        expect(RESULT).toBeInstanceOf(Function);
        testCallback(RESULT, '', SOURCE); // No query.
        testCallback(RESULT, 'apple', [{ id: 'A', name: 'apple' }]); // Partial match on formatted value.
        testCallback(RESULT, 'B - banana', [{ id: 'B', name: 'banana' }]); // Actual formatted value.
        testCallback(RESULT, 'c - CHER', [{ id: 'C', name: 'cherry' }]); // Case insensitive.
        testCallback(RESULT, 'D', [{ id: 'D', name: 'DURIAN' }]); // None of the name; just the ID.
        testCallback(RESULT, 'D-DUR', []); // Query that doesn't follow the format.
        testCallback(RESULT, ' - ', SOURCE); // Just part of the format, but no actual value (returns all of them in this instance).
      });
    });

    describe('getTemplates', () => {
      const checkValidTemplates = (templates) => {
        expect(templates).not.toBeNull();
        expect(templates.inputValue).toBeInstanceOf(Function);
        expect(templates.suggestion).toBeInstanceOf(Function);

      };
      it('should simply return existing valid templates', () => {
        const EXISTING_TEMPLATES = {
          inputValue: (item) => item || '',
          suggestion: (item) => item || ''
        };
        const RESULT = getTemplates(EXISTING_TEMPLATES, undefined);
        expect(RESULT).toEqual(EXISTING_TEMPLATES);
      });
      it('should default to returning the entire item when there is no structure', () => {
        const RESULT = getTemplates(undefined, undefined);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('bob');
        expect(RESULT.suggestion('jane')).toEqual('jane');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual({ name: 'bob' });
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual({ forename: 'Mary', surname: 'Sue' });
      });
      it('should return the appropriate value, based on the structure', () => {
        const STRUCTURE = { label: 'name' };
        const RESULT = getTemplates(undefined, STRUCTURE);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('');
        expect(RESULT.suggestion('jane')).toEqual('');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual('bob');
        expect(RESULT.suggestion({ name: 'jane' })).toEqual('jane');
        expect(RESULT.inputValue({ forename: 'Mary', surname: 'Sue' })).toEqual('');
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual('');
      });
      it('should return the appropriate value, based on the structure format', () => {
        const STRUCTURE = { format: '${forename} ${surname}' };
        const RESULT = getTemplates(undefined, STRUCTURE);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('');
        expect(RESULT.suggestion('jane')).toEqual('');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual('');
        expect(RESULT.suggestion({ name: 'jane' })).toEqual('');
        expect(RESULT.inputValue({ forename: 'Mary', surname: 'Sue' })).toEqual('Mary Sue');
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual('Mary Sue');
      });
      it('should handle an incomplete templates parameter', () => {
        const INVALID_TEMPLATES = {
          inputValue: undefined,
          suggestion: (item) => item || ''
        };
        const RESULT = getTemplates(INVALID_TEMPLATES, undefined);
        checkValidTemplates(RESULT);
        expect(RESULT.suggestion).toEqual(INVALID_TEMPLATES.suggestion);
        expect(RESULT.inputValue).toEqual(INVALID_TEMPLATES.suggestion); // Mirrored
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('bob');
        expect(RESULT.suggestion('jane')).toEqual('jane');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual({ name: 'bob' });
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual({ forename: 'Mary', surname: 'Sue' });
      });
    });

    describe('setState', () => {

      describe('valid autocomplete and filter function', () => {
        let SOURCE, AUTOCOMPLETE, FILTER_FUNCTION, TEMPLATES;
        beforeEach(() => {
          SOURCE = [
            { name: 'apple' },
            { name: 'banana' },
            { name: 'cherry' },
            { name: 'DURIAN' }
          ];
          const ITEM_STRUCTURE = { label: 'name' };
          FILTER_FUNCTION = getFilterFunction(SOURCE, ITEM_STRUCTURE);
          TEMPLATES = getTemplates(null, ITEM_STRUCTURE);
          AUTOCOMPLETE = {
            state: undefined,
            setState: (state) => {
              AUTOCOMPLETE.state = state;
            },
            props: {
              templates: TEMPLATES,
              source: FILTER_FUNCTION
            }
          };
        });

        it('should handle a null value', () => {
          expect(AUTOCOMPLETE.state).toBeUndefined();
          setValue(AUTOCOMPLETE, null);
          expect(AUTOCOMPLETE.state).toBeDefined();
          expect(AUTOCOMPLETE.state).toEqual({
            query: '',
            menuOpen: false,
            options: [],
            validChoiceMade: false
          });
        });

        it('should handle a valid option', () => {
          const VALUE = { name: 'apple' };
          expect(AUTOCOMPLETE.state).toBeUndefined();
          setValue(AUTOCOMPLETE, VALUE);
          expect(AUTOCOMPLETE.state).toBeDefined();
          expect(AUTOCOMPLETE.state).toEqual({
            query: VALUE.name,
            options: [VALUE],
            validChoiceMade: true
          });
        });

        it('should handle an invalid option', () => {
          const VALUE = { name: 'grapefruit' };
          expect(AUTOCOMPLETE.state).toBeUndefined();
          setValue(AUTOCOMPLETE, VALUE);
          expect(AUTOCOMPLETE.state).toBeDefined();
          expect(AUTOCOMPLETE.state).toEqual({
            query: VALUE.name,
            options: [],
            validChoiceMade: false
          });
        });
      });

    });

  });
});