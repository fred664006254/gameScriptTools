/**
 * 江湖声望
 * date 2020.7.8
 * author ycg
 * @class NewAtkraceCrossFamePopupView
 */
class NewAtkraceCrossFamePopupView extends PopupView{
    private _scrollList:ScrollList = null;
    private _dropBtnList:BaseButton[] = [];
    private _dropDownBtn:BaseButton = null;
    private _dropDownFlag:BaseBitmap = null;
    private _dropDownContainer:BaseDisplayObjectContainer = null;
    private _lastDropIdx:number = 0;
    private _titleItemHeightArr:any = {};
    private _dataList:any[] = [];
    private _scrollListTop:number = 0;
    private _dropDownBg:BaseBitmap = null;
    private _dropDownTxt:BaseTextField = null;
    private _dropDownBgList:BaseBitmap[] = [];

    private _isJump:boolean = false;
    private _jumpFloor:number = 0;
    private _currIndexs:number[] = [];
    private _jumpData:any = null;

    private _fightNumTxt:BaseTextField = null;
    private _titleInfo:BaseTextField = null;
    private _titleRed:BaseBitmap = null;
    private _addFightBtn:BaseButton = null;
    private _fameDetailBtn:BaseButton = null;

    public constructor(){
        super();
    }

    private get aid():string{
        return this.param ? this.param.data.aid : "";
    }

    private get code():string{
        return this.param ? this.param.data.code : "";
    }

    private get vo():AcNewCrossServerAtkRaceVo{
        return <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        this._currIndexs = [0,1,2];
		return {requestType:NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP,requestData:{
			indexs : [0,1,2], activeId: this.vo.aidAndCode
        }};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            console.log("receivedata ",data.data.data.map);
            Api.atkracecrossVoApi.setFameMapInfo(data.data.data.map);
        }
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, this.fameMapCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightCostCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, this.refreshSeat, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 630;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 80;
        this.addChildToContainer(bg);
        
        let data = this.vo.getFameSeatCfg();
        this._dataList = data;

        let scrollList = ComponentManager.getScrollList(NewAtkraceCrossFamePopupScrollItem, data, new egret.Rectangle(0, 0, bg.width - 8, bg.height- 10));
        scrollList.setPosition(bg.x + 4, bg.y + 4);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        scrollList.horizontalScrollPolicy = "off";
        this._scrollListTop = 0;
        scrollList.bindMoveCompleteCallback(()=>{
            if (!this._isJump){
                this.getMoveMapData(this.getCurFloor());
            }
            else{
                this._isJump = false;
            }
        }, this);

        //挑战次数
        let fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameChangeNum", [""+this.vo.getFameCanUseNum(), ""+this.vo.getFameMaxNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fightNumTxt.setPosition(bg.x + 8, 22);
        this.addChildToContainer(fightNumTxt);
        this._fightNumTxt = fightNumTxt;

        let addFightBtn = ComponentManager.getButton("newcrossatkrace_fameaddbtn", "", this.addFightBtnClick, this);
        addFightBtn.setScale(0.8);
        addFightBtn.setPosition(fightNumTxt.x + fightNumTxt.width + 3, fightNumTxt.y + fightNumTxt.height/2 - addFightBtn.height * addFightBtn.scaleY/2 - 3);
        this.addChildToContainer(addFightBtn);
        this._addFightBtn = addFightBtn;

        //当前名望称号
        let fameTitleData = this.vo.getCurrFameTitleInfo();
        let titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleNothing");
        if (fameTitleData){
            let titleCfg = this._dataList[fameTitleData.x-1];
            let titleName = LanguageManager.getlocal("newatkrackcross_fameTitleName"+(titleCfg.baseCfg.index + 1));
            let seatNum = fameTitleData.y + titleCfg.seatCount;
            titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [""+titleName, ""+seatNum]);
        }
        let titleInfo = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_famePtitle", [titleStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // titleInfo.setPosition(this.viewBg.x + this.viewBg.width/2 - titleInfo.width/2, 55);
        this.addChildToContainer(titleInfo);
        this._titleInfo = titleInfo;

        let fameDetailBtn = ComponentManager.getButton("newcrossatkrace_famedetailbtn", "", this.fameDetailBtnClick, this);
        fameDetailBtn.setScale(0.8);
        // fameDetailBtn.setPosition(titleInfo.x + titleInfo.width + 2, titleInfo.y + titleInfo.height/2 - fameDetailBtn.height * fameDetailBtn.scaleY/2 - 3);
        titleInfo.setPosition(this.viewBg.x + this.viewBg.width/2 - (titleInfo.width + fameDetailBtn.width * fameDetailBtn.scaleX + 2)/2, 60);
        fameDetailBtn.setPosition(this._titleInfo.x + this._titleInfo.width + 2, titleInfo.y + titleInfo.height/2 - fameDetailBtn.height * fameDetailBtn.scaleY/2 - 3);
        this.addChildToContainer(fameDetailBtn);
        this._fameDetailBtn = fameDetailBtn;

        //头衔红点
        let titleRed = BaseBitmap.create("public_dot2");
        this.addChildToContainer(titleRed);
        titleRed.setPosition(titleInfo.x - titleRed.width - 2, titleInfo.y + titleInfo.height/2 - titleRed.height/2 - 2);
        this._titleRed = titleRed;
        if (fameTitleData){
            titleRed.visible = false;
        }

        //下拉选择
        let dropDownBg = BaseBitmap.create("common_select_frame");
        // dropDownBg.width = 200 - 20;
        dropDownBg.setPosition(bg.x + bg.width - dropDownBg.width - 5, 10);
        this.addChildToContainer(dropDownBg);
        this._dropDownBg = dropDownBg;
        dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBgList.push(this._dropDownBg);

        let dropDownTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        dropDownTxt.setPosition(dropDownBg.x + (dropDownBg.width - 34)/2 - dropDownTxt.width/2, dropDownBg.y + dropDownBg.height/2 - dropDownTxt.height/2);
        this.addChildToContainer(dropDownTxt);
        this._dropDownTxt = dropDownTxt;
        
		this._dropDownFlag = BaseBitmap.create("common_arrow_1");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
        this._dropDownFlag.x = this._dropDownBg.x + this._dropDownBg.width - this._dropDownFlag.width - 2;
        this._dropDownFlag.y = this._dropDownBg.y + this._dropDownBg.height/2;
        this.addChildToContainer(this._dropDownFlag);
        
		this._dropDownContainer = new BaseDisplayObjectContainer();
		this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBg.x;
        this._dropDownContainer.y = this._dropDownBg.y + this._dropDownBg.height;
        this.addChildToContainer(this._dropDownContainer);

        let fameBaseCfg = this.vo.cfg.getFameSeatList();
		for (let index = 1; index <= fameBaseCfg.length; index++) {
            let dropDownBg = BaseBitmap.create("common_select_frame");
            // dropDownBg.width = dropDownBg.width + 40;
            dropDownBg.y = (index -1)*dropDownBg.height + 3;
            this._dropDownContainer.addChild(dropDownBg);
            this._dropDownBgList.push(dropDownBg);
            dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [index]);
            let downTxt = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName"+index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            downTxt.setPosition(dropDownBg.x + (dropDownBg.width - 34)/2 - downTxt.width/2, dropDownBg.y + dropDownBg.height/2 - downTxt.height/2);
            this._dropDownContainer.addChild(downTxt);
        }
        this.freshTitleItemHeightArr();

        // if (this.param && this.param.data && this.param.data.lineNum){
        //     let lineNum = this.param.data.lineNum;
        //     let colNum = this.param.data.colNum;
        //     App.LogUtil.log("lineNum "+lineNum + " coco "+colNum);
        //     this._jumpData = {x: lineNum, y: colNum};
        //     this.jumpToFloor(lineNum);
        // }
    }

    private refreshView():void{
        this._fightNumTxt.text = LanguageManager.getlocal("newatkrackcross_fameChangeNum", [""+this.vo.getFameCanUseNum(), ""+this.vo.getFameMaxNum()]);
        this._addFightBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 3;

        let fameTitleData = this.vo.getCurrFameTitleInfo();
        let titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleNothing");
        if (fameTitleData){
            let titleCfg = this._dataList[fameTitleData.x-1];
            let titleName = LanguageManager.getlocal("newatkrackcross_fameTitleName"+(titleCfg.baseCfg.index + 1));
            let seatNum = fameTitleData.y + titleCfg.seatCount;
            titleStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [""+titleName, ""+seatNum]);
            this._titleRed.visible = false;
        }
        else{
            this._titleRed.visible = true;
        }
        this._titleInfo.text = LanguageManager.getlocal("newatkrackcross_famePtitle", [titleStr]);
        this._titleInfo.x = this.viewBg.x + this.viewBg.width/2 - (this._titleInfo.width + this._fameDetailBtn.width * this._fameDetailBtn.scaleX + 2)/2;
        this._fameDetailBtn.x = this._titleInfo.x + this._titleInfo.width + 2;
    }

    //下拉列表
    private dropDownBtnClickHandler(evt:any, btnIdx:number):void{
        let tmpIndex = this._lastDropIdx;
		for (let index = 1; index < this._dropBtnList.length; index++) {
            this._dropDownBgList[index].setRes("common_select_frame");
        }
        this._dropDownBgList[this._lastDropIdx].setRes("common_select_frame_down");
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
            this._dropDownTxt.text = LanguageManager.getlocal("newatkrackcross_fameTitleName"+btnIdx);
            this._dropDownTxt.x = this._dropDownBg.x + (this._dropDownBg.width - 34)/2 - this._dropDownTxt.width/2;
            this._lastDropIdx = btnIdx;
        }
        //跳转
        if (btnIdx > 0){
            for (let i=0; i < this._dataList.length; i++){
                let baseCfg = this._dataList[i].baseCfg;
                if (baseCfg.index == btnIdx - 1 && this._dataList[i].isFirst){
                    this._isJump = true;
                    this._jumpFloor = i+1;
                    this._scrollList.setScrollTopByIndex(i, 0, true);
                    this.getMoveMapData(i+1);
                    break;
                }
            }
        } 
    } 

    private freshTitleItemHeightArr():void{
        this._titleItemHeightArr = {};
        let list:any = {};
        let isFirst = false;
        for (let i=0; i < this._dataList.length; i++){
            if (this._dataList[i].isFirst){
                isFirst = true;
                let item = new NewAtkraceCrossFamePopupScrollItem();
                item.initItem(i, this._dataList[i], null);
                list[i] = item.height;
            }
            else {
                if (isFirst){
                    isFirst = false;
                    let item = new NewAtkraceCrossFamePopupScrollItem();
                    item.initItem(i, this._dataList[i], null);
                    list[i] = item.height;
                }
            }

        }
        this._titleItemHeightArr = list;
        console.log("freshTitleItemHeightArr ", list);
    }

    private getCurFloor():number{
		let list = this._scrollList;
        let top = list.scrollTop;
        App.LogUtil.log("getCurFloor top "+top);
        let offY = 0;
        let floor = 1;
        let itemH = 0;
        for (let i=0; i < this._dataList.length; i++){
            if (this._titleItemHeightArr[i]){
                itemH = this._titleItemHeightArr[i];
            }
            if (offY >= top){
                floor = i + 1;  
                break;
            }
            else{
                offY += itemH;
            }
        }
        App.LogUtil.log("getCurFloor aa ", floor);
		return Math.max(floor, 1);
	}

    private getIndexs(num:number, isLast:boolean):number[]{
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
        if (isLast){//向下
            let endIdx = currFloor + 10;
            if (endIdx > totalFloor){
                endIdx = totalFloor;
            }
            let nextPage = pageNum + 1 <= maxPage? pageNum + 1 : maxPage;
            if (!GameData.isInArray(nextPage, this._currIndexs)){
                empty = true;
            }
        }
        else{//向上
            let endIdx = currFloor;
            startIdx = currFloor - 10;
            if (startIdx < 1){
                startIdx = 1;
            }
           
            let nextPage = pageNum - 1 >= 0 ? pageNum - 1 : 0;
            if (!GameData.isInArray(nextPage, this._currIndexs)){
                empty = true;
            }
        }
        App.LogUtil.log("empety "+empty);
        if(empty){
            let indexs = this.getIndexs(pageNum, isLast);
            //发请求
            NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, {activeId: this.vo.aidAndCode, indexs: indexs});		
        } 
        else{
            this.freshMapData(currFloor);
        }
    }

    private fameMapCallback(evt:egret.Event):void{
		let view = this;
		if(evt.data.ret ){		
            let data = evt.data.data.data;
            console.log("fameMapCallback ", data);
            Api.atkracecrossVoApi.setFameMapInfo(data.map);
            //刷新数据
            App.LogUtil.log("fameMapCallback view.getCurFloor() "+view.getCurFloor());
            view.freshMapData(view.getCurFloor());
		}
	}

    public jumpToFloor(floor:number){
        this._isJump = true;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor "+floor);
        this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 0, true);
        this.getMoveMapData(floor);
    }

    //默认刷新30层数据
	public freshMapData(floor : number, floorNum : number = 30):void{
        App.LogUtil.log("freshMapData "+floor);
		let view = this;
		let index = Math.max(Math.floor(floor / 10) * 10, 1);
		let startFloor = index + 1;
		let endFloor = Math.min((index + floorNum), view._dataList.length);
		for(let i = startFloor; i <= endFloor; ++ i){
			let item:any = view._scrollList.getItemByIndex(i-1);
			if(item){
				item.freshData();
			}
        }
        
        if (view._jumpData && view._jumpData.x){
            let item = <NewAtkraceCrossFamePopupScrollItem>view._scrollList.getItemByIndex(view._jumpData.x-1);
			if(item){
				item.playAni(view._jumpData.y);
            }
            view._jumpData = null;
        }
    }

    //增加挑战次数
    private addFightBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return ;
        }
        //判断抢夺次数
        let fightNum = this.vo.getFameCanUseNum();
        if (fightNum < this.vo.getFameMaxNum()){
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : LanguageManager.getlocal("newatkrackcross_fameBuyHoldNumTip", [""+this.vo.getFameFightCost()]),
                touchMaskClose : true,
                title : `itemUseConstPopupViewTitle`,
                callback : ()=>{
                    this.addFightCost();
                },
                handle : this,
                needClose : 1,
                needCancel : true,
                confirmTxt : `sysConfirm`,
                // recommand : false
            });
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkrackcross_fameBuyTip2"));
        }
    }

    private addFightCost():void{
        let cost = this.vo.getFameFightCost();
        if (cost > Api.playerVoApi.getPlayerGem()){
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkrackcross_fameBuyTip1"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, {activeId: this.vo.aidAndCode});
    }

    private addFightCostCallback(evt: egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("newatkrackcross_fameChangeNum", [""+this.vo.getFameCanUseNum(), ""+this.vo.getFameMaxNum()]);
        this._addFightBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 3;
    }

    private refreshSeat(evt:egret.Event):void{
        if (evt && evt.data && evt.data.isNum){
        }
        else{
            this._scrollList.refreshData(this._dataList);
        }
        this.refreshView();
    }

    private fameDetailBtnClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSFAMEDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
    }

    protected getShowHeight():number{
        return 800;
    }

    public getTitleStr():string{
        return "newatkracecross_famePopupTitle";
    }

    public getResourceList():string[]{

        return super.getResourceList().concat([
            "common_arrow_1", "common_select_frame", "common_select_frame_down", "head_circle_bg", "user_head999",
            "newcrossatkrace_fame_titlename1","newcrossatkrace_fame_titlename2","newcrossatkrace_fame_titlename3","newcrossatkrace_fame_titlename4","newcrossatkrace_fame_titlename5","newcrossatkrace_fame_titlename6","newcrossatkrace_fame_titlename7","newcrossatkrace_fame_titlename8","newcrossatkrace_fame_titlename9","newcrossatkrace_fame_titlename10","newcrossatkrace_fame_titlename11","newcrossatkrace_fame_titlename12","newcrossatkrace_fame_titlename13","newcrossatkrace_fametitlenamebg1","newcrossatkrace_fametitlenamebg2","newcrossatkrace_fametitlenamebg3","newcrossatkrace_fametitlenamebg4", "newcrossatkrace_fameaddbtn", "newcrossatkrace_famedetailbtn","newcrossatkrace_titlenamebg"
        ]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP, this.fameMapCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightCostCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, this.refreshSeat, this);
        Api.atkracecrossVoApi.clearFameMapInfo();
        this._scrollList = null;
        this._dropBtnList = [];
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropDownContainer = null;
        this._lastDropIdx = 0;
        this._titleItemHeightArr = {};
        this._dataList = [];
        this._scrollListTop = 0;
        this._dropDownBg = null;
        this._dropDownTxt = null;
        this._dropDownBgList = [];
        this._isJump = false;
        this._jumpFloor = 0;
        this._currIndexs = [];
        this._jumpData = null;

        this._fightNumTxt = null;
        this._titleInfo = null;
        this._titleRed = null;
        this._addFightBtn = null;
        this._fameDetailBtn = null;

        super.dispose();
    }
}