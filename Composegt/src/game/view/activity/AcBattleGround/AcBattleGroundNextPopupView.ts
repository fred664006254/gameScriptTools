
class AcBattleGroundNextPopupView extends PopupView
{


	public constructor()
	{
		super();
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"battleground_over1",
			"battleground_over2",
		]);
	}
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{	
		
		let curRound = this.vo.getCurRound();
		if(curRound <= 1){
			this.hide();
			return;
		}

		let over2 = BaseBitmap.create("battleground_over2");
		over2.x = GameConfig.stageWidth / 2 - over2.width/2;
		over2.y = this.viewBg.y - 82;
		this.addChildToContainer(over2);


		let over1 = BaseBitmap.create("battleground_over1");
		over1.x = GameConfig.stageWidth / 2 - over1.width/2;
		over1.y = this.viewBg.y - 82;
		this.addChildToContainer(over1);
		
		
		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.x = GameConfig.stageWidth/2 - confirmBtn.width/2;
		confirmBtn.y = this.viewBg.y + this.viewBg.height + 30;
		this.addChildToContainer(confirmBtn);

		let title = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinTitle",[String(curRound-1)]),40,TextFieldConst.COLOR_LIGHT_YELLOW);
		title.x = GameConfig.stageWidth / 2 - title.width/2;
		title.y = this.viewBg.y - 120;
		this.addChildToContainer(title);


		let lastBtmLine = this.cfg.weedOut[curRound-2].btmLine; 
		let detail = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinDetail",[String(lastBtmLine)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		detail.x = GameConfig.stageWidth / 2 - detail.width/2;
		detail.y = this.viewBg.y  + 80;
		this.addChildToContainer(detail);

		let rank = this.vo.getMyRank();
		let score = this.vo.getMyScore();

		// let rankText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinRank",[String(rank)]),22,0xf4d638);
		// rankText.x = GameConfig.stageWidth/2 - 15 - rankText.width;
		// rankText.y = detail.y + detail.height + 15;
		// this.addChildToContainer(rankText);

		// let scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinScore",[String(score)]),22,0xf4d638);
		// scoreText.x = GameConfig.stageWidth/2 + 15;
		// scoreText.y = rankText.y;
		// this.addChildToContainer(scoreText);

		let statusText = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);

		if(this.vo.getJoinIn()){
			statusText.text = LanguageManager.getlocal("acBattleGroundWinStatueSucc");
		} else {
			statusText.text = LanguageManager.getlocal("acBattleGroundWinStatueFail");
		}
		statusText.x = GameConfig.stageWidth/2 - statusText.width/2;
		statusText.y = detail.y + detail.height + 25;
		this.addChildToContainer(statusText);
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected isTouchMaskClose():boolean
	{
		return false;
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}

	public dispose():void
	{	
		super.dispose();
	}
}