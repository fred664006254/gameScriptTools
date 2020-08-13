/**
 * 称号道具vo
 * author shaoliang
 * date 2017/10/28
 * @class TitleInfoVo
 */

class TitleInfoVo extends BaseVo
{
	// 道具id
	public id:number = 0;
	// 道具状态 -1 没有 0 有， 1，已使用 ，2已装配
	public num:number = -1;

	private _lv:number = 0;
	public tnum:number = 0;

	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data.id != null)
		{
			this.id = Number(data.id);
		}
		else {

		}
		if(data.num != null)
		{
			this.num = Number(data.num);
		}
		else {
			this.num = -1;
		}
		if(data.tnum != null)
		{
			this.tnum = Number(data.tnum);
		}
		else {
			this.tnum = 0;
		}
	}

	public getTrueLv():number{
		//称号升级
		// if(this.tnum && this.tnum >0)
		// {
		// 	return this.tnum;
		// }
		return this._lv;
	}
	public get lv():number
	{	
		//称号升级
		// if(this.tnum && this.tnum >0)
		// {
		// 	return this.tnum;
		// }
		if (this._lv == 0)
		{
			return 1;
		}
		return this._lv;
	}

	public set lv(l:number)
	{	
		if (l != this._lv)
		{	
			if (this._lv>0 && l > this._lv)
			{
				if(this.itemCfg.emperorLvUpNeed && this.itemCfg.emperorLvUpNeed.length > 0){ //帝王称号升级
					ViewController.getInstance().openView(ViewConst.COMMON.PALACEEMPERORLVUPVIEW,{titleId:this.id});
				}else{
					ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,{titleId:this.id,lv:l});
				}
			}
			this._lv = l;
		}
		
	}

	
	// 道具名称
	public get name():string
	{
		return this.itemCfg.name;
	}

	// 道具描述
	public get desc():string
	{
		if (this.isLvUp == 1)
		{	
			let parms:string[] = [];
			if (this.effect1)
			{	
				let value:number = this.effect1;
				if (this.lvUpEffect1)
				{
					value += this.lvUpEffect1*(this.lv-1);
				}
				parms.push(String(value));
			}
			if (this.effect2)
			{	
				let value:number = this.effect2;
				if (this.lvUpEffect2)
				{
					value += this.lvUpEffect2*(this.lv-1);
				}
				parms.push(String(value*100+"%"));
			}
			if(this.atkEffect){
				let value:number = this.atkEffect * this.lv;
				parms.push(String(Math.ceil(value * 100)));
			}
			return LanguageManager.getlocal("itemDesc_" + this.id,parms);
		}
		else
		{
			return this.itemCfg.desc;
		}
	}

	public get dropDesc():string
	{
		return this.itemCfg.dropDesc;
	}

	// icon图
	public get icon():string
	{
		return this.itemCfg.icon;
	}

	// 背景图片
	public get iconBg():string
	{
		return this.itemCfg.iconBg;
	}
	// 资质
	public get quality():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.quality;
		}
		return 1;
	}
	public get qualityColor():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.qualityColor;
		}
		return TextFieldConst.COLOR_QUALITY_WHITE_NEW;
	}
	// 是否显示使用按钮
	public get isShowUseBtn():boolean
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isUse==1;
		}
		return false;
	}

	// 是否是全服唯一称号
	public get isOnly():boolean
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isOnly==1;
		}
		return false;
	}

	// 排序id
	public get sortId():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.sortId;
		}
		return 0;
	}



	// 类型，1：道具 2：合成 3：时装
	public get type():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.type;
		}
		return 0;
	}
	public get isLvUp():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isLvUp;
		}
		return 0;
	}

	public get lvUpEffect1():number
	{
		if(this.itemCfg && this.itemCfg.lvUpEffect1)
		{
			return this.itemCfg.lvUpEffect1;
		}
		return 0;

	}

	public get lvUpEffect2():number
	{
		if(this.itemCfg && this.itemCfg.lvUpEffect2)
		{
			return this.itemCfg.lvUpEffect2;
		}
		return 0;

	}
	public get effect1():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.effect1;
		}
		return 0;
	}

	public get effect2():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.effect2;
		}
		return 0;
	}

	public get atkEffect():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.atkEffect;
		}
		return 0;
	}

	public get lvLimit():number{
		if(this.itemCfg)
		{
			if(this.itemCfg.emperorLvUpNeed && this.itemCfg.emperorLvUpNeed.length > 0)
			{
				return this.itemCfg.emperorLvUpNeed.length;
			}
			return this.itemCfg.lvLimit;
		}
		return 0;
	}


	// 该道具配置
	public get itemCfg()
	{
		let cfg:any = Config.TitleCfg.getTitleCfgById(this.id);
		if (!cfg) {
			cfg = Config.PortraitCfg.getPortraitCfgById(this.id);
		}
		return cfg;
	}

	public dispose():void
	{
		this.id = 0;
		this.num = -1;
		this._lv = 0;
		this.tnum = 0;
	}
}