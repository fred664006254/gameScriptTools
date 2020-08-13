
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 亲密配置
		 */
		export class CrossServerServantCfg
		{
	    	/**
			 * --参与门客ID1
			 */
            public servantId1:string='';

            /**
			 * --对应门客1皮肤
			 */
            public servantSkin1:string='';
            /**
			 * --参与门客ID2
			 */
            public servantId2:string='';

            /**
			 * --对应门客1皮肤
			 */
            public servantSkin2:string='';

             /**
			 * --获胜组奖励
			 */
            public winServer:string='';
             /**
			 * --战败组奖励
			 */
            public loseServer:string='';
            /**位数显示时间，倒计时，单位：秒*/

            public countDown:number[]=[];

            public rankList:Object={};
            
            public formatData(data:any):void
            {
                this.servantId1 = data.servantId1;
                this.servantSkin1 = data.servantSkin1;
                this.servantId2 = data.servantId2;
                this.servantSkin2 = data.servantSkin2;
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.countDown = data.countDown;
                
                for(var key in data.rankList)
                {
                    let itemCfg:CrossServantRankItemCfg;
                    if(!this.rankList.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.rankList[Number(key) + 1] = new CrossServantRankItemCfg();
                    }
                    itemCfg = this.rankList[Number(key) + 1];
                    itemCfg.initData(data.rankList[key]);
                    itemCfg.id = Number(key) + 1;
                }
            }  
        }

        class CrossServantRankItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public rank:number[];
            /**
             * 达到进度的奖励
             */
            public reward:string;
            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.reward,true,true);
            }
        }
	}
}
