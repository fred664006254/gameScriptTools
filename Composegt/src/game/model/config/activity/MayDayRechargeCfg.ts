namespace Config
{
	export namespace AcCfg
	{
		export class MayDayRechargeCfg 
		{
            //单抽一次的价格
            private _cost : number = 0;
            //获取的奖励
            private _getReward : string = '';
            //宝箱进度
            private _lotteryNum : any[] = [];
            //奖励池
            private _lotteryPool : any[] = [];

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

            public get getReward() : string{
                return this._getReward;
            }

            public get lotteryNum() : any[]{
                return this._lotteryNum;
            }

            public get lotteryPool() : any[]{
                return this._lotteryPool;
            }

            public getBoxRewardById(id) : any{
                if(this._lotteryNum[id]){
                    return this._lotteryNum[id];
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