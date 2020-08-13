namespace Config
{
	export namespace PlayerreturnCfg
	{

        /**
         * --领取回归奖励所需要的官品 从六品或以上
         */
        export let playerStatusneed : number = 0;
        /**
         * --开启重归仕途所需未登录天数 未登录天数大于等于15天
         */
        export let timeGap : number = 0;
        /**
         *  --回归时，特殊判断VIP等级
         */
        export let needVip : number = 0;
        /**
         *--Vip3及以上玩家回归邮件奖励 备注：仅一次
            */
        export let returnReward : string = '';

        /**
         * Vip3以下玩家回归邮件奖励
         */
        export let returnReward1 : string = '';

        /**
         *    --连续登录奖励
            --days：连续登录天数
            --getReward：普通奖励
            --getRewardVIP：VIP奖励
            */
        export let signReward : Object={};

        /**
         *  --回归期间充值奖励 7天内完成
        --needGem：充值额度 单位：元宝
        --getReward：充值奖励
            */
        export let rechargeReward : Object={};

        /**
         *  --活动期间回归任务奖励 7天内完成
        --openType：跳转
        --questType：任务类型
        --value：进度
        --getReward：奖励
            */
        export let taskReward : Object={};
        
        export function formatData(data:any):void
        {
            playerStatusneed = data.playerStatusneed;
            needVip = data.needVip;
            timeGap = data.timeGap;
            returnReward = data.returnReward;
            returnReward1 = data.returnReward1;

            for(let key in data.signReward)
            {
                let itemCfg:ReurnSignItemCfg;
                if(!signReward.hasOwnProperty(String(key)))
                {
                    signReward[String(key)]=new ReurnSignItemCfg();
                }
                itemCfg=signReward[String(key)];
                itemCfg.initData(data.signReward[key]);
                itemCfg.id=Number(key);
            }

            for(var key in data.rechargeReward)
            {
                let itemCfg:ReturnRechargeItemCfg;
                if(!rechargeReward.hasOwnProperty(String(key)))
                {
                    rechargeReward[String(key)]=new ReturnRechargeItemCfg();
                }
                itemCfg=rechargeReward[String(key)];
                itemCfg.initData(data.rechargeReward[key]);
                itemCfg.id=Number(key);
            }

            for(let key in data.taskReward)
            {
                let itemCfg:ReturnTaskItemCfg;
                if(!taskReward.hasOwnProperty(String(key)))
                {
                    taskReward[String(key)]=new ReturnTaskItemCfg();
                }
                itemCfg=taskReward[String(key)];
                itemCfg.initData(data.taskReward[key]);
                itemCfg.taskId=Number(key);
            }
        }    

        class ReurnSignItemCfg extends BaseItemCfg
        {
            public id:number;
             /**
             * 连续登录天数
             */
            public days:number;
            /**
             * getReward：普通奖励
             */
            public getReward:string;
            /**
             * getRewardVIP：VIP奖励
             */
            public getRewardVIP:string;

            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
            public get rewardVipIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getRewardVIP,true,false);
            }
        }

        class ReturnRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 所需额度：单位（元宝）
             */
            public needGem:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        class ReturnTaskItemCfg extends BaseItemCfg
        {
            /**
             * 任务id
             */
            public taskId:number;
    
            public openType:string;
            /**
             * 任务类型
             */
            public questType:number;
            /**
             * 进度
             */
            public value:number
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
	}
}