/**
 * 表情包vo
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonVo
 */

class EmoticonVo extends BaseVo{
    public emoticonId:any = null;
    constructor(){
        super()
    }

    public initData(data:any):void{
        if (data.info){
            this.emoticonId = data.info;
        }
    }

    public dispose(){

    }
}