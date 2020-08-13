/**
 * 裁缝
 * author dmj
 * date 2018/03/01
 * @class AcTailorApi
 */
class AcTailorApi extends BaseVoApi
{
	private acTailorVo:AcTailorVo;
	public constructor() 
	{
		super();
	}

	public getFreeTimes()
	{
		return this.acTailorVo["free"];
	}
	
	public dispose():void
	{
		this.acTailorVo=null;
		super.dispose();
	}
}