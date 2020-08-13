/**
* 编号查询
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab4
*/
class SixSection1SeatInfoPopupViewTab4 extends CommonViewTab{
    private _inputTextField:BaseTextField = null;
    private _scrollList:ScrollList = null;
    private _playerInfo:BaseTextField = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, this.searchRequestCallback, this);
        this.width = 530;
        this.height = 675;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);

        let searchTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoSearchTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        searchTitle.setPosition(bg.x + 20, bg.y + 20);
        this.addChild(searchTitle);

        let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 330, 44,"public_9_bg5",LanguageManager.getlocal("sixSection1SeatInfoSearchNumber"),0xb1b1b1);
        inputTF.setPosition(searchTitle.x, searchTitle.y + searchTitle.height + 10);
        this.addChild(inputTF);

        this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict = "0-9";
        this._inputTextField.maxChars = 40;
        
        let searchBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW , "sixSection1SeatInfoSearchBtnName", this.searchBtnClick, this);
        searchBtn.setPosition(inputTF.x + inputTF.width + 10, inputTF.y + inputTF.height/2 - searchBtn.height/2);
        this.addChild(searchBtn);

        let playerInfo = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        playerInfo.setPosition(bg.x + 20, inputTF.y + inputTF.height + 15);
        this.addChild(playerInfo);
        this._playerInfo = playerInfo;

        let line = BaseBitmap.create("settingview_line");
		line.setPosition(bg.x + bg.width/2 - line.width/2, playerInfo.y + 25);
		this.addChild(line);

        let data = [];
        let scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem4, data, new egret.Rectangle(0, 0, bg.width, bg.height - (line.y - bg.y) -10 - line.height));
        scrollList.setPosition(bg.x, line.y + line.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width/2 - tipBg.width/2, bg.y + bg.height - 105);
        this.addChild(tipBg);

        let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoSearchBottomTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 38);
        this.addChild(tip);

        let searchInfo = Api.sixsection1VoApi.getSearchInfo();
        if (searchInfo && searchInfo.uid){
            if (searchInfo.st + 3 * 86400 > GameData.serverTime){
                let dataList = this.refreshDataList(searchInfo);
                let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(searchInfo.uid);
                this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", [""+searchInfo.name, ""+svNameStr]);
                if (dataList.length > 0){
                    this._scrollList.refreshData(dataList);
                }
                else{
                    this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
                }
            }
        }
    }

    private searchBtnClick():void{
        if (!this._inputTextField.text){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchEmpty"));
            return;
        }
        let playerId = Api.playerVoApi.getPlayerID();
        if (this._inputTextField.text == String(playerId)){
            // this._inputTextField.text = "";
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchPlayerTip"));
            return ;
        }
        let itemId = Config.Sixsection1Cfg.item3;
        let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        let itemVo = Api.itemVoApi.getItemInfoVoById(itemId);
        let num = 0;
        if (itemVo){
            num = itemVo.num;
        }
        let message = LanguageManager.getlocal("sixSection1SeatInfoSearchTip",[itemCfg.name, String(1)]);
        let mesObj = {
            confirmCallback: this.searchEnterCallback, 
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

    private searchEnterCallback():void{
        App.LogUtil.log("text "+this._inputTextField.text);
        let itemId = Config.Sixsection1Cfg.item3;
        let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        let itemVo = Api.itemVoApi.getItemInfoVoById(itemId);
        let num = 0;
        if (itemVo){
            num = itemVo.num;
        }
        if (num < 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldTitleToolNotFull", [itemCfg.name]));
            return ;
        }
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, {fuid: this._inputTextField.text});
    }

    private searchRequestCallback(evt:egret.Event){
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if (rData.SS1stat && rData.SS1stat == 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchNotExist"));
            return ;
        }
        // console.log("searchRequestCallback ",rData);
        // let dataList = this.refreshDataList(rData);
        // if (dataList.length > 0){
        //     let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(dataList[0].data.uid);
        //     this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", [""+dataList[0].data.name, ""+svNameStr]);
        // }
        // else{
        //     this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // }
        // this._scrollList.refreshData(dataList);
        let searchInfo = Api.sixsection1VoApi.getSearchInfo();
        if (searchInfo && searchInfo.uid){
            let dataList = this.refreshDataList(searchInfo);
            let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(searchInfo.uid);
            this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", [""+searchInfo.name, ""+svNameStr]);
            if (dataList.length <= 0){
                this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
            }
            else{
                this._scrollList.refreshData(dataList);
            }
        }
    }

    private refreshDataList(data:any):any[]{
        let dataList:any[] = [];
        let buildData = data.build;
        if (buildData && buildData.length > 0){
            for (let i=0; i < buildData.length; i++){
                let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(buildData[i].x);
                let et = buildData[i].st + Math.ceil(buildData[i].remain * 3600 / buildCfg.baseCfg.shujijingyanSpeed);
                dataList.push({data: buildData[i], et: et, buildCfg: buildCfg, type: "build", index: buildCfg.baseCfg.index, st: data.st});
            }
        }
        if (dataList.length > 1){
            dataList.sort((a, b)=>{
                if (a.index == b.index){
                    return b.et - a.et;
                }
                return a.index - b.index;
            })
        }
        let dirData:any[] = [];
        if (data.director && Object.keys(data.director).length > 0){
            let buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.director.x);
            dirData.push({data: data.director, buildCfg: buildCfg, type: "director", st: data.st});
        }
        if (dirData.length > 0){
            let list = dirData.concat(dataList);
            console.log("list ",list);
            return list;
        }
        console.log("datalist ",dataList);
        return dataList;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, this.searchRequestCallback, this);
        this._inputTextField = null;
        this._scrollList = null;
        this._playerInfo = null;

        super.dispose();
    }
}