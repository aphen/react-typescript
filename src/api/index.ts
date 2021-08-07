import $axios from "../utils/httpConfig"; 

export function getVideoList(params?: Record<string, unknown>): Promise<any> {
    return $axios.get('/videos', { params });
}
export function addVideo(data: Record<string, unknown>): Promise<void> {
    return $axios.post('/videos', data);
}
export function deleteVideo(id: string | number): Promise<void> {
    return $axios.delete('/videos', { params: { id } });
}
interface Video {
    _id: string | number;
    id: string;
    name: string;
    key: number;
    age: number;
    address: string;
}
export function editVideo(id: number | string, data: Video): Promise<unknown> {
    return $axios.put('/videos/' + id, data);
}

interface loginParam {
    username: string;
    password: string;
}
export function login(data: loginParam): Promise<void> {
    return $axios.post('/users/login', data);
}
