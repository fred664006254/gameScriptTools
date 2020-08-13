/**
 * 习武失败，被踢出
 * author yanyuling
 * date 2017/12/01
 * @class StudyatkFailedPopupView
 */

class StudyatkFailedPopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	protected initView():void
	{	
		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bottomBg = BaseBitmap.create("public_9_bg39");
        bottomBg.width = 520;
        bottomBg.height = 190;
		bottomBg.name = "bottomBg"
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = 20;
        this._nodeContainer.addChild(bottomBg);

		let finishinfo = this.param.data;
		//  Api.studyatkVoApi.getStudyatkFinishinfo();
		let tipTxt = ComponentManager.getTextField("",22);
		tipTxt.multiline = true;
		tipTxt.width = 450;
		tipTxt.lineSpacing = 20;
		tipTxt.text = LanguageManager.getlocal("studyatk_failedTxt",[finishinfo.uname,Math.floor(finishinfo.studytime/60),finishinfo.getskill]);
		tipTxt.x = this.viewBg.width/2 - tipTxt.width/2;
		tipTxt.y = bottomBg.y + bottomBg.height/2 - tipTxt.height/2 ;
		this._nodeContainer.addChild(tipTxt);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.confirmHandler,this);
		confirmBtn.x = this.viewBg.width/2 - confirmBtn.width/2  ;
		confirmBtn.y = bottomBg.y + +bottomBg.height+ 15 ;
		this._nodeContainer.addChild(confirmBtn);
	}
	protected confirmHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
		this.hide();
	}
	protected getBgExtraHeight():number
	{
		return 40;
	}
	public dispose():void
	{	 
		this._nodeContainer = null;

		super.dispose();
	}
}