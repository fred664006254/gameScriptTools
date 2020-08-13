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

	public openViewByFunName(functionName:string):boolean
	{
		let result:boolean=false;
		if(functionName)
		{
			if(Api[functionName+"VoApi"]&&Api[functionName+"VoApi"].openMainView)
			{
				Api[functionName+"VoApi"].openMainView();
				result=true;
			}
			else
			{
				let viewClassName:string=App.StringUtil.firstCharToUper(functionName)+"View";
					
				if(egret.hasDefinition(viewClassName))
				{	
					if (viewClassName == "DailybossView" && !Api.switchVoApi.checkOpenDailybossTogather())
					{
						this.openView(ViewConst.COMMON.DAILYBOSSDETILVIEW);
					}
					else
					{
						this.openView(viewClassName);
					}
					result=true;
				}
				else
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
					if(DEBUG)
					{
						this.openView(viewClassName);
					}
					result=false;
				}
			}
		}
		return result;
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