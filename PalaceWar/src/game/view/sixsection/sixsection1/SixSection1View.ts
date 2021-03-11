/**
* 皇城六部 兵部
* date 2020.5.7
* author ycg
* @name SixSection1View
*/
class SixSection1View extends CommonView{
    private _dropBtnList:BaseButton[] = [];
    private _dropDownBtn:BaseButton = null;
    private _dropDownFlag:BaseBitmap = null;
    private _dropDownContainer:BaseDisplayObjectContainer = null;
    private _lastDropIdx:number = 0;
    private _showMore:BaseButton = null;
    private _moreArrow:BaseBitmap = null;
    private _bottomLogTxt:BaseTextField = null;
    private _isShowMore:boolean = false;
    private _isTouchMore:boolean = false;
    private _showMoreContainer:BaseDisplayObjectContainer = null;
    private _bottomBg:BaseBitmap = null;
    private _currMaskBmp:BaseBitmap = null;
    private _buildContainer:BaseDisplayObjectContainer = null;
    private _scaleBtn:BaseButton = null;
    private _isBig:boolean = false;
    private _scrollList:ScrollList = null;
    private _scrollLeft:number = 0;
    private _lineScroll:ScrollList = null;
    private _dataList:any[] = [];
    private _buildItemHeightArr:any = {};
    private _buildItemHeightList:any = {};
    private _scrollListTop:number = 0;
    private _currShowFloor:number = 1;

    private _powerNum:BaseTextField = null;
    private _powerSpeed:BaseTextField = null;
    private _titleInfo:BaseTextField = null;
    private _titleRed:BaseBitmap = null;
    private _currPowerNum:number = 0;
    private _isJump:boolean = false;
    private _jumpFloor:number = 0;
    
    private _holdLogList:any[] = [];
    private _tipName:BaseTextField = null;
    private _tipPoint:BaseTextField = null;
    private _seatBtn:BaseButton = null;
    private _sectionTitleBtn:BaseButton = null;
    private _rechargeBtn:BaseButton = null;
    private _isCrossDay:boolean = false;
    private _crossTime:number = 0;
    private _currIndexs:number[] = [];
    private _timeBg:BaseBitmap = null;
    private _time:BaseTextField = null;
    private _isFirst:boolean = true;
    private _jumpData:any = null;
    private _isCanJump:boolean = false;
    private _isNeedClose:boolean = false;
    private _useInfluenceNum:number = 0;
    private _addPowerBtn:BaseButton = null;
    private _battleAtk:BaseTextField = null;
    private _teamNum:BaseTextField = null;

    public constructor() {
        super();
    }

    // protected getBgName():string{
    //     return "searchbg1";
    // }

    protected getTitleStr():string{
        return "sixSectionBuildName2";
    }

    // protected getTitleBgName():string{
    //     return "";
    // }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "sixSection1RuleInfo";
    }

    protected getProbablyInfo():string{
        return ""
    }

    protected get uiType():string{
        return "2";
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "common_select_frame", "common_arrow_1", "common_select_frame_down", "arena_bottom_bg", "battlepassfntbg-1",
        ).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SIXSECTION1_GETMAP), this.mapCallBack, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, this.addPowerCallback, this); //增加影响力
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.holdSeatCallback, this); //占领席位
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH, this.refreshSeat, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, this.getLogListCallback, this);//log
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this); //头衔
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SHOW, this.resetCrossTimeCallback, this);

        Api.sixsection1VoApi.clearBuildMapInfo();
        this._dropBtnList = [];
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropDownContainer = null;
        this._lastDropIdx = 0;
        this._showMore = null;
        this._moreArrow = null;
        this._bottomLogTxt = null;
        this._isShowMore = false;
        this._isTouchMore = false;
        this._showMoreContainer = null;
        this._bottomBg = null;
        this._currMaskBmp = null;
        this._buildContainer = null;
        this._scaleBtn = null;
        this._isBig = false;
        this._scrollList = null;
        this._scrollLeft = 0;
        this._lineScroll = null;
        this._dataList = [];
        this._buildItemHeightArr = {};
        this._buildItemHeightList = {};
        this._scrollListTop = 0;
        this._currShowFloor = 1;

        this._powerNum = null;
        this._powerSpeed = null;
        this._titleInfo = null;
        this._titleRed = null;
        this._currPowerNum = 0;
        this._isJump = false;
        this._jumpFloor = 0;

        this._holdLogList = [];
        this._tipName = null;
        this._tipPoint = null;
        this._seatBtn = null;
        this._sectionTitleBtn = null;
        this._rechargeBtn = null;
        this._isCrossDay = false;
        this._crossTime = 0;
        this._currIndexs = [];
        this._timeBg = null;
        this._time = null;
        this._isFirst = true;
        this._jumpData = null;
        this._isCanJump = false;
        this._isNeedClose = true;
        this._useInfluenceNum = 0;
        this._addPowerBtn = null;
        this._battleAtk = null;
        this._teamNum = null;

        super.dispose();
    }

    private get cfg(){
        return Config.Sixsection1Cfg;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
        let index = [0,1,2];
        this._currIndexs = index;
		return {requestType:NetRequestConst.REQUEST_SIXSECTION1_GETMAP,requestData:{
			indexs : index
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            if (this._isFirst){
                console.log("receivedata ",data.data.data.map);
                Api.sixsection1VoApi.setMapInfo(data.data.data.map);
                Api.sixsection1VoApi.setLogList(data.data.data.list);
            }
        }
		// view.vo.setBossNumInfo(data.data.data);
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, this.addPowerCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, this.getLogListCallback, this); //抢夺记录
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH, this.refreshSeat, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this);//头衔
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SHOW, this.resetCrossTimeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SIXSECTION1_GETMAP), this.mapCallBack, this);

        App.LogUtil.log("section1 initView "+this.container.y);
        // this._crossTime = App.DateUtil.getWeeTs(GameData.serverTime);
        let buildContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(buildContainer);
        this._buildContainer = buildContainer;
        buildContainer.width = GameConfig.stageWidth;

        let infoBg = BaseBitmap.create("sixsectionmainui_topbg");
        infoBg.setPosition(GameConfig.stageWidth/2 - infoBg.width/2, -15);
        this.addChildToContainer(infoBg);

        //影响力值
        let powerData = Api.sixsection1VoApi.getInfluenceData();
        this._currPowerNum = Math.floor(powerData.num);
        let powerNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1Power", [""+Math.floor(powerData.num), ""+powerData.max]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        powerNum.setPosition(infoBg.x + 25, infoBg.y + 15);
        this.addChildToContainer(powerNum);
        this._powerNum = powerNum;

        //影响力
        let addBtn = ComponentManager.getButton("sixsectionmainui_addbtn", "", this.addBtnClick, this);
        addBtn.setScale(0.9);
        addBtn.setPosition(powerNum.x + powerNum.width + 5, powerNum.y + powerNum.height/2 - addBtn.height * addBtn.scaleY /2 - 2);
        this.addChildToContainer(addBtn);
        this._addPowerBtn = addBtn;
        //影响力速度
        let powerSpeed = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PowerSpeed", [""+powerData.speed]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        powerSpeed.setPosition(addBtn.x + addBtn.width * addBtn.scaleX, powerNum.y);
        this.addChildToContainer(powerSpeed);
        this._powerSpeed = powerSpeed;

        //称号
        // let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PtitleInfo1", [Api.sixsection1VoApi.getPlayerMaxTitleStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // titleTf.setPosition(powerNum.x, infoBg.y + infoBg.height/2 + 10);
        // this.addChildToContainer(titleTf);

        let infoBtn = ComponentManager.getButton("sixsectionmainui_detailbtn", "", this.infoBtnClick, this);
        infoBtn.setScale(0.9);
        // infoBtn.setPosition(titleTf.x + titleTf.width + 5, titleTf.y + titleTf.height/2 - infoBtn.height * infoBtn.scaleY /2 - 2);
        infoBtn.setPosition(infoBg.x + infoBg.width - infoBtn.width * infoBtn.scaleX - 10, infoBg.y + infoBg.height/2 + 21 - infoBtn.height * infoBtn.scaleY /2 - 2);
        this.addChildToContainer(infoBtn);

        //出战攻击力
        let addValues = Api.sixsection1VoApi.getBaseBuff();
        let addAtk = Math.floor(addValues[0]* 1000+0.5)/10;
        let battleAtk = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_itembuff1", [""+addAtk]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        battleAtk.setPosition(GameConfig.stageWidth - 33 - 15 - battleAtk.width, infoBg.y + infoBg.height/2 + 10);
        this.addChildToContainer(battleAtk);
        this._battleAtk = battleAtk;
        
        //兵部头衔
        let titleId = Api.sixsection1VoApi.getCurrTitleId();
        let sectionTitleStr = LanguageManager.getlocal("sixSection1PNoHoldTitle");
        App.LogUtil.log("titleid "+titleId);
        if (titleId){
            let titleCfg = Api.sixsection1VoApi.formatTitleCfg();
            let index = titleCfg[titleId-1].baseCfg.index;
            sectionTitleStr = LanguageManager.getlocal("sixSection1PHoldTitle", [LanguageManager.getlocal("sixSection1TitlePopupItemName"+(index+1))]);
        }
        let sectionTitle = ComponentManager.getTextField(sectionTitleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // sectionTitle.setPosition(infoBg.x + infoBg.width/2 + 35, infoBg.y + infoBg.height/2 + 10);
        sectionTitle.setPosition(powerNum.x, infoBg.y + infoBg.height/2 + 10);
        this.addChildToContainer(sectionTitle);
        this._titleInfo = sectionTitle;
        //红点
        let titleRed = BaseBitmap.create("public_dot2");
        titleRed.setPosition(sectionTitle.x - titleRed.width - 1, sectionTitle.y + sectionTitle.height/2 - titleRed.height/2 - 1);
        this.addChildToContainer(titleRed);
        this._titleRed = titleRed;
        if (titleId){
            titleRed.visible = false;
        }

        //头衔点击
        let sectionTitleAlpha = BaseBitmap.create("public_alphabg");
        // sectionTitleAlpha.width = infoBg.width - sectionTitle.x + 25;
        sectionTitleAlpha.width = GameConfig.stageWidth/2 - 25;
        sectionTitleAlpha.height = sectionTitle.height + 12;
        this.addChildToContainer(sectionTitleAlpha);
        sectionTitleAlpha.setPosition(sectionTitle.x - 25, sectionTitle.y - 7);
        sectionTitleAlpha.addTouchTap(this.sectionTitleBtnClick, this);

        //下拉选择
        this._dropDownBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[0]);
		this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 5;
		this._dropDownBtn.y = infoBg.y + infoBg.height - 3;
		this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this.addChildToContainer(this._dropDownBtn);
        this._dropDownBtn.setTextOffX(-15);
        this._dropDownBtn.setText("sixSection1BuildName1");
		this._dropBtnList.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("common_arrow_1");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2 -3;
		this.addChildToContainer(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer();
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        this.addChildToContainer(this._dropDownContainer);
		
		let dropCfg=[
			"sixSection1BuildName1","sixSection1BuildName2","sixSection1BuildName3","sixSection1BuildName4","sixSection1BuildName5","sixSection1BuildName6","sixSection1BuildName7"
		];
		for (let index = 1; index <=dropCfg.length; index++) {
			let tmpBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[index]);
			this._dropBtnList.push(tmpBtn);
			tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = tmpBtn.height*(index - 1) + 3;
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setTextOffX(-15);
            tmpBtn.setText(dropCfg[index-1]); 
        }

        //倒计时
        let timeBg = BaseBitmap.create("public_itemtipbg2");
        this.addChildToContainer(timeBg);
        this._timeBg = timeBg;
        let time = ComponentManager.getTextField(this.getTimeCountDown(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(time);
        this._time = time;
        // timeBg.width = time.width + 40;
        timeBg.height = time.height + 10;
        timeBg.setPosition(powerNum.x - 10, infoBg.y + infoBg.height + 3);
        time.setPosition(timeBg.x + 10, timeBg.y + timeBg.height/2 - time.height/2 + 1);

        let teamNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1UseServantTeam", [""+Api.sixsection1VoApi.getHoldTeamNum(), ""+Api.sixsection1VoApi.getHoldTeamMaxNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        teamNum.setPosition(time.x + time.width + 30, time.y);
        timeBg.width = time.width + teamNum.width + 70;
        this.addChildToContainer(teamNum);
        this._teamNum = teamNum;
        
        //bottom
        this.initBottom();
        //bottom btn
        //兵部头衔
        let sectionTitleBtn = ComponentManager.getButton("sixsection1_titlebtn", "", this.sectionTitleBtnClick, this);
        sectionTitleBtn.setPosition(40, GameConfig.stageHeigth - this.container.y - this._bottomBg.height - sectionTitleBtn.height);
        this.addChildToContainer(sectionTitleBtn);
        this._sectionTitleBtn = sectionTitleBtn;

        //席位信息
        let seatBtn = ComponentManager.getButton("sixsection1_seatinfobtn", "", this.holdBattleBtnClick, this);
        seatBtn.setPosition(sectionTitleBtn.x + sectionTitleBtn.width + 10, sectionTitleBtn.y);
        this.addChildToContainer(seatBtn);
        this._seatBtn = seatBtn;

        //物资供应
        let rechargeBtn = ComponentManager.getButton("sixsection1_rechargebtn", "", this.rechargeBtnClick, this);
        rechargeBtn.setPosition(seatBtn.x + seatBtn.width + 10, seatBtn.y);
        this.addChildToContainer(rechargeBtn);
        this._rechargeBtn = rechargeBtn;

        //缩放按钮
        let scaleBtn = ComponentManager.getButton("sixsectionmainui_bigbtn", "", this.scaleBtnClick, this);
        scaleBtn.setPosition(GameConfig.stageWidth - scaleBtn.width - 40, GameConfig.stageHeigth - this.container.y - this._bottomBg.height - scaleBtn.height - 10);
        this.addChildToContainer(scaleBtn);
        this._scaleBtn = scaleBtn;

        //建筑
        App.LogUtil.log("this.contane. y "+this.container.y);
        // buildContainer.height = GameConfig.stageHeigth - infoBg.height + 15 - this._bottomBg.height - this.container.y + 10 + 3;
        // buildContainer.setPosition(0, infoBg.y + infoBg.height - 3);
        buildContainer.height = GameConfig.stageHeigth - this._bottomBg.height + 10;
        buildContainer.setPosition(0, -this.container.y);

        this.initBuild();

        //结算弹窗
        let resultData = Api.sixsection1VoApi.getResultSeat();
        if (resultData.length > 0){
            ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1HOLDRESULTVIEW);
        }

        this.checkTitleRed();
        this.checkSeatInfoRed();
        this.checkRechargeRed();

        this._isFirst = false;
    }

    //建筑
    private initBuild():void{
        let dataList = Api.sixsection1VoApi.formatBuildCfg();
        this._dataList = dataList;
        console.log("intbuild ", dataList);
        this.freshBuildItemHeightArr();
        // let scrollList = ComponentManager.getScrollList(SixSection1BuildScrollItem, dataList, new egret.Rectangle(0, 0, this._buildContainer.width, this._buildContainer.height), {});
        let scrollList = ComponentManager.getScrollList(SixSection1BuildScrollItem, dataList, new egret.Rectangle(0, 0, this._buildContainer.width, this._buildContainer.height), {}, 20, false, false);
        scrollList.setPosition(0, 0);
        this._buildContainer.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.horizontalScrollPolicy = "off";
        scrollList.bounces = false;
        scrollList.setShowArrow(false);
        scrollList.bindMoveCompleteCallback(()=>{
            if (!this._isJump){
                this.getMoveMapData(this.getCurFloor());
            }
            else{
                this._isJump = false;
            }
        }, this);
        this._scrollListTop = scrollList.scrollTop;
       
        let lineScroll = ComponentManager.getScrollList(SixSection1BuildLineItem, dataList, new egret.Rectangle(0, 0, 40, this._buildContainer.height));
        this._buildContainer.addChild(lineScroll);
        lineScroll.horizontalScrollPolicy = "off";
        lineScroll.verticalScrollPolicy = "off";
        this._lineScroll = lineScroll;

        scrollList.bindChangeCallback(()=>{
            lineScroll.scrollTop = scrollList.scrollTop;
            // lineScroll.setScrollTop(scrollList.scrollTop);
        }, this);
        // console.log("this._builditem ",this._buildItemHeightArr);
        this.freshMapData(this.getCurFloor());

        if (this.param && this.param.data && this.param.data.lineNum){
            this.jumpToFloor(this.param.data.lineNum);
        }
    }

    private freshBuildItemHeightArr():void{
        this._buildItemHeightArr = {};
        this._buildItemHeightList = {};
        let list:any = {};
        let isFirst = false;
        for (let i=0; i < this._dataList.length; i++){
            if (this._dataList[i].isFirst){
                isFirst = true;
                let item = new SixSection1BuildScrollItem();
                item.initItem(i, this._dataList[i], {isBig: this._isBig});
                list[i] = item.height;
                this._buildItemHeightList[i] = {itemH: item.height, seatH: item.getSeatItemHeight()}
            }
            else if (this._dataList[i].isLast){
                let item = new SixSection1BuildScrollItem();
                item.initItem(i, this._dataList[i], {isBig: this._isBig});
                list[i] = item.height;
                this._buildItemHeightList[i] = {itemH: item.height, seatH: item.getSeatItemHeight()}
            }
            this._buildItemHeightArr = list;
        }
        // console.log("freshBuildItemHeightArr ", this._buildItemHeightArr);
    }

    private getCurFloor():number{
		let list = this._scrollList;
        let top = list.scrollTop;
        let offY = 0;
        let floor = 1;
        let itemH = 0;
        for (let i=0; i < this._dataList.length; i++){
            if (this._buildItemHeightArr[i]){
                itemH = this._buildItemHeightArr[i];
            }
            if (offY >= top){
                floor = i + 1;  
                break;
            }
            offY += itemH;
        }
        
        App.LogUtil.log("getCurFloor "+floor);
		return Math.max(floor, 1);
	}

    private getIndexs(num:number, isLast:boolean):number[]{
		let view = this;
        let arr = [];
        let totalFloor = this._dataList.length;
        let max = Math.ceil(totalFloor / 10);
        if (isLast){
            for(let i = 0; i < 3; ++ i){
                if(num + i < max){
                    arr.push(num + i);
                }
            }
        }
        else{
            for(let i = 0; i < 3; ++ i){
                if(num - i >= 0){
                    arr.push(num - i);
                }
            }
        }
        this._currIndexs = arr;
		return arr;
	}

    private getMoveMapData(currFloor:number):void
	{
        // let currFloor = this.getCurFloor();
        let isLast = true;
        let scrollOffY = this._scrollListTop - this._scrollList.scrollTop;
        this._scrollListTop = this._scrollList.scrollTop;
        if (scrollOffY > 0){
            isLast = false;
        }
        // let pageNum = Math.max(Math.floor(currFloor/10), 1);
        let pageNum = currFloor % 10 == 0 ? Math.floor(currFloor/10) - 1 : Math.floor(currFloor/10);
        let totalFloor = this._dataList.length;
        let maxPage = Math.ceil(totalFloor/10) - 1;
        let empty = false;
        let startIdx = currFloor;
        App.LogUtil.log("getMoveMapData "+isLast+" currFloor "+currFloor+" totalFloor "+totalFloor);
        if (isLast){
            let endIdx = currFloor + 10;
            if (endIdx > totalFloor){
                endIdx = totalFloor;
            }
            // for(let i = startIdx; i <= endIdx; i++){
            //     let data = Api.sixsection1VoApi.getMapInfoByFloor(i);
            //     if(!data){
            //         empty = true;
            //         break;
            //     }
            // }
            let nextPage = pageNum + 1 <= maxPage? pageNum + 1 : maxPage;
            if (!GameData.isInArray(nextPage, this._currIndexs)){
                empty = true;
            }
        }
        else{
            let endIdx = currFloor;
            startIdx = currFloor - 10;
            if (startIdx < 1){
                startIdx = 1;
            }
            // for(let i = startIdx; i <= endIdx; ++ i){
            //     let data = Api.sixsection1VoApi.getMapInfoByFloor(i);
            //     if(!data){
            //         empty = true;
            //         break;
            //     }
            // }
            let nextPage = pageNum - 1 >= 0 ? pageNum - 1 : 0;
            if (!GameData.isInArray(nextPage, this._currIndexs)){
                empty = true;
            }
        }
        App.LogUtil.log("empety "+empty);
        if(empty){
            let indexs = this.getIndexs(pageNum, isLast);
            // if(this._scrollList.checkIsAtButtom()){
            //     indexs = this.getIndexs(pageNum, true);
            // }
            // else if(this._scrollList.scrollTop <= 0){
            //     indexs = this.getIndexs(pageNum, false);
            // }
            //发请求
            NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETMAP, { indexs: indexs});		
        } 
        else{
            if (this._isJump){
                this.moveJump();
            }
        }
    }

    public jumpToFloor(floor:number, colNum?:number){
        this._isJump = true;
        // let num = floor -1;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor "+floor + "  colNum "+colNum);
        if (colNum){
            this._jumpData = {x: floor, y: colNum};
            if (this._isBig){
                this.scaleBtnClick();
                return ;
            }
            // else{
            //     this._isCanJump = true;
            //     if (this._jumpData.y <= 3){
            //         this._scrollList.scrollLeft = 0;
            //     }
            //     else{
            //         let item = this._scrollList.getItemByIndex(0);
            //         this._scrollList.scrollLeft = item.width - this._scrollList.width; 
            //     }
            // }
        }
        App.LogUtil.log("jumpto floor "+ floor);
        // this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 200, true);
        // this._lineScroll.setScrollTopByIndex(this._jumpFloor - 1, 200, true);
        // this.getMoveMapData(floor);

        let offIndex = 2;
        if (this._jumpFloor <= 3){
            offIndex = 1;
        }
        let showFloor = this._jumpFloor - offIndex >= 1 ? this._jumpFloor - offIndex : 1;
        this._jumpFloor = showFloor;
        if (floor <= 3 && floor != 1){
            this._scrollList.setScrollTop(200 + (floor - 2) * 100);
            this._lineScroll.setScrollTop(200 + (floor - 2) * 100);
        }
        else{
            this._scrollList.setScrollTopByIndex(showFloor-1, 100, true);
            this._lineScroll.setScrollTopByIndex(showFloor-1, 100, true);
        }
        this.getMoveMapData(showFloor);
    }

    private moveJump():void{
        App.LogUtil.log("movejump "+this._isJump);
        this.freshMapData(this._jumpFloor);
    }

    private mapCallBack(evt:egret.Event):void{
		let view = this;
		if(evt.data.ret ){		
            let data = evt.data.data.data;
            console.log("mapCallBack ", data);
            Api.sixsection1VoApi.setMapInfo(data.map);
            Api.sixsection1VoApi.setLogList(data.list);
            App.LogUtil.log("mapCallBack "+this._isJump);
            //刷新数据
            // if (this._isJump){
            //     this.moveJump();
            // }
            // else{
            //     view.freshMapData(view.getCurFloor());
            // }
            view.freshMapData(view.getCurFloor());
            this.refreshLogTxt();
		}
	}

    //默认刷新30层数据
	private freshMapData(floor : number, floorNum : number = 30):void{
        App.LogUtil.log("freshMapData floor "+floor);
		let view = this;
		let index = Math.max(Math.floor(floor / 10) * 10, 1);
		let startFloor = index;
		let endFloor = Math.min((index + floorNum), this._dataList.length);
		for(let i = startFloor; i <= endFloor; ++ i){
			let item:any = view._scrollList.getItemByIndex(i-1);
			if(item){
				item.freshData();
			}
        }
        
        if (this._jumpData && this._jumpData.x){
            let item = <SixSection1BuildScrollItem>view._scrollList.getItemByIndex(this._jumpData.x - 1);
            if(item){
                item.playAni(this._jumpData.y);
            }
            this._jumpData = null;
            // this._isCanJump = false;
        }
    }
    
    //底部
	private initBottom():void
	{	
        let bottomBg = BaseBitmap.create("sixsectionmainui_bottombg");
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildAt(bottomBg, this.getChildIndex(this._ruleBtn) + 1);
        this._bottomBg = bottomBg;
	
		let showMore:BaseButton = ComponentManager.getButton(`sixsectionmainui_moretxt`,"",this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-40, bottomBg.y + bottomBg.height/2 - showMore.height/2);
        this.addChild(showMore);
        this._showMore= showMore;

        this._moreArrow = BaseBitmap.create(`sixsectionmainui_downflag`);
        this._moreArrow.anchorOffsetY = this._moreArrow.height/2;
        this._moreArrow.scaleY = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width + 10,0]);
        this.addChild(this._moreArrow);

        //文本
        let tipContainer = new BaseDisplayObjectContainer();
        tipContainer.setPosition(0, bottomBg.y);
        this.addChild(tipContainer);
        let tipName = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipName.setPosition(25, 20);
        tipContainer.addChild(tipName);
        this._tipName = tipName;

        let tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.height = 20;
        tipTxt.setPosition(25, tipName.y + 30);
        tipContainer.addChild(tipTxt);
        this._bottomLogTxt = tipTxt;

        let tipPoint = ComponentManager.getTextField("...", 20, TextFieldConst.COLOR_WHITE);
        tipPoint.setPosition(tipName.x + 385, tipName.y + 30);
        tipContainer.addChild(tipPoint);
        this._tipPoint = tipPoint;
        tipPoint.visible = false;

        this.refreshLogTxt();
    }

    private refreshLogTxt():void{
        let list = Api.sixsection1VoApi.getLogList();
        if (list && list.length > 0){
            console.log("refreshlogtxt ",list);
            let atkInfo:any = null;
            let atkSv:string = null;
            // let defenInfo:any = null;
            // let buildName:string = null;
            let infoStr:string = null;
            if (list[0].type == "director"){
                atkInfo = list[0].uinfo;
                atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
                let defenInfo = list[0].fuinfo;
                let defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
                let titleCfg = Api.sixsection1VoApi.getTitleCfgByLine(list[0].x)
                let buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(titleCfg.baseCfg.index+1));
                infoStr = LanguageManager.getlocal("sixSection1HoldLogInfo2", [defenInfo.name, defenSv, buildName]);
            }
            else{
                // atkInfo = list[0].pklogs[0][3];
                atkInfo = list[0].minfo;
                atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
                //info
                // let defenInfo = list[0].pklogs[0][4];
                let defenInfo = list[0].finfo;
                let defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
                let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(list[0].x);
                let buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
                infoStr = LanguageManager.getlocal("sixSection1HoldLogInfo1", [defenInfo.name, defenSv, buildName]);
            }
            this._tipName.text = atkInfo.name + "(" + atkSv + ")";
            this._bottomLogTxt.text = infoStr;
            this._tipPoint.visible = true;
            if (this._bottomLogTxt.width >= 380){
                this._bottomLogTxt.width = 380;
            }
            else{
                this._tipPoint.visible = false;
            }
        }
    }

    private showMoreHandle():void
	{
        if(!this._isTouchMore)
		{
            this._isShowMore = !this._isShowMore;
			if (this._isShowMore == true) {
                NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETLIST, {});
			}
			else {
				this._moreArrow.scaleY = -1;
				this.closeList();
			}
		}
    }

    private getLogListCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        console.log(" getLogListCallback ", rData);
        this._holdLogList = rData.list;
        this._moreArrow.scaleY = 1;
        this.showList();
    }

    private showList():void
	{	
        let currMaskBmp = BaseBitmap.create("public_9_viewmask");
        currMaskBmp.width=GameConfig.stageWidth;
        currMaskBmp.height=GameConfig.stageHeigth;
        currMaskBmp.touchEnabled = true;
        this.addChild(currMaskBmp);
        this.setChildIndex(currMaskBmp, this.getChildIndex(this._bottomBg));
        this._currMaskBmp = currMaskBmp;

        this._showMoreContainer= new BaseDisplayObjectContainer();
        this.addChild(this._showMoreContainer);

        let moreBg = BaseBitmap.create("arena_bottom_bg");//arena_bottom_bg
        moreBg.width = 640;
        moreBg.height = GameConfig.stageHeigth - 89 - this._bottomBg.height - 160;
        moreBg.touchEnabled = true;
        this._showMoreContainer.addChild(moreBg);
        App.LogUtil.log("moreBg.h "+moreBg.height);
        this._showMoreContainer.height = moreBg.height;

        // 增加 点击区域
        let touchBg = BaseBitmap.create("public_9_bg25");  
        touchBg.width = 640;
        touchBg.height = GameConfig.stageHeigth - (this._bottomBg.height - 10 + moreBg.height) + 40;
        touchBg.x=0;
        touchBg.y= -touchBg.height + 30;
        touchBg.alpha =0;
        touchBg.addTouchTap(this.showMoreHandle,this);
        this._showMoreContainer.addChild(touchBg);

        if(this._holdLogList.length > 0)
        {
            let rect = egret.Rectangle.create();
            rect.setTo(0, 5, 620, moreBg.height - 20);

            let moreScrollList = ComponentManager.getScrollList(SixSection1HoldLogItem, this._holdLogList, rect);
            this._showMoreContainer.addChild(moreScrollList);
            moreScrollList.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, moreScrollList, moreBg, [0, 10]);

            Api.sixsection1VoApi.setLogList(this._holdLogList[0]);
            this.refreshLogTxt();
        }
        else
        {
            let noDataTip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1NoHoldLog"), 20);
            noDataTip.x = moreBg.x + moreBg.width/2 - noDataTip.width/2;
            noDataTip.y = moreBg.y + moreBg.height/2 - noDataTip.height/2;
            this._showMoreContainer.addChild(noDataTip);
        }	
        this._showMoreContainer.y = GameConfig.stageHeigth + 30;
        this._isTouchMore = true;
        let desY = GameConfig.stageHeigth -  (this._bottomBg.height - 10 + moreBg.height);
        egret.Tween.get(this._showMoreContainer).to({y: desY},500).call(function()
        {
            egret.Tween.removeTweens(this._showMoreContainer);
            this._isTouchMore = false;
        },this);
    }

    private closeList():void
	{
		if(this._showMoreContainer)
		{	
            this._isTouchMore = true;
			egret.Tween.get(this._showMoreContainer).to({y:GameConfig.stageHeigth + 30},500).call(function(){
			    this._isTouchMore = false;
                egret.Tween.removeTweens(this._showMoreContainer);
                this._showMoreContainer.dispose();
                this._showMoreContainer = null;
		    },this);
        }
        if (this._currMaskBmp){
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        // if(this._bottomLogTxt){
        //     this._bottomLogTxt.visible = true;
        // }
    }
    
    //下拉列表
    private dropDownBtnClickHandler(btnIdx:number):void{
        let tmpIndex = this._lastDropIdx;
		for (let index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
		}
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;
		}
		if (btnIdx > 0)
		{
            this._dropDownBtn.setText("sixSection1BuildName"+btnIdx);
            this._lastDropIdx = btnIdx;
        }
        App.LogUtil.log("tmpIndex "+tmpIndex + " this.last "+this._lastDropIdx);
        // if (tmpIndex == this._lastDropIdx){
        //     return ;
        // }
        App.LogUtil.log("btnindex "+btnIdx);
        //跳转
        if (btnIdx > 0){
            for (let i=0; i < this._dataList.length; i++){
                let baseCfg = this._dataList[i].baseCfg;
                if (baseCfg.index == btnIdx - 1 && this._dataList[i].isFirst){
                    this._isJump = true;
                    this._jumpFloor = i+1;
                    // this._scrollList.setScrollTopByIndex(i, 100, true);
                    // this._lineScroll.setScrollTopByIndex(i, 100, true);
                    if (!this._isBig){
                        let offIndex = 2;
                        if (i <= 2){
                            offIndex = 1;
                        }
                        let showFloor = i - offIndex >= 0 ? i - offIndex : 0;
                        this._jumpFloor = showFloor + 1;
                        if (i <=2 && i != 0){
                            this._scrollList.setScrollTop(200 + (i - 1) * 100);
                            this._lineScroll.setScrollTop(200 + (i - 1) * 100);
                        }
                        else{
                            this._scrollList.setScrollTopByIndex(showFloor, 100, true);
                            this._lineScroll.setScrollTopByIndex(showFloor, 100, true);
                        }
                        
                        App.LogUtil.log("dropdwon "+i);
                        this.getMoveMapData(showFloor+1);
                    }
                    else{
                        if (i <= 1){
                            this._scrollList.setScrollTop(i * 600);
                            this._lineScroll.setScrollTop(i * 600);
                        }
                        else{
                            this._jumpFloor = i;
                            this._scrollList.setScrollTopByIndex(i-1, 100, true);
                            this._lineScroll.setScrollTopByIndex(i-1, 100, true);
                            App.LogUtil.log("dropdwon "+i);
                            this.getMoveMapData(i);
                        }
                    }
                    
                    break;
                }
            }
        }
        
    } 
    
    //增加影响力
    private addBtnClick():void{
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, {stype: 13});
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return ;
        }
        let titleData = Api.sixsection1VoApi.getInfluenceData();   
        if (this._currPowerNum >= titleData.max || titleData.num >= titleData.max){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return ;
        }
        let itemId = Config.Sixsection1Cfg.item2;
        let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        let num = 0;
        if (itemInfoVo){
            num = itemInfoVo.num;
        }
        //     let message = LanguageManager.getlocal("sixSection1PowerUseItem",[""+itemCfg.name]);
        //     let mesObj = {
        //         confirmCallback: this.addBtnCallback, 
        //         handler: this, 
        //         icon:  itemCfg.icon,
        //         iconBg: itemCfg.iconBg, 
        //         num: num, 
        //         useNum:1,
        //         msg: message ,
        //         id : itemId,
        //    };
        //    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        if (num <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseItemTip"));
            return;
        }
        let useMaxNum = Math.ceil((titleData.max - this._currPowerNum)/this.cfg.infAdd);
        let canUseNum = num > useMaxNum ? useMaxNum : num;
        App.LogUtil.log("titleData.max "+ titleData.max + "  curr "+this._currPowerNum + "  canuseNum "+canUseNum);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemInfoVo.id, maxNum: canUseNum, effectNum:this.cfg.infAdd, useTipKey:"sixSection1PowerUseItem1", callback:this.addBtnCallback,handler:this});
    }

    //增加影响力回调
    private addBtnCallback(itemNum:number):void{
        let titleData = Api.sixsection1VoApi.getInfluenceData();   
        if (this._currPowerNum >= titleData.max){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return ;
        }
        
        let itemId = Config.Sixsection1Cfg.item2;
        let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        let num = 0;
        if (itemInfoVo){
            num = itemInfoVo.num;
        }
        if (num <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseItemTip"));
            return;
        }
        //增加影响力 调接口
        this._useInfluenceNum = itemNum;
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE, {num: itemNum});
    }

    private addPowerCallback(evt:egret.Event){
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if (rData.SS1stat == 6){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerAddTip"));
            return ;
        }
        let influence = Api.sixsection1VoApi.getInfluenceData();
        this._currPowerNum = Math.floor(influence.num);
        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1PowerUseSuccessTip", [""+(this._useInfluenceNum * this.cfg.infAdd)]));
        this.freshTopInfo();
    }

    //头衔详情
    private infoBtnClick():void{
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1BATTLEFORMATIONVIEW);
        // let container = new BaseDisplayObjectContainer();
        // container.width = GameConfig.stageWidth;
        // container.height = GameConfig.stageHeigth;
        // this.addChild(container);

        // let mask = BaseBitmap.create("public_9_viewmask");
        // mask.width=GameConfig.stageWidth;
        // mask.height=GameConfig.stageHeigth;
        // container.addChild(mask);
        // mask.addTouchTap(()=>{
        //     container.dispose();
        // }, this);

        // let bg = BaseBitmap.create("public_9_wordbg");
        // bg.touchEnabled = true;
        // bg.width = GameConfig.stageWidth;
        // bg.height = 300;
        // container.addChild(bg);
        // bg.y = container.height/2 - bg.height/2;

        // let title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitleRuleTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        // title.setPosition(bg.x + bg.width/2 - title.width/2, bg.y + 10);
        // container.addChild(title);

        // // let scrollCon = new BaseDisplayObjectContainer();
        // let info:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitleRuleInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // info.width = 620;
        // info.lineSpacing = 5;
        // info.setPosition(bg.x + bg.width/2 - info.width/2, title.y + title.height + 20);
        // container.addChild(info);

        // bg.height = info.height + info.y - bg.y + 40;
    }

    //兵部头衔
    private sectionTitleBtnClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1TITLEPOPUPVIEW, {});
    }

    //席位信息
    private holdBattleBtnClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1SEATINFOPOPUPVIEW, {});
    }

    //物资供应
    private rechargeBtnClick():void{
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1RECHARGEVIEW, {});
    }

    //缩放按钮
    private scaleBtnClick():void{
        this._isBig = !this._isBig;
        let dataList = Api.sixsection1VoApi.formatBuildCfg();
        this._currShowFloor = this.getCurFloor();
        this.freshBuildItemHeightArr();
        if (this._isBig){
            this._scaleBtn.setBtnBitMap("sixsectionmainui_smallbtn");
            this._scrollList.refreshData(dataList, {isBig: true});
            // this._scrollList.setContentScale(2, 2);
            // this._lineScroll.setContentScale(2, 2);
            this._lineScroll.refreshData(dataList, {isBig: true, itemArr: this._buildItemHeightList});
            this._scrollList.horizontalScrollPolicy = "on";
            let item = this._scrollList.getItemByIndex(0);
            App.LogUtil.log("item.with "+item.width);
            this._scrollList.scrollLeft = item.width - this._scrollList.width;
        }
        else{
            this._scaleBtn.setBtnBitMap("sixsectionmainui_bigbtn");
            this._scrollList.refreshData(dataList, {isBig: false});
            // this._scrollList.setContentScale(1, 1);
            // this._lineScroll.setContentScale(1, 1);
            this._lineScroll.refreshData(dataList, {isBig: false, itemArr: this._buildItemHeightList});
            this._scrollList.horizontalScrollPolicy = "off";
            this._scrollList.scrollLeft = 0;
        }
        this._isJump = true;
        this._jumpFloor = this._currShowFloor;
        let floor = this._currShowFloor;
        // console.log("scaleBtnClick jumpdata ", this._jumpData);
        if (this._jumpData){
            floor = this._jumpData.x;
        }
        App.LogUtil.log("scaleBtnClick "+floor);
        this.jumpToFloor(floor);
    }   
    
    public tick():void{
        //倒计时
        this._time.text = this.getTimeCountDown();
        // this._timeBg.width = this._time.width + 40;
        this._teamNum.x = this._time.x +  this._time.width + 30;
        this._timeBg.width =  this._time.width +  this._teamNum.width + 70;
        // this._timeBg.x = this._dropDownBtn.x - this._timeBg.width - 10;
        // this._time.x = this._timeBg.x + this._timeBg.width/2 - this._time.width/2;

        //不在进行时间内
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            if (!this._isNeedClose){
                this._isNeedClose = true;
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH);
                this.hide();
            }
            return ;
        }
        let svTime = GameData.serverTime;
        let titleData = Api.sixsection1VoApi.getInfluenceData();
        if (titleData && (svTime - titleData.st) % 60 == 0){
            let dt = Math.floor((svTime - titleData.st) / 60);
            let currNum = Math.floor(titleData.num + dt * titleData.speed / 60);
            if (titleData.max <= currNum){
                currNum = titleData.max;
                if (titleData.num > titleData.max){
                    currNum = titleData.num;
                }
            }
            this._currPowerNum = Math.floor(currNum);
            this._powerNum.text = LanguageManager.getlocal("sixSection1Power", [""+Math.floor(currNum), ""+titleData.max]); 
            this._addPowerBtn.x = this._powerNum.x + this._powerNum.width + 5;
            this._powerSpeed.x = this._addPowerBtn.x + this._addPowerBtn.width * this._addPowerBtn.scaleX;
        }
        this.checkSeatInfoRed();
        this.checkRechargeRed();
        this.resetCrossTime();
    }

    //功能倒计时
    private getTimeCountDown():string{
        let str = "";
        let et = Api.sixsection1VoApi.et - GameData.serverTime;
        if (et < 0){
            str = LanguageManager.getlocal("sixSection1EndTip");
        }
        else{
            str = App.DateUtil.getFormatBySecond(et, 17);
        }
        return LanguageManager.getlocal("sixSection1TimeDown", [str]);
    }

    //跨天处理
    private resetCrossTime():void{
        let time0 = App.DateUtil.getWeeTs(GameData.serverTime);
        let et = time0 + this.cfg.resetTime * 3600;
        if (GameData.serverTime >= et){
            if (Api.sixsection1VoApi.isInPeriousTime()){
                // NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, {show: 0});
                if (this._isCrossDay && time0 != this._crossTime){
                    App.LogUtil.log("resetCrossTime");
                    this._crossTime = App.DateUtil.getWeeTs(GameData.serverTime);
                    this._isCrossDay = false;
                    if (this._currIndexs.length > 0){
                        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETMAP, { indexs: this._currIndexs});
                    }
                    else{
                        this.getMoveMapData(this.getCurFloor());
                    }
                }
            }
        }
        else{
            this._isCrossDay = true;
        }
    }

    private resetCrossTimeCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        if (this._isCrossDay){
            this._isCrossDay = false;
            this._scrollList.refreshData(this._dataList);
        }
    }
    
    //刷新顶部数据
    private freshTopInfo():void{
        let influenceData = Api.sixsection1VoApi.getInfluenceData();
        if (influenceData){
            this._powerNum.text = LanguageManager.getlocal("sixSection1Power", [""+Math.floor(influenceData.num), ""+influenceData.max]);
            this._powerSpeed.text = LanguageManager.getlocal("sixSection1PowerSpeed", [""+influenceData.speed]);
            this._addPowerBtn.x = this._powerNum.x + this._powerNum.width + 5;
            this._powerSpeed.x = this._addPowerBtn.x + this._addPowerBtn.width * this._addPowerBtn.scaleX;
            // this._powerSpeed.x = this._powerNum.x + this._powerNum.width;
            this._currPowerNum = Math.floor(influenceData.num);
        }
        let titleId = Api.sixsection1VoApi.getCurrTitleId();
        let sectionTitleStr = LanguageManager.getlocal("sixSection1PNoHoldTitle");
        if (titleId){
            let titleCfg = Api.sixsection1VoApi.formatTitleCfg();
            let index = titleCfg[titleId-1].baseCfg.index;
            sectionTitleStr = LanguageManager.getlocal("sixSection1PHoldTitle", [LanguageManager.getlocal("sixSection1TitlePopupItemName"+(index+1))]);
            this._titleRed.visible = false;
        }
        else{
            this._titleRed.visible = true;
        }
        this._titleInfo.text = sectionTitleStr;

        this._teamNum.text = LanguageManager.getlocal("sixSection1UseServantTeam", [""+Api.sixsection1VoApi.getHoldTeamNum(), ""+Api.sixsection1VoApi.getHoldTeamMaxNum()]);
        this._teamNum.x = this._timeBg.x + this._timeBg.width + 10;

        this.checkTitleRed();
    }

    //占领席位 回调
    private holdSeatCallback(evt:egret.Event){
        if (evt.data.ret){
            let data = evt.data.data.data;
            Api.sixsection1VoApi.setMapInfo(data.map);
            this.freshMapData(this.getCurFloor());
        }
    }

    private refreshSeat(evt:egret.Event){
        let data = evt.data;
        // console.log("refreshSeat ",evt.data);
        // App.LogUtil.log("refreshSEAT "+data.)
        let item:any = this._scrollList.getItemByIndex(data.lineNum - 1);
        if (item){
            item.freshData();
        }
        this.refreshLogTxt();
        this.freshTopInfo();
    }

    private refreshTitle(evt:egret.Event):void{
        App.LogUtil.log("refreshTitle");
        this.refreshLogTxt();
        this.freshTopInfo();
    }

    //红点 席位信息
    private checkSeatInfoRed():void{
        if (Api.sixsection1VoApi.isInPeriousTime() && Api.sixsection1VoApi.checkSeatInfoRed() ){
            App.CommonUtil.addIconToBDOC(this._seatBtn);
            let reddot = this._seatBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._seatBtn);
        }
    }

    //无头衔红点
    public checkTitleRed():void{
        //兵部头衔红点
        if (Api.sixsection1VoApi.checkTitleRed() && Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.addIconToBDOC(this._sectionTitleBtn);
            let reddot = this._sectionTitleBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._sectionTitleBtn);
        }
    }

    //充值奖励
    public checkRechargeRed():void{
        if (Api.sixsection1VoApi.checkRechargeRed() && Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
            let reddot = this._rechargeBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 2;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
    }
}