/**
 * 界面管理
 * author 陈可
 * date 2017/9/18
 * @class ViewController
 */
class ViewController extends BaseViewController
{
	public constructor() 
	{
		super();
	}

	private static _instance:ViewController;
	public static getInstance():ViewController
	{
		if(ViewController._instance==undefined)
		{
			ViewController._instance=new ViewController();
		}
		return ViewController._instance;
	}
}