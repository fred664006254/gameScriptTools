/**
 * 习武成功
 * author yanyuling
 * date 2017/12/01
 * @class StudyatkSuccessView
 */

class StudyatkSuccessView extends BaseView
{
	public constructor() {
		super();
	}
	protected initView():void
	{
	}
	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();
		return rewardPic.concat([
				"public_rule_bg",
				"studyatk_sucess"
		]);
	}

	protected getTitleStr():string
	{
		return null;
	}


	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected init():void
	{
		super.init();

		this.addTouchTap(this.touchTap,this,null);
		let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
		winBg.setPosition(GameConfig.stageWidth/2  - winBg.width,GameConfig.stageHeigth/2 - winBg.height/2);
		this.addChildToContainer(winBg);

		let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
		winBg2.scaleX = -1;
		winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1,GameConfig.stageHeigth/2 - winBg2.height/2);
		this.addChildToContainer(winBg2);

		let flag = BaseBitmap.create("studyatk_sucess");
		flag.x = GameConfig.stageWidth/2 - flag.width/2;
		flag.y =winBg.y - 8;
		this.addChildToContainer(flag);

		let awardBg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		awardBg.width = 500;
		awardBg.height = 140;
		awardBg.setPosition(GameConfig.stageWidth/2  - awardBg.width/2, GameConfig.stageHeigth/2 - awardBg.height/2 -30);
		this.addChildToContainer(awardBg);
		
		// getskill
		let finishinfo = this.param.data;
		//  Api.studyatkVoApi.getStudyatkFinishinfo();
		let tipTxt = ComponentManager.getTextField("",22,);
		tipTxt.multiline = true;
		tipTxt.width = 450;
		tipTxt.lineSpacing = 20;
		tipTxt.text = LanguageManager.getlocal("studyatk_successTxt",[Math.floor(finishinfo.studytime/60),finishinfo.getskill]);
		tipTxt.x = awardBg.x + awardBg.width/2 - tipTxt.width/2;
		tipTxt.y = awardBg.y + awardBg.height/2 - tipTxt.height/2 ;
		this.addChildToContainer(tipTxt);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.confirmHandler,this);
		confirmBtn.x =  awardBg.x + awardBg.width/2 - confirmBtn.width/2;
		confirmBtn.y = awardBg.y + awardBg.height + 15 ;
		this.addChildToContainer(confirmBtn);
	}
	
	protected confirmHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
		this.hide();
	}
	
	private touchTap():void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
		this.hide();
	}

	public dispose():void
	{
		super.dispose();
	}
}