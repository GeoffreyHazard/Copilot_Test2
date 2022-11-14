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
    console.log('Running tests...');
    testCalculateDaysBetweenDates(); 
    console.log('All tests passed!');
}

runtests();

//In the terminal, type:
//node copilottest2.js