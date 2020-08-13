/**
 * 册封系统vo
 * author dky
 * date 2018/4/25
 * @class WifestatusVo
 */
class WifestatusVo extends BaseVo
{

	//"星星数值
	public star:number = 0;
	//解锁到的位分位置
	public level:string = "";

	public info:any = null;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.star != null)
			{
				this.star = Number(data.star);
			}
			if(data.level != null)
			{
				this.level = String(data.level);
			}

			if(data.info != null )
			{
				this.info = data.info;
			}
		}
	}
	
	public dispose():void
	{
		
		//军团id
		this.star= null;
		//军团创建者uid
		this.level= null;

		this.info = 0;
	}
}