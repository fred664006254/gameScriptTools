/**
* 争夺 头衔
* date 2020.5.11
* author ycg
* @name SixSection1TitleHoldPopupView
*/
class SixSection1TitleHoldPopupView extends PopupView{
    private _titleData:any = null;
    private _seatIndex:number = 0;
    private _data:any = null;
    private _holdData:any = null;

    private _roleContainer:BaseDisplayObjectContainer = null;
    private _allianceContainer:BaseDisplayObjectContainer = null;
    private _roleInfoContainer:BaseDisplayObjectContainer = null;
    private _holdFlag:BaseBitmap = null;
    private _effect:BaseTextField = null;
    private _holdBtn:BaseButton = null;
    private _holdNum:BaseTextField = null;
    private _holdTip:BaseTextField = null;
    private _bottomBg:BaseBitmap = null;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        let data = this.param.data.data.baseCfg;
        return "sixSection1TitlePopupItemName"+(data.index + 1);
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "commonview_smalltitlebg",
        ).concat(list);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
        App.LogUtil.log("getRequsetdata ", this.param.data.uid);
        if (this.param.data.uid){
            return {requestType:NetRequestConst.REQUEST_RANKG_USERSHOT, requestData:{
                ruid: this.param.data.uid
            }};
        }
        return null;
    }
    
    protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            console.log("receivedata ",data.data.data);
            this._data = data.data.data;
        }
		// view.vo.setBossNumInfo(data.data.data);
	} 

    public initView():void{
        this._titleData = this.param.data.data;
        this._seatIndex = this.param.data.index;

        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEATTACK, this.holdBtnRequestCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 670;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 5;
        this.addChildToContainer(bg);

        let topBg = BaseBitmap.create("sixsection1_officebg");
        this.addChildToContainer(topBg);
        topBg.x = bg.x + bg.width/2 - topBg.width/2;
        topBg.y = bg.y + 4;

        let roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = topBg.width;
        roleContainer.height = 413;
        roleContainer.x = topBg.x;
        roleContainer.y = topBg.y;
        let mask = new egret.Rectangle(0, 0, topBg.width, 413);
        roleContainer.mask = mask;
        this.addChildToContainer(roleContainer);
        this._roleContainer = roleContainer;

        let role = this.getRoleContainer({title: 3102});
        role.x = -20;
        role.y = 20;
        roleContainer.addChild(role);
        role.name = "role";

        //名字
        let roleInfoContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(roleInfoContainer);
        this._roleInfoContainer = roleInfoContainer;
        roleInfoContainer.width = topBg.width;
        roleInfoContainer.height = topBg.height;
        roleInfoContainer.setPosition(topBg.x, topBg.y);
        let nameBg = BaseBitmap.create("public_9_bg91");
        nameBg.y = roleInfoContainer.height - 10 - nameBg.height;
        roleInfoContainer.addChild(nameBg);
        nameBg.name = "nameBg";
        let name = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        nameBg.width = nameBg.width > name.width + 50 ? nameBg.width : name.width + 50;
        nameBg.x = roleInfoContainer.width/2 - nameBg.width/2;
        name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
        roleInfoContainer.addChild(name);
        name.name = "name";

        //官品
        let levelBg = BaseBitmap.create("sixsection1_officerbg");
        levelBg.y = nameBg.y - levelBg.height - 2;
        levelBg.x = roleInfoContainer.width/2 - levelBg.width/2;
        roleInfoContainer.addChild(levelBg);
        levelBg.name = "levelBg";

        let level = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        level.setPosition(levelBg.x + levelBg.width/2 - level.width/2, levelBg.y + levelBg.height/2 - level.height/2 + 10);
        roleInfoContainer.addChild(level);
        level.name = "level";

        //是否占有
        let holdFlagImg = "sixsection1_holdtxt";
        // if (0){
        //     holdFlagImg = "sixsection1_notholdtxt";
        // }
        let holdFlag = BaseBitmap.create(holdFlagImg);
        holdFlag.x = topBg.x + topBg.width/2 - holdFlag.width/2;
        holdFlag.y = levelBg.y - holdFlag.height;
        this.addChildToContainer(holdFlag);
        this._holdFlag = holdFlag;

        //bottom
        let bottomBg = BaseBitmap.create("public_popupscrollitembg");
        bottomBg.height = bg.height - topBg.height - 20;
        bottomBg.setPosition(bg.x + bg.width/2 - bottomBg.width/2, topBg.y + topBg.height + 5);
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;

        let allianInfoCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(allianInfoCon);
        this._allianceContainer = allianInfoCon;
        let allianInfoBg = BaseBitmap.create("commonview_smalltitlebg");
        allianInfoBg.width = bottomBg.width - 40;
        allianInfoCon.width = allianInfoBg.width;
        allianInfoCon.height = allianInfoBg.height;
        allianInfoCon.x = bottomBg.x + bottomBg.width/2 - allianInfoBg.width/2;
        allianInfoCon.y = bottomBg.y + 15;
        allianInfoCon.addChild(allianInfoBg);
        allianInfoBg.name = "allianceInfoBg";

        let allianceName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        allianceName.setPosition(allianInfoBg.x + 55, allianInfoBg.y + allianInfoBg.height/2 - allianceName.height/2);
        allianInfoCon.addChild(allianceName);
        allianceName.name = "allianceName";

        let power = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        power.setPosition(allianInfoBg.x + allianInfoBg.width - 55 - power.width, allianceName.y);
        allianInfoCon.addChild(power);
        power.name = "power";

        //行动力
        let effectTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleEffectTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effectTitle.setPosition(bottomBg.x + 30, allianInfoCon.y + allianInfoCon.height + 20);
        this.addChildToContainer(effectTitle);
        
        let baseCfg = this._titleData.baseCfg;
        App.LogUtil.log("basecfg "+baseCfg.influenceSpeed);
        let effect = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleEffect", [""+baseCfg.influenceSpeed, ""+baseCfg.maxInfluence]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effect.width = bg.width - effectTitle.x - effectTitle.width - 15;
        effect.lineSpacing = 5;
        effect.setPosition(bottomBg.x + 30 + effectTitle.width, allianInfoCon.y + allianInfoCon.height + 20);
        this.addChildToContainer(effect);
        this._effect = effect;

        //抢夺按钮
        let holdBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW , "sixSection1HoldSeatBtnName", this.holdBtnClick, this);
        holdBtn.setPosition(bottomBg.x + bottomBg.width/2 - holdBtn.width/2, bottomBg.y + bottomBg.height - holdBtn.height - 40);
        this.addChildToContainer(holdBtn);
        this._holdBtn = holdBtn;

        //抢夺提示
        let holdTip = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        holdTip.setPosition(bottomBg.x + bottomBg.width/2, holdBtn.y);
        this.addChildToContainer(holdTip);
        this._holdTip = holdTip;
        holdTip.visible = false;

        //抢夺次数
        // let holdNumStr = "sixSection1HoldTitleNum1";
        // if (0){
        //     holdNumStr = "sixSection1HoldTitleNum2";
        // }
        let holdNum = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        holdNum.setPosition(bottomBg.x + bottomBg.width/2 - holdNum.width/2, holdBtn.y + holdBtn.height + 10);
        this.addChildToContainer(holdNum);
        this._holdNum = holdNum;

        //tip
        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bottomBg.x + bottomBg.width/2 - tipBg.width/2, bottomBg.y + bottomBg.height - 95);
        this.addChildToContainer(tipBg);
        let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 40);
        this.addChildToContainer(tip);

        this.refreshUI();
    }

    private refreshUI():void{
        let role = <BaseDisplayObjectContainer>this._roleContainer.getChildByName("role");
        let levelBg = <BaseBitmap>this._roleInfoContainer.getChildByName("levelBg");
        let level = <BaseTextField>this._roleInfoContainer.getChildByName("level");
        let nameBg = <BaseBitmap>this._roleInfoContainer.getChildByName("nameBg");
        let name = <BaseTextField>this._roleInfoContainer.getChildByName("name");
        let allBg = <BaseBitmap>this._allianceContainer.getChildByName("allianceInfoBg");
        let allName = <BaseTextField>this._allianceContainer.getChildByName("allianceName");
        let power = <BaseTextField>this._allianceContainer.getChildByName("power");
        let titleCfg = this._titleData.baseCfg;

        if (this._data || this._holdData){
            if (role){
                role.dispose();
                role = null;
            }
            this._roleInfoContainer.visible = true;
            this._roleContainer.visible = true;
            allName.visible = true;
            power.visible = true;

            if (this._data){
                let titleData = {title: this._data.title, level: this._data.level, pic: this._data.pic};
                role = this.getRoleContainer(titleData);
            }
            else{
                let title = Api.playerVoApi.getTitleInfo();
                let titleData = {title: title, level: Api.playerVoApi.getPlayerLevel(), pic: Api.playerVoApi.getPlayePicId()};
                role = this.getRoleContainer(titleData);
            }
            role.setScale(0.8);
            role.x = -10;
            role.y = 70;
            this._roleContainer.addChild(role);
            role.name = "role";

            this._holdFlag.setRes("sixsection1_holdtxt");
            let lv = 1;
            let nameStr = "";
            let svNameStr = "";
            let allNameStr = "";
            let powerNum = 0;
            if (this._holdData){
                this._holdBtn.visible = false;
                this._holdTip.visible = false;
                this._holdNum.visible = false;
                lv = Api.playerVoApi.getPlayerLevel();
                nameStr = Api.playerVoApi.getPlayerName();
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName();
                allNameStr = Api.playerVoApi.getPlayerAllianceName();
                powerNum = Api.playerVoApi.getPlayerPower();
            }
            else{
                lv = this._data.level;
                nameStr = this._data.name;
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(this._data.ruid);
                allNameStr = this._data.gname;
                powerNum = this._data.power;

                if (this._data.ruid == Api.playerVoApi.getPlayerID()){
                    this._holdBtn.visible = false;
                    this._holdTip.visible = false;
                    this._holdNum.visible = false;
                }
                else{
                    this._holdNum.visible = true;
                    this._holdBtn.visible = true;
                    this._holdTip.visible = false;
                    /** 
                    //判断 称号 官职
                    let hTitle = Api.sixsection1VoApi.getMaxTitle(this._data.titleinfo);
                    let status = Api.sixsection1VoApi.getCanHoldStatus(hTitle, this._data.level);
                    if (status == 0){
                        this._holdBtn.visible = true;
                        this._holdTip.visible = false;
                    }
                    else{
                        this._holdBtn.visible = false;
                        this._holdTip.visible = true;

                        let holdTipStr = "sixSection1HoldTitleNotTip"+status;
                        this._holdTip.text = LanguageManager.getlocal(holdTipStr);
                        this._holdTip.x = this._bottomBg.x + this._bottomBg.width/2 - this._holdTip.width/2;
                        this._holdTip.y = this._holdBtn.y;
                    }
                    */
                }
            }
            if (!allNameStr){
                allNameStr = LanguageManager.getlocal("sixSection1HoldNothing");
            }
            level.text = LanguageManager.getlocal("officialTitle"+lv);
            level.x = levelBg.x + levelBg.width/2 - level.width/2;
            level.y = levelBg.y + levelBg.height/2 - level.height/2 + 4;
            name.text = nameStr + "("+svNameStr+")";
            nameBg.width = nameBg.width > name.width + 50 ? nameBg.width : name.width + 50;
            nameBg.x = this._roleInfoContainer.width/2 - nameBg.width/2;
            name.x = nameBg.x + nameBg.width/2 - name.width/2;
            name.y = nameBg.y + nameBg.height/2 - name.height/2;
            
            allName.text = LanguageManager.getlocal("sixSection1HoldSeatAllianceName", [""+allNameStr]);
            allName.y = allBg.y + allBg.height/2 - allName.height/2;
            power.text = LanguageManager.getlocal("sixSection1HoldSeatAlliancePower", [App.StringUtil.changeIntToText(powerNum)]);
            power.x = allBg.x + allBg.width - 55 - power.width;
            power.y = allName.y;
        }
        else{
            this._roleContainer.visible = false;
            this._roleInfoContainer.visible = false;
            allName.visible = false;
            power.visible = false;
            this._holdBtn.visible = true;
            this._holdTip.visible = false;
            this._holdNum.visible = true;
            this._holdFlag.setRes("sixsection1_notholdtxt"); 
        }
        this._effect.text = LanguageManager.getlocal("sixSection1HoldTitleEffect", [""+titleCfg.influenceSpeed, ""+titleCfg.maxInfluence]);
        //抢夺次数
        // let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        // let freeNumStr = "sixSection1HoldTitleNum1";
        // if (freeNum <= 0){
        //     freeNumStr = "sixSection1HoldTitleNum2";
        // }
        // this._holdNum.text = LanguageManager.getlocal(freeNumStr, [""+freeNum, ""+Config.Sixsection1Cfg.freeTime]);
        // this._holdNum.x = this._bottomBg.x + this._bottomBg.width/2 - this._holdNum.width/2;
        this.refreshHoldNum();
    }

    private refreshHoldNum():void{
        let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        let freeNumStr = "sixSection1HoldTitleNum1";
        if (freeNum <= 0){
            freeNumStr = "sixSection1HoldTitleNum2";
        }
        this._holdNum.text = LanguageManager.getlocal(freeNumStr, [""+freeNum, ""+Config.Sixsection1Cfg.freeTime]);
        this._holdNum.x = this._bottomBg.x + this._bottomBg.width/2 - this._holdNum.width/2;
    }

    //头衔抢夺
    private holdBtnClick():void{
        // if (1){
        //     let attacklog = {"type":"director","fightst":1595828912,"winuid":1006568,"loseuid":1006518,"fuinfo":{"topTitle":{"sortKey":"3001","sortValue":3},"uid":1006518,"level":20,"exp":971241349,"name":"钟仪芳","pic":1,"title":{"clv":2,"clothes":"3001","title":"6005","tlv":2}},"x":3,"y":5,"uinfo":{"topTitle":{"sortKey":"3151","sortValue":1},"uid":1006568,"level":11,"exp":35160,"name":"冒星火","pic":2,"title":{"clothes":"3108","clv":1,"title":"3108","tlv":1}}};

        //     let win = 0;
        //     if (attacklog.winuid == Api.playerVoApi.getPlayerID()){
        //         win = 1;
        //     }
        //     let info:any[] = [attacklog.uinfo, attacklog.fuinfo];
            
        //     ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {info: info, wcode: win});
        //     return;
        // }

        if (!Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return ;
        }
        //判断抢夺次数
        let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum < 1){
            let itemId = Config.Sixsection1Cfg.item1;
            let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
            let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
            let num = 0;
            if (itemInfoVo){
                num = itemInfoVo.num;
            }
            let message = LanguageManager.getlocal("sixSection1HoldTitleUseToolTip",[""+itemCfg.name, ""+1]);
            let mesObj = {
                confirmCallback: this.holdBtnEnter, 
                handler: this, 
                icon:  itemCfg.icon,
                iconBg: itemCfg.iconBg, 
                num: num, 
                useNum:1,
                msg: message ,
                id : itemId,
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        }
        else{
            this.holdBtnEnter();
        }
    }

    private holdBtnEnter():void{
        let uid = null;
        if (this.param && this.param.data && this.param.data.uid){
            uid = this.param.data.uid;
        }
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_TITLEATTACK, {x: this._titleData.lineNum, y: this._seatIndex+1, fuid: uid});
    }

    //抢夺请求回调
    private holdBtnRequestCallback(evt:egret.Event){
        //ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {});
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if (rData.lastDirector){
            let lineNum = rData.lastDirector.x;
            App.LogUtil.log("holdBtnRequestCallback "+lineNum);
            if (lineNum){
                Api.sixsection1VoApi.setClearTitleInfo(lineNum);
                let baseView = <SixSection1TitlePopupView>ViewController.getInstance().getView("SixSection1TitlePopupView");
                if (baseView){
                    baseView.freshMapData(lineNum);
                }
            }
        }
        Api.sixsection1VoApi.setTitleInfo(rData.map);
        if (rData.list && rData.list.length > 0){
            Api.sixsection1VoApi.setLogList(rData.list);
        }
        this.refreshHoldNum();
        console.log("holdBtnRequestCallback ", rData);
        if (rData.SS1stat == 5){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldTitleDataChange"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, {lineNum: this._titleData.lineNum, index: this._seatIndex});
            this.hide();
            return ;
        }
        if (rData.SS1stat == 2 || rData.SS1stat == 3){
            let win = 0;
            if (rData.attacklog.winuid == Api.playerVoApi.getPlayerID()){
                win = 1;
            }
            let info:any[] = [rData.attacklog.uinfo, rData.attacklog.fuinfo];
            // ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {info: info, wcode: win});
            ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEPRACTICEBATTLEVIEW, {
                "pklogs": rData.attacklog.pklogs,
                "finfo": rData.attacklog.fuinfo,
                "minfo": rData.attacklog.uinfo,
                "winuid": rData.attacklog.winuid,
            });
        }
        if (rData.SS1stat == 1 || rData.SS1stat == 2){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, {lineNum: this._titleData.lineNum, index: this._seatIndex});
            this._data = null;
            this._holdData = Api.sixsection1VoApi.getTitleInfoByFloor(this._titleData.lineNum);
            this.refreshUI();
        }
        else if (rData.SS1stat == 3){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, {lineNum: this._titleData.lineNum, index: this._seatIndex, isNum:1});
        }
    }

    public getRoleContainer(data:any):BaseDisplayObjectContainer{
		if (!data){
			return null;
		}
        let titleData = App.CommonUtil.getTitleData(data.title);
		let curLevel = 1;
		if (titleData.clv){
			curLevel = titleData.clv;
		}
		let titleconfig = null;
		let curTitleId = null;
        if (titleData.clothes){
			titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
			curTitleId = titleData.clothes;
        }
        
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
			if(curLevel == 0){
				curLevel = 1;
			}
        }
		let userContainer:BaseDisplayObjectContainer = null;
		App.LogUtil.log("EmperorOutFirstAniView:curTitleId "+curTitleId);
		if(curTitleId){
			userContainer = new BaseDisplayObjectContainer();
			userContainer.name = "userContainer";
			this.addChildToContainer(userContainer);

			let role = null;
			let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
			let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
			if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
				App.LogUtil.log("aaa dragonbone ");
				role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
				role.x = 340; //w432, h508
				role.y = 35;
				userContainer.addChild(role);
				role.name = 'role';
				userContainer.height = 790;
			}else{
				role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic,null,null,null,null,null,true);
				role.y = -30;
				let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
				if (isnew){
					role.x = 0;
				}
				else{
					role.x = 155;
				}
				userContainer.addChild(role);
				userContainer.height = 765;
			}
		}else{
			userContainer = new BaseDisplayObjectContainer();
			// let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
			let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel,true);
			role.width = 300;
			role.y = -30;
			role.x = 190;
			userContainer.name = "userContainer";
			userContainer.addChild(role);
			userContainer.height = 765;
		}
        return userContainer;
    }

    protected getShowHeight():number{
        return 760;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEATTACK, this.holdBtnRequestCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        this._data = null;
        this._holdData = null;
        this._titleData = null;
        this._seatIndex = null;
        this._roleContainer = null;
        this._allianceContainer = null;
        this._roleInfoContainer = null;
        this._holdFlag = null;
        this._effect = null;
        this._holdBtn = null;
        this._holdNum = null;
        this._holdTip = null;

        super.dispose();
    }
}