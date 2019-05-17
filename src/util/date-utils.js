function padNumber(targetNum, maxLength) {
    return String(targetNum).padStart(maxLength, '0');
}

const UTC_STRING_RE = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2}(\.\d{3})?)?$/;

/**
 * in order to be compatible with IE (dateString with time part cannot be parsed by new Date())
 * @param dateString - like 2019-03-21[ 12:46:22[.556]]
 */
function parseDateString(dateString) {
    if (typeof dateString !== 'string') {
        return new Error('wrong type of dateString');
    }
    if (!UTC_STRING_RE.test(dateString)) {
        return new Error('wrong format of dateString');
    }
    const result = new Date();
    const dateArr = dateString.split(' ');
    const [year, month, dayOfMonth] = dateArr[0].split('-');
    result.setFullYear(Number(year));
    result.setMonth(Number(month) - 1);
    result.setDate(Number(dayOfMonth));
    if (dateArr[1]) {
        const [hours, minutes, secondsMilliseconds] = dateArr[1].split(':');
        const [seconds, milliseconds] = secondsMilliseconds.split('.');
        result.setHours(Number(hours));
        result.setMinutes(Number(minutes));
        result.setSeconds(Number(seconds));
        if (milliseconds) {
            result.setMilliseconds(Number(milliseconds));
        }
    }
    return result;
}

/**
 * convert a UTC date string to local string
 * @param utcString - like 2019-03-21[ 12:46:22[.556]]
 */
export const utcStringToLocal = utcString => {
    if (typeof utcString !== 'string') {
        return utcString;
    }
    let utcDate = parseDateString(utcString);
    if (isNaN(utcDate.getTime())) {
        throw new Error("wrong UTC string format");
    }
    const timezoneOffset = utcDate.getTimezoneOffset() * 60 * 1000;
    const ld = new Date(utcDate.getTime() - timezoneOffset);
    const isShort = utcString.trim().length === 10;
    const localTimePart = isShort ? "" : (' ' +
        padNumber(ld.getHours(), 2) + ':' +
        padNumber(ld.getMinutes(), 2) + ':' +
        padNumber(ld.getSeconds(), 2) + '.' +
        padNumber(ld.getMilliseconds(), 3));
    return ld.getFullYear() + '-' +
        padNumber(ld.getMonth() + 1, 2) + '-' +
        padNumber(ld.getDate(), 2) + localTimePart;
};

/** get utc datetime string, example: 2019-03-22 16:07:22 */
export const nowUtcDateTimeString = () => {
    const utc = new Date();
    return utc.getUTCFullYear() + '-' +
        padNumber(utc.getUTCMonth() + 1, 2) + '-' +
        padNumber(utc.getUTCDate(), 2) + ' ' +
        padNumber(utc.getUTCHours(), 2) + ':' +
        padNumber(utc.getUTCMinutes(), 2) + ':' +
        padNumber(utc.getUTCSeconds(), 2);

};
