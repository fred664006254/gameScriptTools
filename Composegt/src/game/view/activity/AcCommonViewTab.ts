/**
 * 通用tab页面
 * author ck
 * date 2018/8/14
 * @class AcCommonViewTab
 */
abstract class AcCommonViewTab extends CommonViewTab
{
	/**
	 * 引用的view实例，框架内用，不允许在其他地方使用
	 */
	private _view:AcCommonView=null;
	public constructor() 
	{
		super();
	}

	/**
	 * 这个不允许改作用域，也不允许子级调用
	 */
	private checkGetAcView():boolean
	{
		if(!this._view)
		{
			this._view=<AcCommonView>ViewController.getInstance().getView(this.getClassName().split("Tab")[0]);
		}
		return this._view?true:false;
	}

	/**
	 * 获取aid，和view保持一致
	 */
	protected get aid():string
	{
		if(this.checkGetAcView())
		{
			return this._view["aid"];
		}
	}

	/**
	 * 获取code，和view保持一致
	 */
	protected get code():string
	{
		if(this.checkGetAcView())
		{
			return this._view["code"];
		}
	}

	public dispose():void
	{
		this._view=null;
		super.dispose();
	}
}