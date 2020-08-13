class ConquestWinPopupView  extends PopupView
{	
	private _callbackF:Function = null;
	private _obj:any = null;

	private _fire_lizi:particle.GravityParticleSystem;


	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"battle_win_word",
				"battle_win_light",
				"fire_flake_json",
				"fire_flake"
		]);
	}

	protected initView():void
	{
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		this.addTouchTap(this.hide,this);

		// let title:BaseBitmap=BaseBitmap.create("battle_win_word");
		// title.setPosition((this.viewBg.width-title.width)/2,-65);
		// this.addChildToContainer(title);

		let info:any = this.param.data.info;
		let titleStr=LanguageManager.getlocal("conquestInfoWin",[String(info.cid)]);

		let titleTxt:BaseTextField=ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WHITE);
		titleTxt.textAlign=egret.HorizontalAlign.CENTER;
		titleTxt.width = 480
		titleTxt.lineSpacing=6;
		titleTxt.setPosition((this.viewBg.width-titleTxt.width)/2,58);
		this.addChildToContainer(titleTxt);

		let conquestConfig = Config.ConquestCfg.getConquestCfgById(info.cid);
		let rewardVoAll:RewardItemVo[]=GameData.formatRewardItem(this.param.data.award);
		let rewardVo:RewardItemVo[] = [];
		let stringTab:string[]=[];
		stringTab.push(LanguageManager.getlocal("conquestpointsdes",[String(conquestConfig.score)]));
		// stringTab.push(LanguageManager.getlocal("affairtxt2")+"+"+conquestConfig.reward);

		for (let i:number=0; i<rewardVoAll.length; i++)
		{	
			let vo:RewardItemVo = rewardVoAll[i];
			if (vo.type == 6) {
				rewardVo.push(vo);
			}
			else {
				// stringTab.push(vo.name + "+" + vo.num);

				 //红颜
                if(vo.type==12)
                {
                    let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(vo.id);
                    stringTab.push(wifeCfg.name+vo.tipMessage);
              
                }
                //门客
                else if(vo.type==14||vo.type==15)
                {
                    let servantCfg =Config.ServantCfg.getServantItemById(vo.id);
                    stringTab.push(servantCfg.name+vo.message);
                }
                else
                {
                    stringTab.push(vo.name+vo.tipMessage);
                }
			}
		}

		for (let i:number=0; i<stringTab.length; i++)
		{	
			let str:string = stringTab[i];
			let descTxt:BaseTextField=ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			descTxt.setPosition(70+i%2*270,titleTxt.y+titleTxt.height+18+Math.floor(i/2)*30);
			this.addChildToContainer(descTxt);
		}

		let iconHeight:number = 130+Math.ceil(stringTab.length/2)*30;
		for (let k:number =0; k< rewardVo.length; k++ ) {
			let v:RewardItemVo = rewardVo[k];
			let awardIcon:BaseDisplayObjectContainer = GameData.getItemIcon(v);
			awardIcon.setPosition( GameConfig.stageWidth/2 +19+ (rewardVo.length/2 -k-1)*(awardIcon.width + 38), iconHeight);
			this.addChildToContainer(awardIcon);
		}

		this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
		this._fire_lizi.y = 10-this._fire_lizi.height/2;
		this.addChildToContainer(this._fire_lizi);

		this.showWordAnim();
	}

	private showWordAnim():void
	{	
		let bgHeight:number = 0;

		let winLight:BaseBitmap = BaseBitmap.create("battle_win_light");
		winLight.scaleY = 0.5;
		winLight.setPosition(GameConfig.stageWidth/2  - winLight.width/2*winLight.scaleX,bgHeight -winLight.height/4 -5);
		this.addChildToContainer(winLight);

		this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
		this.addChildToContainer(this._fire_lizi);

		let winText:BaseBitmap = BaseBitmap.create("battle_win_word");

		let scale1:number = 2.5;
		let scale2:number = 0.9;
		let tempsPos1:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2*scale1, bgHeight - winText.height/2*scale1 +30);
		let tempsPos2:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2*scale2, bgHeight - winText.height/2*scale2 );
		let realPos:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2, bgHeight - winText.height/2);
		winText.setScale(scale1);
		winText.setPosition(tempsPos1.x, tempsPos1.y);
		this.addChildToContainer(winText);

		egret.Tween.get(winText).to({x:tempsPos2.x, y:tempsPos2.y, scaleX:scale2, scaleY:scale2 } ,120 ).to({x:realPos.x, y:realPos.y, scaleX:1, scaleY:1 } ,50);
		
		winLight.alpha = 0;
		egret.Tween.get(winLight).wait(100).to({alpha:1},100).wait(90).to({alpha:0},10);
	}

	private showAnim():void
	{	

	
		this._fire_lizi.start();
		let tmpthis  = this;
		egret.Tween.get(this._fire_lizi,{loop:false}).wait(500).to({alpha:0},200).call(function(){
				if (this._fire_lizi){
					tmpthis.removeChildFromContainer(this._fire_lizi)
					this._fire_lizi = null;
				}
			});
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
		return true;
	}

	protected getBgExtraHeight():number
	{
		return 30;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}


	public hide()
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;
		this._fire_lizi = null;

		super.dispose();
	}
}