class BattlelogVo extends BaseVo{
	
	public info : IBattleLogInfo[] = [];//骰子信息

	public constructor() {
		super();
	}

	public initData(data:any):void{
		if(data){
			for(let key in data){
				this[key]=data[key];
			}
		}
	}

	public dispose():void{
		this.info = [];
	}
}

interface IBattleLogInfo {
	battleType : number;//战斗类型
	changeScore : number;//变化的分数
	turns : number;//轮数
	winFlag : number;//0失败 1胜利
	uid : number;// 对方uid
	level : number;//等级
	name : string;//名称
	score : number;//奖杯
	complain : number;//是否举报0否 1举报 
	line : {id : string}[];//阵容
}
