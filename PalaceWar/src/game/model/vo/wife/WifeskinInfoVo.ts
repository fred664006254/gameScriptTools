/**
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeskinInfoVo
 */
class WifeskinInfoVo extends BaseVo
{
	// 红颜id
	public id:string = "";
	// 具体红颜的具体皮肤信息
	public skin:any;
	//红颜装配的皮肤ID
	public equip:string;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.skin != null)
			{
				// if(Api.switchVoApi.checkOpenSkinLvup()){
				// 	for (var key in this.skin) {
				// 		let olv = this.skin[key].wlv;
				// 		let nlv = data.skin[key].wlv;
				// 		if(nlv > olv)
				// 		{
				// 			//弹出皮肤升级UI
				// 			ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:key});
				// 			break;
				// 		}
				// 	}
				// }
				this.skin = data.skin;
			}
			if(data.equip != null)
			{
				this.equip = data.equip;
			}
		
		}
	}

	/**红颜名称 */
	public get name():string
	{
		return this.cfg.name;
	}
	/**红颜描述 */
	public get desc():string
	{			
		return this.cfg.desc;
	}
	/**红颜说的话 */
	public get words():string
	{
		return this.cfg.words;
	}
	/**红颜剧情选项进度*/
	public avgSelect(skinId :string, level : number):any[]{
		let arr = [];
		if(this.skin && this.skin[skinId] && this.skin[skinId].chatselect && this.skin[skinId].chatselect[level]){
			for(let i in this.skin[skinId].chatselect[level]){
				let unit = this.skin[skinId].chatselect[level][i];
				arr.push(unit);
			}
		}
		return arr;
	}

	//是否重置过
	public havereset(skinId :string, lv : number):boolean{
		let flag = false;
		if(this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[lv]){
			flag = Object.keys(this.skin[skinId].chatHistory[lv]).length > 0;
		}
		return flag;
	}
	/**红颜剧情当前进度*/
	public getCuravgId(skinId :string, level : number):number{
		let num = 1;
		if(this.skin && this.skin[skinId] && this.skin[skinId].chatselect && this.skin[skinId].chatselect[level]){
			let keys = Object.keys(this.skin[skinId].chatselect[level]);
			if(keys.length){
				keys.sort((a,b)=>{
					return Number(b) - Number(a);
				});
				num = Number(keys[0]);
			}
		}
		return num;
	}
	/**红颜当前季度选项*/
	public isAvgSelected(skinId :string, level : number, id : number, sel : number):boolean{
		let flag = false;
		if(this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[level] && this.skin[skinId].chatHistory[level][id]){
			let index = this.skin[skinId].chatHistory[level][id].indexOf(Number(sel));
			flag = index > -1;
		}
		return flag;
	}
	/**红颜历史选项*/
	public getNowAvgSelected(skinId :string, level : number, id : number):number{
		let sel = 1;
		if(this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[level] && this.skin[skinId].chatselect[level][id]){
			sel = this.skin[skinId].chatselect[level][id];
		}
		return sel;
	}


	public get cfg()
	{

		return Config.WifeskinCfg.getWifeCfgById(this.id.toString());
	}

	public dispose():void
	{
		this.id = "";
		this.skin = 0;
		this.equip = null;
	}
}