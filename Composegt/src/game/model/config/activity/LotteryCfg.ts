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

            private _weightList: any[] = [];
            private _lotteryPool: any[] = [];
            private _lotteryNum: any[] = [];
            public randbox:{randReward:{string,number}[],getReward:string}[] = [];
                // ["randReward"]={{"8_2014_1",1},{"8_2015_1",1},{"8_2016_1",1},{"8_2017_1",1},{"8_2018_1",1},{"6_1207_1",1},{"6_1208_1",1},{"6_1209_1",1},{"6_1210_1",1}},["getReward"]="6_1207_1|6_1208_1|6_1209_1|6_1210_1",

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
                if(data["randbox"]){
                    this.randbox = data["randbox"];
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

            //根据宝箱id 显示奖励物品
            public getRandBoxById(id) : any{
                if(this.randbox[id]){
                    return this.randbox[id];
                }
                else{
                    return null;
                }
            }
		}
	}
}