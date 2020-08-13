/**
 * 对战结果 
 */
class NewAtkraceCrossFameBattleResultView extends CommonView
{	
	private _callbackF:Function = null;
	private _obj:any = null;
	private _type:number = 1; //1 胜利   2 失败  


	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = [];
		if (this.param.data.type==2) {
			rewardPic=["battle_fail_word"];
		}
		else {
			rewardPic=["battle_win_word"];
		}

		return rewardPic.concat([
		]);
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected initView():void
	{
		this.addTouchTap(this.touchTap,this,null);

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		if (this.param.data && this.param.data.type) {
			this._type = this.param.data.type;
		}
		let winBg = BaseBitmap.create("public_9_wordbg");
		winBg.width = GameConfig.stageWidth;
		winBg.height = 168;
		let discStr:string;
        // 统一使用一个key
        winBg.height = 220; 
        // discStr = LanguageManager.getlocal("studyatk_battle_result_new");
        // if(Api.switchVoApi.checkIsTitleState(`3501`) || Api.switchVoApi.checkIsTitleState(`3601`)){
        //     discStr = LanguageManager.getlocal("studyatk_battle_result_new2");
        // }
		
		winBg.setPosition(GameConfig.stageWidth/2  - winBg.width/2,GameConfig.stageHeigth/2 - winBg.height/2);
		this.addChildToContainer(winBg);
		
		let wordPic:string;
		if (this._type==2) {
			App.DisplayUtil.changeToGray(winBg);
			wordPic= "battle_fail_word";
		}
		else {
			wordPic= "battle_win_word";
		}
		let winText:BaseBitmap = BaseBitmap.create(wordPic);
		winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, winBg.y - winText.height/2);
		this.addChildToContainer(winText);
		
		let battleResult:BaseTextField = ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.addChildToContainer(battleResult);
		battleResult.textAlign = TextFieldConst.ALIGH_CENTER;
		if (this._type == 2 ) {
			battleResult.text = LanguageManager.getlocal("newatkrackcross_fameBattle_lost");
			battleResult.setPosition(winBg.x + winBg.width/2 - battleResult.width/2, winBg.y + winBg.height/2 - battleResult.height/2);
			battleResult.textColor = TextFieldConst.COLOR_QUALITY_RED;
		}
		else {
			battleResult.text = LanguageManager.getlocal("newatkrackcross_fameBattle_win");
			battleResult.setPosition(winBg.x + winBg.width/2 - battleResult.width/2, winBg.y + winBg.height/2 - battleResult.height/2);
			battleResult.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
		}
		
		// let battleFail2:BaseTextField = ComponentManager.getTextField( discStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// battleFail2.lineSpacing = 5;
		// battleFail2.setPosition(winBg.width/2 - battleFail2.width/2, battleResult.y + 45 );
		// this.addChildToContainer(battleFail2);
	}

	private touchTap():void
	{
		if (this._obj && this._callbackF) {
			App.LogUtil.log("touchTap hide");
			this._callbackF.apply(this._obj);
		}
		this.hide();
		
	}

	public dispose():void
	{
		this._callbackF = null;
		this._obj = null;
		this._type = 1;

		super.dispose();
	}
}