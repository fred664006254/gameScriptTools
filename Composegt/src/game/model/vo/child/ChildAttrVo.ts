/**
 * 子嗣属性vo
 * author dmj
 * date 2017/9/23
 * @class ChildrenAttrVo
 */
class ChildAttrVo extends BaseVo 
{
	// 武力
	public forceTotal:number = 0;
	// 智力
	public brainsTotal:number = 0;
	// 政治
	public politicsTotal:number = 0;
	// 魅力
	public charmTotal:number = 0;
	// 总和
	public attTotal:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data)
			{
				let curTotal = this.attTotal;
				
				this.forceTotal = Number(data[0]);
				this.brainsTotal = Number(data[1]);
				this.politicsTotal = Number(data[2]);
				this.charmTotal = Number(data[3]);
				this.attTotal = this.forceTotal + this.brainsTotal + this.politicsTotal + this.charmTotal;
			
				// if(curTotal!=0 && this.attTotal - curTotal >0){
				// 	let dis = this.attTotal - curTotal;
				// 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
				// 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);	
				// 	let powerFly = new PowerFly();
				// 	powerFly.init(dis);
					
				// 	LayerManager.msgLayer.addChild(powerFly);
				// }
				
			}	
		}
	}
	public dispose():void
	{
		this.forceTotal = 0;
		this.brainsTotal = 0;
		this.politicsTotal = 0;
		this.charmTotal = 0;
	}
}