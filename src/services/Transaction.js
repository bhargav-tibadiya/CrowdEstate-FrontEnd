export const aggregateTransactionsByMonth = (transactions) => {
    // Create an array with all months
    const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize an object to hold the monthly totals (default to 0)
    const monthlyTotals = allMonths.reduce((ele, month) => {
        ele[month] = 0;
        return ele;
    }, {});

    // Populate the monthly totals with transaction data
    transactions.forEach((txn) => {
        const date = new Date(txn.listedAt);
        const month = date.toLocaleString('default', { month: 'short' }); // Get month name
        const amount = txn.price;

        // Add the transaction amount to the corresponding month
        if (monthlyTotals[month] !== undefined) {
            monthlyTotals[month] += amount;
        }
    });

    return monthlyTotals;
};

export const aggregateTransactionsByYear = (transactions) => {
    // Create an array with all Years
    const allYears = [
        "2013", "2014", "2015", "2016", "2017", "2018",
        "2019", "2020", "2021", "2022", "2023", "2024"
    ];

    // Initialize an object to hold the monthly totals (default to 0)
    const yearTotals = allYears.reduce((ele, year) => {
        ele[year] = 0;
        return ele;
    }, {});

    // Populate the monthly totals with transaction data
    transactions.forEach((txn) => {
        const date = txn.yearBuilt;
        const amount = txn.price;

        // Add the transaction amount to the corresponding month
        if (yearTotals[date] !== undefined) {
            yearTotals[date] += amount;
        }
    });

    return yearTotals;
};
