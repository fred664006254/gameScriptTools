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
				if(Api.switchVoApi.checkOpenWifeskinLvup()){
					for(let key in data.skin){
						if(this.skin && this.skin[key] && data.skin[key]){
							if(data.skin[key]["wlv"] != this.skin[key]["wlv"]){
								//皮肤等级发生改变
								ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{wifeId:this.id,skinId:key,lv:data.skin[key]["wlv"]});
							}
						}
					}
				}



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

	public getLvBySkinId(skinId:string):number
	{
		if(this.skin[Number(skinId)] && this.skin[Number(skinId)].wlv){
			return this.skin[Number(skinId)].wlv;
		} else {
			return 1;
		}

	}

	
	/**红颜说的话 */
	public get words():string
	{

		return this.cfg.words;
	
		
	}
	public get atkAdd():number
	{
		if(this.cfg){
			return this.cfg.atkAdd;
		}
		return 0;
	}
	public get inteAdd():number
	{
		if(this.cfg){
			return this.cfg.inteAdd;
		}
		return 0;
	}
	public get politicsAdd():number
	{
		if(this.cfg){
			return this.cfg.politicsAdd;
		}
		return 0;
	}
	public get charmAdd():number
	{
		if(this.cfg){
			return this.cfg.charmAdd;
		}
		return 0;
	}
	public get wifeIntimacy():number
	{
		if(this.cfg){
			return this.cfg.wifeIntimacy;
		}
		return 0;
	}
	public get wifeGlamour():number
	{
		if(this.cfg){
			return this.cfg.wifeGlamour;
		}
		return 0;
	}					

	public get atkLvUpAdd():any[]
	{
		if(this.cfg)
		{
			return this.cfg.atkLvUpAdd;
		}
		return null;
	}
	public get inteLvUpAdd():any[]
	{
		if(this.cfg)
		{
			return this.cfg.inteLvUpAdd;
		}
		return null;
	}
	public get politicsLvUpAdd():any[]
	{
		if(this.cfg)
		{
			return this.cfg.politicsLvUpAdd;
		}
		return null;
	}
	public get charmLvUpAdd():any[]
	{
		if(this.cfg)
		{
			return this.cfg.charmLvUpAdd;
		}
		return null;
	}
	public get wifeLvUpIntimacy():number
	{
		if(this.cfg)
		{
			return this.cfg.wifeLvUpIntimacy;
		}
		return null;
	}
	public get wifeLvUpGlamour():number
	{
		if(this.cfg)
		{
			return this.cfg.wifeLvUpGlamour;
		}
		return null;
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