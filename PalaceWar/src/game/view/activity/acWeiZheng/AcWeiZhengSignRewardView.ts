
class AcWeiZhengSignRewardView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor()
	{
		super();
	}

	private get cfg() : Config.AcCfg.WeiZhengCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWeiZhengVo{
        return <AcWeiZhengVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
	}
	
	protected getShowHeight():number{
		return 255;
	}

    private getUiCode():string{
        let code = ``;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
		return code;
	}
	
	protected getResourceList():string[]
	{
		let code = this.getUiCode();
		return super.getResourceList().concat([
				//"dailybosslastattackpopupview",
				`weizhengrewardtitle-${code}`
		]);
	}

	protected initView():void
	{	
		let view = this;
		let code = view.getUiCode();
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		//type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
		let height = 255;
		this.viewBg.height = height;
		this.viewBg.y = (GameConfig.stageHeigth - height) / 2;


		let title:BaseBitmap=BaseBitmap.create(`weizhengrewardtitle-${code}`);
		title.setPosition((this.viewBg.width-title.width)/2,(-title.height)/2);
		this.addChildToContainer(title);


		let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengTip7-${code}`, [view.vo.getBqCost().toString()]),24,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.lineSpacing=10;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height + 15);
		this.addChildToContainer(descTxt);

		let haveTxt =ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengTip8-${code}`, [String(Api.playerVoApi.getPlayerGem() < view.vo.getBqCost() ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN), Api.playerVoApi.getPlayerGemStr()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		haveTxt.setPosition((this.viewBg.width-haveTxt.width)/2,descTxt.y+descTxt.height + 25);
		this.addChildToContainer(haveTxt);

		let cancelbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, `cancelBtn`, ()=>{
			view.hide();
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelbtn, view, [145,haveTxt.y + haveTxt.textHeight + 25]);
		this.addChildToContainer(cancelbtn);

		let confirmbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `confirmBtn`, ()=>{
			if(Api.playerVoApi.getPlayerGem() < view.vo.getBqCost()){
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
				return;
			}
			if (this._obj && this._callbackF) {
				this._callbackF.apply(this._obj);
				view.hide();
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, confirmbtn, view, [145,cancelbtn.y]);
		this.addChildToContainer(confirmbtn);
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

	protected getBgName():string{
		return "public_9_wordbg";
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;
		super.dispose();
	}
}