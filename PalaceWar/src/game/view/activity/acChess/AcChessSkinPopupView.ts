/**
 * 	活动衣装预览 tab
 * author yangchengguo
 * @class AcSweetGiftSkinPopupView
 */
class AcChessSkinPopupView extends PopupView {
    public _skinContainer:BaseDisplayObjectContainer = null;
    public _servantContainer:BaseDisplayObjectContainer = null;
	private _exchangeBtn:BaseButton=null;
    public constructor() {
		super();
	}
    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}
	protected get uiType():string
	{
		return "2";
	}	
	protected getTabbarGroupY():number
	{
		return -31;
	}	
	protected initView(): void {
        let tabName:string[] = ["sweetgiftShowServentTitle-1", "sweetgiftShowWifeTitle-1"];
        if (this.param.data.tabName){
            tabName = this.param.data.tabName;
        }

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_EXCHANGE, this.changeHandle, this);

        this._skinContainer = this.getSkinView(this.param.data.wifeId);
        this._skinContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._skinContainer.width / 2, this.tabbarGroup.y + this.tabbarGroup.height-60);
        this.addChildToContainer(this._skinContainer);

        this._servantContainer = this.getSkinView(this.param.data.servantId);
        this._servantContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._servantContainer.width / 2, this.tabbarGroup.y + this.tabbarGroup.height-60);
        this.addChildToContainer(this._servantContainer);
		this._servantContainer.visible = false;
		
		if (this.param.data.isShowWife){
			// tabbarGroup.selectedIndex = 1;
			this.tabBtnClickHandler({index:1});
			this.selectedTabIndex = 1;
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;			
		}
		else{
			// tabbarGroup.selectedIndex = 0;
			this.tabBtnClickHandler({index:0});
			this.selectedTabIndex = 0;
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;			
		}
    }
    private get cfg() : Config.AcCfg.ChessCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcChessView.AID, AcChessView.CODE);
    }
    protected get acVo():AcChessVo
	{
		return <AcChessVo>Api.acVoApi.getActivityVoByAidAndCode(AcChessView.AID,AcChessView.CODE);
	}	
    protected getTabbarTextArr():Array<string>
	{
		return ["sweetgiftShowServentTitle-1", 
                "sweetgiftShowWifeTitle-1"
		];
	}
    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
    private get code():string{
        return AcChessView.CODE;
    }		
    public tabBtnClickHandler(params:any){
        if (params.index == 0){
            this._skinContainer.visible = false;
            this._servantContainer.visible = true;
        }
        else{
            this._skinContainer.visible = true;
            this._servantContainer.visible = false;
        }
    }

	protected clickTabbarHandler(data:any):void
	{
		var index = Number(data.index);
        if (index == 0){
            this._skinContainer.visible = false;
            this._servantContainer.visible = true;
        }
        else{
            this._skinContainer.visible = true;
            this._servantContainer.visible = false;
        }		
	}
    
    public getSkinView(skinId:string):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        container.width = 530;
        let view = this;
        let skinCfg:any = Config.WifeskinCfg.getWifeCfgById(skinId);
        let isWifeskin = false;
        if(skinCfg){
            isWifeskin = true;
        }
        else{
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
		if(isWifeskin)
		{
			let buttomBg = BaseBitmap.create("public_9_bg4");
			buttomBg.width = 532;
            buttomBg.height = 650;
			buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, 0);
			container.addChild(buttomBg);
						
			let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
			let bg = BaseLoadBitmap.create(`acthrowarrowview_wifeskinbg`);
			bg.width = 530;
			bg.height = 400;
			bg.y = 5;
			container.addChild(bg);

			let rect = new egret.Rectangle(0,0,544,364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 530;
			maskContan.height = 364;
			maskContan.mask =rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2,bg.y + 30);
			container.addChild(maskContan);

			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				wife.setScale(0.62);  
				wife.anchorOffsetY = wife.height;
				wife.anchorOffsetX = wife.width / 2;
				wife.x = maskContan.width / 2;
				wife.y = maskContan.y + maskContan.height - 12;
				wife.mask = new egret.Rectangle(-354,-665,914,685);
				maskContan.addChild(wife);
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
				wife.setScale(0.65);
				wife.anchorOffsetY = wife.height;
				wife.anchorOffsetX = wife.width / 2;
				wife.x = maskContan.width / 2;
				wife.y = maskContan.y + maskContan.height;
				maskContan.addChild(wife);
			}			
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 530;
			topbg.height = 36;
			topbg.setPosition(container.width / 2 - topbg.width / 2, 5);
			container.addChild(topbg);

			let skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
			if (skinTitle){
				skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 10);
				container.addChild(skinTitle);
			}			

			let str = LanguageManager.getlocal(view.param.data.wifeNeedText);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			container.addChild(topDesc);

			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 25);
			container.addChild(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			container.addChild(skinNameTxt);

			let servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			container.addChild(servantNameTxt);

			let buttomBg2 = BaseBitmap.create("public_popupscrollitembg");
			buttomBg2.width = 525;
			buttomBg2.height = 234;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2+200);
			container.addChild(buttomBg2);

			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			container.addChild(skinTipTxt);

			let descBg = BaseBitmap.create(`public_scrolllistbg`);
			descBg.width = 515;
			descBg.height = 90;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
			container.addChild(descBg);

			let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			let txt = [
				{
					txtKey:"wifeSkinAddServantAttr1",
					value: addValues[0] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr2",
					value: addValues[1] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr3",
					value: addValues[2] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr4",
					value: addValues[3] ,
				},
				{
					txtKey:"skinLvuptxt6",
					value: addValues[4] ,
				},
				{
					txtKey:"skinLvuptxt7",
					value: addValues[5] ,
				},
			];
			for(let i in txt){
				let tmp = txt[i];
				let str = String(tmp.value);
				if(Number(i) < 4 && tmp.value == 0){
					str = addValues[Number(i) + 6] * 100 + "%";
				}
				let tipTxt;
				if(parseInt(i) < 4)
				{
					tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${tmp.txtKey}`,[LanguageManager.getlocal("servant_name1063"),str]), 18, TextFieldConst.COLOR_BLACK);
				}else
				{
					tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${tmp.txtKey}`)+`：<font color=0x3e9b00>+${str}</font>`, 18, TextFieldConst.COLOR_BLACK);					
				}
				tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
				tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 18 + (Math.floor(Number(i) / 2) + 1) * 10;
				container.addChild(tipTxt);
			}

			let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 25);
			container.addChild(buttomTipTxt);
		}
		else{

			let bbg = BaseBitmap.create("public_9_bg4");
			bbg.width = 532;
            bbg.height = 710;
			bbg.setPosition(container.width / 2 - bbg.width / 2, 0);
			container.addChild(bbg);

			let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
			let bg = BaseLoadBitmap.create(`previewbg_servantskin`);
			bg.width = 530;
			bg.height = 400;
			bg.setPosition(container.width / 2 - bg.width / 2, 5);
			container.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 544, 364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 530;
			maskContan.height = 364;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			container.addChild(maskContan);
	
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.scaleY = 0.67;
				droWifeIcon.scaleX = 0.67;
				droWifeIcon.anchorOffsetY = droWifeIcon.height;
				droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
				droWifeIcon.x = maskContan.width / 2 - 20;
				droWifeIcon.y = maskContan.y + maskContan.height - 35;
				maskContan.addChild(droWifeIcon);
			}
			else {
				let skinImg = BaseLoadBitmap.create(skinCfg.body);
				skinImg.width = 405;
				skinImg.height = 467;
				skinImg.anchorOffsetY = skinImg.height;
				skinImg.anchorOffsetX = skinImg.width / 2;
				skinImg.setScale(0.8);
				skinImg.x = maskContan.width / 2;
				skinImg.y = maskContan.y + maskContan.height - 20;
				maskContan.addChild(skinImg);
			}
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 530;
			topbg.height = 36;
			topbg.setPosition(container.width / 2 - topbg.width / 2, 5);
			container.addChild(topbg);

			let skinTitle = App.CommonUtil.getServantSkinFlagById(skinId);
			if (skinTitle){
				skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 10);
				container.addChild(skinTitle);
			}			
	
			let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(view.param.data.servantNeedText), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			container.addChild(topDesc);
	
			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 25);
			container.addChild(skinnamebg);
	
			let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			container.addChild(skinNameTxt);
	
			let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			container.addChild(servantNameTxt);
	
			let buttomBg = BaseBitmap.create("public_popupscrollitembg");
			buttomBg.width = 520;
			buttomBg.height = 275+20;
			buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			container.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_managebg");
			buttomBg2.width = 515;
			buttomBg2.height = 269+20;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			container.addChild(buttomBg2);
			buttomBg2.visible = false;
	
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			container.addChild(skinTipTxt);
	
			let addAbility = skinCfg.addAbility;
			for (let index = 0; index < addAbility.length; index++) {
				let bnode = new ServantChangeSkinBookItem();
				bnode.initItem(index,addAbility[index], [skinCfg.id]);
				bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
				container.addChild(bnode);
            }

			let descBg = BaseBitmap.create(`public_scrolllistbg`);
			descBg.width = bg.width;
			descBg.height = 70;
			descBg.alpha = 0.4;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descBg, bg, [0,0]);
			container.addChild(descBg);			

			let str:string = this.cfg.change.needItem;
			let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
			let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
			itemicon.width = 60;
			itemicon.height = 60;
			itemicon.setPosition(buttomBg.x+5, buttomBg.y - itemicon.height-10);
			container.addChild(itemicon);

			this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
			this._progress.setPosition(itemicon.x + itemicon.width-5, itemicon.y + 15);
			container.addChild(this._progress);

			// this._desc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
			// this._desc.width = 300;
			// this._desc.setPosition(this._progress.x, this._progress.y + this._progress.height + 10);
			// container.addChild(this._desc);

			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acchess_exchangebtntxt", () => {
				let vo = <AcChessVo>Api.acVoApi.getActivityVoByAidAndCode(AcChessView.AID, AcChessView.CODE);
				if (!vo.isStart) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				if (this._progress.getPercent() < 1) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acchess_exchangecannot-" + this.code));
					return;
				}
				NetManager.request(NetRequestConst.REQUEST_CHESS_EXCHANGE, { activeId: vo.aidAndCode });
			}, this);
			// btn.setScale(0.95);
			btn.setPosition(this._progress.x + this._progress.width +5, this._progress.y-10);
			container.addChild(btn);	
			this._exchangeBtn = btn;

			this.freshProcess();
        }
        return container;
    }

	private freshProcess():void
	{
        let str:string = this.cfg.change.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
		let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
		let need = parseInt(str.split("_")[2]);

		this._progress.setPercentage(have / need, String(have) + "/" + String(need));
		// this._desc.text = LanguageManager.getlocal("acchess_exchangedesc1-" + this.code,[String(need)]);

        if (this.acVo.showExchangeDot()){
            this.tabbarGroup.addRedPoint(0);
            this.tabbarGroup.setRedPos(0,this.tabbarGroup.getTabBar(0).width-23,0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }		

		// if(have >= need)
		// {
        //     App.CommonUtil.addIconToBDOC(this._exchangeBtn);
        //     let dot = <BaseBitmap>this._exchangeBtn.getChildByName("reddot");
        //     if (dot)
		// 	{
        //         dot.setPosition(this._exchangeBtn.width-dot.width-8, 3);
        //     }			
		// }else
		// {
		// 	App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
		// }
	}

	protected receiveData(data: { ret: boolean, data: any }): void
	{
		
	}

	private changeHandle(event:egret.Event):void
	{
		let data = event.data.data.data;
		let replacerewards = data.replacerewards;
		if (replacerewards) 
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		} 			
		if(data.rewards)
		{
			let rewardVoList = GameData.formatRewardItem(data.rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);      
		}
		this.freshProcess();
	}
	

	private _progress: ProgressBar = null;
	private _desc: BaseTextField = null;
	protected getResourceList(): string[] {
		return super.getResourceList().concat([            
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3",  "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1","ackite_skintopbg", "ackite_skintopline","servant_star","servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
            "skin_detail_namebg",`servantweaponshowbg`,`specialview_commoni_namebg`,`tailor_get_light`,"progress5","progress3_bg"
		]);		
	}

	protected getTitleStr(): string {
		return "acCommonWifeSkinRewardPopupViewTitle";
	}

	protected getShowHeight() {
		return 850;
	}
	public dispose(): void {
        this._skinContainer = null;
        this._servantContainer = null;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_EXCHANGE, this.changeHandle, this);
		super.dispose();
	}
}