namespace Config {
    export namespace AcCfg {
        export class RabbitComingCfg{
            /**展示期 */
            public extraTime:number=0;
            /*开关*/
            public switch:string[]=[];
            /**核心奖励 */
            public corePrize:string=``;
            /**投喂一次巧克力获得的积分 中心区对应奖池1，其他区对应奖池2*/
            public drawCost1:number=0;
            /**十连抽获得X积 */
            public drawCost2:number=0;
            /**个人拥有X积分才可以上榜 */
            public pointsOwned1:number=0;
            /**消耗巧克力抽奖的奖池 */
            public poolList:any={};
            /**活动期间个人拥有积分排行榜奖励 */
            public individualRank:any={};
            /**活动期间帮会拥有积分排行榜奖励 */
            public allianceRank:any={};
            /**累计投喂巧克力奖励 */
            public achievement:any={};
            /**活动期间的累计充值奖励 */
            public recharge:any={};
            /**每购买一次消耗X元宝 */
            public cost:number=0;
            /**活动期间的活跃任务 */
            public task:any={};
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for(let key in data){
                    if(typeof data[key] != 'object'){
                        this[key] = data[key];
                    }
                }
                this.poolList = data.poolList;

                for(let key in data.individualRank){
                    let itemCfg:RabbitComingPrankItemCfg;
                    let id = Number(key);
                    if(!this.individualRank.hasOwnProperty(String(key))){
                        this.individualRank[String(key)]=new RabbitComingPrankItemCfg();
                    }
                    itemCfg = this.individualRank[String(key)];
                    itemCfg.initData(data.individualRank[key]);
                    itemCfg.id = id;
                }

                for(let key in data.allianceRank){
                    let itemCfg:RabbitComingAllirankItemCfg;
                    let id = Number(key);
                    if(!this.allianceRank.hasOwnProperty(String(key))){
                        this.allianceRank[String(key)]=new RabbitComingAllirankItemCfg();
                    }
                    itemCfg = this.allianceRank[String(key)];
                    itemCfg.initData(data.allianceRank[key]);
                    itemCfg.id = id;
                }

                for(let key in data.achievement){
                    let itemCfg:RabbitComingProgressItemCfg;
                    let id = Number(key);
                    if(!this.achievement.hasOwnProperty(String(key))){
                        this.achievement[String(key)]=new RabbitComingProgressItemCfg();
                    }
                    itemCfg = this.achievement[String(key)];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = id;
                }

                for(let key in data.recharge){
                    let itemCfg:RabbitComingRechargeItemCfg;
                    let id = Number(key);
                    if(!this.recharge.hasOwnProperty(String(key))){
                        this.recharge[String(key)]=new RabbitComingRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }

                for(let key in data.task){
                    let itemCfg:RabbitComingTaskItemCfg;
                    let id = Number(key);
                    if(!this.task.hasOwnProperty(String(key))){
                        this.task[String(key)]=new RabbitComingTaskItemCfg();
                    }
                    itemCfg = this.task[String(key)];
                    itemCfg.initData(data.task[key]);
                    itemCfg.id = id;
                }
            }
            /**解析翻牌奖池 */
            public getWealthGod():string{
                let rewards = "";
                for(let i in this.poolList[1].prizePool){
                    let unit = this.poolList[1].prizePool[i];
                    rewards += unit[0] + "|";
                }   
                return rewards.substring(0,rewards.length - 1);
            }

            /**
            * 炫光特效
            */
            public isSpecial(data: any): boolean {
                for(let i in this.poolList[1].prizePool){
                    let unit = this.poolList[1].prizePool[i];
                    if(unit[0] === data && unit[2] == 1){
                        return true;
                    }
                }
                return false
            }

            public getTotalProgress():number{
                return this.achievement[Object.keys(this.achievement).length].needNum;
            }

            public getSkinBone(code):string{
                let cfg = null;
                if(this.corePrize){
                    switch(Number(code)){
                        case 1:
                        case 2:
                            cfg = Config.WifeskinCfg.getWifeCfgById(this.corePrize);//
                            break;
                    }
                }
                return cfg && cfg.bone ? cfg.bone : ''; 
            }

            public getSkinName(code):string{
                let cfg = null;
                if(this.corePrize){
                    switch(Number(code)){
                        case 1:
                        case 2:
                            cfg = Config.WifeskinCfg.getWifeCfgById(this.corePrize);
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
                        skin = this.corePrize.toString();
                        break;
                }
                return skin; 
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

            public getWifeNeed():number
            {
                if (this.corePrize)
                {
                    for (let k in this.recharge)
                    {
                        let v = this.recharge[k];
                        let rewards = GameData.formatRewardItem(v.getReward);
                        for (let i = 0 ; i < rewards.length; i++)
                        {
                            let onevo = rewards[i];
                            if (onevo.type == 16 && onevo.id == Number(this.corePrize))
                            {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0; 
            }
        }
        
        export class RabbitComingPrankItemCfg extends BaseItemCfg{
            /**
             *--活动期间个人拥有积分排行榜奖励
            --rank:排名
            --getReward:奖励
             */
            public id : number = 0;
            public rank : number[] = [];
            public getReward : string = '';
        }

        export class RabbitComingAllirankItemCfg extends BaseItemCfg{
            /**
             *--活动期间个人拥有积分排行榜奖励
            --rank:排名
            --getReward1:帮主奖励
            --getReward2:成员奖励
             */
            public id : number = 0;
            public rank : number[] = [];
            public getReward1 : string = '';
            public getReward2 : string = '';
        }

        export class RabbitComingProgressItemCfg extends BaseItemCfg{
            /**
             *--累计投喂巧克力奖励
            --needNum:累计投喂巧克力次数（进度）
            --getReward:达成累计次数获得的奖励
             */
            public id : number = 0;
            public needNum : number = 0;
            public getReward : string = '';
        }

        export class RabbitComingRechargeItemCfg extends BaseItemCfg{
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
            public show : number = 0;
            public getReward : string = '';
        }

        export class RabbitComingTaskItemCfg extends BaseItemCfg{
            /**
             *--活动期间的活跃任务    注：每日不重置
            --openType:跳转
            --questType:任务类型 
            --value:进度
            --specialGift:特殊奖励
            --getReward:奖励
             */
            public id : number = 0;
            public openType : string = ``;
            public questType : number = 0;
            public value : number = 0;
            public specialGift : number = 0;
            public getReward : string = '';
        }
    }
}