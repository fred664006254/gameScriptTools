/**
 * 赌坊结果展示
 * author qianjun
 */

class AcGambleResultView extends BaseView{

	public constructor() {
		super();
	}

	protected getResourceList():string[]{
		let rewardPic:string[] = super.getResourceList();
		return rewardPic.concat([	
			"gambleresultTitle1_1",
			"battle_win_light",
			"gambleresultTitle2_1"
		]);
	}


	protected getTitleBgName():string{
		return null;
	}

	protected getTitleStr():string{
		return null;
	}

	protected getBgName():string{
		return "public_9_bg8";
	}

	protected isTouchMaskClose():boolean{
		return true;
	}

	protected initView():void{

	}

	protected init():void
	{
		let view = this;
		super.init();
		NetLoading.hide();
		view.viewBg.addTouchTap(view.hide, view);
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }
		let data = view.param.data;
		let isWin = data.type == 'win';

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

		let winText:BaseBitmap = BaseBitmap.create(isWin ? `gambleresultTitle1_${data.code}` : `gambleresultTitle2_${data.code}`);
		winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, GameConfig.stageHeigth- 568 - winBg.height/2 -35);
		view.addChildToContainer(winText);

		let result = data.type;
		let time = data.time;
		let round = data.round;
		let genNum = data.genNum;
		let param = [];
		let str = '';
		let height = 15;
		if(isWin){
			if(round == 3){
				if(time == 3){
					str = `acGambleRoundResultwin3`;
				}
				else{
					height = 30;
					str = `acGambleRoundResultwin2`;
				}
			}
			else{
				height = 30;
				str = `acGambleRoundResultwin1`;
				param.push(round);
				param.push(genNum);
			}
		}
		else{
			str = `acGambleRoundResultfail1`;
			param.push(round);
			param.push(genNum);
			if(time == 3){
				str = `acGambleRoundResultfail2`;
			}
			else{
				param.push(time + 1);
			}
		}

		//SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);

		this.container.anchorOffsetX = GameConfig.stageWidth/2;
		this.container.anchorOffsetY = GameConfig.stageHeigth/2;
		this.container.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);

		let battleFail:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`${str}-${data.code}`,param), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		//str = view.param.data.lunkong ? LanguageManager.getlocal('allianceWarTip3', [resultInfo.score]) : LanguageManager.getlocal(`allianceResult${resultInfo.type}Desc`, [resultInfo.alliname, view.param.data.draw ? '0' : resultInfo.score]);
		battleFail.lineSpacing = 10;
		battleFail.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, battleFail, winText, [0,winText.height+height]);
		view.addChildToContainer(battleFail);

		let showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'confirmBtn', view.hide, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, showBtn, winBg, [winBg.width-showBtn.width/2,60]);
		view.addChildToContainer(showBtn);
		
		this.container.scaleX = 0.1;
		this.container.scaleY = 1;
		egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120); //.to({scaleX:1.1,scaleY:1.1},100) 
		
	}

	public hide():void{
		if(this.param.data.callback){
			this.param.data.callback.apply(this.param.data.obj);
		}
		super.hide();
	}

	private showDamageRankClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARDAMAGERANKVIEW, view.param.data);
	}

	public dispose():void{
		let view = this;
		view.viewBg.removeTouchTap();
		super.dispose();
	}

}