/**
 * 八王称帝api
 * author shaoliang
 * date 2018/5/9
 * @class EmperorwarVoApi
 */

class EmperorwarVoApi extends BaseVoApi
{	
	private emperorwarVo:EmperorwarVo = null;

	public emperorwarActiveVo:EmperorwarActiveVo = null;

	public constructor() {
		super();
	}

	public setActiveInfo(info:any):void
	{
		if (!this.emperorwarActiveVo)
		{
			this.emperorwarActiveVo = new EmperorwarActiveVo();
		}
		this.emperorwarActiveVo.initData(info);
	}

	public dispose():void
	{	
		if (this.emperorwarVo)
		{
			this.emperorwarVo.dispose();
			this.emperorwarVo=null;
		}
		if (this.emperorwarActiveVo)
		{
			this.emperorwarActiveVo.dispose();
			this.emperorwarActiveVo=null;
		}
		super.dispose();
	}
}