(function () {

    function add(timeString1, timeString2) {
        var first = convertTimeStringToDecimal(timeString1);
        var second = convertTimeStringToDecimal(timeString2);
        return convertDecimalToTimeString(first + second);
    }
    
    function subtract(timeString1, timeString2) {
        var first = convertTimeStringToDecimal(timeString1);
        var second = convertTimeStringToDecimal(timeString2);
        return convertDecimalToTimeString(first - second);
    }

    function gt(timeString1, timeString2) {
        var first = convertTimeStringToDecimal(timeString1);
        var second = convertTimeStringToDecimal(timeString2);
        return first > second;
    }

    function lt(timeString1, timeString2) {
        var first = convertTimeStringToDecimal(timeString1);
        var second = convertTimeStringToDecimal(timeString2);
        return first < second;
    }
    
    function convertTimeStringToDecimal(timeInString) {
        var hourSegment = timeInString.split(':')[0];
        var minuteSegment = timeInString.split(':')[1];
    
        var hours = parseInt(hourSegment, 10);
        var minutes = parseInt(minuteSegment, 10);
    
        return ((hours * 60) + minutes);
    }
    
    function convertDecimalToTimeString(timeInMinutes) {
        var sign = timeInMinutes < 0 ? '-' : '';
        var hours = Math.abs(Math.trunc(timeInMinutes/60));
        var minutes = Math.abs(timeInMinutes % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return sign + hours +":"+ minutes;
    }
    
    if (typeof window !== 'undefined') {
        window.timeCalculator = {
            add: add,
            subtract: subtract
        };
    } else if (module) {
        module.exports = {
            add: add,
            subtract: subtract,
            gt: gt,
            lt: lt,
            convertDecimalToTimeString: convertDecimalToTimeString,
            convertTimeStringToDecimal: convertTimeStringToDecimal
        };
    }
}());



