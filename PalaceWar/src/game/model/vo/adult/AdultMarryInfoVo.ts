/**
 * 成年成亲vo
 * author dky
 * date 2017/10/31
 * @class AdultMarryInfoVo
 */
class AdultMarryInfoVo extends BaseVo
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


	// pro
	public pro:number[];

	// 自己小孩总属性值
	public total:number = 0;
	// 伴侣总属性值
	public ftotal:number = 0;

	// 伴侣的名字
	public fname:string = "";

	// 伴侣父亲的名字
	public funame:string = "";

	// 伴侣父亲的uid
	public fuid:number = 0;

	// 伴侣属性
	public fattr:number = 0;

	// 结婚的时间
	public mts:number = 0;
	
	//是否互访
	public visit:number = 0;
	public visitname:string = '';
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
			if(data.total)
			{
				this.total = data.total;
			}


			if(data.ftotal)
			{
				this.ftotal = data.ftotal;
			}
			if(data.fname)
			{
				this.fname = data.fname;
			}
			if(data.funame)
			{
				this.funame = data.funame;
			}
			if(data.funame)
			{
				this.funame = data.funame;
			}
			if(data.fattr)
			{
				this.fattr = data.fattr;
			}
			if(data.mts)
			{
				this.mts = data.mts;
			}
			if(data.visit)
			{
				this.visit = data.visit;
			}
			if(data.visitname){
				this.visitname = data.visitname;
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
		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
	}
}