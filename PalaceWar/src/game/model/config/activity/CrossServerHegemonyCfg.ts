
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 群雄逐鹿
		 */
		export class CrossServerHegemonyCfg
		{        
            //  --展示时间
            public extraTime:number = 2;
            
            // --预选赛轮次设定
            public qualifyingRound:number = 24;
            
            // --预选赛每天战斗次数
            public qualifyingDayFight:number=3;

            //门客派遣CD时间
            public CD:number = 60;

            //门客派遣元宝消耗
            public cost:number = 50;

            //门客最大连胜场数
            public servantMaxWin = 5;
            
            // --备战日时间
            public readyTime:number = 1;
            
            // --休战日时间
            public armisticeTime:number = 1;
            
            // --决赛队伍数
            public finalAllianceNum:number = 32;
            
            // --每个门客每次群雄争霸只可参战X次
            public servantLimit:number = 1;
            
            // --战斗胜利参与者赢得战斗积分
            public fightScoreWin:number = 10;
            
            // --战斗失败参与者赢得战斗积分
            public fightScoreLose:number=10;
            //战旗的ID
            public flagItemID:number=0;
            // --战旗押注的队伍数
            public flagTeamNum:number=10;
            // --1个战旗的积分
            public flagScoreNum:number=10;


            // --【锦 囊 列 表】
            // --itemID:道具ID
            // --powerup:自己提升战斗力
            // --powerdown:敌方减少战斗力
            // --moreguest:额外派遣门客数量
            // --wins:本轮连胜上限
            public itemList:CSHegemonyItemListItemCfg[]= [];

            // --【职 位 加 成】
            // --level:联盟等级
            // --leader_add:盟主加成
            // --associate_add:副盟主加成
            // --elite_add:精英加成
            // --member_add:成员加成
            // --tab:备注
            public allianceOfficer:Object={};

            // --预赛帮众奖励
            // --rank:排行榜上限
            // --assetReward:帮会财富奖励
            // --getReward:奖励
            public qualifyingReward1:CSHegemonyQualifyingReward1ItemCfg[] = [];

            // --预赛帮众奖励
            // --rank:排行榜上限
            // --getReward:奖励
            public qualifyingReward2:CSHegemonyQualifyingReward2ItemCfg[] = [];

            // --决赛帮主奖励
            // --rank:排行榜上限
            // --assetReward:帮会财富奖励
            // --getReward:奖励
            public finalReward1:CSHegemonyFinalReward1ItemCfg[] = [];

            // --决赛帮众奖励
            // --rank:排行榜上限
            // --getReward:奖励
            public finalReward2:CSHegemonyFinalReward2ItemCfg[] = [];

            // --cost:兑换所需积分
            // --limitType:限购类型 0：不限购；1：每天限购；2：每周限购；3：每月限购
            // --limitNum:限购次数 0：无作用
            // --sell:商店内容
            public flagScoreShop:CSHegemonyFlagScoreItemCfg[]=[];

            // --cost:兑换所需积分
            // --limitType:限购类型 0：不限购；1：每天限购；2：每周限购；3：每月限购
            // --limitNum:限购次数 0：无作用
            // --sell:商店内容
            public fightScoreShop:CSHegemonyFightScoreItemCfg[] = [];

            // --活动期间的助威任务   注：每日不重置
            // --openType:跳转
            // --questType:任务类型  特殊类型：1--登录X天；2--累计消耗 X元宝；10001--充值xx元宝
            // --value:进度
            // --special1:特殊奖励：战旗
            // --getReward:奖励
            public task:Object = {};
            public taskList:CSHegemonyTaskItemCfg[] = [];

            // --压注队伍排名返还积分倍率
            // --rank:排行榜上限
            // --multiplying:奖励倍率
            public flagScoreRebate:CSHegemonyFlagScoreRebateItemCfg[] = [];

            // --帮会充值列表
            // --totalValue:总额度:元宝
            // --individualValue:个人充值达到 X ，才可领奖
            // --getReward:奖励
            public allianceRecharge:Object = {};
            public allianceRechargeList:any[] = [];
            
            //得到当前物品消耗分数
            public getCurFightScoreCost(id:number|string,buynum:number):number
            {
                let shopCfg = this.fightScoreShop[Number(id)-1];
                let cost = shopCfg.cost[buynum];
                return cost;

            }
            //得到当前物品消耗分数
            public getCurFlagScoreCost(id:number|string,buynum:number):number
            {
                let shopCfg = this.flagScoreShop[Number(id)-1];
                let cost = shopCfg.cost[buynum];
                return cost;

            }
            /**
             *  --获取锦囊列表数据
             */
            public getItemList():any[]{	
                return this.itemList;  
            }
            public getFinalRewardList():any[]
            {
                //finalReward1
                //finalReward2
                let list = [];

                for(let i = 0; i < this.finalReward1.length;i ++){
                    let listObj = {master: this.finalReward1[i],member:this.finalReward2[i]};
                    list.push(listObj);
                }

                return list;
            }
            //根据排名获取奖励倍数
            public getFlagRebateByRank(rank:number):number{
                for(let i = 0;i < this.flagScoreRebate.length;i++){
                    let fObj = this.flagScoreRebate[i];
                    if(fObj.rank[0]<=rank && fObj.rank[1]>= rank){
                        return fObj.multiplying;
                    }
                }
                return 0;

            }
            //预赛帮众奖励
            public getQualifyingRewardList():any[]
            {
                //qualifyingReward1
                //qualifyingReward2
                let list = [];

                for(let i = 0; i < this.qualifyingReward1.length;i ++){
                    let listObj = {master: this.qualifyingReward1[i],member:this.qualifyingReward2[i]};
                    list.push(listObj);
                }

                return list;
            }
            /**
             * 各等级的加成
             */
            public getAddition(po:number,level:number|string):{level:number,addition:string,addvalue:number}
            {
                let info:{level:number,addition:string,addvalue:number} = null;
                let id:string = null;
                let addition:string;
                let addvalue:number;
                for(let key in this.allianceOfficer)
                {
                    if(Number(level) == Number(this.allianceOfficer[key].level))
                    {
                        id = key;
                        break;
                    }
                    
                }
                switch(po)
                {
                    case 1:
                        addition = String(Math.round(Number(this.allianceOfficer[id].leader_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].leader_add)) + 1;
                        break;
                    case 2:
                        addition = String(Math.round(Number(this.allianceOfficer[id].associate_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].associate_add)) + 1;
                        break;
                    case 3:
                        addition = String(Math.round(Number(this.allianceOfficer[id].elite_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].elite_add)) + 1;
                        break;
                    case 4:
                        addition = String(Math.round(Number(this.allianceOfficer[id].member_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].member_add)) + 1;
                        break;
                }
                info = {level:this.allianceOfficer[id].level,addition:addition,addvalue:addvalue}
                return info;
            }

            public getFightScoreShopList():CSHegemonyFightScoreItemCfg[]
            {
                return this.fightScoreShop;
            }

            public getFlagScoreShopList():CSHegemonyFlagScoreItemCfg[]
            {
                return this.flagScoreShop;
            }

            public getTaskListById(min:number,max:number):CSHegemonyTaskItemCfg[]{

                let length = this.taskList.length;
                
                let taskList:CSHegemonyTaskItemCfg[] = [];
                for(let i = 0; i < length; i ++){
                    taskList.push(this.taskList[i]);                 
                }
                return taskList;

            }

            public getTaskList():CSHegemonyTaskItemCfg[]
            {
                return this.taskList;
            }

            public getRechargeList():CSHegemonyFlagRechargeItemCfg[]{
                return this.allianceRechargeList;
            }

            public formatData(data:any):void{

                this.extraTime = data.extraTime;
                this.qualifyingRound = data.qualifyingRound;
                this.qualifyingDayFight = data.qualifyingDayFight;
                this.CD = data.CD;
                this.cost = data.cost;
                this.servantMaxWin = data.servantMaxWin;
                this.readyTime = data.readyTime;
                this.armisticeTime = data.armisticeTime;
                this.finalAllianceNum = data.finalAllianceNum;
                this.servantLimit = data.servantLimit;
                this.fightScoreWin = data.fightScoreWin;
                this.fightScoreLose = data.fightScoreLose;
                // this.flagItemID = data.flagItemID;
                this.flagTeamNum = data.flagTeamNum;
                this.flagScoreNum = data.flagScoreNum;
                this.allianceOfficer = data.allianceOfficer;
                this.task = data.task;
                this.allianceRecharge = data.allianceRecharge;
                for(var key in data.itemList){
                    let itemCfg:CSHegemonyItemListItemCfg;
                    itemCfg = new CSHegemonyItemListItemCfg();
                    itemCfg.initData(data.itemList[key]);
                    itemCfg.id = Number(key) + 1;
                    this.itemList.push(itemCfg);
                }

                for(var key in data.qualifyingReward1){
                    let itemCfg:CSHegemonyQualifyingReward1ItemCfg;
                    itemCfg = new CSHegemonyQualifyingReward1ItemCfg();
                    itemCfg.initData(data.qualifyingReward1[key]);
                    itemCfg.id = Number(key) + 1;
                    this.qualifyingReward1.push(itemCfg);
                }
                for(var key in data.qualifyingReward2){
                    let itemCfg:CSHegemonyFinalReward2ItemCfg;
                    itemCfg = new CSHegemonyFinalReward2ItemCfg();
                    itemCfg.initData(data.qualifyingReward2[key]);
                    itemCfg.id = Number(key) + 1;
                    this.qualifyingReward2.push(itemCfg);
                }
                for(var key in data.finalReward1){
                    let itemCfg:CSHegemonyFinalReward1ItemCfg;
                    itemCfg = new CSHegemonyFinalReward1ItemCfg();
                    itemCfg.initData(data.finalReward1[key]);
                    itemCfg.id = Number(key) + 1;
                    this.finalReward1.push(itemCfg);
                }
                for(var key in data.finalReward2){
                    let itemCfg:CSHegemonyFinalReward2ItemCfg;
                    itemCfg = new CSHegemonyFinalReward2ItemCfg();
                    itemCfg.initData(data.finalReward2[key]);
                    itemCfg.id = Number(key) + 1;
                    this.finalReward2.push(itemCfg);
                }
                for(var key in data.flagScoreShop){
                    let itemCfg:CSHegemonyFlagScoreItemCfg;
                    itemCfg = new CSHegemonyFlagScoreItemCfg();
                    itemCfg.initData(data.flagScoreShop[key]);
                    itemCfg.id = Number(key) + 1;
                    this.flagScoreShop.push(itemCfg);
                }
                for(var key in data.fightScoreShop){
                    let itemCfg:CSHegemonyFightScoreItemCfg;
                    itemCfg = new CSHegemonyFightScoreItemCfg();
                    itemCfg.initData(data.fightScoreShop[key]);
                    itemCfg.id = Number(key) + 1;
                    this.fightScoreShop.push(itemCfg);
                }
                // let taskIndex = 101;
                for(var key in data.task){
                    let itemCfg:CSHegemonyTaskItemCfg;
                    itemCfg = new CSHegemonyTaskItemCfg();
                    itemCfg.initData(data.task[key]);
                    itemCfg.id = Number(key) + 1;
                    // taskIndex++;
                    this.taskList.push(itemCfg);
                }
                for(var key in data.flagScoreRebate){
                    let itemCfg:CSHegemonyFlagScoreRebateItemCfg;
                    itemCfg = new CSHegemonyFlagScoreRebateItemCfg();
                    itemCfg.initData(data.flagScoreRebate[key]);
                    itemCfg.id = Number(key) + 1;
                    this.flagScoreRebate.push(itemCfg);
                }
                for (let key in data.allianceRecharge){
                    let itemCfg:CSHegemonyFlagRechargeItemCfg;
                    itemCfg = new CSHegemonyFlagRechargeItemCfg();
                    itemCfg.initData(data.allianceRecharge[key]);
                    itemCfg.id = Number(key) + 1;
                    this.allianceRechargeList.push(itemCfg);
                }
            }
        }
        //锦 囊 列 表
        class CSHegemonyItemListItemCfg extends BaseItemCfg
        {
            public id:number;
            //道具ID
            public itemID:string;
            //自己提升战斗力
            public powerup:number;
            //敌方减少战斗力
            public powerdown:number;
            //额外派遣门客数量
            public moreguest:number;
            //本轮连胜上限
            public wins:number;
        }

        //预赛帮主奖励
        class CSHegemonyQualifyingReward1ItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public rank:number[];
            //帮会财富
            public assetReward:number;
            //奖励
            public getReward:string;
        }

        //预赛帮众奖励
        class CSHegemonyQualifyingReward2ItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public rank:number[];
            //奖励
            public getReward:string;
        }

        //决赛帮主奖励
        class CSHegemonyFinalReward1ItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public rank:number[];
            //帮会财富
            public assetReward:number;
            //奖励
            public getReward:string;
        }
        //决赛帮众奖励
        class CSHegemonyFinalReward2ItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public rank:number[];
            //奖励
            public getReward:string;
        }
        //旗帜积分商店
        class CSHegemonyFlagScoreItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public cost:number[];
            // limitType:0：不限购；1：每天限购；4:活动期间购买数量限制
            public limitType:number;
            // limitNum:限购次数 0：无作用
            public limitNum:number;
            // sell:商店内容
            public sell:string;
        }
        //战斗积分商店
        class CSHegemonyFightScoreItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public cost:number[];
            // limitType:限购类型 0：不限购；1：每天限购；2：每周限购；3：每月限购
            public limitType:number;
            // limitNum:限购次数 0：无作用
            public limitNum:number;
            // sell:商店内容
            public sell:string;
        }

        //任务
        class CSHegemonyTaskItemCfg extends BaseItemCfg
        {
            public id:number;
            //跳转
            public openType:string;
            //任务类型
            public questType:number;
            //进度
            public value:number;
            //奖励
            public getReward:string;
            //特殊奖励
            public special1:number;
            public sortId:number;
        }

        //压注队伍排名返还积分倍率
        class CSHegemonyFlagScoreRebateItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public rank:number[];
            //奖励倍率
            public multiplying:number;
        }

        //帮会充值
        class CSHegemonyFlagRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            public show:number;
            //总额度
            public totalValue:number;
            //个人充值
            public individualValue:number;
            //奖励
            public getReward:string;
            public sortId:number;
        }
	}
}
