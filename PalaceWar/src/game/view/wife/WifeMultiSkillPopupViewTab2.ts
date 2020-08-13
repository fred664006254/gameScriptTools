/**
 * 红颜技能 修身强化
 * author ycg
 * date 2019.10.23
 * @class WifeMultiSkillPopupViewTab2
 */
class WifeMultiSkillPopupViewTab2 extends CommonViewTab{
    private _wifeId:string = null;
    private _wifeInfoVo:any;
    private _wifeExp:BaseTextField = null;
    private _scrollList:ScrollList = null;
    private _exchangeBtn:BaseButton = null;
    private _index:number = 0;
    private _isSkill2:boolean = true;

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILL2UPD,this.doGive,this);

        let parentView = <WifeMultiSkillPopupView>ViewController.getInstance().getView("WifeMultiSkillPopupView");
        this._wifeId = parentView.getWifeId();
        let id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        let cfg = Config.WifeCfg.getWifeCfgById(id);

        this.width = 574;
       
        // let temW:number = 108;
        // let iconBgBt:BaseBitmap = BaseLoadBitmap.create("");
        // iconBgBt.x = 30;
        // iconBgBt.y = 65;
        // this.addChild(iconBgBt);
        // iconBgBt.scaleX = temW/194;
        // iconBgBt.scaleY = temW/192;

        let headBg:BaseBitmap = BaseBitmap.create("skin_head_bg");
        headBg.x = 20;
        headBg.y = 68;
        headBg.setScale(0.85);
        this.addChild(headBg);

        let headPic = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),Api.playerVoApi.getPlayerPtitle());
        headPic.setPosition(34, 75);
        this.addChild(headPic);

        let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeMultiSkillSlimInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = 150;
        nameTF.y = headPic.y + 10;
        this.addChild(nameTF);

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

		let dataList = cfg.wifeSkill2;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,525,525);
		this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem2, dataList, rect, {id: id, isSkill2:true});
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
        App.LogUtil.log("dogive tab2");
		let data  = event.data;
        this._index = data.index;
		this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(), key:data.index, wifeSkill2:1});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        if(data.ret){
            if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
                if(data.data.data && data.data.data.rewards)
                {
                    // if (this._isSkill2){
                        let rewards= GameData.formatRewardItem(data.data.data.rewards);
                        if(rewards&&rewards.length>0)
                        {
                            App.CommonUtil.playRewardFlyAction(rewards);
                        }
                    // }	
                }
                // if (this._isSkill2){
                    let index = this._index;
                    let wideItem = <WifeSkillScrollItem2>this._scrollList.getItemByIndex(index);
                    wideItem.refreshData(index, this.param.data.id);
                    let id = this.param.data.id
                    this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                    let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
                    this._wifeExp.text = expStr;
                    App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
    
                    this.checkExchange();
                // }
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE) 
            {
                if(data.data.data && data.data.data.rewards)
                {
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

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILL2UPD,this.doGive,this);
        this._wifeId = null;
        this._wifeInfoVo = null;
        this._wifeExp = null;
        this._scrollList = null;
        this._isSkill2 = true;
        super.dispose();
    }
}