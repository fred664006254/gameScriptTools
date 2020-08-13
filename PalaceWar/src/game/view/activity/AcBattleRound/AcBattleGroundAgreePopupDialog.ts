
class AcBattleGroundAgreePopupDialog extends PopupView
{
	private _type:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		
		return super.getResourceList().concat([`battlegroundpopbg-${this.getUiCode()}`]);
	}

	protected getTitleStr():string
	{
		return "atkraceViewTitle";
	}

	protected getBgExtraHeight():number
	{
		return 0;
	} 

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	
	private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected initView():void
	{
		//底部
		let agreeBg:BaseBitmap = BaseBitmap.create(`battlegroundpopbg-${this.getUiCode()}`);
		agreeBg.setPosition(this.viewBg.width/2 - agreeBg.width/2, 0);
		this.addChildToContainer(agreeBg);

		this._type = this.param.data.type;

		let sid:string = this.param.data.sid;
		//
		// Api.servantVoApi.getFullImgPathWithId(sid);
		// equip
		let fullimage = ``;
		let ishelp = this.param.data.ishelp;
		if(ishelp){
			fullimage = Config.ServantCfg.getServantItemById(sid).fullIcon;
			if(this.param.data.equip && this.param.data.equip != ``){
				fullimage = `skin_full_${this.param.data.equip}`;
			}
		}
		else{
			fullimage = Api.servantVoApi.getFullImgPathWithId(this.param.data.sid);
		}
		let servantFullImg = BaseLoadBitmap.create(fullimage);
		servantFullImg.width = 405 * 0.8;
		servantFullImg.height = 467 * 0.8;;
		servantFullImg.x =this.viewBg.width/2 - servantFullImg.width/2;
		servantFullImg.y = agreeBg.height - servantFullImg.height;
		this.addChildToContainer(servantFullImg);

		let str:string = LanguageManager.getlocal(`acBattileGroundDialog${this._type}`,[this.param.data.name]);
	
		let descText:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descText.width = 500;
		descText.lineSpacing = 5;

		let descBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
		descBg.width = agreeBg.width;
		descBg.height = descText.height+40;
		descBg.setPosition(this.viewBg.width/2 - descBg.width/2, agreeBg.height - descBg.height);
		this.addChildToContainer(descBg);

		descText.setPosition(this.viewBg.width/2 - descText.width/2 , agreeBg.height - descText.height - 20);
		this.addChildToContainer(descText);

		let btnArray:string[] = [];
		if (this._type == 1) {
			btnArray.push("atkraceAgreeAnswer0");
		}
		btnArray.push("atkraceAgreeAnswer"+ this._type);

		for (let i:number = 0; i<btnArray.length; i++)
		{
			let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg28");
			btnBg.width = 556;
			btnBg.height = 55;
			btnBg.setPosition(GameConfig.stageWidth/2 - btnBg.width/2,  GameConfig.stageHeigth/2 + 260 + i*65);
			this.addChild(btnBg);
			btnBg.addTouchTap( this.btnClick,this,[i]);

			let btnText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(btnArray[i]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height/2 - btnText.height/2);
			this.addChild(btnText);
		}
		if(!Api.rookieVoApi.isGuiding){
			this.touchEnabled =false;
			this.y =-200;
			this.alpha=0;
			egret.Tween.get(this).to({alpha:1,y:0},500).call(this.remove,this);
		}
	

	}	

	 private remove():void
	{
         this.drawblackMask();
         this.touchEnabled =true;
	}

	protected isShowMask():boolean
	{
		return false;
	}

	 private drawblackMask():void
    {
        let _maskBmp = BaseBitmap.create("public_9_viewmask");
		_maskBmp.width=GameConfig.stageWidth;
		_maskBmp.height=GameConfig.stageHeigth;
		_maskBmp.touchEnabled = true;
		this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp,0);
    }

	private btnClick(event:egret.Event, idx:number):void
	{
		if (this._type == 1 && idx == 0){
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE,{handle:1});
		}
		this.hide();
	}

	protected isShowOpenAni():boolean{
		return false;
	}

	public dispose():void
	{	
		this._type = 0;

		super.dispose();
	}
}