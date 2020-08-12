namespace Config{
    export namespace ExpressionCfg{
        let expressionList = {};
        export function formatData(data: any){
           for(let key in data.expressionList){
            if (data.expressionList.hasOwnProperty(key)) {
                expressionList[key]=data[key];
            }
           }
        }

        /**
         * 获取免费表情列表
         */
        export function getFreeExpression():Array<string>{
            let frees = [];
            for (const key in expressionList) {
                if (expressionList.hasOwnProperty(key)) {
                    if(key.toString()["startsWith"]("1")){
                        frees.push(key);
                    }
                }
            }
            frees = ["dianzan", "fennu", "daku", "daxiao", "koubizi"];
            return frees;
        }

        /**
         * 获取高级表情列表
         */
        export function getBuyExpre():Array<string>{
            let buys = []
            for (const key in expressionList) {
                if (expressionList.hasOwnProperty(key)) {
                    if(key.toString()["startsWith"]("2")){
                        buys.push(key);
                    }
                }
            }
            buys = ["kaixin", "juqi", "leile", "xuanyao", "wanku"];
            return buys;
        }
    }
    class ExpressionItemCfg extends BaseItemCfg{

    }
}