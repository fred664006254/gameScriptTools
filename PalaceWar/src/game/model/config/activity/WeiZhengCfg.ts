
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 魏征活动
		 */
		export class WeiZhengCfg
		{
            /**
			 * --展示时间
			 */
            public extraTime:number=0;
            
            /**
             *  --兑换：玩家兑换皮肤后，后续变成兑换碎片
            --costShu:消耗谏书
            --getReward:奖励
             */
            public claim:any=null;

            /**
			 * --补领任务的消耗，活动期间，补领的次数越多，消耗越高，超过最大值取最大值
			 */
            public missCost:number[]=[];

            /**
			 *  --活动任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --openType:任务跳转
                --getReward:获得奖励
			 */
            public task:any=null;

            /** 
             * --活动期间累计充值奖励
             --needGem:所需额度：单位（元宝）
                --getReward:奖励
            */
            public recharge:any=null;


            public getSkinId(code) : string{
                let skinid = ``;
                switch(Number(code)){
                    case 1:
                        skinid = `10501`;
                        break;
                }
                return skinid
            }

            public getSkinBone(code):string{
                let cfg = null;
                switch(Number(code)){
                    case 1:
                    case 2:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(this.getSkinId(code));
                        break;
                    // case 2:
                    // case 4:
                    //         cfg = Config.WifeskinCfg.getWifeCfgById(this.getSkinId(code));
                       
                    //     break;
                }
                return cfg.bone ? cfg.bone : ''; 
            }
           
        
            public formatData(data:any):void{
                this.extraTime = data.extraTime;
                this.claim = data.claim;
                this.missCost = data.missCost;
                this.task = data.task;
                this.recharge = data.recharge;
            }
        }
	}
}
