import axios from "./axios";

//获取单个直播间详情
export function getLiveRoomDetail(id){
    return axios.get(`/v1/api/liveRoom/${id}`)
}

//获取直播间列表
export function getLiveRoomList() {
  return axios.get('/v1/api/liveRoom')
}