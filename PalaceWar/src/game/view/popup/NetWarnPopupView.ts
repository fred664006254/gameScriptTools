/**
 * 网络异常警告
 * author 陈可
 * date 2019/11/07
 * @class NetWarnPopupView
 * 
 */
class NetWarnPopupView extends NetErrorPopupView
{
	public constructor() 
	{
		super();
	}

	protected getMessage():string
	{
		return LanguageManager.getlocal("netWarnDesc");
    }
    
    public hide():void
    {
        super.hide();
        ViewController.getInstance().hideAllView();
        if(App.DeviceUtil.IsHtml5())
        {
            window.location.reload();
        }
        else
        {
            ViewController.getInstance().dispose();
        }
    }
}