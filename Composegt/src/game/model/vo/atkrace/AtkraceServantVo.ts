
class AtkraceServantVo extends BaseVo
{
	public id:string;
	/**
	 * 当前属性
	 */
	public attr:number = 0;

	/**
	 * 满血
	 */
	public fullattr:number = 0;

	/**
	 * 总资质
	 */
	public ability:number = 0;

	/**
	 * 等级
	 */
	public lv:number = 0;

	/**
	 * 门客id
	 */
	public sid:string = null;

	/**
	 * 技能1等级
	 */
	public s1lv:number = 0;

	/**
	 * 技能2等级
	 */
	public s2lv:number = 0;
	
	/**
	 * 爵位
	 */
	public clv:number = 0;
	public skin:string = null;
	
	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			this.attr =data.attr;
			this.fullattr =data.fullattr;
			this.ability =data.ability;
			this.lv =data.lv;
			this.sid =data.sid;
			this.s1lv =data.s1lv;
			this.s2lv =data.s2lv;
			this.skin =data.skin;
			if (this.clv!=null) {
				this.clv = data.clv;
			}
		}
	}

	public dispose()
    {	
	   this.id = null;
       this.attr = 0;
	   this.fullattr = 0;
	   this.ability = 0;
	   this.lv = 0;
	   this.sid = null;
	   this.s1lv = 0;
	   this.s2lv = 0;
	   this.clv = 0;
	   this.skin = null;
    }
}