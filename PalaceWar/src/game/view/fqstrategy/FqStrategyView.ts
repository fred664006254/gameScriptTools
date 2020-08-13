/**
 * FQ游戏策略
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyView
 */
class FqStrategyView extends CommonView {
	public constructor() {
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["fqstrategyview_bg","fqstrategyview_titlebg"]);
	}
	public initView()
	{

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPoint,this);
		let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 75;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
		this.addChildToContainer(bottomBg); 
		
		//检测第三个红点
		this.checkRedPoint();
	}
	private checkRedPoint():void
	{
		if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&	Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction)
		{
			let fqSwitch = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
			if(Api.strengthenVoApi.checkNpcMessage()&&fqSwitch != "OFF")
			{
				this.tabbarGroup.addRedPoint(2);
			}
			else
			{
				this.tabbarGroup.removeRedPoint(2); 
			}
		} 
	}
	protected getTabbarTextArr():Array<string>
	{
		var	tabArr =[
			"fqStrategyViewTab1",
			"fqStrategyViewTab2",
		];  
		if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction)
		{
			tabArr.push("fqStrategyViewTab3");
		}
		return  tabArr; 
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		if(GameData.fqGameStrategyData == null)
		{
			return;
		}
		return {requestType:NetRequestConst.REQUST_FAQ_GETFAQCONTENT,requestData:{}};
	}
	 protected receiveData(data:{ret:boolean,data:any})
	{
		if(data.ret == false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
			return;
		}
		GameData.fqGameStrategyData.intro =  data.data.data.intro;
		if(data.data.data.rcontent)
		{
			GameData.fqGameStrategyData.rcontent = data.data.data.rcontent;
		}
		else
		{
			GameData.fqGameStrategyData.rcontent = [];
		}
		if(data.data.data.faqcontent)
		{
			GameData.fqGameStrategyData.faqcontent = data.data.data.faqcontent;
		}
		else
		{
			GameData.fqGameStrategyData.faqcontent = [];
		}
		
	}
	protected getTitleStr():string
	{
		return "fqStrategyViewTitle";
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPoint,this);
		super.dispose();
	}
}
