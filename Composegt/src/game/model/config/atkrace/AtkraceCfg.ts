

namespace Config {
	/**
	 * 擂台配置
	 */
	export namespace AtkraceCfg
	{	
		/**
		 * 解锁条件  拥有 X 个门客
		 */
		let unlock:number;

		/**
		 * 门客等级
		 */
		let servantLv:number[];

		
		let dailyNum:number;

		/**
		 * 每次间隔时间 单位（秒）
		 */
		let intervalTime:number;

		/**
		 * 出使消耗道具
		 */
		let fightAdd:string;

		/**
		 * 复仇消耗道具
		 */
		let revenge:string;

		/**
		 * 挑战消耗道具
		 */
		let challenge:string;

		/**
		 * 追杀消耗道具 暂用道具
		 */
		let hunt:string;

		/**
		 * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
		 */
		let parameter1:number;
		let parameter3:number;

		let iniAtt:Object;
		let juniorAtt:Object;
		let mediumAtt:Object;
		let seniorAtt:Object;

		/**擂台战斗门客站位，0是己方，1是对方，下对齐 */
		export let servantPosCfg=[
			[
				{x:106.7,y:355,scale:35/45},
				{x:320,y:355,scale:35/45},
				{x:533.3,y:355,scale:35/45},
				{x:160,y:180,scale:1},
				{x:480,y:180,scale:1}
			],
			[
				{x:106.7,y:610,scale:30/45},
				{x:320,y:610,scale:30/45},
				{x:533.3,y:610,scale:30/45},
				{x:160+20,y:695,scale:25/45},
				{x:480-20,y:695,scale:25/45}
			]
		];

		/**擂台战斗门客战斗动画配置 */
		export let servantAtkPosCfg={
			atkb1:[{y:60,scale:40/45},{y:-40,scale:25/45}],
			atk1:[{y:-200,scale:32/45},{y:150,scale:32/45}],
			atkb2:[{y:100,scale:55/45},{y:-20,scale:20/45}],
			atk2:[{y:-415,scale:32/45},{y:215,scale:32/45}],
	
		};

		export function formatData(data:any):void
		{
			unlock = data.unlock;
			servantLv = data.servantLv;
			dailyNum = data.dailyNum;
			intervalTime = data.intervalTime;
			fightAdd = data.fightAdd;
			revenge = data.revenge;
			challenge = data.challenge;
			hunt = data.hunt;
			parameter1 = data.parameter1;
			parameter3 = data.parameter3;

			iniAtt = data.iniAtt;
			juniorAtt = data.juniorAtt;
			mediumAtt = data.mediumAtt;
			seniorAtt = data.seniorAtt;
		}
		/**
		 * 每日武馆次数
		 */
		export function getDailyNum():number
		{
			return dailyNum;
		}

		/**
		 * 额外出战系数
		 */
		export function getParameter1():number
		{
			return parameter1;
		}

		/**
		 * 门客等级限制
		 */
		export function getServantLv():number
		{
			return servantLv[0];
		}

		/**
		 * 门客等级与数量限制
		 * @return [等级, 数量]
		 */
		export function getservantLvAndNum(): number[] {
			return servantLv;
		}

		/**
		 * 每次间隔时间 单位（秒）
		 */
		export function getIntervalTime():number
		{
			return intervalTime;
		}

		/**
		 * 解锁条件  拥有 X 个门客
		 */
		export function getUnlock():number
		{
			return unlock;
		}

		/**
		 * 初始属性
		 */
		export function getInitAtt(key:string):Object
		{
			return iniAtt[key];
		}
		/**
		 * 初级属性
		 */
		export function getJuniorAtt(key:string):Object
		{
			return juniorAtt[key];
		}
		/**
		 * 中级属性
		 */
		export function getMediumAtt(key:string):Object
		{
			return mediumAtt[key];
		}
		/**
		 * 高级属性
		 */
		export function getSeniorAtt(key:string):Object
		{
			return seniorAtt[key];
		}

		export function getFightAdd():string
		{
			return fightAdd;
		}

		/**
		 * 获取出战消耗道具ID
		 */
		export function getCostId(type: number): string {
			switch(type) {
				case AtkraceFightTypes.choose:
					return fightAdd;
				case AtkraceFightTypes.revenge:
					return revenge;
				case AtkraceFightTypes.kill:
					return hunt;
				case AtkraceFightTypes.challenge:
					return challenge;
				default:
					return "";
			}
		}

		/**
		 * 上榜条件 击败多少名
		 */
		export function getbeatNum():number
		{
			return parameter3;
		}
		
	}
}
