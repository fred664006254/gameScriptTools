namespace Config
{
	export namespace AcCfg
	{
        export class GroupWifeBattleCfg 
		{
            /**
             * 展示时间 
             * */
            public extraTime : number = 1;


            //群芳令使用限制，每轮基础可使用 X 个群芳令
            public refreshLimit1:number;
            
            /**
             * 额外出使次数： 册封佳人数量 / refreshLimit2  向下取整
             */
            public refreshLimit2:number;
            public dataParameter:number;
            public dataParameter2:number;

            /**
             * 出使消耗道具
             */
            public fightAdd:string;
            public getFightAdd():string
            {
                return this.fightAdd.split('_')[1];
            }            
            
            /**
             * 个人参与条件：个人有X名红颜被册封 
             * */
            public unlock_wifeStar : number = 1;
            /** 
             * 玩家每天可免费参加X次
            */
            public freeTime : number = 4;
            
            /**
             * 挑战CD  单位：秒 
             * */
            public coolDownTime : number = 3600;

            /**
             * --红颜连胜上限
             * */
            public battleTime : number = 3;

            /**
             *  --不同功能所需道具
                --refresh:刷新随机挑战次数
                --chanllge:挑战，复仇，追杀
                --protect:保护同帮派成员
             * */
            public needItem : any = null;

            /**
             *  --保护规则
                --maxTime1:每轮保护次数上限
                --maxTime2:每轮被保护次数上限
                --limitNum:同时只能被x个人保护
             * */
            public portect : any = null;

            /**
             * 每1位红颜被册封提供的冲榜才情加成，百分制%
             */
            public talentStatusBuff:number=5;

            /**
                --冲榜期间才艺值转化系数
                --artistryRange:才艺提升区间
                --rankBuff:倍数
             */
            public wifeBattleBuff:any[];
            
            /**
             *  --随机战斗进攻方胜利加分 = 胜利基础分数 + 击败人数 * 奖励分数
                --victoryScoreBaseParam:基础分
                --victoryScoreNumParam:奖励分
             * */
            public victoryScore : any = null;

            /**
             *  --随机战斗进攻方失败加分 = 失败基础分数 + 击败人数 * 奖励分数
                --lostScoreBaseParam:基础分
                --lostScoreNumParam:奖励分
             * */
            public lostScore : any = null;

            /**
             *  --比拼战斗进攻方胜利加分 = 胜利基础分数 + 击败人数 * 奖励分数
                --victoryScoreBaseParam2:基础分
                --victoryScoreNumParam2:奖励分
             * */
            public victoryScore2 : any = null;

            /**
             *  --比拼战斗进攻方失败加分 = 失败基础分数 + 击败人数 * 奖励分数
                --lostScoreBaseParam2:基础分
                --lostScoreNumParam2:奖励分
             * */
            public lostScore2 : any = null;

            /**
             *  --防守方失败减分 = 失败基础分数 + 攻击方剩余人数*积分系数
                --defScoreBaseParam:基础分
                --lostScoreNumParam3:积分系数
             * */
            public defScore : any = null;

            /**
             * --淘汰轮次
                --time:淘汰时间
                --btmLine:淘汰名次下限
             * */
            public weedOut : any[] = [];

            /**
             *观赛奖励
            */
            public audienceReward : any[] = [];

            /**
             *观赛任务
            */            
            public audienceTask : any[] = [];
            
            /**
             *  --发奖规则
                --serverNum:服务器数量
                --serverReward:帮会奖励字段
                --personReward:个人奖励字段
            */
            public rewardList : any[] = [];

            /**
             *帮会排名奖励
            */
            public allianceRank : any[] = [];

            /**
			 *个人排名奖励
			 */
            public indivdualRank : any[] = [];
  
            public formatData(data:any):void
            {
                for(let i in data)
                {
                    this[i] = data[i];
                }
            }
        } 
	}
}