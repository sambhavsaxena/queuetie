const PLANS = {
    Free: {
        price: 0,
        quota: 0,
        rank: 1
    },
    Beginner: {
        price: 1000 * 100,
        quota: 10000,
        rank: 2
    },
    Professional: {
        price: 10000 * 100,
        quota: 100000,
        rank: 3
    },
    Enterprise: {
        price: 0,
        quota: 0,
        rank: 4
    }
};

export default PLANS;
