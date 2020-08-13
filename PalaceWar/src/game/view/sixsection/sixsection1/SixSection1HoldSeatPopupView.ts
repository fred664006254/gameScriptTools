/**
* 争夺席位
* date 2020.5.11
* author ycg
* @name SixSection1HoldSeatPopupView
*/
class SixSection1HoldSeatPopupView extends PopupView{
    private _data:any = null;
    private _seatIndex:number = 0;
    private _seatData:any = null;
    private _seatUid:number = null;

    private _roleInfoContainer:BaseDisplayObjectContainer = null;
    private _roleContainer:BaseDisplayObjectContainer = null;
    private _allianceContainer:BaseDisplayObjectContainer = null;
    private _holdFlag:BaseBitmap = null;
    private _currRes:BaseTextField = null;
    private _remainRes:BaseTextField = null;
    private _remainTime:BaseTextField = null;
    private _holdBtn:BaseButton = null;
    private _holdNeed:BaseTextField = null;
    private _lookBtn:BaseButton = null;
    private _zhenRongBtn:BaseButton = null;
    private _currInfluNum:number = null;
    private _currResNum:number = null;
    private _buildData:any = null; //自己的座位数据
    private _isNeedBattle:boolean = false;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        let data = this.param.data.data.baseCfg;
        return "sixSection1BuildName"+(data.index + 1);
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
            // console.log("receivedata ",data.data.data);
            // Api.sixsection1VoApi.setMapInfo(data.data.data.map);
            this._data = data.data.data;
        }
		// view.vo.setBossNumInfo(data.data.data);
	} 

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.holdSeatCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_INVESTIGATE, this.lookBtnRequestCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);

        this._seatData = this.param.data.data;
        this._seatIndex = this.param.data.index;
        this._seatUid = this.param.data.uid;

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 690;
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

        let svName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        svName.setPosition(name.x + name.width, name.y);
        roleInfoContainer.addChild(svName);
        svName.name = "svName";

        //官品
        let levelBg = BaseBitmap.create("sixsection1_officerbg");
        levelBg.y = nameBg.y - 5 - levelBg.height;
        levelBg.x = roleInfoContainer.width/2 - levelBg.width/2;
        roleInfoContainer.addChild(levelBg);
        levelBg.name = "levelBg";
        let level = ComponentManager.getTextField(LanguageManager.getlocal("officialTitle1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        level.setPosition(levelBg.x + levelBg.width/2 - level.width/2, levelBg.y + levelBg.height/2 - level.height/2 + 3);
        roleInfoContainer.addChild(level);
        level.name = "level";

        //是否占有
        let holdFlagImg = "sixsection1_holdtxt";
        // holdFlagImg = "sixsection1_noholdtxt";
        let holdFlag = BaseBitmap.create(holdFlagImg);
        holdFlag.x = topBg.x + topBg.width/2 - holdFlag.width/2;
        holdFlag.y = levelBg.y - holdFlag.height - 5;
        this.addChildToContainer(holdFlag);
        this._holdFlag = holdFlag;

        //bottom
        let bottomBg = BaseBitmap.create("public_popupscrollitembg");
        bottomBg.height = bg.height - topBg.height - 20;
        bottomBg.setPosition(bg.x + bg.width/2 - bottomBg.width/2, topBg.y + topBg.height + 5);
        this.addChildToContainer(bottomBg);

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

        let alliNameStr = null;
        let alliPowerStr = null;
        let allianceName = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatAllianceName", [""+alliNameStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        allianceName.setPosition(allianInfoBg.x + 55, allianInfoBg.y + allianInfoBg.height/2 - allianceName.height/2);
        allianInfoCon.addChild(allianceName);
        allianceName.name = "allinaceName";

        let power = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatAlliancePower", [""+alliPowerStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        power.setPosition(allianInfoBg.x + allianInfoBg.width - 55 - power.width, allianceName.y);
        allianInfoCon.addChild(power);
        power.name = "power";

        //待采集
        let currResStr = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+0]);
        let currRes = ComponentManager.getTextField(currResStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        currRes.setPosition(bottomBg.x + 20, allianInfoCon.y + allianInfoCon.height + 15);
        this.addChildToContainer(currRes);
        this._currRes = currRes;
        
        let baseCfg = this._seatData.baseCfg;
        let remainResNum = baseCfg.max;
        let remainRes = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatRes3", [""+remainResNum, ""+baseCfg.max]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        remainRes.setPosition(currRes.x , currRes.y + currRes.height + 10);
        this.addChildToContainer(remainRes);
        this._remainRes = remainRes;

        let remainTime = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatRestime", [""+0]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        remainTime.setPosition(currRes.x , remainRes.y + remainRes.height + 10);
        this.addChildToContainer(remainTime);
        this._remainTime = remainTime;

        //抢夺按钮
        let holdBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW , "sixSection1HoldSeatBtnName", this.holdBtnClick, this);
        holdBtn.setPosition(bottomBg.x + bottomBg.width/2 - holdBtn.width/2, bottomBg.y + bottomBg.height - holdBtn.height - 35);
        this.addChildToContainer(holdBtn);
        this._holdBtn = holdBtn;
        //消耗行动力
        let holdNeed = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        holdNeed.setPosition(bottomBg.x + bottomBg.width/2 - holdNeed.width/2, holdBtn.y + holdBtn.height + 10);
        this.addChildToContainer(holdNeed);
        this._holdNeed = holdNeed;

        //书籍经验速度
        let speedBg = BaseBitmap.create("public_9_bg91");
        this.addChildToContainer(speedBg);
        speedBg.y = topBg.y + 14;
        
        let houseName = LanguageManager.getlocal("sixSection1BuildName"+(baseCfg.index + 1));
        let speed = Math.ceil(1 * 3600 / baseCfg.shujijingyanSpeed);
        let speedTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatSpeed", [""+houseName, ""+speed]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        speedBg.width = speedTxt.width + 60;
        speedBg.x = topBg.x + topBg.width/2 - speedBg.width/2;
        speedTxt.setPosition(speedBg.x + speedBg.width/2 - speedTxt.width/2, speedBg.y + speedBg.height/2 - speedTxt.height/2);
        this.addChildToContainer(speedTxt);

        //tip
        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bottomBg.x + bottomBg.width/2 - tipBg.width/2, bottomBg.y + bottomBg.height - 95);
        this.addChildToContainer(tipBg);
        let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatBottomTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 38);
        this.addChildToContainer(tip);

        //侦查
        let lookBtn = ComponentManager.getButton("sixsection1_lookbtn", "", this.lookBtnClick, this);
        lookBtn.setPosition(bg.x + bg.width - lookBtn.width - 10, topBg.y + topBg.height - lookBtn.height - 5);
        this.addChildToContainer(lookBtn);
        this._lookBtn = lookBtn;

        //查看阵容
        let zhenRongBtn = ComponentManager.getButton("sixsection1_zhenrongbtn", "", this.zhenRongBtnClick, this);
        zhenRongBtn.setPosition(topBg.x + topBg.width - zhenRongBtn.width - 10, topBg.y + topBg.height - zhenRongBtn.height - 5);
        this.addChildToContainer(zhenRongBtn);
        this._zhenRongBtn = zhenRongBtn;
        zhenRongBtn.visible = false;

        this.refreshUI();
    }

    private refreshUI():void{
        let role = <BaseDisplayObjectContainer>this._roleContainer.getChildByName("role");
        let levelBg = <BaseBitmap>this._roleInfoContainer.getChildByName("levelBg");
        let level = <BaseTextField>this._roleInfoContainer.getChildByName("level");
        let nameBg = <BaseBitmap>this._roleInfoContainer.getChildByName("nameBg");
        let name = <BaseTextField>this._roleInfoContainer.getChildByName("name");
        let svName = <BaseTextField>this._roleInfoContainer.getChildByName("svName");
        let allBg = <BaseBitmap>this._allianceContainer.getChildByName("allianceInfoBg");
        let allName = <BaseTextField>this._allianceContainer.getChildByName("allinaceName");
        let power = <BaseTextField>this._allianceContainer.getChildByName("power");

        App.LogUtil.log("refreshUI aaa");
        let seatCfg = this._seatData.baseCfg;
        if (this._data || this._buildData){
            if (role){
                role.dispose();
                role = null;
            }
            this._roleInfoContainer.visible = true;
            this._roleContainer.visible = true;
            this._allianceContainer.visible = true;
            allName.visible = true;
            power.visible = true;
            App.LogUtil.log("refreshUI aaa 0");
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

            this._isNeedBattle = false;
            let lv = 1;
            let nameStr = "";
            let allNameStr = LanguageManager.getlocal("sixSection1HoldNothing");
            let powerNum = 0;
            let svNameStr = "";
            if (this._data){
                App.LogUtil.log("refreshUI aaa 1");
                lv = this._data.level;
                nameStr = this._data.name;
                allNameStr = this._data.gname;
                powerNum = this._data.power;
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(this._data.ruid);
            }
            else{
                App.LogUtil.log("refreshUI aaa 2");
                lv = Api.playerVoApi.getPlayerLevel();
                nameStr = Api.playerVoApi.getPlayerName();
                allNameStr = Api.playerVoApi.getPlayerAllianceName();
                powerNum = Api.playerVoApi.getPlayerPower();
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName();
            }
            if (!allNameStr){
                allNameStr = LanguageManager.getlocal("sixSection1HoldNothing");
            }
            App.LogUtil.log("refreshUI aaa nameStr "+nameStr);
            level.text = LanguageManager.getlocal("officialTitle"+lv);
            level.x = levelBg.x + levelBg.width/2 - level.width/2;
            name.text = nameStr;
            svName.text = "("+svNameStr+")";
            nameBg.width = nameBg.width > name.width + 50 + svName.width ? nameBg.width : name.width + 50 + svName.width;
            nameBg.x = this._roleInfoContainer.width/2 - nameBg.width/2;
            name.x = nameBg.x + nameBg.width/2 - (name.width + svName.width)/2;
            name.y = nameBg.y + nameBg.height/2 - name.height/2;
            svName.x = name.x + name.width;
            svName.y = name.y;
            
            allName.text = LanguageManager.getlocal("sixSection1HoldSeatAllianceName", [""+allNameStr]);
            power.text = LanguageManager.getlocal("sixSection1HoldSeatAlliancePower", [App.StringUtil.changeIntToText(powerNum)]);
            power.x = allBg.x + allBg.width - 55 - power.width;
            //是自己
            if (this._data && this._data.ruid == Api.playerVoApi.getPlayerID() || this._buildData){
                this._lookBtn.visible = false;
                this._zhenRongBtn.visible = false;
                this._holdBtn.visible = false;
                this._holdNeed.visible = false;
            }
            else{
                //其他人
                this._isNeedBattle = true;
                this._holdBtn.visible = true;
                this._holdNeed.visible = true;
                if (Api.sixsection1VoApi.getLookedZhenRong(this._seatData.lineNum, this._seatIndex)){
                    this._lookBtn.visible = false;
                    this._zhenRongBtn.visible = true;
                }
                else{
                    this._lookBtn.visible = true;
                    this._zhenRongBtn.visible = false;
                }
                // let influenceData = Api.sixsection1VoApi.getInfluenceData();
                // this._currInfluNum = influenceData.num;
                // let holdNeedStr = "sixSection1HoldSeatNeed1";
                // if (influenceData.num < seatCfg.influenceNeed){
                //     holdNeedStr = "sixSection1HoldSeatNeed2";
                // }
                // this._holdNeed.text = LanguageManager.getlocal(holdNeedStr, [""+seatCfg.influenceNeed, ""+Math.floor(influenceData.num)]);
                // this._holdNeed.x = this._holdBtn.x + this._holdBtn.width/2 - this._holdNeed.width/2;
                this.refreshHoldNeed();
            }
            let currResNum = 0;
            let remainNum = 0;
            let remainTime = 0;
            if (this._buildData){
                currResNum = Math.floor((GameData.serverTime - this._buildData.st) * seatCfg.shujijingyanSpeed / 3600);
                if (currResNum > this._buildData.remain){
                    currResNum = this._buildData.remain;
                }
                remainNum = this._buildData.remain - currResNum;
                remainTime = this._buildData.st +  Math.ceil(this._buildData.remain * 3600 / seatCfg.shujijingyanSpeed);
                this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+currResNum]);
            }
            else{
                let mapInfo = Api.sixsection1VoApi.getSeatDataByPos(this._seatData.lineNum, this._seatIndex);
                if (mapInfo){
                    currResNum = Math.floor((GameData.serverTime - mapInfo.st) * seatCfg.shujijingyanSpeed / 3600);
                    if (currResNum > mapInfo.remain){
                        currResNum = mapInfo.remain;
                    }
                    remainNum = mapInfo.remain - currResNum;
                    remainTime = mapInfo.st +  Math.ceil(mapInfo.remain * 3600 / seatCfg.shujijingyanSpeed);
                    if (mapInfo.uid == Api.playerVoApi.getPlayerID()){
                        this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+currResNum]);
                    }
                    else{
                        this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes1", [""+currResNum, ""+(seatCfg.lost * 100).toFixed(0)]);
                    }
                }
                if (this._data.ruid == Api.playerVoApi.getPlayerID()){
                    this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+currResNum]);
                }
                else{
                    this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes1", [""+currResNum, ""+(seatCfg.lost * 100).toFixed(0)]);
                }
            }
            this._currResNum = currResNum;
            remainTime -= GameData.serverTime;
            if (remainTime < 0){
                remainTime = 0;
            }
            
            this._remainRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes3", [""+remainNum, ""+seatCfg.max]);
            let timeStr = App.DateUtil.getFormatBySecond(remainTime, 1);
            this._remainTime.text = LanguageManager.getlocal("sixSection1HoldSeatRestime", [""+timeStr]);
        }
        else{
            this._isNeedBattle = false;
            this._roleInfoContainer.visible = false;
            this._roleContainer.visible = false;
            // this._allianceContainer.visible = false;
            allName.visible = false;
            power.visible = false;
            this._lookBtn.visible = false;
            this._zhenRongBtn.visible = false;
            this._holdBtn.visible = true;
            this._holdNeed.visible = true;
            this._holdFlag.setRes("sixsection1_notholdtxt");
            this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes1", [""+0, ""+(seatCfg.lost * 100).toFixed(0)]);
            this._remainRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes3", [""+seatCfg.max, ""+seatCfg.max]);
            let time = Math.ceil(seatCfg.max * 3600 / seatCfg.shujijingyanSpeed);
            let timeStr = App.DateUtil.getFormatBySecond(time, 1);
            this._remainTime.text = LanguageManager.getlocal("sixSection1HoldSeatRestime", [""+timeStr]);

            // let influenceData = Api.sixsection1VoApi.getInfluenceData();
            // this._currInfluNum = influenceData.num;
            // let holdNeedStr = "sixSection1HoldSeatNeed1";
            // if (influenceData.num < seatCfg.influenceNeed){
            //     holdNeedStr = "sixSection1HoldSeatNeed2";
            // }
            // this._holdNeed.text = LanguageManager.getlocal(holdNeedStr, [""+seatCfg.influenceNeed, ""+Math.floor(influenceData.num)]);
            // this._holdNeed.x = this._holdBtn.x + this._holdBtn.width/2 - this._holdNeed.width/2;
            this.refreshHoldNeed();
        }
    }

    private refreshHoldNeed():void{
        let seatCfg = this._seatData.baseCfg;
        let svTime = GameData.serverTime;
        let influData = Api.sixsection1VoApi.getInfluenceData();
        if (influData.num < influData.max){
            let dt = Math.floor((svTime - influData.st) / 60);
            let currNum = Math.floor(influData.num + dt * influData.speed/60);
            if (influData.max <= currNum){
                currNum = influData.max;
                if (influData.num > influData.max){
                    currNum = influData.num;
                }
            }
            this._currInfluNum = Math.floor(currNum);
            let holdNeedStr = "sixSection1HoldSeatNeed1";
            if (this._currInfluNum < seatCfg.influenceNeed){
                holdNeedStr = "sixSection1HoldSeatNeed2";
            }
            this._holdNeed.text = LanguageManager.getlocal(holdNeedStr, [""+seatCfg.influenceNeed, ""+Math.floor(currNum)]);
        }
        else{
            let holdNeedStr = "sixSection1HoldSeatNeed1";
            if (influData.num < seatCfg.influenceNeed){
                holdNeedStr = "sixSection1HoldSeatNeed2";
            }
            this._currInfluNum = Math.floor(influData.num);
            this._holdNeed.text = LanguageManager.getlocal(holdNeedStr, [""+seatCfg.influenceNeed, ""+Math.floor(influData.num)]);
        }
        this._holdNeed.x = this._holdBtn.x + this._holdBtn.width/2 - this._holdNeed.width/2;
    }

    public tick():void{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return ;
        }
        let seatCfg = this._seatData.baseCfg;
        let svTime = GameData.serverTime;
        let influData = Api.sixsection1VoApi.getInfluenceData();
        if (influData && influData.num < influData.max){
            let dt = Math.floor((svTime - influData.st) / 60);
            let currNum = Math.floor(influData.num + dt * influData.speed/60);
            if (influData.max <= currNum){
                currNum = influData.max;
                if (influData.num > influData.max){
                    currNum = influData.num;
                }
            }

            this._currInfluNum = Math.floor(currNum);
            let holdNeedStr = "sixSection1HoldSeatNeed1";
            if (this._currInfluNum < seatCfg.influenceNeed){
                holdNeedStr = "sixSection1HoldSeatNeed2";
            }
            this._holdNeed.text = LanguageManager.getlocal(holdNeedStr, [""+seatCfg.influenceNeed, ""+Math.floor(currNum)]);
            this._holdNeed.x = this._holdBtn.x + this._holdBtn.width/2 - this._holdNeed.width/2;
        }

        //刷新资源
        if (this._data || this._buildData){
            let currResNum = 0;
            let remainNum = 0;
            let remainTime = 0;
            let timeEt = 0;
            if (this._buildData){
                currResNum = Math.floor((GameData.serverTime - this._buildData.st) * seatCfg.shujijingyanSpeed / 3600);
                if (currResNum > this._buildData.remain){
                    currResNum = this._buildData.remain;
                }
                remainNum = this._buildData.remain - currResNum;
                timeEt = this._buildData.st + Math.ceil(this._buildData.remain * 3600 / seatCfg.shujijingyanSpeed);
                this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+currResNum]);
            }
            else{
                let mapInfo = Api.sixsection1VoApi.getSeatDataByPos(this._seatData.lineNum, this._seatIndex);
                if (mapInfo){
                    currResNum = Math.floor((GameData.serverTime - mapInfo.st) * seatCfg.shujijingyanSpeed / 3600); //1594667717
                    if (currResNum > mapInfo.remain){
                        currResNum = mapInfo.remain;
                    }
                    remainNum = mapInfo.remain - currResNum;
                    timeEt = mapInfo.st + Math.ceil(mapInfo.remain * 3600 / seatCfg.shujijingyanSpeed);
                    if (mapInfo.uid == Api.playerVoApi.getPlayerID()){
                        this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes2", [""+currResNum]);
                    }
                    else{
                        this._currRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes1", [""+currResNum, ""+(seatCfg.lost * 100).toFixed(0)]);
                    }
                }
            }
            this._currResNum = currResNum;
            remainTime = timeEt - GameData.serverTime;
            if (remainTime < 0){
                remainTime = 0;
            }
            this._remainRes.text = LanguageManager.getlocal("sixSection1HoldSeatRes3", [""+remainNum, ""+seatCfg.max]);
            let timeStr = App.DateUtil.getFormatBySecond(remainTime, 1);
            this._remainTime.text = LanguageManager.getlocal("sixSection1HoldSeatRestime", [""+timeStr]);
        }
    }

    //席位抢夺
    private holdBtnClick():void{
        // if (1){
        //     let data:any = {"attacklog":{"aBuff":{"hpUp":0.1,"atkUp":0.1,"criUp":0.1},"pklogs":[[1,1,[[0,48600],[0,15400],[0,48600],[0,15400],[0,48600]],{"fullattr":873574,"level":20,"pic":4,"uid":1006518,"name":"钟仪芳","title":{"tlv":2,"clv":2,"clothes":"3001","title":"6005"},"ptitle":{"plv":5,"ptitle":"4016"},"skillRate":0.091,"attr":842774,"skillValue":0.72,"plevel":120,"quality":243},{"fullattr":124807,"level":11,"pic":1,"uid":1006568,"name":"冒星火","title":{"tlv":1,"clv":1,"clothes":"3108","title":"3108"},"ptitle":{"plv":1,"ptitle":"4016"},"skillRate":0.0035,"attr":-20993,"skillValue":0.03,"plevel":1,"quality":77}],[1,1,[[0,31680],[0,29502],[0,31680],[0,32780],[0,34848],[0,32780],[0,34848],[0,29502],[0,31680],[0,29502],[0,69696],[0,72116],[0,57024],[0,65560],[0,69696],[0,65560],[0,63360],[0,65560],[0,69696],[0,65560],[0,114048],[0,131120],[0,114048],[0,131120],[0,114048],[0,144232],[0,114048],[0,144232],[0,139392],[0,144232],[0,253440],[0,236016],[0,253440]],{"fullattr":4769787,"attr":3827391,"sid":"1041","fightattr":4769787},{"fullattr":1278259,"attr":-190588,"sid":"1052","fightattr":1278259}],[2,1,[[0,11880],[0,28512]],{"fullattr":4769787,"attr":4198250,"sid":"1041","fightattr":3827391},{"fullattr":660,"attr":-27786,"sid":"1050","fightattr":660}]],"winuid":1006518,"bBuff":{"hpUp":0.1,"atkUp":0.1,"criUp":0.1},"sidlist1":[{"fullattr":4769787,"clv":6,"fightattr":4198250,"lv":400,"sid":"1041","attr":4198250,"s2lv":1,"s1lv":1,"quality":144},{"fullattr":2984418,"clv":1,"fightattr":2984418,"lv":150,"sid":"1040","attr":2984418,"s2lv":3,"s1lv":12,"quality":448},{"fullattr":2832361,"clv":6,"fightattr":2832361,"lv":400,"sid":"1039","attr":2832361,"s2lv":1,"s1lv":1,"quality":120}],"sidlist2":[{"fullattr":1278259,"clv":0,"fightattr":-190588,"lv":50,"sid":"1052","attr":-190588,"s2lv":35,"s1lv":8,"quality":149},{"fullattr":660,"clv":0,"fightattr":-27786,"lv":1,"sid":"1050","attr":-27786,"s2lv":27,"s1lv":23,"quality":60}],"loseuid":1006568,"getResource":18}};
        //     //2 成功 3 失败
        //         ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1SEATBATTLEVIEW, {
        //             sidlist1: data.attacklog.sidlist1,
        //             sidlist2: data.attacklog.sidlist2,
        //             pklogs: data.attacklog.pklogs,
        //             winuid: data.attacklog.winuid,
        //             aBuff: data.attacklog.aBuff,
        //             bBuff: data.attacklog.bBuff,
        //             getResource: data.attacklog.getResource,
        //             buildIndex: this._seatData.baseCfg.index,
        //         });
           
        //     return ;
        // }
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return ;
        }
        if (Api.sixsection1VoApi.checkHoldTeamLimit()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1UseServantTeamTip"));
            return;
        }
        let seatCfg = this._seatData.baseCfg;
        let influenceData = Api.sixsection1VoApi.getInfluenceData(); 
        if (this._currInfluNum < seatCfg.influenceNeed){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatInfluenceNotFull"));
            return ;
        }
        let uid = null;
        if (this.param && this.param.data && this.param.data.uid){
            uid = this.param.data.uid;
        }
        App.LogUtil.log("hold seat uid "+uid);
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1SELECTSERVANTPOPUPVIEW, {data: this._seatData, index: this._seatIndex, fuid: uid});
    }

    //抢夺回调
    private holdSeatCallback(evt:egret.Event){
        if (evt.data.ret){
            let data = evt.data.data.data;
            Api.sixsection1VoApi.setMapInfo(data.map);
            Api.sixsection1VoApi.setLogList(data.list);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH, {lineNum: this._seatData.lineNum, index: this._seatIndex});

            //2 成功 3 失败  5数据已发生变化
            if (data.SS1stat == 5){
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatDataChange"));
                this.hide();
                return ;
            }

            if (data.SS1stat == 2 || data.SS1stat == 3){
                ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1SEATBATTLEVIEW, {
                    sidlist1: data.attacklog.sidlist1,
                    sidlist2: data.attacklog.sidlist2,
                    pklogs: data.attacklog.pklogs,
                    winuid: data.attacklog.winuid,
                    aBuff: data.attacklog.aBuff,
                    bBuff: data.attacklog.bBuff,
                    minfo: data.attacklog.minfo,
                    finfo: data.attacklog.finfo,
                    getResource: data.attacklog.getResource,
                    buildIndex: this._seatData.baseCfg.index,
                });
            }
            
            App.LogUtil.log("holdSeatCallback "+data.SS1stat);
            if (data.SS1stat != 3){
                this._data = null;
                this._buildData = Api.sixsection1VoApi.getSeatDataByPos(this._seatData.lineNum, this._seatIndex);
                this.refreshUI();
            }
        }
    }

    //侦查
    private lookBtnClick():void{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return ;
        }
        let itemId = Config.Sixsection1Cfg.item4;
        let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        let num = 0;
        if (itemInfoVo){
            num = itemInfoVo.num;
        }
        let message = LanguageManager.getlocal("sixSection1HoldSeatLookEnemyUseToolTip",[""+itemCfg.name, ""+1]);
        let mesObj = {
            confirmCallback: this.lookBtnClickEnter, 
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

    private lookBtnClickEnter():void{
        let itemId = Config.Sixsection1Cfg.item4;
        let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        let num = 0;
        if (itemInfoVo){
            num = itemInfoVo.num;
        }
        if (num <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyToolNotFull"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_INVESTIGATE, {ruid: this.param.data.uid, x: this._seatData.lineNum, y: this._seatIndex+1});
    }

    private lookBtnRequestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if (rData.SS1stat && rData.SS1stat == 5){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatDataChange"));
            this.hide();
            return ;
        }
        this._lookBtn.visible = false;
        this._zhenRongBtn.visible = true;
        let data = Api.sixsection1VoApi.getLookedZhenRong(this._seatData.lineNum, this._seatIndex);
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1LOOKENEMYVIEW, {data: data});
    }

    //阵容
    private zhenRongBtnClick():void{
        App.LogUtil.log("zhenRongBtnClick");
        let data = Api.sixsection1VoApi.getLookedZhenRong(this._seatData.lineNum, this._seatIndex);
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1LOOKENEMYVIEW, {data: data});
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
        return 780;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.holdSeatCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_INVESTIGATE, this.lookBtnRequestCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        this._data = null;
        this._seatIndex = null;
        this._seatUid = null;
        this._seatData = null;

        this._roleInfoContainer = null;
        this._roleContainer = null;
        this._allianceContainer = null;
        this._holdFlag = null;
        this._currRes = null;
        this._remainRes = null;
        this._remainTime = null;
        this._holdBtn = null;
        this._holdNeed = null;
        this._lookBtn = null;
        this._zhenRongBtn = null;
        this._currInfluNum = null;
        this._currResNum = null;
        this._buildData = null;
        this._isNeedBattle = false;
        
        super.dispose();
    }
}