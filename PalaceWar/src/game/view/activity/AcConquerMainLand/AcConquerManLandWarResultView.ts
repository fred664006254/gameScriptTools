/**
 * 战斗结果展示
 * author qianjun
 */

class AcConquerManLandWarResultView extends BaseView
{
	private _type:number = null;
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();
		return rewardPic.concat([	
			"battle_win_word",
			"battle_win_light",
			"battle_fail_word"
		]);
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

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected initView():void
	{
	}

	protected init():void
	{
		let view = this;
		super.init();
		NetLoading.hide();
		view.viewBg.addTouchTap(view.hide, view);
		let resultInfo = view.param.data;
		let isWin = resultInfo.type == 'win';

		let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
		winBg.setPosition(GameConfig.stageWidth/2  - winBg.width, GameConfig.stageHeigth - 568 - winBg.height/2 );
		this.addChildToContainer(winBg);

		let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
		winBg2.scaleX = -1;
		winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1, GameConfig.stageHeigth- 568 - winBg2.height/2);
		this.addChildToContainer(winBg2);

		if(!isWin){
			App.DisplayUtil.changeToGray(winBg);
			App.DisplayUtil.changeToGray(winBg2);
		}

		let winText:BaseBitmap = BaseBitmap.create(isWin ? "battle_win_word" : "battle_fail_word");
		winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, GameConfig.stageHeigth- 568 - winBg.height/2 -35);
		view.addChildToContainer(winText);

		let battleFail:BaseTextField = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		let str = LanguageManager.getlocal(`acConquerMainLandTip${isWin ? 30 : 31}-${view.getUiCode()}`, [resultInfo.cityName]);
		if(typeof view.param.data.attackwin != undefined && view.param.data.attackwin === false){
			str = LanguageManager.getlocal(`acConquerMainLandTip${34}-${view.getUiCode()}`, [resultInfo.cityName]);
		}
		battleFail.lineSpacing = 15;
		
		battleFail.text = str;
		battleFail.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, battleFail, winText, [0,winText.height + 45]);
		view.addChildToContainer(battleFail);

		//SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);

		this.container.anchorOffsetX = GameConfig.stageWidth/2;
		this.container.anchorOffsetY = GameConfig.stageHeigth/2;
		this.container.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);

		let showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'sysConfirm', view.hide, view);		
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20,60]);
		showBtn.x = GameConfig.stageWidth/2  - showBtn.width/2
		view.addChildToContainer(showBtn);
		// let showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarPlayBack', view.showAntiClick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20,60]);
		// view.addChildToContainer(showBtn);

		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarDamageRankViewTitle', view.showDamageRankClick, view);
		// view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankBtn, winBg2, [-20,60]);
		// view.addChildToContainer(rankBtn);
		
		this.container.scaleX = 0.1;
		this.container.scaleY = 1;
		egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120); //.to({scaleX:1.1,scaleY:1.1},100) 
		
	}

	private showAntiClick():void{
		let view = this;			
		ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW,{
			aid : view.aid,
			code : view.code,
			wardata : view.param.data.wardata,
			result : view.param.data.type,
			cityName : view.param.data.cityName2,
		});
		view.hide();
	}

	private showDamageRankClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARDAMAGERANKVIEW, view.param.data);
	}

	public dispose():void{
		let view = this;
		view.viewBg.removeTouchTap();
		this._type = null;
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}

}