namespace Config
{
    export namespace CouncilCfg 
    {
        /**
         * 官职 从六品 解锁
         */
        export let needLv:number;
        /**
         * 参与消耗  数量*1
         */
        export let needItem:string;

        /**
         *玩家每次可上阵最大门客数量
            */
        export let maxServant:number;

        /**
         * 每个内阁任务所能容纳最大玩家数量
         */
        export let maxPlayer:number;

        /**
         * 排名奖励列表
         *  --rank  例：rank = {1,3} 代表第一名至第三名
            --exp  政绩
            --bookExp  书籍经验  所派遣的每个门客获得 bookExp 的书籍经验
         */
        export let rankList:Object={};
        
        export function formatData(data:any):void
        {
            this.needLv = data.needLv;
            this.needItem = data.needItem;
            this.maxServant = data.maxServant;
            this.maxPlayer = data.maxPlayer;

            for(var key in data.rankList)
            {
                let itemCfg:CoucilRankItemCfg;
                if(!this.rankList.hasOwnProperty(String(key)))
                {
                    this.rankList[String(key)]=new CoucilRankItemCfg();
                }
                itemCfg=this.rankList[String(key)];
                itemCfg.initData(data.rankList[key]);
                itemCfg.id=String(key);
            }
        }    
    }

    export class CoucilRankItemCfg extends BaseItemCfg
    {
        public id:string;
        /**
         * 排名上限
         */
        public rank:number[];
        /**
         * 政绩
         */
        public exp:number;
         /**
         * 书籍经验
         */
        public bookExp:number;

        public get minRank():number{
            return this.rank[0];
        }

        public get maxRank():number{
            return this.rank[1];
        }

        public get rewardIcons():BaseDisplayObjectContainer[]{
            return GameData.getRewardItemIcons(`5_1_${this.exp}|14_1_${this.bookExp}`,true,false);
        }
    }
}