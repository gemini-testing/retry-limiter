'use strict';

const RetryLimiter = require('../../lib/retry-limiter');

describe('lib/retry-limiter', () => {
    describe('.create()', () => {
        it('should create an instance of a retry limiter', () => {
            assert.instanceOf(RetryLimiter.create(), RetryLimiter);
        });
    });

    describe('.exceedLimit()', () => {
        const createRetryLimiter = (opts) => RetryLimiter.create(opts.limit, opts.totalTestsCount);

        it('should return "true" if limit is exceeded', () => {
            assert.isTrue(createRetryLimiter({limit: 0, totalTestsCount: 1}).exceedLimit());
        });

        it('should return "false" if limit is not exceeded', () => {
            assert.isFalse(createRetryLimiter({limit: 1, totalTestsCount: 1}).exceedLimit());
        });

        it('should return "false" until limit is exceeded', () => {
            const retryLimiter = createRetryLimiter({limit: 0.9, totalTestsCount: 3});

            assert.isFalse(retryLimiter.exceedLimit());
            assert.isFalse(retryLimiter.exceedLimit());
            assert.isTrue(retryLimiter.exceedLimit());
        });
    });
});
