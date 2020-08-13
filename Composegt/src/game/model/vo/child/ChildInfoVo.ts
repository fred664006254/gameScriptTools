/**
 * 子嗣vo
 * author dmj
 * date 2017/9/23
 * @class ChildrenInfoVo
 */
class ChildInfoVo extends BaseVo
{
	// id
	public id:string = "";
	// 母亲id
	public motherId:number = 0;
	// 子嗣的名称
	public name:string = "";
	// 子嗣的活力
	public vigour:any;
	// level
	public level:number = 0;
	// exp
	public exp:number = 0;
	// 属性todo
	public attrVo:ChildAttrVo;
	// 性别 1男，2女
	public sex:number = 0;
	// 品质
	public quality:number = 0;
	// 出生时间
	public bts:number = 0;
	// 子嗣的形象1~5
	public character:number = 0;

	public lastLevel:number = 0;
	public lastExp:number = 0;
	public constructor() 
	{
		super();
	}

	// todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等



	public initData(data:any):void
	{
		if(data)
		{
			if(data.mother != null)
			{
				this.motherId = Number(data.mother);
			}
			if(data.name != null)
			{
				this.name = String(data.name);
			}
			if(data.vigour)
			{
				this.vigour = data.vigour;
			}
			if(data.lv != null)
			{
				this.lastLevel = this.lastLevel==0?Number(data.lv):this.level;
				this.level = Number(data.lv);
			}
			if(data.sex != null)
			{
				this.sex = Number(data.sex);
			}
			if(data.quality != null)
			{
				this.quality = Number(data.quality);
			}
			if(this.attrVo == null)
			{
				this.attrVo = new ChildAttrVo();
				// this.attrVo.initData(data.attr)
			}
			if(data.attr != null)
			{
				this.attrVo.initData(data.attr);
			}
			if(data.exp != null)
			{
				this.lastExp = this.exp;
				this.exp = Number(data.exp);
			}
			if(data.bts != null)
			{
				this.bts = Number(data.bts);
			}
			if(data.character != null)
			{
				this.character = Number(data.character);
			}
		}
	}

	public dispose():void
	{
		this.id = "";
		this.motherId = 0;
		this.name = "";
		this.vigour = 0;
		this.level = 0;
		this.sex = 0;
		this.quality = 0;
		this.exp = 0;
		this.bts = 0;
		this.lastExp = 0;
		this.lastLevel = 0;
		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
	}
}