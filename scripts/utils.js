// UTILS

/**
 * Sleep the current thread for `time`ms
 * @param {number} time in ms 
 * @returns {Promise<void>}
 */
const sleep = async (time) => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}