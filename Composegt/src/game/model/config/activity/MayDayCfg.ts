namespace Config
{
	export namespace AcCfg
	{
		export class MayDayCfg 
		{
            //单抽一次的价格
            private _cost : number = 0;
            //连续购买十次的折扣
            private _discount : number = 0;
            //获取的奖励
            private _getReward : string = '';
            //宝箱进度
            private _lotteryNum : any[] = [];
            //奖励池
            private _lotteryPool : any[] = [];
            //排行榜入榜最低次数
            private _rankNeedNum : number = 0;
            //排行榜单奖励
            private _rankReward : any[] = [];
            //累积充值奖励进度
            private _recharge : any [] = [];
            //任务奖励进度
            private _task : any [] = [];

			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[`_${key}`]=data[key];
				}
            }

            public get cost() : number{
                return this._cost;
            }

            public get discount() : number{
                return this._discount;
            }

            public get getReward() : string{
                return this._getReward;
            }

            public get lotteryNum() : any[]{
                return this._lotteryNum;
            }

            public get lotteryPool() : any[]{
                return this._lotteryPool;
            }

            public get rankNeedNum() : number{
                return this._rankNeedNum;
            }

            public get rankReward() : any[]{
                return this._rankReward;
            }

            public get recharge() : any[]{
                return this._recharge;
            }

            public get task() : any[]{
                return this._task;
            }

            public getBoxRewardById(id) : any{
                if(this._lotteryNum[id]){
                    return this._lotteryNum[id];
                }
                else{
                    return null;
                }
            }

            public getChargeRewardById(id) : any{
                if(this._recharge[id]){
                    return this._recharge[id];
                }
                else{
                    return null;
                }
            }

            public getSelectItemIdx(reward) : number{
                let index = 0;
                for(let i in this._lotteryPool){
                    let unit = this._lotteryPool[i];
                    if(unit[0] == reward){
                        index = Number(i);
                        break;
                    }
                }
                return index;
            }
		}
	}
}