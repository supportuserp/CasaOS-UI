import storageInfo from '@/service/hotel/storage.js';

const authService = {
    logout() {
        storageInfo.removeStorageByKey('hotel_access_token');
    },
    isUserLoggedIn() {
        return storageInfo.getStorageByKey('hotel_access_token') ? true : false;
    }
}

export default authService;