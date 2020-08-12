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
						this.openView(viewClassName);
						result=true;
				}
				else
				{
					App.CommonUtil.showTip(LangMger.getlocal("sysWaitOpen"));
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

	public openScErrorView(e:egret.Event):void
	{
		let str:string=e.data||"";
		if(PlatMgr.checkIsLocal())
		{
			alert("服务器返回数据解析错误(错误原因):\n1.检查协议文件是否是最新\n2.服务器端检查返回数据是否有空{}\n收到的服务器返回数据：\n"+e.data);
		}
		StatisticsHelper.reportOwnNameLog({data:str.replace(/\s/g,""),v:window["VERINFO_VER"]},"decodeprotoerror");
		NetManager.checkCSVersion(99999999);
		// this.openView();
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