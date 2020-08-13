namespace Config
{
	export namespace AcCfg
	{
        export class BattleGroundCfg 
		{
            /**
             * 展示时间 
             * */
            public extraTime : number = 1;

            /** 
             * 一键擂台禁用时间,单位(分钟)
            */
            public disableTime : number = 0;
            
            /**
             * 跨服数量 
             * */
            public serverNum : number = 0;

            /**
             * --初始加成
            --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
            --effect:加成值。例：0.5=50%
            --costPoint:消耗士气
            --costGem:消耗元宝
             * */
            public iniAtt : any = null;

             /**
             * --初始加成
            --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
            --effect:加成值。例：0.5=50%
            --costPoint:消耗士气
            --weight:权重
             * */
            public juniorAtt : any = null;

            /**
             * --中级加成
            --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
            --effect:加成值。例：0.5=50%
            --costPoint:消耗士气
            --weight:权重
             * */
            public mediumAtt : any = null;

            /**
             * --高级加成
            --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
            --effect:加成值。例：0.5=50%
            --costPoint:消耗士气
            --weight:权重
             * */
            public seniorAtt : any = null;

            /**
             *-解锁条件  拥有 X 个门客
             * */
            public unlock : number = 0;

            /**
             * 门客等级
             */
            public servantLv:number;

            
            public dailyNum:number;

            /**
             * 每次间隔时间 单位（秒）
             */
            public intervalTime:number;

            /**
             * 出使消耗道具
             */
            public fightAdd:string;

            /**
             * 复仇消耗道具
             */
            public revenge:string;

            /**
             * 挑战消耗道具
             */
            public challenge:string;

            /**
             * 追杀消耗道具 暂用道具
             */
            public hunt:string;

            /**
             * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
             */
            public parameter1:number;
            public parameter2:number;
            public parameter3:number;
            
            /**
             * 选取敌方角色的随机波动名次
             */
            public range:any[]=[];
            
            /**
             * 每击杀3个门客，获得一个翻牌奖励
             */
            public rewardTurn:number=0;
            
            /**
             * 每次获胜奖励
             * --score:衙门积分 
            --abilityExp:书籍经验
            --point:士气数量
             */
            public victory:any=null;

            /**
             * 每次失败  衙门分数-1
             */
            public fail:number=0;

            /**
             * 追杀时，战胜敌方，敌方分数-2
             */
            public huntScore:number=0;

            /**
             * 绝地衙门积分下限
             */
            public lowestScore:number=0;

            /**
             * 翻牌奖励  在翻牌时，随机1个奖励  其余5张牌，1张和随机出的奖励一样  其余4张再随4个不重复的（和已获得的也不重复）
             */
            public rewardPool:any=null;

            /**
             * --淘汰轮次
                --time:淘汰时间
                --btmLine:淘汰名次下限
             * */
            public weedOut : any[] = [];

            /**
			 *个人排名奖励
			 */
            public indivdualRank : any[] = [];

            /**
             *帮会排名奖励
            */
            public allianceRank : any[] = [];
            /**
             *观赛奖励
            */
            public audienceReward : any[] = [];
            //任务
            public audienceTask : any[] = [];
            //助威加成
            public help : any[] = [];
            //--门客支援上限
            public Servanthelp=0;
        
            //--门客支援额外消耗道具
            public itemCost="";
            
            
            public formatData(data:any):void{
                for(let i in data){
                    this[i] = data[i];
                }
            }
            
            /**
             * 每日武馆次数
             */
            public getDailyNum():number
            {
                return this.dailyNum;
            }

            /**
             * 额外出战系数
             */
            public getParameter1():number
            {
                return this.parameter1;
            }

            /**
             * 门客等级限制
             */
            public getServantLv():number
            {
                return this.servantLv;
            }

            /**
             * 每次间隔时间 单位（秒）
             */
            public getIntervalTime():number
            {
                return this.intervalTime;
            }

            /**
             * 解锁条件  拥有 X 个门客
             */
            public getUnlock():number
            {
                return this.unlock;
            }

            /**
             * 初始属性
             */
            public getInitAtt(key:string):any
            {
                return this.iniAtt[Number(key) - 1];
            }
            /**
             * 初级属性
             */
            public getJuniorAtt(key:string):any
            {
                return this.juniorAtt[Number(key) - 1];
            }
            /**
             * 中级属性
             */
            public getMediumAtt(key:string):any
            {
                return this.mediumAtt[Number(key) - 1];
            }
            /**
             * 高级属性
             */
            public getSeniorAtt(key:string):any
            {
                return this.seniorAtt[Number(key) - 1];
            }

            public getFightAdd():string
            {
                return this.fightAdd.split('_')[1];
            }
            /**
             * 上榜条件 击败多少名
             */
            public getbeatNum():number
            {
                return this.parameter3;
            }
        } 
	}
}