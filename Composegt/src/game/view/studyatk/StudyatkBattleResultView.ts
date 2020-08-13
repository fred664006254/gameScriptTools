
class StudyatkBattleResultView extends BaseView
{	
	private _callbackF:Function = null;
	private _obj:any = null;
	private _type:number = 1; //1 同级胜利   2 同级失败  3 不同级胜利


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

		return rewardPic;
		// return rewardPic.concat([
		// 	"dailybosslastattacktitle_di"
		// ]);
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	// protected getBgName():string
	// {
	// 	// return "public_9_bg8";
	// 	return "dailybosslastattacktitle_di";
	// }

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
		let winBg = BaseBitmap.create("dailybosslastattacktitle_di");
		// winBg.width = GameConfig.stageWidth;
		// winBg.height = 168;
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
		winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, winBg.y - winText.height/2 + 36 - 10);
		this.addChildToContainer(winText);
		
		let battleResult:BaseTextField = ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.addChildToContainer(battleResult);
		if (this._type == 2 ) {
			battleResult.text = LanguageManager.getlocal("studyatkBattle_lost");
			battleResult.setPosition(winBg.width/2 - battleResult.width/2, winBg.y + 69 + 65);
			battleResult.textColor = TextFieldConst.COLOR_QUALITY_RED;
		}
		else {
			battleResult.text = LanguageManager.getlocal("studyatkBattle_win");
			battleResult.setPosition(winBg.width/2 - battleResult.width/2, winBg.y + 69 + 65);
			battleResult.textColor = TextFieldConst.COLOR_WARN_GREEN2;
		}

		let discStr:string;
		if (this._type==3) {
			discStr= LanguageManager.getlocal("studyatk_battle_result1");
		}
		else {
			discStr= LanguageManager.getlocal("studyatk_battle_result2");
		}

		let battleFail2:BaseTextField = ComponentManager.getTextField( discStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		battleFail2.setPosition(winBg.width/2 - battleFail2.width/2, battleResult.y + 45 );
		this.addChildToContainer(battleFail2);
	}

	private touchTap():void
	{
		if (this._obj && this._callbackF) {
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