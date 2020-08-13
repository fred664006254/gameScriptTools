/**
 * 道具vo
 * author dmj
 * date 2017/9/22
 * @class ItemInfoVo
 */
class ItemInfoVo extends BaseVo
{
	// 道具id
	public id:number = 0;
	// 道具数量
	public num:number = 0;


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
		if(data.num != null)
		{
			this.num = Number(data.num);
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
		return this.itemCfg.desc;
	}

	public getDescTxt(showEffectStr?:boolean):BaseTextField
	{
		return this.itemCfg.getDescTxt(showEffectStr);
	}

	// 道具掉落描述
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

	// 是否显示使用按钮
	public get isOnly():boolean
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isUse==1;
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

	// 目标  1:角色 2：门客
	public get target():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.target;
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

	// 该道具配置
	private get itemCfg()
	{
		return Config.ItemCfg.getItemCfgById(this.id);
	}

	public dispose():void
	{
		this.id = 0;
		this.num = 0;
	}
}