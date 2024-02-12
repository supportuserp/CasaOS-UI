import axios  from 'axios';
import globalConstants from '@/metaData/globalConstants';
import storageInfo from '@/service/hotel/storage';

const instance = axios.create({
	baseURL: globalConstants.HOTEL_API_URL,
	timeout: 60000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

// Interception before request initiation
instance.interceptors.request.use(
	(config) => {
		const token = storageInfo.getStorageByKey("hotel_access_token")
		if (token) {
			config.headers.Authorization = token;
            config.headers.hotelid = globalConstants.HOTEL_ID;
		}
        config.headers.current_version = globalConstants.APP_VERSION
		return config;
	}, (error) => {
		// Do something with request error
		return Promise.reject(error)
	}
)

const CancelToken = axios.CancelToken;
// Wrapping of axios by request type
const hotelApi = {

	get(url, data, _this) {
		if (_this) {
			return instance.get(url, {
				params: data,
				cancelToken: new CancelToken(function executor(c) {
					_this.cancelRequest = c
				})
			})
		} else {
			return instance.get(url, {
				params: data
			})
		}

	},
	post(url, data, config) {
		return instance.post(url, data, config)
	},
	put(url, data) {
		return instance.put(url, data)
	},
	delete(url, data) {
		return instance.delete(url, {data: data})
	},
	patch(url, data) {
		return instance.patch(url, data)
	},
}
export {hotelApi, instance}