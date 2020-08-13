/**
 * 书院门客自动选择
 * author ycg
 * date 2020.3.2
 * @class BookroomAutoSelectServantPopupView
 */
class BookroomAutoSelectServantPopupView  extends PopupView
{
    private _currSelNum:BaseTextField = null;
    private _selectSerList:string[] = [];
    private _allServant:string[] = [];

    public constructor() 
	{
		super();
	}

	public initView():void
	{
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);

        let bookCfg = GameConfig.config.bookroomCfg;
        
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantSelecttxt1",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        txt1.x = 40 + GameData.popupviewOffsetX;
        txt1.y = 20;
        this.addChildToContainer(txt1);

        // let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        // let lastData = this.getLastSelectData();
        // let studyNum = Api.bookroomVoApi.getInStudyServantNum();
        let selNum = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomSelectServantNum",["", ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        selNum.x = txt1.x;
        selNum.y = txt1.y + 30;
        this.addChildToContainer(selNum);
        this._currSelNum = selNum;

        let timeTf = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantSelecttxt2",["3" + LanguageManager.getlocal("date_hour2")]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeTf.x = this.viewBg.x + this.viewBg.width - 40 - timeTf.width - GameData.popupviewOffsetX;
        timeTf.y = selNum.y;
        this.addChildToContainer(timeTf);

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 574; // 634
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = selNum.y + 30;
        this.addChildToContainer(bg);
        
        let studyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "bookRoom_autoStudyBtnName", this.studyBtnClick, this);
        studyBtn.setPosition(bg.x + bg.width/2 - studyBtn.width/2, bg.y + bg.height + 8);
        this.addChildToContainer(studyBtn);

        let rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        let idList= Api.servantVoApi.getServantInfoIdListWithSort(2);
        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
            if (!Api.bookroomVoApi.isStudying(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
        let data = idList1.concat(idList2);
        this._allServant = data;
        let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        let lastData = this.getLastSelectData();
        let studyNum = Api.bookroomVoApi.getInStudyServantNum();
        let num = 0;
        if (studyNum+lastData.length > maxPosNum){
            num = maxPosNum;
        }
        else{
            num = studyNum+lastData.length;
        }
        this.initSelectServant();
        selNum.text = LanguageManager.getlocal("bookRoomSelectServantNum",[""+(num), ""+maxPosNum]);

        let canUseData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        if (this.param.data && this.param.data.seatNum && canUseData.length != Number(this.param.data.seatNum)){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoDataChangeTip"));
        }
        let scrollList = ComponentManager.getScrollList(BookroomAutoSelServantScrollItem, data, rect, {data: lastData});
		scrollList.x = bg.x;
        scrollList.y = bg.y + 5;
		this.addChildToContainer(scrollList);
    }

    public initSelectServant():void{
        let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        let lastData = this.getLastSelectData();
        let studyNum = Api.bookroomVoApi.getInStudyServantNum();
        let num = lastData.length;
        if (studyNum+lastData.length > maxPosNum){
            num = maxPosNum - studyNum;
        }
        else{
            num = lastData.length;
        }
        for (let i=0; i < num; i++){
            this._selectSerList.push(lastData[i]);
        }
    }

    //是否可以选择
    public isCanSelect():boolean{
        let maxPosData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        let maxPosNum = maxPosData.length;
        if (maxPosNum > this._selectSerList.length){
            return true;
        }
        return false;
    }

    //上次已选的数据
    public getLastSelectData():string[]{
        let posData = Api.bookroomVoApi.getCanUseSeat(this.param.data.data);
        let lastData = Api.bookroomVoApi.getLastSelectServant(this._allServant);
        let count = posData.length > lastData.length ? lastData.length : posData.length;
        let arr:string[] = [];
        for (let i=0; i < count; i++){
            arr.push(lastData[i]);
        }
        App.LogUtil.log("getlastsel "+arr.length);
        return arr;
    }

    private selectServant(data:egret.Event):void{
        if (data && data.data){
            App.LogUtil.log("data.data.servantId "+data.data.servantId);
            if (data.data.isSelect){
                this._selectSerList.push(data.data.servantId);
            }
            else{
                this.removeServantFromList(data.data.servantId);
            } 
            App.LogUtil.log("this._selectSerList.length "+this._selectSerList.length);
            let maxPosNum = Api.bookroomVoApi.getMaxleng();
            let studyNum = Api.bookroomVoApi.getInStudyServantNum();
            this._currSelNum.text = LanguageManager.getlocal("bookRoomSelectServantNum",[""+(studyNum + this._selectSerList.length), ""+maxPosNum]);
        }
    }

    private removeServantFromList(id:string):void{
        for (let i=0; i < this._selectSerList.length; i++){
            if (this._selectSerList[i] == id){
                this._selectSerList.splice(i, 1);
                return ;
            }
        }
    }

    private studyBtnClick():void{
        if (this._selectSerList.length <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoNotSelect"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, {sids: this._selectSerList});
        this._selectSerList = [];
        this.hide();
    }

    protected getShowHeight():number
    {
        return 800;
    }
    
    protected getTitleStr():string{
        return "bookRoom_autoSelectTitleStr";
    }
 
    public dispose():void
	{
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);

        
        this._currSelNum = null;
        this._selectSerList = [];
        this._allServant = [];
        
        super.dispose();
    }
}


