namespace Config
{
	export namespace AcCfg
	{
		export class ArcherCfg 
		{
            /** 单抽一次的价格 */
            private _cost : number = 0;
            /** 连续购买十次的折扣 */
            private _discount : number = 0;
            /** 获取的奖励 */
            private _getReward : string = '';
            /** 宝箱进度所给的奖励 */
            private _lotteryNum : any[] = [];
            /** 奖励池  */
            private _lotteryPool : any[] = [];
            /** 排行榜入榜最低次数 */
            private _rankNeedNum : number = 0;
            /** 排行榜单奖励 */
            private _rankReward : any[] = [];
            /** 累积充值奖励进度 */
            private _recharge : any [] = [];

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[`_${key}`]=data[key];
				}
            }
            /**
             * 获得单次购买的价格
             */
            public get cost() : number{
                return this._cost;
            }
             /**
             * 获得连续购买十次的折扣
             */
            public get discount() : number{
                return this._discount;
            }
            /**
             * 获得获取的奖励
             */
            public get reward() : string{
                return this._getReward;
            }
            /**
             * 获得宝箱进度所给的奖励
             */
            public get lotteryNum() : any[]{
                return this._lotteryNum;
            }
            /**
             * 获得排行榜入榜最低次数
             */
            public get rankNeedNum() : number{
                return this._rankNeedNum;
            }
            /**
             * 获得排行榜单奖励
             */
            public get rankReward() : any[]{
                return this._rankReward;
            }
            /**
             * 获得累积充值奖励进度
             */
            public get recharge() : any[]{
                return this._recharge;
            }
            /**
             * 获得奖励池
             */
            public  get lotteryPool() : any[]{
                return this._lotteryPool;
            }
             /**
             * 获得宝箱进度所给的奖励
             */
            public getBoxRewardById(id) : any{
                if(this._lotteryNum[id]){
                    return this._lotteryNum[id];
                }
                else{
                    return null;
                }
            }
            /**
             * 获得奖励
             */
            public getChargeRewardById(id) : any
            {
                if(this._recharge[id]){
                    return this._recharge[id];
                }
                else{
                    return null;
                }
            }
		}
        export class ArcherItemCfg extends BaseItemCfg
        {
            
        }
	}
}