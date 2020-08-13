namespace Config {
    export namespace AcCfg {
        /**
        *  首冲重置 的 cfg
        * @author 张朝阳
        * date 2019/7/1
        * @class RechargeResetCfg
        */
        export class RechargeResetCfg {

            /**重置类型 */
            public resetType: number;

            public formatData(data: any): void {
                for (var key in data) {
                    this[`${key}`] = data[key];
                }
            }
        }


    }
}