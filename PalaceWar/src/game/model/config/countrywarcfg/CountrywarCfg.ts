namespace Config
{
	/**
	 * 国战配置
	 */
	export namespace CountrywarCfg 
	{   
        /**
        *--服务器分组数
        */
        export let warNum : number = 0;
        /**
         *--最大连胜次数
        */
        export let servantMaxWin:number = 0;
        /**
         * --解锁官品
         */
        export let unlock:number = 0;
        /**
         * --参加活动最低门客数
         */
        export let servantLit:number = 0;
        /**
         * --城池数
         */
        export let cityNum:number = 0;
        /**
         * --城池可派遣门客数
         */
        export let citySerNum:number = 0;
        /**
         * --可派遣城池数
         */
        export let cityTotNum:number = 0;
        /**
         * --门客撤回上限
         */
        export let servantBack:number = 0;
        /**
         * --门客撤回上限
         */
        export let servantBackCost:number[] = [];
        /**
         * --具备编辑公告权限的称号
         */
        export let announceTitle:string[] = [];
        /**
         * --公告免费编辑次数
         */
        export let announceFreeNum:number = 0;
        /**
         *--公告编辑超过免费次数后的消耗，超过上限值则取上限值 元宝数
         */
        export let announceCost:number[] = [];
        /**
         * --公告花费元宝数
         */
        export let gemCost:number = 0;
       
        /**
         *  --时间表
         */
        export let readyTime:Object={};
         /**
         *   --城池选择组合
         */
        export let cityRandom:any[]=[];
        /**
         *  --获胜区奖励
         */
        export let winnerReward:string='';
         /**
         *  --轮空区奖励
         */
        export let lastReward:string='';
        /**
         *  --战败区奖励
         */
        export let loserReward:string='';
        /**
         *  --夺城奖励
         */
        export let cityOwned:Object={};
        /**
         * --派遣城池所需最低势力值
         */
        export let cityLowestPower:Object={};
        /**
         *  --个人权势排行榜
         */
        export let rankList:Object={};
        /**
         *  --锦 囊 商 店
         */
        export let secretList:Object={};
        /**
         *  --每日随机门客池
         */
        export let servantPool:Object={};
        /**
         *  --胜分计算
         */
        export let point:Object={};
        /**
        *  --轮空加分
        */
        export let loserPointAdd:number=0;
        

		export function formatData(data:any):void{
            unlock = data.unlock;
            servantLit = data.servantLit;
            cityNum = data.cityNum;
            citySerNum = data.citySerNum;
            cityTotNum = data.cityTotNum;
            servantBack = data.servantBack;
            servantBackCost = data.servantBackCost;
            announceTitle = data.announceTitle;
            announceFreeNum = data.announceFreeNum;
            announceCost = data.announceCost;
            gemCost = data.gemCost;
            cityRandom = data.cityRandom;
            winnerReward = data.winnerReward;
            loserReward = data.loserReward;
            lastReward = data.lastReward;
            warNum = data.warNum;
            servantMaxWin = data.servantMaxWin;
            loserPointAdd = data.loserPointAdd;

            for(let key in data.readyTime){
                let itemCfg:ReadyTimeCfg;
                let idx = Number(key) + 1;
                if(!readyTime.hasOwnProperty(idx.toString())){
                    readyTime[idx] = new ReadyTimeCfg();
                }
                itemCfg = readyTime[idx];
                itemCfg.initData(data.readyTime[key]);
                itemCfg.id = idx;
            }

            for(let key in data.cityOwned){
                let itemCfg:CityOwnedCfg;
                let idx = Number(key) + 1;
                if(!cityOwned.hasOwnProperty(idx.toString())){
                    cityOwned[idx] = new CityOwnedCfg();
                }
                itemCfg = cityOwned[idx];
                itemCfg.initData(data.cityOwned[key]);
                itemCfg.id = idx;
            }

            for(let key in data.rankList){
                let itemCfg:RankListCfg;
                let idx = Number(key) + 1;
                if(!rankList.hasOwnProperty(idx.toString())){
                    rankList[idx] = new RankListCfg();
                }
                itemCfg = rankList[idx];
                itemCfg.initData(data.rankList[key]);
                itemCfg.id = idx;
            }

            for(let key in data.secretList){
                let itemCfg:SecretListCfg;
                let idx = Number(key) + 1;
                if(!secretList.hasOwnProperty(idx.toString())){
                    secretList[idx] = new SecretListCfg();
                }
                itemCfg = secretList[idx];
                itemCfg.initData(data.secretList[key]);
                itemCfg.id = idx;
            }

            for(let key in data.servantPool){
                let itemCfg:ServantPoolCfg;
                let idx = Number(key) + 1;
                if(!servantPool.hasOwnProperty(idx.toString())){
                    servantPool[idx] = new ServantPoolCfg();
                }
                itemCfg = servantPool[idx];
                itemCfg.id = idx;
                itemCfg.servantAddArr = [];
                for(let i in data.servantPool[key]){
                    let unit = data.servantPool[key][i];
                    let servantAddcfg : ServantAddCfg = new ServantAddCfg();
                    servantAddcfg.id =  Number(i) + 1;
                    servantAddcfg.initData(unit);
                    itemCfg.servantAddArr.push(servantAddcfg);
                }
            }

            for(let key in data.point){
                let itemCfg:PointCfg;
                let idx = Number(key) + 1;
                if(!point.hasOwnProperty(idx.toString())){
                    point[idx] = new PointCfg();
                }
                itemCfg = point[idx];
                itemCfg.initData(data.point[key]);
                itemCfg.id = idx;
            }

            for(let key in data.cityLowestPower){
                let itemCfg:CityPowerCfg;
                let idx = Number(key) + 1;
                if(!cityLowestPower.hasOwnProperty(idx.toString())){
                    cityLowestPower[idx] = new CityPowerCfg();
                }
                itemCfg = cityLowestPower[idx];
                itemCfg.initData(data.cityLowestPower[key]);
                itemCfg.id = idx;
            }
        }
        // /**
        //  *  --获取锦囊列表数据
        //  */
        // export function getItemList():Array<ItemListCfg>{	
        //     return getArr(itemList);  
        // }
        
        // /**
        //  *  --获取职位加成
        //  */
        // export function getAllianceOfficer():Array<AllianceOfficerCfg>{	
        //     return getArr(allianceOfficer);  
        // }
         /**
         *  --积分计算
         */
        export function getPoint():Array<PointCfg>{	
            return getArr(point);  
        }

        /**
         *  --夺城奖励
         */
        export function getCityReward():Array<CityOwnedCfg>{	
            return getArr(cityOwned);  
        }

        /**
         * 个人权势
         */
        export function getRankListCfg():Array<RankListCfg>{	
            return getArr(rankList);  
        }

        /**
         * 个人权势
         */
        export function getSecretListCfg():Array<SecretListCfg>{	
            return getArr(secretList);  
        }
    
        function getArr(key):Array<any>{	
            let arr:Array<any> =[];
            if(key){
                let list = key;
                for(let i in list){	
                    let currObj =  list[i]
                    if(currObj){
                        arr.push(currObj);
                    } 
                } 
            }
            return arr;  
        }
    }
    /** 
     * 
     *  --时间表
        --readyTime：派遣开始时间
        --warTime：战斗开始时间
        --resultTime：结算开始时间
        --endTime：一轮结束时间
    */
	export class ReadyTimeCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
		 * 派遣开始时间
		 */
		public readyTime : number;
		/**
		 * 战斗开始时间
		 */
		public warTime : number;

		/**
		 * 结算开始时间
		 */
		public resultTime : number;

		/**
		 * 一轮结束时间
		 */

		public endTime:number;
    }

    /**
     *     
    --夺城奖励
    --cityNum：所夺城池数
    --cityReward：奖励
    */
    export class CityOwnedCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
		 * 所夺城池数
		 */
		public cityNum : number;
		/**
		 * 奖励
		 */
        public cityReward : string;
        
        public get rewardIcons():BaseDisplayObjectContainer[]{
            // this.getReward += (`18_0001_${this.zongziGet}`);
            return GameData.getRewardItemIcons(this.cityReward,true,false);
        }
    }

    /**
     *     
    --个人权势排行榜
    --rankGap：排名上限
    --powerReward：奖励
    */
    class RankListCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
		 * 联盟等级
		 */
		public rankGap : number[];
		/**
		 * 奖励
		 */
		public powerReward:string;

        public get minRank():number{
            return this.rankGap[0];
        }
        public get maxRank():number{
            return this.rankGap[1];
        }
        public get rewardIcons():BaseDisplayObjectContainer[]{
            // this.getReward += (`18_0001_${this.zongziGet}`);
            return GameData.getRewardItemIcons(this.powerReward,true,false);
        }
    }
      /** 
     * --【锦 囊 商 店】
        --item：道具ID
        --powerup：自己提升战斗力
        --powerdown：敌方减少战斗力
        --moreguest：额外派遣门客数量
        --wins：本轮连胜上限
        --times：抵挡挫志次数
        --cost：购买价格
    */
   class SecretListCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
        * 道具ID
        */
        public item: string;
        /**
        * 自己提升战斗力
        */
        public powerup:number;
        /**
        * 敌方减少战斗力
        */
        public powerdown:number;
        /**
        * 额外派遣门客数量
        */
        public moreguest:number;
        /**
        * 本轮连胜上限
        */
        public wins:number;
        /**
        * 抵挡挫志次数
        */
        public times:number;
        /**
         * 购买价格
         */
        public cost:number;
    }

    /** 
    */
    export class ServantPoolCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
        * pool池
        */
        public servantAddArr : ServantAddCfg[];
    }
    /**
     *--每日随机门客池
       --servant1：门客1
        --powerUp1：门客1势力加成
        --servant2：门客2
        --powerUp2：门客2势力加成
        --servant3：门客3
        --powerUp3：门客3势力加成
     */
    export class ServantAddCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number;

        /**
         *门客
        */
        public servant : string[];
        /**
         *门客势力加成
        */
        public powerUp : number[];
    }

    /**
    *胜分计算
    */
    class PointCfg extends BaseItemCfg{
        /**
        * 索引id
        */
        public id : number
        /**
        * 胜场
        */
        public winsNum : number;
        /**
        * 积分
        */
        public credit : number;
    }

    /**
    *--派遣城池所需最低势力值
    --power：最低派遣势力
    */
    class CityPowerCfg extends BaseItemCfg{
        /**
        * 索引id
        */
        public id : number
        /**
        * 胜场
        */
        public power : number;
    }
}