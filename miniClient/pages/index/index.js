// index.js
import testServer from '../../models/test'
import { modal, toast } from '../../utils/extendApi';
Page({
    async handler(){
        const res = await testServer.test()
        console.log(res);
    }
})