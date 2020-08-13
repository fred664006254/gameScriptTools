/**
* 选择门客
* date 2020.5.12
* author ycg
* @name SixSection1SelectServantPopupView
*/
class SixSection1SelectServantPopupView extends PopupView{
    private _seatCfg:any = null;
    private _seatIndex:number = 0;
    private _tabbarGroup:TabBarGroup = null;
    private _tabViewData:any = {};
    private _selServantList:any[] = [];
    private _selBuffList:any = {};
    private _servantList:any[] = [];
    private _topBg:BaseBitmap = null;
    private _servantUseNum:BaseTextField = null;
    private _gemIcon:BaseLoadBitmap = null;
    private _gemNum:BaseTextField = null;
    private _talentNum:BaseTextField = null;
    private _totalAttr:BaseTextField = null;
    private _buff1Num:BaseTextField = null;
    private _buff2Num:BaseTextField = null;
    private _buff3Num:BaseTextField = null;
    private _needGemCon:BaseDisplayObjectContainer = null;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return "sixSection1SelectServantTitle";
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_textbrownbg", "discussclose", "discussclose_down", "public_popupscrollitembg", "public_titlebg", "awservantstate1"
        ).concat(list);
    }

    // 重置背景的高度,popupview才用
	protected resetBgSize():void{
        super.resetBgSize();
        if(this._tabViewData)
        {
            for(let tabidx in this._tabViewData)
            {
                let tabView:ViewTab = this._tabViewData[tabidx];
                tabView.setPosition(20, this._tabbarGroup.y + this._tabbarGroup.height);
            }
        }  
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.enterSelServantCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);

        this._seatCfg = this.param.data.data;
        this._seatIndex = this.param.data.index;
        App.LogUtil.log("initView "+this.param.data.fuid);
        let topBg = BaseBitmap.create("sixsection1_selservanttopbg");
        topBg.setPosition(this.viewBg.x + this.viewBg.width/2 - topBg.width/2, 5);
        this.addChildToContainer(topBg);
        this._topBg = topBg;

        let tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarNames(), this.getTabbarTextArrs(), this.clickTabbarHandler, this);
        tabbarGroup.setSpace(0);
        tabbarGroup.setPosition(topBg.x + 10, topBg.y + topBg.height + 5 - 16);
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        this.changeTab();

        let enterBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW , "sixSection1SelectServantEnterUse", this.enterBtnClick, this);
        enterBtn.setPosition(this.viewBg.x + this.viewBg.width/2 - enterBtn.width/2, topBg.y + topBg.height + 400 + 50);
        this.addChildToContainer(enterBtn);

        //top
        let topNumBg = BaseBitmap.create("public_textbrownbg");
        topNumBg.setPosition(topBg.x + topBg.width/2 - topNumBg.width/2, topBg.y + 10);
        this.addChildToContainer(topNumBg);

        let servantUseNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantUseNum", [""+0, ""+0]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantUseNum.setPosition(topBg.x + 30, topNumBg.y + 10);
        this.addChildToContainer(servantUseNum);
        this._servantUseNum = servantUseNum;

        let gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.width = 100;
        gemIcon.height = 100;
        this.addChildToContainer(gemIcon);
        gemIcon.setScale(0.5);
        this._gemIcon = gemIcon;

        let gemNum = ComponentManager.getTextField(""+Api.playerVoApi.getPlayerGem(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        gemNum.setPosition(topBg.x + topBg.width - 20 - gemNum.width, servantUseNum.y);
        this.addChildToContainer(gemNum);
        gemIcon.setPosition(gemNum.x - gemIcon.width * gemIcon.scaleX, topBg.y + 5);
        this._gemNum = gemNum;

        //attr
        let talent = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", [""+0]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        talent.setPosition(topBg.x + 30, topNumBg.y + topNumBg.height + 10);
        this.addChildToContainer(talent);
        this._talentNum = talent;

        let totalAttr = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", [""+0]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        totalAttr.setPosition(topBg.x + topBg.width - 30 - totalAttr.width, talent.y);
        this.addChildToContainer(totalAttr);
        this._totalAttr = totalAttr;

        //加成 攻击
        let buffAtk = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantAtkNum",["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffAtk.setPosition(topBg.x + 30, talent.y + talent.height + 5);
        this.addChildToContainer(buffAtk);
        this._buff1Num = buffAtk;

        let buffCri = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantCriNum",["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffCri.anchorOffsetX = buffCri.width/2;
        buffCri.setPosition(topBg.x + topBg.width/2, buffAtk.y);
        this.addChildToContainer(buffCri);
        this._buff2Num = buffCri;

        let buffBlood = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBloodNum",["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffBlood.setPosition(topBg.x + topBg.width - 30 - buffBlood.width , buffAtk.y);
        this.addChildToContainer(buffBlood);
        this._buff3Num = buffBlood;

        for (let i=0; i < 5; i++){
            let servant = this.getServantIconContainer(true, i);
            servant.setPosition(topBg.x + 17 + (servant.width + 8) * i, topBg.y + topBg.height/2 + 5);
            this.addChildToContainer(servant);
            this._servantList[i] = servant;
        }

        //buff加成花费
        let needGemCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(needGemCon);
        this._needGemCon = needGemCon;
        needGemCon.visible = false;
        needGemCon.height = 20;
        needGemCon.setPosition(20, enterBtn.y - 25);
        let needGemTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantNeedMoney"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needGemTxt.setPosition(0, needGemCon.height/2 - needGemTxt.height/2);
        needGemCon.addChild(needGemTxt);
        needGemTxt.name = "gemTxt";

        let needGemIcon = BaseLoadBitmap.create("itemicon1");
        needGemIcon.width = 100;
        needGemIcon.height = 100;
        needGemCon.addChild(needGemIcon);
        needGemIcon.setScale(0.4);
        needGemIcon.setPosition(needGemTxt.x + needGemTxt.width , needGemCon.height/2 - needGemIcon.height * needGemIcon.scaleY/2);
        needGemIcon.name = "gemIcon";

        let needGemNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needGemNum.setPosition(needGemIcon.x + needGemIcon.width * needGemIcon.scaleX, needGemTxt.y);
        needGemCon.addChild(needGemNum);
        needGemNum.name = "gemNum";

        this.freshTopInfo("servant");
    }

    //确定派遣
    private enterBtnClick():void{
        App.LogUtil.log("enterBtn ");
        let servantList:string[] = [];
        for (let i=0; i < this._selServantList.length; i++){
            if (this._selServantList[i] && this._selServantList[i] > 0){
                servantList.push(""+this._selServantList[i]);
            }
        }
        if (servantList.length < 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantNotSelTip"));
            return;
        }
        let buffCfg = Config.Sixsection1Cfg.buff;
        let cost = 0;
        let buffList:number[] = [];
        if (Object.keys(this._selBuffList).length > 0){
            for (let i=0; i < 3; i++){
                if (this._selBuffList[i+1]){
                    buffList[i] = this._selBuffList[i+1];
                    // let tmpCost = buffCfg[i].fristCost * this._selBuffList[i+1] + this._selBuffList[i+1] * (this._selBuffList[i+1] - 1) * buffCfg[i].addCost /2;
                    // let tmpCost = buffCfg[i].cost[this._selBuffList[i+1] - 1];
                    // cost += tmpCost;
                    for (let k=0; k < this._selBuffList[i+1]; k++){
                        cost += buffCfg[i].cost[k];
                    }
                }
                else{
                    buffList[i] = 0;
                }
            }
        }
        else{
            buffList= [0, 0, 0];
        }
        if (cost <= 0){
            let msg = LanguageManager.getlocal("sixSection1HoldSeatNotSelBuffTip");
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:()=>{
                    NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, {x: this._seatCfg.lineNum, y: this._seatIndex + 1, sids: servantList, buff: buffList, fuid: this.param.data.fuid});
                },
                handler:this,
                needCancel:true
            });
            return ;
        }
        let pGem = Api.playerVoApi.getPlayerGem();
        if (pGem < cost){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantRechargeTip"));
            return;
        }
        App.LogUtil.log("selservent fuid "+this.param.data.fuid);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, {x: this._seatCfg.lineNum, y: this._seatIndex + 1, sids: servantList, buff: buffList, fuid: this.param.data.fuid});
    }

    private enterSelServantCallback(evt:egret.Event){
        if (!evt.data.ret){
            return ;
        }
        this.hide();
    }

    //派遣 选择buff 监听
    private selServantRefresh(evt:egret.Event){
        if (evt && evt.data){
            if (evt.data.type == "servant"){
                let isFind = false;
                let index = this._selServantList.length > 0 ? this._selServantList.length : 0;;
                for (let i=0; i < this._selServantList.length; i++){
                    if (this._selServantList[i] && this._selServantList[i] < 0){
                        this._selServantList[i] = Number(evt.data.id); 
                        isFind = true;
                        index = i;
                        break;
                    }
                }
                if (!isFind){
                    this._selServantList[index] = Number(evt.data.id);
                } 
                this.frefreshServantIconContainer(false, index);
                this.freshTopInfo(evt.data.type);
            }
            else if (evt.data.type == "buff"){
                let data = {buffType: evt.data.buffType, num: evt.data.num};       
                if (!this._selBuffList[data.buffType]){
                    this._selBuffList[data.buffType] = {};      
                }
                this._selBuffList[data.buffType] = data.num;
                this.freshTopInfo(evt.data.type, data);

                let buffTxtName = "_buff"+data.buffType+"Num";
                let buffTxt = this[buffTxtName];
                if (buffTxt){
                    if (data.num > 0){
                        buffTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
                        egret.Tween.get(buffTxt, {loop: false}).to({scaleX: 1.2, scaleY: 1.2}, 300).to({scaleX: 1, scaleY: 1}, 100);
                    }
                    else{
                        buffTxt.setColor(TextFieldConst.COLOR_WHITE);
                    }
                }  
            }
        }
    }

    //门客取消
    private servantIconClick(evt:any, index:number):void{
        if (this._selServantList.length > 0 && this._selServantList[index] > 0){
            let id = this._selServantList[index];
            this._selServantList[index] = -1;
            let commViewTab = <SixSection1SelectServantPopupViewTab1>this._tabViewData[0];
            if (commViewTab){
                commViewTab.cancelSelServant(id);
            }
            this.freshTopInfo("servant");
            this.frefreshServantIconContainer(true, index);
        }
    }

    //刷新顶部
    private freshTopInfo(type:string, buffData?:any):void{
        if (type == "servant"){
            // let servantInfoVoObj = Api.sixsection1VoApi.getServantInfoIdListWithSort();
            let servantInfoList = Api.sixsection1VoApi.getServantList();
            let talentNum = 0;
            let attrNum = 0;
            let servantNum = 0;
            for (let i=0; i < this._selServantList.length; i++){
                if (this._selServantList[i] > 0){
                    let servantInfo = Api.servantVoApi.getServantObj(this._selServantList[i]);
                    talentNum += servantInfo.getTotalBookValue(1);
                    attrNum += servantInfo.getTotalAttrValye(1);
                    servantNum += 1;
                }
            }
            let useServant = Api.sixsection1VoApi.getUseServant();
            let userNum = Object.keys(useServant).length;
            this._servantUseNum.text = LanguageManager.getlocal("sixSection1SelectServantUseNum", [""+(servantInfoList.length - servantNum - userNum), ""+servantInfoList.length]);
            this._talentNum.text = LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", [""+talentNum]);
            this._totalAttr.text = LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", [""+App.StringUtil.changeIntToText(attrNum)]);
            this._totalAttr.x = this._topBg.x + this._topBg.width - 30 - this._totalAttr.width;
        }
        else{
            this._gemNum.text = ""+Api.playerVoApi.getPlayerGem();
            this._gemNum.x = this._topBg.x + this._topBg.width - 20 - this._gemNum.width;
            this._gemIcon.x = this._gemNum.x - this._gemIcon.width * this._gemIcon.scaleX;
            let buffCfg = Config.Sixsection1Cfg.buff;
            let buff1Num = this._selBuffList[""+buffCfg[0].buffType] ? this._selBuffList[""+buffCfg[0].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff1Num.text = LanguageManager.getlocal("sixSection1SelectServantAtkNum",[buff1Num.toFixed(0)+"%"]);
            let buff2Num = this._selBuffList[""+buffCfg[1].buffType] ? this._selBuffList[""+buffCfg[1].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff2Num.text = LanguageManager.getlocal("sixSection1SelectServantCriNum",[buff2Num.toFixed(0)+"%"]);
            this._buff2Num.anchorOffsetX = this._buff2Num.width/2;
            let buff3Num = this._selBuffList[""+buffCfg[2].buffType] ? this._selBuffList[""+buffCfg[2].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff3Num.text = LanguageManager.getlocal("sixSection1SelectServantBloodNum",[buff3Num.toFixed(0)+"%"]);
            this._buff3Num.x = this._topBg.x + this._topBg.width - 30 - this._buff3Num.width;
        
            let buffList:number[] = [];
            let cost = 0;
            if (Object.keys(this._selBuffList).length > 0){
                for (let key in this._selBuffList){
                    if (!this._selBuffList[key]){
                        buffList[Number(key) - 1] = 0;
                    }
                    else{
                        let index = Number(key) - 1;
                        buffList[index] = this._selBuffList[key];
                        // let tmpCost = buffCfg[index].fristCost * this._selBuffList[key] + this._selBuffList[key] * (this._selBuffList[key] - 1) * buffCfg[index].addCost /2;
                        for (let i=0; i < this._selBuffList[key]; i++){
                            cost += buffCfg[index].cost[i];
                        }
                    }
                }
            }
            else{
                buffList= [0, 0, 0];
            }
            App.LogUtil.log("needGEM "+ cost);
            if (cost > 0){
                this._needGemCon.visible = true;
                let gemTxt = <BaseTextField>this._needGemCon.getChildByName("gemTxt");
                let gemIcon = <BaseTextField>this._needGemCon.getChildByName("gemIcon");
                let gemNum = <BaseTextField>this._needGemCon.getChildByName("gemNum");
                gemNum.text = ""+cost;
                let tW = gemTxt.width + gemIcon.width * gemIcon.scaleX + gemNum.width;
                this._needGemCon.x = this.viewBg.x + this.viewBg.width/2 - tW/2;
            }
            else{
                this._needGemCon.visible = false;
            }
        }
    }

    //刷新顶部icon
    private frefreshServantIconContainer(isEmpty:boolean, index:number){
        let container = this._servantList[index];
        let emptyBg = <BaseBitmap>container.getChildByName("emptyBg");
        let iconContainer = <BaseDisplayObjectContainer>container.getChildByName("iconContainer");
        
        if (isEmpty){
            iconContainer.visible = false;
            emptyBg.visible = true;
        }
        else{
            let iconBg = <BaseLoadBitmap>iconContainer.getChildByName("servantBg");
            let servantIcon = <BaseLoadBitmap>iconContainer.getChildByName("servantIcon");
            // let attrBg = <BaseLoadBitmap>iconContainer.getChildByName("attrBg");
            // let attr = <BaseTextField>iconContainer.getChildByName("attr");
            iconContainer.visible = true;
            emptyBg.visible = false;

            let id = this._selServantList[index];
            let servantInfoVo = Api.servantVoApi.getServantObj(id);
            iconBg.setload(servantInfoVo.qualityBoxImgPath);
            servantIcon.setload(servantInfoVo.halfImgPath);
            // attr.text = ""+App.StringUtil.changeIntToText(servantInfoVo.total);
            // attr.x = attrBg.x + attrBg.width/2 - attr.width/2;
            // attr.y = attrBg.y + attrBg.height/2 - attr.height/2;
        }
    }

    //顶部门客icon
    private getServantIconContainer(isEmpty:boolean, index:number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let deltaScale = 0.48;
        container.width = 194 * deltaScale;
        container.height = 192 * deltaScale;
        let emptyBg = BaseLoadBitmap.create("servant_cardbg_0");
        emptyBg.width = 194;
        emptyBg.height = 192;
        emptyBg.setScale(deltaScale);
        container.addChild(emptyBg);
        emptyBg.name = "emptyBg";

        let iconContainer = new BaseDisplayObjectContainer();
        iconContainer.width = container.width;
        iconContainer.height = container.height;
        container.addChild(iconContainer);
        iconContainer.name = "iconContainer";
        let bg = BaseLoadBitmap.create("");
        bg.width = 194; 
        bg.height = 192; 
        bg.setScale(deltaScale);
        iconContainer.addChild(bg);
        bg.name = "servantBg";

        let servantImg = BaseLoadBitmap.create("");
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = bg.x + bg.width/2-servantImg.width/2-5;
        servantImg.y = bg.y+ bg.height/2-servantImg.height/2-2;
        servantImg.setScale(deltaScale);
        iconContainer.addChild(servantImg);
        servantImg.name = "servantIcon";

        // let attrBg = BaseBitmap.create("public_9_mainicontimebg");
        // attrBg.height = 24;
        // attrBg.width = container.width + 10;
        // attrBg.setPosition(iconContainer.width/2 - attrBg.width/2, container.height - attrBg.height);
        // iconContainer.addChild(attrBg);
        // attrBg.name = "attrBg";

        // let attrTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        // attrTxt.x = attrBg.x + attrBg.width/2 - attrTxt.width/2;
        // attrTxt.y = attrBg.y + attrBg.height/2 - attrTxt.height/2;
        // iconContainer.addChild(attrTxt);
        // attrTxt.name = "attr";

        let decrFlag = BaseBitmap.create("discussclose");
        decrFlag.setPosition(container.width - decrFlag.width, 0);
        iconContainer.addChild(decrFlag);
        decrFlag.name = "decrFlag";
        iconContainer.addTouchTap(this.servantIconClick, this, [index]);

        if (isEmpty){
            iconContainer.visible = false;
        }
        return container;
    }

    protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this._tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				this.addChildToContainer(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(20, this._tabbarGroup.y + this._tabbarGroup.height);
				this._tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChildToContainer(tabView);
				// this.param = null;
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this._tabViewData[this.lastSelectedTabIndex])
			{
				this.container.removeChild(this._tabViewData[this.lastSelectedTabIndex]);
			}
		}
	}

    protected getTabbarTextArrs():string[]{
        return ["sixSection1SelectServantTabName1", "sixSection1SelectServantTabName2"];
    }

    protected getTabbarNames():string[]|string{
        return ButtonConst.BTN2_SMALL_TAB;
    }

    public getShowHeight():number{
        return 810;
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.enterSelServantCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);

        this._seatCfg = null;
        this._seatIndex = null;
        this._tabbarGroup = null;
        if(this._tabViewData)
		{
			for(var key in this._tabViewData)
			{
				var view = this._tabViewData[key];
				if(view)
				{
					if(this.container.contains(view))
					{
						this.removeChildFromContainer(view);
					}
					view.dispose();
					view = null;
				}
			}
			this._tabViewData = {};
        }
        this._selServantList = [];
        this._selBuffList = {};
        this._servantList = [];
        this._topBg = null;
        this._servantUseNum = null;
        this._gemIcon = null;
        this._gemNum= null;
        this. _talentNum = null;
        this._totalAttr = null;
        this._buff1Num = null;
        this._buff2Num = null;
        this._buff3Num = null;
        this._needGemCon = null;

        super.dispose();
    }
}