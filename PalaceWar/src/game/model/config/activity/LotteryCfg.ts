namespace Config
{
	export namespace AcCfg
	{
		export class LotteryCfg 
		{
            private _initialPrize: number = 0;
            private _addPrize: number = 0;
            private _prizeLimit: number = 0;
            private _cost: number = 0;
            private _getReward:string = null;
            private _discount: number = 0;
            private _recharge:any[] =[]

            private _weightList: any[] = [];
            private _lotteryPool: any[] = [];
            private _lotteryNum: any[] = [];


            public get initialPrize(): number{
                return this._initialPrize;
            }
            public get addPrize(): number{
                return this._addPrize;
            }
            public get prizeLimit(): number{
                return this._prizeLimit;
            }
            public get cost(): number{
                return this._cost;
            }
            public get getReward(): string{
                return this._getReward;
            }
            public get discount(): number{
                return this._discount;
            }
            public get weightList(): any{
                return this._weightList;
            }
            public get lotteryPool(): any{
                return this._lotteryPool;
            }
            public get lotteryNum(): any{
                return this._lotteryNum;
            }     
            public get recharge(): any{
                return this._recharge;
            }    

            

            //解析数据
            public formatData(data:any):void
			{
                if(data["initialPrize"]){
                    this._initialPrize = data["initialPrize"];
                }
                if(data["addPrize"]){
                    this._addPrize = data["addPrize"];
                }
                if(data["prizeLimit"]){
                    this._prizeLimit = data["prizeLimit"];
                }
                if(data["cost"]){
                    this._cost = data["cost"];
                }
                if(data["getReward"]){
                    this._getReward = data["getReward"];
                }
                if(data["discount"]){
                    this._discount = data["discount"];
                }
                if(data["weightList"]){
                    this._weightList = data["weightList"];
                }
                if(data["lotteryPool"]){
                    this._lotteryPool = data["lotteryPool"];
                }
                if(data["lotteryNum"]){
                    this._lotteryNum = data["lotteryNum"];
                }
                 if(data["recharge"]){
                    this._recharge = data["recharge"];
                }
            }



            //根据宝箱id 显示奖励物品
            public getBoxRewardById(id) : any{
                if(this._lotteryNum[id]){
                    return this._lotteryNum[id];
                }
                else{
                    return null;
                }
            }
		}
	}
}