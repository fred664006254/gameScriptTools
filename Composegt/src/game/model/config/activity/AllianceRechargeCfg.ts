namespace Config
{
    export namespace AcCfg
    {
        export class AllianceRechargeCfg
        {
            public extraTime: number = 0;
            private _countReward:any[] = [];
            public get countReward():any{
                return this._countReward;
            }
            public getRewardList(): any[]{
            
                let rewardList = [];
                let rewardItem = null;
                let rewardObj = null;
                for(let key in this._countReward){
                    rewardObj = this._countReward[key];
                    rewardItem = {
                        id:key, 
                        count:rewardObj.count?rewardObj.count:0, 
                        total:rewardObj.total?rewardObj.total:0, 
                        getReward:rewardObj.getReward
                    };
                    rewardList.push(rewardItem);
                }
                return rewardList;
            }


            public formatData(data:any):void
            {
                if(data.extraTime){
                    this.extraTime = data.extraTime;
                }
                if(data["countReward"])
                {
                    this._countReward = data["countReward"];
                }

            }
        }
    }
}