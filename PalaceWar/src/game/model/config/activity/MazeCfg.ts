namespace Config
{
	export namespace AcCfg
	{
		export class MazeCfg 
		{
            /** 单抽一次的价格 */
            private _cost : number = 0;
            /** 连续购买十次的折扣 */
            private _discount : number = 0;
            /** 奖励池类型1 */
            private _typePool1 : any[] = [];
             /** 奖励池类型2 */
            private _typePool2 : any[] = [];
             /** 奖励池类型3 */
            private _typePool3 : any[] = [];
             /** 奖励池类型4 */
            private _typePool4 : any[] = [];
             /** 奖励池类型5 */
            private _typePool5 : any[] = [];
            /** 排行榜入榜最低次数 */
            private _rankNeedNum : number = 0;
            /** 排行榜单奖励 */
            private _rankReward : any[] = [];
            /** 累积充值奖励进度 */
            private _recharge : any [] = [];

            private _getReward:string = null;

            private _task:any[] = [];

            private taskItemListCfg:TaskItemCfg[] = [];

            private rechargeItemCfg:RechargeItemCfg[] =[];


            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[`_${key}`]=data[key];
                    if(key == "task")
                    {
                        this.taskItemListCfg = [];
                        for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new TaskItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if(key == "recharge")
                    {
                        this.rechargeItemCfg = []
                         for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new RechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
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
            // /**
            //  * 获得获取的奖励
            //  */
            // public get reward() : string{
            //     return this._getReward;
            // }

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
            public get recharge() : RechargeItemCfg[]{
                return this.rechargeItemCfg;
            }
            /**
             * 获得任务列表
             */
            public get task():TaskItemCfg[]
            {
                // let aa = this.taskItemListCfg;
                return this.taskItemListCfg;
            }
            /**
             * 奖励池类型
             */
            public  typePool(type:number) : any[]{
                switch(type)
                {
                    case 1:
                        return this._typePool1;
                    case 2:
                        return this._typePool2;
                    case 3:
                        return this._typePool3;
                    case 4:
                        return this._typePool4;
                    case 5:
                        return this._typePool5;
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
            /**
             * 获得任务的openType
             */
            public getTaskType(id:string):string
            {
                for(let i = 0; i < this.taskItemListCfg.length;i++)
                {
                    if(id == this.taskItemListCfg[i].id )
                    {
                        return this.taskItemListCfg[i].openType;
                    }
                }
               
            }
            public getRewardIcon():string
            {
                return this._getReward;
            }
		}
        export class TaskItemCfg extends BaseItemCfg
		{
            /**任务ID */
			public id:string;

            public openType:string = null;
			/**
			 * 任务类型
			 */
			public questType:string;
			/**
			 * 任务进度
			 */
			public value:number;
            /**奖励 */
			public getReward:string;

            public sortId:number;
		}
        export class RechargeItemCfg extends BaseItemCfg
		{
            /**任务ID */
			public id:string;

            public sortId:number;
			/**
			 * 任务类型
			 */
			public needGem:number;
            /**奖励 */
			public getReward:string;

		}
	}
}