/**
 * 成年vo
 * author dky
 * date 2017/9/23
 * @class AdultInfoVo
 */
class AdultInfoVo extends BaseVo
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
	// 属性todo
	public attrVo:ChildAttrVo;
	// 性别 1男，2女
	public sex:number = 0;
	// 品质
	public quality:number = 0;
	// 身份
	public aquality:number = 0;
	// 科举时间
	public ts:number = 0;
	//拜访的对象
	public visit : number = 0;

	// pro
	public pro:number[];

	public shareCd : number = 0;

	public constructor() 
	{
		super();
	}

	// todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等



	public initData(data:any):void
	{
		if(data)
		{
			if(data.mother)
			{
				this.motherId = Number(data.mother);
			}
			if(data.name)
			{
				this.name = String(data.name);
			}
			if(data.vigour)
			{
				this.vigour = data.vigour;
			}
			if(data.lv)
			{
				this.level = Number(data.lv);
			}
			if(data.sex)
			{
				this.sex = Number(data.sex);
			}
			if(data.quality)
			{
				this.quality = Number(data.quality);
			}
			if(data.aquality)
			{
				this.aquality = Number(data.aquality);
			}
			if(this.attrVo == null)
			{
				this.attrVo = new AdultAttrVo();
				// this.attrVo.initData(data.attr)
			}
			if(data.attr)
			{
				this.attrVo.initData(data.attr);
			}
			if(data.pro)
			{
				this.pro = data.pro;
			}
			if(data.ts)
			{
				this.ts = data.ts;
			}
			if(data.visit)
			{
				this.visit = data.visit;
			}
			if(data.shareCd != null)
			{
				this.shareCd = data.shareCd;
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
		this.shareCd = 0;
		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
	}
}