namespace Config
{
	export namespace AcCfg
	{
		export class TailorCfg 
		{
            public _showList:{string:number}[];
            //单抽消耗：X元宝
            public cost:number
            
            //单抽获得道具：银票*1  十连抽获得道具 = getReward * 10
            public getReward:string;
            
            //十连抽元宝打折：十连抽所需元宝 = cost * 10 * discount 
            public discount:number;
            
            //抽奖奖池  {奖励，权重}
            public tailorPool:{string,number}[];
            
            //兑换所需道具（皮肤券）  已拥有此皮肤后，不可再次兑换
            public _shop:{string:number}[];
            
            public formatData(data:any):void
			{
				if(data)
				{
					for(var key in data)
					{
						this[key]=data[key];
					}
				}
			}

			public set showList(param:{string:number}[])
			{
				this._showList = param;
			}
			public get showList():{string:number}[]
			{
				let resList = [];
				for (var index = 0; index < this._showList.length; index++) {
					var element = this._showList[index];
					if(WifeskinCfg.isSkinOPend(element[0])){
						resList.push(element);
					}
				}
				return resList;
			}

			public set shop(param:{string:number}[])
			{
				this._shop = param;
			}
			public get shop():{string:number}[]
			{
				let resList = [];
				for (var key in this._shop) {
					if(WifeskinCfg.isSkinOPend(key)){
						resList[key] = this._shop[key];
					}
				}
				return resList;
			}


        }
	}
}