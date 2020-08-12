namespace Config{
	/**
	 * jjc配置
	 * author qianjun
	 * @class FairarenaCfg
	 */
	export namespace FairarenaCfg {
        //--入场消耗 X 钻石  100钻石
        let costGem : number = 0;
        //--失败 X 场后，结束
        let failNum : number = 0;
        //--胜场奖励 以及匹配条件
        let winReward : Object = {};
        //刷卡权重
		let diceRatio : Object = {};
		/**竞技场中骰子的等级 */
		let diceLv = 0;
		/**竞技场中的所有骰子暴击伤害 */
		let diceCrit = 0;
		/**初始 sp 值 */
		export let iniSp = 0;
		/**每次召唤骰子的 sp 递增值 */
		let needSp = [];
		/**战斗内powerUP 消耗的 SP */
		let powerUpCost = [];
		/**公平竞技场每轮的时间 */
		let battleTime = [];
		/**转换倍率 */
		export let addMonster = 1;
		/**转换后的怪出现的时间 */
		export let addMonsterDelay = 0;
		/**对战模式中每个玩家的血量值 */
		let playerHp = 0;
		/**每轮 boss 血量值 */
		let bossBaseHp = 0;
		/**每轮击杀 boss 后获得的 SP 值 */
		let bossSp = [];

		let battleChallenge:{[key:string]:ChallengeItemCfg}[]=[];
        let challengeTimeCfg:{[key:string]:ChallengeItemCfg[]}[]=[];
        let battleMonsterNum:{[key:string]:number}={};

		export function formatData(data: any): void{
            costGem = data.costGem;
			failNum = data.failNum;
			diceLv = data.diceLv;
			diceCrit = data.diceCrit;
			iniSp = data.iniSp;
			needSp = data.needSp;
			powerUpCost = data.powerUpCost;
			battleTime = data.battleTime;
			addMonster = data.addMonster;
			addMonsterDelay = data.addMonsterDelay;
			playerHp = data.playerHp;
			bossBaseHp = data.bossBaseHp;
			bossSp = data.bossSp
            for(let key in data.winReward){
                let itemCfg : WinRewardItem;
                if(!winReward.hasOwnProperty(String(key))){
                    winReward[String(key)] = new WinRewardItem();
                }
                itemCfg = winReward[String(key)];
                itemCfg.initData(data.winReward[key]);
                itemCfg.id = Number(key);
			}
			BattleCfg.formatBattleChallengeCfg(data.battleChallenge,battleChallenge,challengeTimeCfg,battleMonsterNum);
		}

		export function getChallangeCfg(round:number):{[key:string]:ChallengeItemCfg[]}
        {
            let l = Math.min(round,challengeTimeCfg.length-1);
            return challengeTimeCfg[l];
		}

		export function getChallangeMsNum(round:number):number
        {
            return battleMonsterNum[round];
        }
		
		export function getItemCfgByRoundAndKey(round:number,cfgKey:string):ChallengeItemCfg
        {
            return battleChallenge[round][cfgKey];
		}
		
		/**
         * 获取下一次购买骰子消耗SP
         * @param num 已拥有骰子的个数，从0开始
         */
        export function getNeedSpByNum(num:number):number
        {

            let totalNum:number=0;
            let l = needSp.length
            for(let i=0;i<=num;i++)
            {
                let idx=Math.floor(i/10);
                idx=Math.min(idx,l-1);
                totalNum+=needSp[idx];
            }
			// BattleCfg.formatBattleChallengeCfg(data.battleChallenge,battleChallenge,challengeTimeCfg,battleMonsterNum);

            return totalNum;
		}
		
		export function getPowerUpCostBylv(clv:number):number
        {
            let maxLv=powerUpCost.length;
            clv=Math.min(maxLv,clv);
            return powerUpCost[clv-1];
        }
		/**
		 * 获取奖励类型
		 * @param winnum 胜场数
		 */
		export function getWinRewardItem(winnum:number) {
			let item = <WinRewardItem>winReward[String(winnum)];
			if(!item){
				return null;
			}
			if(item.getGem && item.getGem != 0){
				return {
					type: 2,
					reward: item.getGem
				}
			} else if (item.getGold && item.getGold != 0) {
				return {
					type: 1,
					reward: item.getGold
				}
			} else if (item.getBoxId && item.getBoxId != '') {
				return {
					type: 3,
					reward: item.getBoxId
				}
			} else {
				return {
					type: 0,
					reward: item.getBoxId
				};
			}
		}

		/**
		 * 奖励字符串
		 * @param winnum 胜场数
		 */
		export function getFormatStr(winnum:number) {
			let item = <WinRewardItem>winReward[String(winnum)];
			if(!item){
				return null;
			}
			if(item.getGem && item.getGem != 0){
				return `1_1_${item.getGem}`;
			} else if (item.getGold && item.getGold != 0) {
				return `2_1_${item.getGold}`;
			} else {
				return null;
			}
		}

		/**
		 * 胜利次数，达到次数后公平竞技场结束
		 */
		export function getMaxWinNum() {
			let winnum = 0;
			if(winReward){
				winnum = Object.keys(winReward).length;
			}
			return winnum;
		}
		/**
		 * 失败次数，达到次数后公平竞技场结束
		 */
		export function getFailNum():number{
            return failNum;
        }
		/**
		 * 公平竞技场门票的钻石数
		 */
        export function getCostGem():number{
            return costGem;
		}
		/**
		 * 公平竞技场的小鸟等级
		 */
		export function getDiceLv():number {
			return diceLv;
		}
		/**公平竞技场的暴击伤害 */
		export function getDiceCrip():number {
			return diceCrit;
		}
		/**初始的 sp 值 */
		export function getIniSp():number {
			return iniSp;
		}

		export function getNeedSp() {
			return needSp;
		}

		export function getPowerUpCost() {
			return powerUpCost;
		}

		export function getBattleTime() {
			return battleTime;
		}

		export function getAddMonster() {
			return addMonster;
		}

		export function getAddMonsterDelay() {
			return addMonsterDelay;
		}

		export function getPlayerHp() {
			return playerHp;
		}

		export function getBossBaseHp() {
			return bossBaseHp;
		}

		export function getBossSp() {
			return bossSp;
		}
	}

	export class WinRewardItem extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * --winNum:胜场数
		 */
		public winNum: number;
		/**
		 * 能匹配到的胜场玩家  {胜场下限，胜场上限}
		 */
		public canMatch: number[];
		/**
		 * 获得金币
		 */
		public getGold: number;
		/**
		 * 获得钻石
		 */
		public getGem: number;
		/**
		 * 获得的宝箱ID
		 */
		public getBoxId: string;
	}
}