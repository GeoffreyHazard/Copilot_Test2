function calculateDaysBetweenDates(begin, end) {
    var beginDate = new Date(begin);
    var endDate = new Date(end);
    var diff = endDate.getTime() - beginDate.getTime();
    return diff / (1000 * 60 * 60 * 24);
}

function testCalculateDaysBetweenDates() {
    var result = calculateDaysBetweenDates('2016-01-01', '2016-01-01');
    var expected = 0;
    if (result !== expected) {
        throw 'Expected ' + expected + ', but got ' + result;
    }

    var result = calculateDaysBetweenDates('2016-01-01', '2016-01-02');
    var expected = 1;
    if (result !== expected) {
        throw 'Expected ' + expected + ', but got ' + result;
    }

    var result = calculateDaysBetweenDates('2016-01-01', '2016-01-10');
    var expected = 9;
    if (result !== expected) {
        throw 'Expected ' + expected + ', but got ' + result;
    }
}

function runtests() {
    testCalculateDaysBetweenDates();
    //prints 'All tests passed!'
    
}

// how to run the tests
runtests();

//to run this file, type into the terminal the following commands:
//node copilottest.js