/**
 * author 陈可
 * date 2017/9/11
 * @class BaseVo
 */
abstract class BaseVo extends BaseClass
{
	public constructor() 
	{
		super();
	}
	public abstract initData(data:any):void;
	public abstract dispose():void; 
}