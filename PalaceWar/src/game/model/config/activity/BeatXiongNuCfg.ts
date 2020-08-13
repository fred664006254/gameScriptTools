namespace Config {
    export namespace AcCfg {
        export class BeatXiongNuCfg{
            /**展示期 */
            public extraTime:number=0;
            /*开关*/
            public switch:string[]=[];
            /**核心奖励 */
            public show:string=``;
            /**每日免费次数*/
            public freeTime:number=0;
            /**每出击一次消耗 X 士气（士气大于等于10可以十连出击）*/
            public consume:number=0;
            /**每出击一次增加进度 */
            public addProcess:number=0;
            /**抽奖奖池 */
            public pool:any=[];
            /**累计出击奖励 */
            public achievement:any={};
            /**活动期间的累计充值奖励 */
            public recharge:any={};
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for(let key in data){
                    if(typeof data[key] != 'object'){
                        this[key] = data[key];
                    }
                }
                this.pool = data.pool;

                for(let key in data.achievement){
                    let itemCfg:BeatXiongNuProgressItemCfg;
                    let id = Number(key);
                    if(!this.achievement.hasOwnProperty(String(key))){
                        this.achievement[String(key)]=new BeatXiongNuProgressItemCfg();
                    }
                    itemCfg = this.achievement[String(key)];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = id;
                }

                for(let key in data.recharge){
                    let itemCfg:BeatXiongNuRechargeItemCfg;
                    let id = Number(key);
                    if(!this.recharge.hasOwnProperty(String(key))){
                        this.recharge[String(key)]=new BeatXiongNuRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
            }
            /**解析奖池 */
            public getWealthGod():string{
                let rewards = "";
                for(let i in this.pool){
                    let unit = this.pool[i];
                    rewards += unit[0] + "|";
                }   
                return rewards.substring(0,rewards.length - 1);
            }

            public getTotalProgress():number{
                return this.achievement[Object.keys(this.achievement).length].specialnum;
            }

            public getSkinBone(code):string{
                let cfg = null;
                if(this.show){
                    switch(Number(code)){
                        case 1:
                        case 2:
                            cfg = Config.ServantskinCfg.getServantSkinItemById(this.show);//
                            break;
                    }
                }
                return cfg && cfg.bone ? cfg.bone : ''; 
            }

            public getSkinName(code):string{
                let cfg = null;
                if(this.show){
                    switch(Number(code)){
                        case 1:
                        case 2:
                            cfg = Config.ServantskinCfg.getServantSkinItemById(this.show);//
                            break;
                    }
                }
                return cfg && cfg.name ? cfg.name : ''; 
            }

            public getSkin(code):string{
                let skin = '';
                switch(Number(code)){
                    case 1:
                    case 2:
                        skin = this.show.toString();
                        break;
                }
                return skin; 
            }

            public getProcessNum(code):number[]{
                let arr = [];
                switch(Number(code)){
                    case 1:
                        arr = [5,4,3,2,1];
                        break;
                }
                return arr; 
            }

            
            // public getServantNeed():number{
            //     if (this.servant)
            //     {
            //         for (let k in this.recharge)
            //         {
            //             let v = this.recharge[k];
            //             let rewards = GameData.formatRewardItem(v.getReward);
            //             for (let i = 0 ; i< rewards.length; i++)
            //             {
            //                 let onevo = rewards[i];
            //                 if (onevo.type == 8 && onevo.id == Number(this.servant))
            //                 {
            //                     return v.needGem;
            //                 }
            //             }
            //         }
            //     }
            //     return 0; 
            // }

            public getGemNeed():number
            {
                if (this.show)
                {
                    for (let k in this.recharge)
                    {
                        let v = this.recharge[k];
                        let rewards = GameData.formatRewardItem(v.getReward);
                        for (let i = 0 ; i < rewards.length; i++)
                        {
                            let onevo = rewards[i];
                            if (onevo.id == Number(this.show))
                            {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0; 
            }
        }

        export class BeatXiongNuProgressItemCfg extends BaseItemCfg{
            /**
             *--累计出击奖励
            --specialnum:累计出击次数（进度）
            --getReward:达成累计次数获得的奖励
             */
            public id : number = 0;
            public specialnum : number = 0;
            public getReward : string = '';
        }

        export class BeatXiongNuRechargeItemCfg extends BaseItemCfg{
            /**
             *--累计投喂巧克力奖励
            --needGem:所需额度：单位（元宝）
            --show:达到X档位，才能看到此档位
            --specialGift:获得巧克力个数
            --getReward:奖励
             */
            public id : number = 0;
            public needGem : number = 0;
            public specialGift : number = 0;
            public getReward : string = '';
        }
    }
}