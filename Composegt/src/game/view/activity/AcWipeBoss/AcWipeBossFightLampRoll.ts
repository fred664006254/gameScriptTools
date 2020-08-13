


class AcWipeBossFightLampRoll extends BaseDisplayObjectContainer
{

	private _lampBg:BaseBitmap = null;
	private _lampInfo:BaseDisplayObjectContainer = null;

	private _rollingType:number = 0; //0,隐藏， 1,滚动  2,滚完正在隐藏
	private _lampText:BaseTextField = null;

	private _rollInfo:any = null;

    private _isRolling:boolean = false;

    private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, this._code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_WIPEBOSS, this._code);
    }

    private _code :string = '1';

	public constructor(code:any) {
        super();
        this._code = code;
		this.init();
	}

	private init():void
	{
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);

		this._lampBg = BaseBitmap.create("mainui_chatbg");
		this._lampBg.width = GameConfig.stageWidth - 150;
        this._lampBg.height = 30;
        this.addChild(this._lampBg);
        
        this._lampBg.alpha = 0;

		this.checkShowLamp();
	}

	public checkShowLamp():void
	{  
        this._rollInfo = Api.wipeBossVoApi.getShowFightInfo(0);
		++ this._index;
		if (this._rollingType == 0) {
			//隐藏
			if (this._rollInfo) {
				this._rollingType = 1;
				egret.Tween.get(this._lampBg).to({alpha:1},1000).call(this.startRolling,this);
            }
            else{
                this._index = 0;
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
                this._index = 0;
				this._rollingType = 2;
				egret.Tween.get(this._lampBg).to({alpha:0},1000).call(this.hiddenLamp,this);
			}
		}
		else if (this._rollingType == 2) {
			if (this._rollInfo) {
				this._lampBg.alpha = 1;
				this.startRolling();
            }
            else{
                this._index = 0;
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
            // this._lampText.mask = this._lampInfo;
            //this._lampInfo.mask = maskGroup;
		}
		this._isRolling = true;
		egret.Tween.removeTweens(this._lampInfo);
		this._lampText.text = this.getRollingText();
		this._lampInfo.x = this._lampBg.width;
		let moveDis:number = this._lampText.width + 100 + GameConfig.stageWidth;
		let moveTiem:number = moveDis / 100 * 1000;
		egret.Tween.get(this._lampInfo).to({x: -this._lampText.width - 100},moveTiem).call(this.rollingEnd,this);
    }
    
    private _index = 0;

	private rollingEnd():void
	{
        this._isRolling = false;
        // if(this._index ){

        // }
		// this.checkShowLamp();
	}

	private getRollingText():string
	{	
		let rollingString:string = "";
		if (this._rollInfo) {
			// if (this._rollInfo.dtype == 1) {
			// 	rollingString = LanguageManager.getlocal("lampInfoType1",[this._rollInfo.name, LanguageManager.getlocal("wifeName_"+this._rollInfo.need)]);
			// }
			// else if (this._rollInfo.dtype == 2) {
			// 	rollingString = LanguageManager.getlocal("lampInfoType2",[this._rollInfo.name, LanguageManager.getlocal("servant_name"+this._rollInfo.need)]);
			// }
			// else if (this._rollInfo.dtype == 3) {
			// 	rollingString = LanguageManager.getlocal("lampInfoType3",[this._rollInfo.name, this._rollInfo.need]);
			// }
			// else if (this._rollInfo.dtype == 4) {
			// 	rollingString = LanguageManager.getlocal("lampInfoType4",[this._rollInfo.name, this._rollInfo.need]);
			// }
			// else if (this._rollInfo.dtype == 5) {
			// 	rollingString = LanguageManager.getlocal("lampInfoType5",[this._rollInfo.name, LanguageManager.getlocal("officialTitle"+this._rollInfo.need)]);
			// }
			// else if (this._rollInfo.dtype == 100) {
			// 	rollingString = this._rollInfo.msg;
			// }
			// else 
			// {
			// 	let strTab:string[] = App.StringUtil.formatStringParms(this._rollInfo.info);
			// 	rollingString = LanguageManager.getlocal("lampInfoType"+this._rollInfo.dtype,strTab);
            // }
            //击杀奖励
            let icon = GameData.formatRewardItem(this._rollInfo.reward);
            let reward_str = '';
            for(let i in icon){
                reward_str += (`、${icon[i].name}+${icon[i].num}`)
            }

            let bosscfg = this.cfg.getBossNpcItemCfgById(this._rollInfo.bossId);
            if(bosscfg.type == 2){
                reward_str = reward_str.substring(1,reward_str.length);
            }
            let servant = Config.ServantCfg.getServantItemById(this._rollInfo.servantId);
            rollingString = bosscfg.type == 1 ? (LanguageManager.getlocal('acwipeBossAllKillSuccessInfo', [this._rollInfo.name,servant.name,bosscfg.npcName,bosscfg.killScore,reward_str])) : (LanguageManager.getlocal('acwipeBossAllOpenSuccessInfo',[this._rollInfo.name,bosscfg.npcName,reward_str]));
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
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP,this.checkShowLamp,this);
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