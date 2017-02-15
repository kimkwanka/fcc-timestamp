const expect = require('chai').expect;

describe('server', () => {
    it('should exist', () => {
        expect(require('./server.js')).to.be.defined;
    });
    let dateStrToJSON = require('./server.js').dateStrToJSON;

    describe('dateStrToJSON()', () => {
        it('should take a unix timestamp as the dateStr and return a proper JSON object (timestamp)', () => {
            let input = '1450137600',
                actual = dateStrToJSON(input),
                expected = {"unix": 1450137600, "natural": "December 15, 2015"};
            expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
        });
        it('should take a valid natural date as dateStr and return a proper JSON object (timestamp)', () => {
            let input = 'December 15, 2015',
                actual = dateStrToJSON(input),
                expected = {"unix": 1450137600, "natural": "December 15, 2015"};
            expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
        });
        it('should take an invalid dateStr and return a JSON object (timestamp) where each property is null', () => {
            let input = 'asdasdasdasdas123',
                actual = dateStrToJSON(input),
                expected = {"unix": null, "natural": null};
            expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
        });
    });
});