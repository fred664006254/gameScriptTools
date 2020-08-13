namespace Config
{
	export namespace AcCfg
	{
		export class LuckBagCfg 
		{
            
            private _needGem:number = 0;
            private _needPoint:number = 0;

            //前端奖励预览 
            private _lotteryPool1: any[] = [];
            private _lotteryPool2: any[] = [];
            private _lotteryNum: any[] = [];
      

            public get lotteryPool(): any{
                return this._lotteryPool1.concat(this._lotteryPool2);
            }
            public get lotteryNum(): any{
                return this._lotteryNum;
            }
            public get needGem(): number{
                return this._needGem;
            }
            public get needPoint(): number{
                return this._needPoint;
            }

            //解析数据
            public formatData(data:any):void
			{
                if(data["needGem"]){
                    this._needGem = data["needGem"];
                }
                if(data["needPoint"]){
                    this._needPoint = data["needPoint"];
                }
                if(data["lotteryPool1"]){
                    this._lotteryPool1 = data["lotteryPool1"];
                }
                if(data["lotteryPool2"]){
                    this._lotteryPool2 = data["lotteryPool2"];
                }
                
                if(data["lotteryNum"]){
                    this._lotteryNum = data["lotteryNum"];
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