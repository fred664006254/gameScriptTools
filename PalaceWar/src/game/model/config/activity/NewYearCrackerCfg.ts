namespace Config
{
	export namespace AcCfg
	{
		export class NewYearCrackerCfg 
		{
            /**
			 * 展示期
			 */
			public extraTime:number;
            /**
			 * 充值元宝与特殊道具转化比例，10元宝=1道具
			 */
			public ratio:number;
			/**
			 * 每页鞭炮数
			 */
            public firecracker:number;
            /**
			 * --连续七天完成t1任务奖励
			 */
            
            public bigPrize:string;
            /**
			 * --连续七天完成t1任务奖励
			 */
            
            /**
             *  --炮坐标。1-7由远至近
                --picCoord:炮，图片定位坐标。xxx={x,y}
                --titCoord:炮文字底板定位坐标，文字需要与底板居中对齐。xxx={x,y}
             */
            public coordinate:any=[]

			/**
			 * -点炮奖励
             *  --needItem：所需额度：单位（元宝）
                --getReward：奖励
			 */
			public recharge:any=[];

			/**
			 * --活动期间活跃任务   注：每日不重置
                --openType：跳转
                --questType：任务类型  特殊类型：1--登录X天
                --value：进度
                --zongziGet：获得粽子
                --getReward：奖励
			 */
			public dailyTask:any=[];
            public maxGem:number = 500;
            
            public formatData(data:any):void
            {
                this.ratio = data.ratio;
                this.extraTime = data.extraTime;
                this.firecracker = data.firecracker;
                this.dailyTask = data.dailyTask;
                this.recharge = data.recharge;
                this.bigPrize = data.bigPrize;
                this.coordinate = data.coordinate;
                // for(var key in data.recharge)
                // {
                //     let itemCfg:NewYearCrackerItemCfg;
                //     let index = Number(key) + 1;
                //     if(!this.recharge.hasOwnProperty(String(index)))
                //     {
                //         this.recharge[String(index)]=new NewYearCrackerItemCfg();
                //     }
                //     itemCfg=this.recharge[String(index)];
                //     itemCfg.initData(data.recharge[key]);
                //     itemCfg.id=index;
                // }
            }    
        }

        // class NewYearCrackerItemCfg extends BaseItemCfg
        // {
        //     public id:number;
        //     /**
        //      * 所需额度：单位（元宝）
        //      */
        //     public needItem:number;
        //     /**
        //      * 奖励
        //      */
        //     public getReward:string;
        //     public get rewardIcons():BaseDisplayObjectContainer[]
        //     {
        //         return GameData.getRewardItemIcons(this.getReward,true,false);
        //     }
        // }
	}
}