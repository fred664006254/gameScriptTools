namespace Config
{
	/**
	 * 帮战配置
	 */
	export namespace AlliancewarCfg 
	{   
        /**
         * --帮会等级达到X级后开启功能
         */
        export let allianceLevelNeed:number = 0;
        /**
         * --开战日:每周一、三、五
         */
        export let warTime:number[] = [];
        /**
         * --备战日:每周二、四、六、日
         */
        export let preWarTime:number[] = [];
        /**
         * --开战日0点开始备战 时间：秒
         */
        export let beginTime:number = 0;
        /**
         * --开战日12点05结束备战,时间：秒
         */
        export let endTime1:number = 0;
        /**
         * --开战日24点结束,时间：秒
         */
        export let endTime2:number = 0;
        /**
         * ----备战日截止派遣门客时间,时间：秒
         */
        export let deadline:number = 0;
        /**
         * ----每个门客每月只可参战X次
         */
        export let servantLimit:number = 0;
        /**
         * --每月重置：每月1日的0点
         */
        export let resetTime:number = 0;
            /**
         * --参战条件：报名参战的门客大于等于 X
         */
        export let servantNum:number = 0;
        /**
         * --帮会战经验奖励的系数帮战胜利：奖励经验 = 敌方帮会等级 * addExp + 帮战榜加成   帮战失败：奖励经验 = addExp
         */
        export let addExp:number = 0;
        /**
         * ----帮会战个人贡献奖励的系数  帮战胜利：贡献奖励 = 敌方帮会等级 * addContribution + 帮战榜加成   帮战失败： 贡献奖励 = addContribution 【注：这个贡献个人是在帮会商店兑换用的，不增加帮会的任何值】
         */
        export let addContribution:number = 0;
        /**
         * --盟战胜利，个人额外奖励
         */
        export let extraReward:string = '';
        /**
         * --每轮战斗，可使用的锦囊次数
         */
        export let useItemNum:number = 0;
        /**
         * --每个门客，最大连胜次数
         */
        export let servantMaxWin:number = 0;
        /**
         *  --【锦 囊 列 表】
         */
        export let itemList:Object={};
         /**
         *  --【职 位 加 成】
         */
        export let allianceOfficer:Object={};
        /**
         *  --【战榜奖励加成】
         */
        export let rankAdd:Object={};
        

		export function formatData(data:any):void{
            allianceLevelNeed = data.allianceLevelNeed;
            warTime = data.warTime;
            preWarTime = data.preWarTime;
            beginTime = data.beginTime;
            endTime1 = data.endTime1;
            endTime2 = data.endTime2;
            deadline = data.deadline;
            servantLimit = data.servantLimit;
            resetTime = data.resetTime;
            servantNum = data.servantNum;
            addExp = data.addExp;
            addContribution = data.addContribution;
            extraReward = data.extraReward;
            useItemNum = data.useItemNum;
            servantMaxWin = data.servantMaxWin;

            for(let key in data.itemList){
                let itemCfg:ItemListCfg;
                if(!itemList.hasOwnProperty((Number(key) + 1).toString())){
                    itemList[Number(key) + 1] = new ItemListCfg();
                }
                itemCfg = itemList[Number(key) + 1];
                itemCfg.initData(data.itemList[key]);
                itemCfg.id = Number(key) + 1;
            }

            for(let key in data.allianceOfficer){
                let itemCfg:AllianceOfficerCfg;
                if(!allianceOfficer.hasOwnProperty((Number(key) + 1).toString())){
                    allianceOfficer[Number(key) + 1] = new AllianceOfficerCfg();
                }
                itemCfg = allianceOfficer[Number(key) + 1];
                itemCfg.initData(data.allianceOfficer[key]);
                itemCfg.id = Number(key) + 1;
            }

            for(let key in data.rankAdd){
                let itemCfg:RankAddCfg;
                if(!rankAdd.hasOwnProperty((Number(key) + 1).toString())){
                    rankAdd[Number(key) + 1] = new RankAddCfg();
                }
                itemCfg = rankAdd[Number(key) + 1];
                itemCfg.initData(data.rankAdd[key]);
                itemCfg.id = Number(key) + 1;
            }
        }

        /**
         * 各等级的加成
         */
        export function getAddition(po:number):{level:number,addition:string,addvalue:number}
        {
            let info:{level:number,addition:string,addvalue:number} = null;
            let id:string = null;
            let addition:string;
            let addvalue:number;
            for(let key in allianceOfficer)
            {
                if(Api.allianceVoApi.getAllianceVo().level == allianceOfficer[key].level)
                {
                    id = key;
                    break;
                }
                
            }
            switch(po)
            {
                case 1:
                    addition = String(Math.round(Number(allianceOfficer[id].leader_add) * 100)) + "%";
                    addvalue = Math.round(Number(allianceOfficer[id].leader_add)) + 1;
                    break;
                case 2:
                    addition = String(Math.round(Number(allianceOfficer[id].associate_add) * 100)) + "%";
                    addvalue = Math.round(Number(allianceOfficer[id].associate_add)) + 1;
                    break;
                case 3:
                    addition = String(Math.round(Number(allianceOfficer[id].elite_add) * 100)) + "%";
                    addvalue = Math.round(Number(allianceOfficer[id].elite_add)) + 1;
                    break;
                case 4:
                    addition = String(Math.round(Number(allianceOfficer[id].member_add) * 100)) + "%";
                    addvalue = Math.round(Number(allianceOfficer[id].member_add)) + 1;
                    break;
            }
            info = {level:allianceOfficer[id].level,addition:addition,addvalue:addvalue}
            return info;
        }

        /**
         *  --获取锦囊列表数据
         */
        export function getItemList():Array<ItemListCfg>{	
            return getArr(itemList);  
        }
        
        /**
         *  --获取职位加成
         */
        export function getAllianceOfficer():Array<AllianceOfficerCfg>{	
            return getArr(allianceOfficer);  
        }
    
        /**
         *  --获取战榜奖励加成
         */
        export function getRankAdd():Array<RankAddCfg>{	
            return getArr(rankAdd);  
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
     * --【锦 囊 列 表】
    --item：道具ID
    --powerup：自己提升战斗力
    --powerdown：敌方减少战斗力
    --moreguest：额外派遣门客数量
    --wins：本轮连胜上限
    */
	export class ItemListCfg extends BaseItemCfg{
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
    }

    /**
     *     
    --【职 位 加 成】
    --level：联盟等级
    --leader_add：盟主加成
    --associate_add：副盟主加成
    --elite_add：精英加成
    --member_add：成员加成
    */
    export class AllianceOfficerCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
		 * 联盟等级
		 */
		public level : number;
		/**
		 * 盟主加成
		 */
		public leader_add:number;

		/**
		 * 副盟主加成
		 */
		public associate_add:number;

		/**
		 * 精英加成
		 */
		public elite_add:number;
		/**
		 * 成员加成
		 */
        public member_add:number;
    }

    /**
     *     
   --【帮战榜奖励加成】
    --rank：名次 排名区间
    --reward_guild：胜利奖励联盟经验
    --reward_member：胜利奖励个人贡献
    */
    export class RankAddCfg extends BaseItemCfg{
        /**
         * 索引id
        */
        public id : number
        /**
		 * 联盟等级
		 */
		public rank : number[];
		/**
		 * 胜利奖励联盟经验
		 */
		public reward_guild:number;

		/**
		 * 胜利奖励个人贡献
		 */
        public reward_member:number;

        public get minRank():number
        {
            return this.rank[0];
        }
        public get maxRank():number
        {
            return this.rank[1];
        }
	}
}