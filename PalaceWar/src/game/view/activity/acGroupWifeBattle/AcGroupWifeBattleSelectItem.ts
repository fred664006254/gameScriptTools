/**
 选择对战信息列表
 * author qianjun---wxz
 */
class AcGroupWifeBattleSelectItem extends ScrollListItem
{
	private _data:any = null;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	private _code : string = '';
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_GROUPWIFEBATTLE;
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
	

	public initItem(index:number,bData:any,itemparam?):void
	{
		this.width = 520;
		this.height = 120  + this.getSpaceY();
		// childInfo.total
		this._data = bData;
		this._code = itemparam;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_popupscrollitembg");
		bg.width = this.width;
		bg.height = this.height - this.getSpaceY();
		this.addChild(bg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);

		let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic),bData.ptitle);
		iconContainer.addChild(headContainer);
		iconContainer.width = 103;
		iconContainer.height = 100;

		let namebg = BaseBitmap.create("public_9_bg65");
		namebg.width = 130;
		namebg.height = 34;
		this.setLayoutPosition(LayoutConst.lefttop, namebg, bg, [iconContainer.x + iconContainer.width + 13, 15]);
		this.addChild(namebg);
		namebg.visible = false;

		let nameStr = bData.name;
		this._nameTf = ComponentManager.getTextField(nameStr,20, TextFieldConst.COLOR_WARN_YELLOW2);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, this._nameTf, namebg, [5, 0]);
		this.addChild(this._nameTf);

		this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15,-1]);
		
		let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleSelectRank-${this.getUiCode()}`, [bData.rank]), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0,this._nameTf.textHeight + 17]);
		this.addChild(rankTxt);
		
		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleSelectScore-${this.getUiCode()}`, [bData.score]), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0,rankTxt.textHeight + 8]);
		this.addChild(scoreTxt);
		
		let killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acGroupWifeBattleAvengerBtn`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${this.getUiCode()}`));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(this.vo.getCurperiod() == 3){
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
				return;
			}
			let cfg = Config.ItemCfg.getItemCfgById(this.cfg.needItem.chanllge);
			let have = Api.itemVoApi.getItemNumInfoVoById(cfg.id);
			if(have > 0)
			{
				if(bData.puid)
				{
					let message: string = LanguageManager.getlocal(`acGroupWifeBattleFightSure-${this.getUiCode()}`);
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						msg : message,
						title : "itemUseConstPopupViewTitle",
						touchMaskClose : true,
						callback : ()=>
						{
							NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE,{activeId:this.vo.aidAndCode,fuid:bData.uid,protect:1});
						},
						handler : this,
						needClose : 1,
						needCancel : true
					});					
				}else
				{
					NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE,{activeId:this.vo.aidAndCode,fuid:bData.uid});
				}
			}else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleItemNoEnoughTip`,[cfg.name]));
			}
		}, this);
		killBtn.setScale(1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, killBtn, bg, [20,0]);
		this.addChild(killBtn);	

		if(bData.puid)
		{
			killBtn.y += 13;

			let protectTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectTips3-${this.getUiCode()}`), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, protectTxt, killBtn, [0,-protectTxt.height-2]);
			this.addChild(protectTxt);			
		}
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
    }

	protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
	}
	
	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		this._data = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}