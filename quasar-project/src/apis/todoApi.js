import { api, axios } from "boot/axios";
import qs from "qs";

const todoRouter = `/api/todo`;

const token = {
    create: null,
    list: null,
    update: null,
    remove: null,
    reset: null,
};

//추가
const create = async (payload) => {
    try {
        if (token.create != null) {     //null이 아니면 true
            token.create = token.create.cancel("create cancel");
        }
        token.create = axios.CancelToken.source();  //중복이벤트시 취소할수 있는 함수
        const result = await api.post(`${todoRouter}`, payload, {   //post방식
            cancelToken: token.create.token,
        });
        return result;
    }catch(error) { //에러날 시 로그에 남김
        console.error({ err: error });
        return false;
    }
};

//리스트 가져오기
const list = async(payload) => {
    try {
        if(token.list != null) {
            token.list = token.list.cancel("cancle list");
        }
        token.list = axios.CancelToken.source();
        const query = qs.stringify(payload);
        const result = await api.get(`${todoRouter}?${query}`, payload, {   //get방식
            cancelToken: token.list.token,
        });
        return result;
    } catch (error) {
        console.error({ err: error });
        return false;
      }
};

//업데이트
const update = async (payload) => {
    try {
        if(token.update != null) {
            token.update = token.update.cancel("update cancel");
        }
        token.update = axios.CancelToken.source();
        const id = payload.id;
        const result = api.put(`${todoRouter}/${id}`, payload, {
            cancelToken: token.update.token,
        });
        return result;
    } catch(error) {
        console.error({ err: error });
        return false;
    }
};

//삭제
const remove = async (payload) => {
    try {
        if(token.remove != null) {
            token.remove = token.remove.cancel("remove cancel");
        }
        token.remove = axios.CancelToken.source();
        const id = payload.id;
        const result = api.delete(`${todoRouter}/${id}`, {
            cancelToken: token.remove.token,
        });
        return result;
    }catch(error) {
        console.error({ err: error });
        return false;
    }
};

//더미파일 넣기
const reset = async (payload) => {
    try {
        if(token.reset != null) {
            token.reset = token.reset.cancel("reset cancel");
        }
        token.reset = axios.CancelToken.source();
        const result = await api.post(`${todoRouter}/reset`, payload, {
            cancelToken: token.reset.token,
        });
        return result;
    } catch(error) {
        console.error({ err:error });
        return false;
    }
}

export default { create, list, update, remove, reset };