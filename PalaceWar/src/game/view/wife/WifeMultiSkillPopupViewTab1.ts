/**
 * 红颜技能
 * author ycg
 * date 2019.10.23
 * @class WifeMultiSkillPopupViewTab1
 */
class WifeMultiSkillPopupViewTab1 extends CommonViewTab{
    private _wifeId:string = null;
    private _wifeInfoVo:any;
    private _wifeExp:BaseTextField = null;
    private _scrollList:ScrollList = null;
    private _exchangeBtn:BaseButton = null;
    private _index:number = 0;
    private _isSkill2:boolean = false;

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL,this.refreshview,this);

        let parentView = <WifeMultiSkillPopupView>ViewController.getInstance().getView("WifeMultiSkillPopupView");
        this._wifeId = parentView.getWifeId();
        let id = this._wifeId;

        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        let cfg = Config.WifeCfg.getWifeCfgById(id);

        this.width = 574;

        let serCfg = null;
        let iconBg = "itembg_1";
        let iconStr = "wifeview_skillnoservant_icon";
		let nameStr = "";
        if (cfg.servantId){
            serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)
            iconBg = serCfg.qualityBoxImgPath;
            if(Api.servantVoApi.getServantObj(cfg.servantId)){
                let serVo = Api.servantVoApi.getServantObj(cfg.servantId);
                iconBg = serVo.qualityBoxImgPath;
            }
            iconStr = serCfg.halfIcon;
            nameStr = LanguageManager.getlocal("wifeSkillServant",[serCfg.name]);
        }
        else{
            let nameParam = LanguageManager.getlocal("wifeMultiSkillNoHaveServant");
            nameStr = LanguageManager.getlocal("wifeSkillServant",[nameParam]);
        }

		let temW:number = 108;
        let iconBgBt:BaseBitmap = BaseLoadBitmap.create(iconBg);
		this.addChild(iconBgBt);
		iconBgBt.x = 30;
		iconBgBt.y = 75;

        let iconBt:BaseBitmap = BaseLoadBitmap.create(iconStr);
		this.addChild(iconBt);
		if (serCfg){
        	iconBgBt.scaleX = temW/194;
			iconBgBt.scaleY = temW/192;
			iconBt.x = iconBgBt.x + 5;
        	iconBt.y = iconBgBt.y + 5;
        	iconBt.scaleX = (temW-10)/180;
        	iconBt.scaleY = (temW-10)/177;
		}
		else{
			iconBt.x = iconBgBt.x + 4;
        	iconBt.y = iconBgBt.y + 4;
		}
		
        let nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = 150;
        nameTF.y = iconBgBt.y + 10;
        this.addChild(nameTF);

        if(cfg.servantId && !Api.servantVoApi.getServantObj(cfg.servantId))
        {
            let getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            getTF.x = nameTF.x + nameTF.width + 5;
            getTF.y = nameTF.y;
            this.addChild(getTF);

            let maskBt:BaseBitmap = BaseBitmap.create("wifeview_mask");
            maskBt.x = iconBgBt.x;
            maskBt.y = iconBgBt.y;
            this.addChild(maskBt);
        }
    
		let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
		this._wifeExp = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		this._wifeExp.x = nameTF.x;
		this._wifeExp.y = nameTF.y + nameTF.height + 15;
		this.addChild(this._wifeExp);

		let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
		tipTF.x = nameTF.x;
		tipTF.y = this._wifeExp.y + this._wifeExp.height + 15;
		this.addChild(tipTF);

		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 535;
		bottomBg.height = 535;
		bottomBg.x = this.width/2 - bottomBg.width/2 - 1;
        bottomBg.y = tipTF.y + tipTF.height + 15;
		this.addChild(bottomBg);

		let dataList = cfg.wifeSkill;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,525,525);
		this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem, dataList, rect, {id: id});
		this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5 ,bottomBg.y + 5);
        
        if (Api.switchVoApi.checkWifeExpExchangeOpen())
		{
			let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"wifeSkillExcange",this.exchangeBtnClick,this);
			exchangeBtn.setPosition(this.width/2- exchangeBtn.width/2, bottomBg.y+543);
			this.addChild(exchangeBtn);

			this._exchangeBtn = exchangeBtn;
			if (Api.wifeVoApi.hasTransformRed(id) && Api.wifeVoApi.hasTransformRed2(id))
			{
				App.CommonUtil.addIconToBDOC(exchangeBtn);
			}
			this.checkExchange();
		}
    }

    private checkExchange():void
	{	
		if (!this._exchangeBtn)
		{
			return;
		}

		if (Api.wifeVoApi.isAllSkillLevelMax(this._wifeInfoVo.id) && Api.wifeVoApi.isAllSkill2LevelMax(this._wifeInfoVo.id))
		{	
			this._exchangeBtn.visible = true;
			if (Api.wifeVoApi.hasTransformRed(this._wifeInfoVo.id) && Api.wifeVoApi.hasTransformRed2(this._wifeInfoVo.id))
			{
				App.CommonUtil.addIconToBDOC(this._exchangeBtn);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
			}
		}
		else
		{	
			this._exchangeBtn.visible = false;
		}
	}

    private exchangeBtnClick():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.WIFEEXPEXCHANGEPOPUPVIEW,{id:this._wifeInfoVo.id,callback:this.exchangeCallback,handler:this})
	}

	private exchangeCallback(num2:number)
	{
		this.request(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, { wifeId: this.param.data.id.toString(),num:num2});
	}

	private doGive(event:egret.Event){
		App.LogUtil.log("dogive tab1");
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(),key:data.index});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.ret){
			if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
				// if (this._isSkill2){
				//     return;
				// }
				if(data.data.data && data.data.data.rewards)
				{
					let rewards= GameData.formatRewardItem(data.data.data.rewards);
					if(rewards&&rewards.length>0)
					{
						App.CommonUtil.playRewardFlyAction(rewards);
					}
				}
				let index = this._index;
				let wideItem = <WifeSkillScrollItem>this._scrollList.getItemByIndex(index);
				wideItem.refreshData(index, this.param.data.id);
				let id = this.param.data.id
				this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
				let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
				this._wifeExp.text = expStr;
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
	
				this.checkExchange();
			}
			else if (data.data.cmd == NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE) 
			{
				if(data.data.data && data.data.data.rewards)
				{
					if (this._isSkill2){
						return;
					}
					let rewards= GameData.formatRewardItem(data.data.data.rewards);
					if(rewards&&rewards.length>0)
					{
						App.CommonUtil.playRewardFlyAction(rewards);
					}
					let id = this.param.data.id
					this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
					let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
					this._wifeExp.text = expStr;
	
					this.checkExchange();
				}
			}
		}
	}

	private refreshview():void
	{	
		let id = this.param.data.id;
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
		this._wifeExp.text = expStr;
	}

    public dispose():void{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL,this.refreshview,this);
        this._wifeId = null;
        this._wifeInfoVo = null;
        this._wifeExp = null;
        this._scrollList = null;
        this._exchangeBtn = null;
        this._index = 0;
        this._isSkill2 = false;
        super.dispose();
    }
}