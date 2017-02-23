/**
 * Created by adam on 16/9/14.
 */


export const menus = {
    returnCode : '00000000',
    returnMessage : 'success',
    data : [
        {
            text : '发票台账',
            name : 'fptz',
            href : ''
        },
        {
            text : '税金管理',
            name : 'sjgl',
            href : ''
        },
        {
            text : '企业名片',
            name : 'qymp',
            href : ''
        }
    ]
};

export let plus = (a, b) => {
    return a + b;
};

export default getModuleName = () => {
    return 'module_util';
};