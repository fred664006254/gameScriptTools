namespace Config
{
	export namespace PolicyCfg
	{
         export let leveeTime:number[];
    
        //早朝时间元宝消耗折扣
        export let leveeGemDiscount:number=0;
        
        //一个政令组合包含政令数目
        export let gdNum:number=0;
        
        //每天最多发布政令次数
        export let maxIssuegd=1;
        
        //修改国策后新国策生效时间，次日0点
        export let newspFromDate=0;
        
        //刷新政令所需元宝（超过最大值取最大值,次日0点重置）
        export let refreshgdNeedGem:number[];
        
        //修改国策所需元宝（超过最大值取最大值）
        export let amendspNeedGem:number[];
        export let govDecreeList = [];
        export let sPolicyList={};


        export function getGovDecreeByType(type:number):GovernmentDecreeItem[]
        {
            return govDecreeList[type-1];
        }
        
        export function getGovDecreeById(id:string):GovernmentDecreeItem
        {
            for (let index = 0; index < govDecreeList.length; index++) {
                var element = govDecreeList[index];
                for (let key in element) {
                    if(key == id )
                    {
                        return element[key];
                    }
                }
            }
        }

        export function getPolicyById(pid:string):StatePolicyItem
        {
            return sPolicyList[pid]
        }

        export function formatData(data:any):void
		{
            for (let key in data) {
                if(key != "statePolicyList" && key != "statePolicyList")
                {
                     PolicyCfg[key] = data[key];
                }
            }

			for(let key in data.statePolicyList)
			{
				let itemCfg:StatePolicyItem = sPolicyList[key];
				if(!itemCfg)
				{
                    itemCfg = new StatePolicyItem();
					sPolicyList[String(key)] = itemCfg;
				}
				itemCfg.initData(data.statePolicyList[key]);
				itemCfg.id=String(key);
			}

            // for(let key in data.governmentDecreeList)
            for (var index = 0; index < data.governmentDecreeList.length; index++)
			{
                let tmpData = data.governmentDecreeList[index];
                let tmpList = govDecreeList[index];
                if(!tmpList){
                    tmpList = {};
                    govDecreeList.push(tmpList);
                }
                // for (var index = 0; index < tmpData.length; index++) {
                for(let key in tmpData){
                    let itemCfg:GovernmentDecreeItem = tmpList[key];
                    if(!itemCfg)
                    {
                        itemCfg = new GovernmentDecreeItem();
                        tmpList[key] = itemCfg;
                    }
                    itemCfg.initData(tmpData[key]);
				    itemCfg.id=String(key);
                }
			}

		}
    }

    export class  StatePolicyItem  extends BaseItemCfg
    {
        public id:string="";
        public type:number;
        public type2:string;
        public addTimes:number;
        public addExtent:number;
        public emAddTimes:number;
        public emAddExtent:number; 
    }

    export class  GovernmentDecreeItem  extends BaseItemCfg
    {
        public id:string="";
        public type:number;
        public type2:string;
        public sort:number;

        public gdCost:number;

        public addTimes1:number;
        public addExtent1:number;
        public leveeTimeEff1:number;

        public addTimes2:number;
        public addExtent2:number;
        public leveeTimeEff2:number;
    }

}