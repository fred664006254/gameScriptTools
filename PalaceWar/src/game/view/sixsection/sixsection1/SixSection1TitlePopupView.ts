/**
* 兵部头衔
* date 2020.5.11
* author ycg
* @name SixSection1TitlePopupView
*/
class SixSection1TitlePopupView extends PopupView{
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
    private _infoBtn:BaseButton = null;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return "sixSection1TitlePopupViewTitle";
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "common_arrow_1", "common_select_frame", "common_select_frame_down", "head_circle_bg", "user_head999",
        ).concat(list);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
        this._currIndexs = [0,1,2];
		return {requestType:NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP,requestData:{
			indexs : [0,1,2]
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            console.log("receivedata ",data.data.data.map);
            Api.sixsection1VoApi.setTitleInfo(data.data.data.map);
        }
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, this.titleMapCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, this.addFightNumCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, {stype: 3});
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 635;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 55;
        this.addChildToContainer(bg);

        let data = Api.sixsection1VoApi.formatTitleCfg();
        this._dataList = data;
        // this.freshTitleItemHeightArr();
        let scrollList = ComponentManager.getScrollList(SixSection1TitlePopupScrollItem, data, new egret.Rectangle(0, 0, bg.width - 8, bg.height- 8), {});
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

        //下拉选择
        let dropDownBg = BaseBitmap.create("common_select_frame");
        dropDownBg.width = 200;
        dropDownBg.setPosition(bg.x + bg.width - dropDownBg.width - 5, 10);
        this.addChildToContainer(dropDownBg);
        this._dropDownBg = dropDownBg;
        dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBgList.push(this._dropDownBg);

        let dropDownTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupItemName1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
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

        //称号
        // let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1PtitleInfo1", [Api.sixsection1VoApi.getPlayerMaxTitleStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // titleTf.setPosition(bg.x + 5, bg.y - titleTf.height - 11);
        // this.addChildToContainer(titleTf);
        let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        let fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleFightNum", [""+freeNum, ""+Config.Sixsection1Cfg.freeTime]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fightNumTxt.setPosition(bg.x + 5, bg.y - fightNumTxt.height - 11);
        this.addChildToContainer(fightNumTxt);
        this._fightNumTxt = fightNumTxt;

        let infoBtn = ComponentManager.getButton("sixsectionmainui_addbtn", "", this.infoBtnClick, this);
        infoBtn.setScale(0.9);
        infoBtn.setPosition(fightNumTxt.x + fightNumTxt.width + 5, fightNumTxt.y + fightNumTxt.height/2 - infoBtn.height * infoBtn.scaleY /2 - 2);
        this.addChildToContainer(infoBtn);
        this._infoBtn = infoBtn;
        if (freeNum > 0){
            infoBtn.visible = false;
        }

        let topTip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupTopTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        // topTip.setPosition(bg.x, bg.y - topTip.height - 13);
        topTip.setPosition(bg.x + bg.width/2 - topTip.width/2, bg.y + bg.height + 5);
        this.addChildToContainer(topTip);
		
		let dropCfg=[
			"sixSection1TitlePopupItemName1","sixSection1TitlePopupItemName2","sixSection1TitlePopupItemName3","sixSection1TitlePopupItemName4","sixSection1TitlePopupItemName5","sixSection1TitlePopupItemName6","sixSection1TitlePopupItemName7"
		];
		for (let index = 1; index <=dropCfg.length; index++) {
            let dropDownBg = BaseBitmap.create("common_select_frame");
            dropDownBg.width = dropDownBg.width + 40;
            dropDownBg.y = (index -1)*dropDownBg.height + 3;
            this._dropDownContainer.addChild(dropDownBg);
            this._dropDownBgList.push(dropDownBg);
            dropDownBg.addTouchTap(this.dropDownBtnClickHandler, this, [index]);
            let downTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupItemName"+index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            downTxt.setPosition(dropDownBg.x + dropDownBg.width/2 - downTxt.width/2, dropDownBg.y + dropDownBg.height/2 - downTxt.height/2);
            this._dropDownContainer.addChild(downTxt);
        }
        this.freshTitleItemHeightArr();

        if (this.param && this.param.data && this.param.data.lineNum){
            let lineNum = this.param.data.lineNum;
            let colNum = this.param.data.colNum;
            App.LogUtil.log("lineNum "+lineNum + " coco "+colNum);
            this._jumpData = {x: lineNum, y: colNum};
            this.jumpToFloor(lineNum);
        }
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
            this._dropDownTxt.text = LanguageManager.getlocal("sixSection1TitlePopupItemName"+btnIdx);
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
                    // let scrollY = this.getDropDownFloorScrollTop(i);
                    // App.LogUtil.log("scrollY "+scrollY);
                    // this._scrollList.setScrollTop(scrollY, 300);
                    break;
                }
            }
        } 
    } 
    
    private getDropDownFloorScrollTop(index:number):number{
        let offY = 0;
        let totalH = 0;
        for (let i=0; i < this._titleItemHeightArr.length; i++){
            if (i < index){
                offY += this._titleItemHeightArr[i];
            }
            else{
                totalH += this._titleItemHeightArr[i];
            }
        }
        if (totalH - this._scrollList.height < offY){
            offY = totalH - this._scrollList.height;
        }
        return offY;
    }

    private freshTitleItemHeightArr():void{
        this._titleItemHeightArr = {};
        let list:any = {};
        let isFirst = false;
        for (let i=0; i < this._dataList.length; i++){
            // let item = new SixSection1TitlePopupScrollItem();
            // item.initItem(i, this._dataList[i], null);
            // this._titleItemHeightArr[i] = item.height;
            if (this._dataList[i].isFirst){
                isFirst = true;
                let item = new SixSection1TitlePopupScrollItem();
                item.initItem(i, this._dataList[i], null);
                list[i] = item.height;
            }
            else {
                if (isFirst){
                    isFirst = false;
                    let item = new SixSection1TitlePopupScrollItem();
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
        let offY = 0;
        let floor = 1;
		// for (let i=0; i < this._titleItemHeightArr.length; i++){
        //     if (offY >= top){
        //         floor = i + 1;  ∂
        //         break;
        //     }
        //     offY += this._titleItemHeightArr[i];
        // }
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
            // for(let i = startIdx; i <= endIdx; i++){
            //     let data = Api.sixsection1VoApi.getTitleInfoByFloor(i);
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
        else{//向上
            let endIdx = currFloor;
            startIdx = currFloor - 10;
            if (startIdx < 1){
                startIdx = 1;
            }
            // for(let i = startIdx; i <= endIdx; ++ i){
            //     let data = Api.sixsection1VoApi.getTitleInfoByFloor(i);
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
            //发请求
            NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, { indexs: indexs});		
        } 
        else{
            this.freshMapData(currFloor);
        }
    }

    public jumpToFloor(floor:number){
        this._isJump = true;
        this._jumpFloor = floor;
        App.LogUtil.log("jumpToFloor "+floor);
        this._scrollList.setScrollTopByIndex(this._jumpFloor - 1, 0, true);
        this.getMoveMapData(floor);
    }

    private titleMapCallback(evt:egret.Event):void{
		let view = this;
		if(evt.data.ret ){		
            let data = evt.data.data.data;
            console.log("titleMapCallback ", data);
            Api.sixsection1VoApi.setTitleInfo(data.map);
			//刷新数据
			view.freshMapData(view.getCurFloor());
		}
	}

    //默认刷新30层数据
	public freshMapData(floor : number, floorNum : number = 30):void{
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
            let item = <SixSection1TitlePopupScrollItem>view._scrollList.getItemByIndex(view._jumpData.x-1);
			if(item){
				item.playAni(view._jumpData.y);
            }
            view._jumpData = null;
        }
    }
    
    private refreshTitle(evt:egret.Event):void{
        let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum > 0){
            this._infoBtn.visible = false;
        }
        else{
            this._infoBtn.visible = true;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("sixSection1HoldTitleFightNum", [""+freeNum, ""+Config.Sixsection1Cfg.freeTime]);
        this._infoBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 5;
        if (evt && evt.data && evt.data.isNum){
        }
        else{
            this._scrollList.refreshData(this._dataList); 
        }
    }

    //头衔详情
    private infoBtnClick():void{
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
                confirmCallback: this.addFightNum, 
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
    }

    private addFightNum():void{
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, {});
    }

    private addFightNumCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        let freeNum = Api.sixsection1VoApi.getHoldTitleFreeNum();
        if (freeNum > 0){
            this._infoBtn.visible = false;
        }
        else{
            this._infoBtn.visible = true;
        }
        this._fightNumTxt.text = LanguageManager.getlocal("sixSection1HoldTitleFightNum", [""+freeNum, ""+Config.Sixsection1Cfg.freeTime]);
        this._infoBtn.x = this._fightNumTxt.x + this._fightNumTxt.width + 5;
    }

    protected getShowHeight():number{
        return 800;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP, this.titleMapCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH, this.refreshTitle, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME, this.addFightNumCallback, this);

        Api.sixsection1VoApi.clearTitleMapInfo();
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
        this._infoBtn = null;

        super.dispose();
    }
}