/**
 * 主播网红
 * author 赵占涛
 * date 2018/3/17
 * @class ZhubowanghongView
 */
class ZhubowanghongView extends CommonView
{
	private _handContainer:BaseDisplayObjectContainer;

	public constructor() 
	{
		super();
	}
	
	public initView():void
	{
		console.log("ZhubowanghongView.initView");
		let bg = BaseBitmap.create("zhubowanghong_bg");
		bg.y = -13;
		this.addChildToContainer(bg);

		let btnBg = BaseBitmap.create("wifeskin_barbg");
		btnBg.x = 0;
		btnBg.y = GameConfig.stageHeigth - this.container.y - btnBg.height;
		this.addChildToContainer(btnBg);
		
		// 寻访按钮
		let goXunfangBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"zhubowanghong_goXunfang",this.xunfangButtonHandler ,this);        
		goXunfangBtn.x = btnBg.width/2 - goXunfangBtn.width/2;
		goXunfangBtn.y = btnBg.y + btnBg.height/2 - goXunfangBtn.height/2;
		goXunfangBtn.name = "goXunfangBtn";
		this.addChildToContainer(goXunfangBtn);
		console.log("ZhubowanghongView.initView over");
	}

	private xunfangButtonHandler():void
	{
		if (Api.searchVoApi.isShowNpc()) {
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		} else {
			App.CommonUtil.showTip(Api.searchVoApi.getLockedString());
		}
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([					
					"zhubowanghong_bg","wifeskin_barbg"
					]);
	}


	public dispose():void
	{
		this._handContainer = null;
		super.dispose();
	}
}