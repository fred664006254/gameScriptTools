class DiceVo extends BaseVo{
	public info : any = {};//骰子信息
	public crivalue : number = 0;//暴击伤害
	// message DiceInfo{
	// 	int32 lv = 1;//骰子等级
	// 	int32 num = 2;//骰子数量
	// }

	public constructor() {
		super();
	}

	public initData(data:any):void{
		if(data){
			for(let key in data){
				this[key]=data[key];
			}
			Api.DiceVoApi.needfreshDice = true;
		}
	}

	public dispose():void{
		this.info = {};
		this.crivalue = 0;
	}
}