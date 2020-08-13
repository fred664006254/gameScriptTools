/**
 * 付费礼包
 * date 2019.12.23
 * author ycg
 */
namespace Config{
    export namespace AcCfg{
        export class RechargeGiftCfg{
            public show:string;
            public need1:number; //vip等级限制
            public need2:string; //相应的门客、红颜、皮肤、道具
            public maxNum:number;
            public needGem:string;

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                }
            }
        }
    }
} 