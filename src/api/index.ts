import $axios from '../utils/httpConfig'

export function getVideoList(params?: object) {
    return $axios.get('/videos', { params });
}
export function addVideo(data: object) {
    return $axios.post('/videos', data);
}
export function deleteVideo(id: any) {
    return $axios.delete('/videos', { params: { id } });
}
export function editVideo(id: any, data: object) {
    return $axios.put('/videos/' + id, data);
}
export function login(data: object) {
    return $axios.post('/users/login', data);
}