


class LampRoll extends BaseDisplayObjectContainer
{

	private _lampBg:BaseBitmap = null;
	private _lampInfo:BaseDisplayObjectContainer = null;

	private _rollingType:number = 0; //0,隐藏， 1,滚动  2,滚完正在隐藏
	private _lampText:BaseTextField = null;

	private _rollInfo:any = null;

	private _isRolling:boolean = false;

	public constructor() {
		super();

		this.init();
	}

	private init():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);

		this._lampBg = BaseBitmap.create("mainui_chatbg");
		this._lampBg.width = GameConfig.stageWidth;
		this._lampBg.height = 30;
		this.addChild(this._lampBg);

		this._lampBg.alpha = 0;

		this.checkShowLamp();
	}

	private checkShowLamp():void
	{
		this._rollInfo = Api.lampVoApi.getShowLampInfo();
		
		if (this._rollingType == 0) {
			//隐藏
			if (this._rollInfo) {
				this._rollingType = 1;
				egret.Tween.get(this._lampBg).to({alpha:1},1000).call(this.startRolling,this);
			}
		}
		else if (this._rollingType == 1) {
			if (this._rollInfo) {
				if (this._isRolling == false)
				{
					this.startRolling();
				}
			}
			else {
				this._rollingType = 2;
				egret.Tween.get(this._lampBg).to({alpha:0},1000).call(this.hiddenLamp,this);
			}
		}
		else if (this._rollingType == 2) {
			if (this._rollInfo) {
				this._lampBg.alpha = 1;
				this.startRolling();
			}
		}

	}

	private startRolling():void
	{	
		if (this._lampInfo == null) {
			this._lampInfo = new BaseDisplayObjectContainer();
			this.addChild(this._lampInfo);

			let icon:BaseBitmap = BaseBitmap.create("public_chatnoticeicon");
			icon.setScale(30/icon.width);
			this._lampInfo.addChild(icon);

			this._lampText = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._lampText.setPosition(60, this._lampBg.height/2 - this._lampText.height/2);
			this._lampInfo.addChild(this._lampText);
		}
		this._isRolling = true;
		egret.Tween.removeTweens(this._lampInfo);
		this._lampText.text = this.getRollingText();
		this._lampInfo.x = GameConfig.stageWidth;
		let moveDis:number = this._lampText.width + 100 + GameConfig.stageWidth;
		let moveTiem:number = moveDis / 100 * 1000;
		egret.Tween.get(this._lampInfo).to({x: -this._lampText.width - 100},moveTiem).call(this.rollingEnd,this);
	}

	private rollingEnd():void
	{
		this._isRolling = false;
		this.checkShowLamp();
	}

	private getRollingText():string
	{	
		let rollingString:string = "";
		if (this._rollInfo) {
			if (this._rollInfo.dtype == 1) {
				rollingString = LanguageManager.getlocal("lampInfoType1",[this._rollInfo.name, LanguageManager.getlocal("wifeName_"+this._rollInfo.need)]);
			}
			else if (this._rollInfo.dtype == 2) {
				rollingString = LanguageManager.getlocal("lampInfoType2",[this._rollInfo.name, LanguageManager.getlocal("servant_name"+this._rollInfo.need)]);
			}
			else if (this._rollInfo.dtype == 3) {
				rollingString = LanguageManager.getlocal("lampInfoType3",[this._rollInfo.name, this._rollInfo.need]);
			}
			else if (this._rollInfo.dtype == 4) {
				rollingString = LanguageManager.getlocal("lampInfoType4",[this._rollInfo.name, this._rollInfo.need]);
			}
			else if (this._rollInfo.dtype == 5) {
				rollingString = LanguageManager.getlocal("lampInfoType5",[this._rollInfo.name, LanguageManager.getlocal("officialTitle"+this._rollInfo.need)]);
			}
			else if (this._rollInfo.dtype == 100) {
				rollingString = this._rollInfo.msg;
			}
			else 
			{
				let strTab:string[] = App.StringUtil.formatStringParms(this._rollInfo.info);
				rollingString = LanguageManager.getlocal("lampInfoType"+this._rollInfo.dtype,strTab);
			}
			
		}
		return rollingString;
	}

	private hiddenLamp():void 
	{	
		if (this._lampInfo && this._rollingType == 2) {
			this._rollingType = 0;
			this.removeChild(this._lampInfo);
			this._lampInfo = null;
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);

		egret.Tween.removeTweens(this._lampBg);
		this._lampBg = null;
		this._lampInfo = null;
		this._rollingType = 0;
		this._lampText = null;
		this._rollInfo = null;
		this._isRolling = false;

		super.dispose();
	}
}