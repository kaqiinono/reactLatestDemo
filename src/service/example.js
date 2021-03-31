import { request, RequestTypeEnum } from '../utils/request';

const prefix = '/mock';

export async function getExampleList(data) {
    return request({
        url: `${prefix}/getExampleList`,
        method: RequestTypeEnum.GET,
        data
    });
}
