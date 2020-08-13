namespace Config {
    export namespace AcCfg {
        export class LuckyDrawCfg {
            /**展示时间 */
            public extraTime: number;
            /**每日单翻免费次数 */
            public freeTimes: number;
            /**一次翻牌消耗特殊道具数量 */
            public drawCost: number;
            /**玩家有X个特殊道具后可以一键翻牌 */
            public autoDraw: number;
            /**翻牌次数 */
            public drawTimes:any;
            /**翻牌奖励 */
            public prizePool:any;
            /**活动期间，翻牌次数的进度奖励 */
            public achievement: any;
            /**活动期间的累计充值奖励 */
            public recharge: any;
            /**核心奖励 */
            public wife: string;
            public servant: string;

            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (let key in data) {
                    this[key] = data[key];
                }
            }
            /**解析翻牌奖池 */
            public getWealthGod():string
            {
                let rewards = "";
                // for(let key in this.prizePool)
                // {
                    for(let i in this.prizePool[0].prize){
                        let unit = this.prizePool[0].prize[i];
                        rewards += unit[0] + "|";
                    }
                    
                //}
                return rewards.substring(0,rewards.length - 1);
            }

             /**
             * 炫光特效
             */
            public isSpecial(data: any): boolean {
                for(let i in this.prizePool[0].prize){
                    let unit = this.prizePool[0].prize[i];
                    if(unit[0] === data && unit[2] == 1){
                        return true;
                    }
                }
                return false
            }

            public getTotalProgress():number{
                return this.achievement[this.achievement.length - 1].needNum;
            }

            public getSkinBone(code):string{
                let cfg = null;
                switch(Number(code)){
                    case 1:
                    case 3:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`1072`);
                        break;
                    case 2:
                    case 4:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(`20011`);
                        break;
                    case 5:
                    case 6:
                        cfg = Config.WifeCfg.getWifeCfgById(`232`);
                        break;
                    case 7:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`2031`);
                        break;
                    case 8:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`2111`);
                        break;
                }
                return cfg.bone ? cfg.bone : ''; 
            }

            public getSkinName(code):string{
                let cfg = null;
                switch(Number(code)){
                    case 1:
                    case 3:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`1072`);
                        break;
                    case 2:
                    case 4:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(`20011`);
                        break;
                    case 5:
                    case 6:
                        cfg = Config.WifeCfg.getWifeCfgById(`232`);
                        break;
                    case 7:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`2031`);
                        break;
                    case 8:
                        cfg = Config.WifeskinCfg.getWifeCfgById(`2111`);
                        break;
                }
                return cfg.name ? cfg.name : ''; 
            }

            public getSkin(code):string{
                let skin = '';
                switch(Number(code)){
                    case 1:
                    case 3:
                        skin = `1072`
                        break;
                    case 2:
                    case 4:
                        skin = `20011`
                        break;
                    case 7:
                        skin = `2031`
                        break;
                    case 8:
                        skin = `2111`
                        break;
                }
                return skin; 
            }

            public getServantNeed():number
            {
                if (this.servant)
                {
                    for (let k in this.recharge)
                    {
                        let v = this.recharge[k];
                        let rewards = GameData.formatRewardItem(v.getReward);
                        for (let i = 0 ; i< rewards.length; i++)
                        {
                            let onevo = rewards[i];
                            if (onevo.type == 8 && onevo.id == Number(this.servant))
                            {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0; 
            }

            public getWifeNeed():number
            {
                if (this.wife)
                {
                    for (let k in this.achievement)
                    {
                        let v = this.achievement[k];
                        let rewards = GameData.formatRewardItem(v.getReward);
                        for (let i = 0 ; i< rewards.length; i++)
                        {
                            let onevo = rewards[i];
                            if (onevo.type == 10 && onevo.id == Number(this.wife))
                            {
                                return v.needNum;
                            }
                        }
                    }
                }
                return 0; 
            }
        }
    }
}