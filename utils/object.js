export function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return true
}