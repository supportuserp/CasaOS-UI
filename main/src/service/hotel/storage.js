const storageInfo = {
    setStorageByKey(key, value) {
        if (key && value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },  
    getStorageByKey(key) {
        if (key) {
            return JSON.parse(localStorage.getItem(key));
        }
    },
    removeStorageByKey(key) {
         localStorage.removeItem(key);
    },

}
export default storageInfo;
