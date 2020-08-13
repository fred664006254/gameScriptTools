/**
 * 情缘新view
 * author ycg
 * date 2020.4.7
 * @class QingyuanNewView
 */
class QingyuanView extends CommonView{
    private _scrollList:ScrollList = null;
    private _btnList:BaseDisplayObjectContainer[] = [];
    private _showTypeList:number[] = [3, 4, 1, 2];
    private _showData:any[] = [];
    private _selectIndex:number = 0;
    private _showList:number [] = [];
    public constructor(){
        super();
    }
    /**
     * --1门客组
         --2红颜组
         --3门客皮肤组
         --4红颜皮肤组
     */

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);

        let bottomBg = BaseBitmap.create("qingyuannew_bottombg");
        bottomBg.setPosition(this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2, GameConfig.stageHeigth - this.titleBg.height - bottomBg.height);
        this.addChildToContainer(bottomBg);

        this.setBigFameY(-10);
        //bottom btn
        let list = Api.encounterVoApi.getShowKindList();
        this._showList = list;
        for (let i=0; i < list.length; i++){
            let btnContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(btnContainer);

            let index = list[i];
            let btn = BaseBitmap.create("qingyuannew_btn"+index);
            btnContainer.addChild(btn);
            btn.name = "qingyuanbtn";
        
            let btnDown = BaseBitmap.create("qingyuannew_btn"+index+"_down");
            btnContainer.addChild(btnDown);
            btnDown.name = "qingyuanbtndown";
            btnDown.visible = false;

            btnContainer.width = btn.width;
            btnContainer.height = btn.height;
            btnContainer.setPosition(60 + (i)*(btn.width - 25), bottomBg.y - 15);
            btnContainer.addTouchTap(this.typeBtnClick, this, [i]);
            let redDot = BaseBitmap.create("public_dot2");
            redDot.setPosition(btnContainer.width - 40, 20);
            btnContainer.addChild(redDot);
            redDot.name = "redDot";
            this._btnList.push(btnContainer);
        }
        this.changeBtnStatus(0);
        this._selectIndex = 0;
        this._showData = Api.encounterVoApi.getEncountCfgByKind(this._showList[0]);
        this.freshShowData();
        let data = this._showData;
        let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth,  GameConfig.stageHeigth - this.titleBg.height - bottomBg.height - 10);
        let scrollList = ComponentManager.getScrollList(QingyuanNewScrollItem, data, rect, {kind: this._showList[0]});
        scrollList.setPosition(0, 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        this.refreshView();
    }

    private typeBtnClick(target:any, index:number):void{
        App.LogUtil.log("typeBtnClick "+index);
        if (index == this._selectIndex){
            return;
        }
        this._selectIndex = index;
        this.changeBtnStatus(index);
        let showType = this._showList[index];
        App.LogUtil.log("typeBtnClicktype "+showType);
        this._showData = Api.encounterVoApi.getEncountCfgByKind(showType);
        this.freshShowData();
        console.log(this._showData);
        this._scrollList.refreshData(this._showData, {kind: showType});
    }

    public refreshUI(param?:any){
        if (param && param.data){
            let type = param.data.type;
            let tabType = param.data.tabType;
            let index = param.data.tabIndex;
            if (param.data.isFreshData){
                this.freshShowData(type, tabType, index);
            }
        }
        this._scrollList.refreshData(this._showData, {kind: this._showList[this._selectIndex]});
    }

    public freshShowData(type?:string, tabType?:number, tabIndex?:number):void{
        let data = this._showData;
        for (let i=0; i < data.length; i++){
            if (!type){
                data[i].collectOpen = false;
                data[i].taskOpen = false;
                data[i].tabIndex = 1;
            }
            else{
                if (data[i].type == type){
                    if (tabIndex){
                        data[i].tabIndex = tabIndex;
                    }
                    if (tabType){
                        if (tabType == 1){
                            data[i].collectOpen = !data[i].collectOpen;
                            data[i].taskOpen = data[i].collectOpen;
                        }
                        else if (tabType == 2){
                            data[i].taskOpen = !data[i].taskOpen;
                            data[i].collectOpen = data[i].taskOpen;
                        }
                    }
                    break;
                }
            }
        }
    }

    private changeBtnStatus(index:number):void{
        for (let i=0; i < this._btnList.length; i++){
            let btn = <BaseBitmap> this._btnList[i].getChildByName("qingyuanbtn");
            let btnDown = <BaseBitmap> this._btnList[i].getChildByName("qingyuanbtndown");
            btn.visible = true;
            btnDown.visible = false;
            if (i == index){
                btn.visible = false;
                btnDown.visible = true;
            }
        }
    }

    private activateCallback(evt : egret.Event) : void{
        let view = this;
        if(evt.data.ret){
            let rData = evt.data.data.data;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
            if(rData.rewards){
                let rewardList =  GameData.formatRewardItem(rData.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            } 
            this.refreshView();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
        }
    }

    private refreshView():void{
        for (let i=0; i < this._showList.length; i++){
            let redDot = <BaseBitmap>this._btnList[i].getChildByName("redDot");
            if (Api.encounterVoApi.checkRedByKind(this._showList[i])){
                redDot.visible = true;
            }
            else{
                redDot.visible = false;
            }
        }
    }

    protected get uiType():string
	{
		return "2";
    }

    protected getBigFrame():string
	{	
		// if (this.uiType=="2")
		// {
			return "commonview_bigframe";
		// }
		// return null;
	}
    
    protected getTitlePic():string
	{	
		return "qingyuannew_titlebg";
	}

    protected getRuleInfo():string{
		return "qingyuanrule";
	}

    protected getTitleStr():string{
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getResourceList():string[]{

        let arr = [
            `qingyuannew_bottombg`, `qingyuannew_gearitemtitlebg`, `qingyuannew_itembg`, `qingyuannew_itemflag`, `qingyuannew_itemoffbtn`, `qingyuannew_itemopenbtn`,
            `qingyuannew_titlebg`, `qingyuannew_rolebg1`, `qingyuannew_rolebg2`, `qingyuannew_rolebg3`, `qingyuannew_rolebg4`, `qingyuannew_btn1`, `qingyuannew_btn1_down`, `qingyuannew_btn2`, `qingyuannew_btn2_down`, `qingyuannew_btn3`, `qingyuannew_btn3_down`, `qingyuannew_btn4`, `qingyuannew_btn4_down`, `qingyuannew_newflag`, `collectflag`, `qingyuanrolenamebg`, `qingyuannew_qingyuannamebg`, `itembg_0`,
        ];
		// for(let k in Config.EncounterCfg.encounterList){
		// 	let unit = Config.EncounterCfg.encounterList[k];
		// 	for(let i in unit.need){
		// 		let data = unit.need[i];
        //         let rewardvo = GameData.formatRewardItem(data)[0];
		// 		arr.push(`${unit.type}role${rewardvo.id}`);
		// 	}
        // }
        return super.getResourceList().concat(arr);
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        this._scrollList = null;
        this._btnList = [];
        this._showData = null;
        this._selectIndex = 0;
        this._showList = [];

        super.dispose();
    }
}