module.exports = {
    format_date: (date) => {
        // date is in month/day/year format
        return date.toLocaleDateString();
    },
};