/**
 * 管家门客自动选择
 * author shaoliang
 * date 2020.4.26
 * @class HousekeeperServantPopupView
 */
class HousekeeperServantPopupView  extends PopupView
{   

    private _currSelNum:BaseTextField = null;
    private _selectSerList:string[] = [];

    private _function:Function = null;
    private _obj:any = null;
    private _maxNum:number = 0;

    public constructor() 
	{
		super();
	}
    public initView():void
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        
        this._function = this.param.data.f;
        this._obj = this.param.data.o;

        let bookCfg = GameConfig.config.bookroomCfg;
        
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_select_servant"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        txt1.x = 40 + GameData.popupviewOffsetX;
        txt1.y = 20;
        this.addChildToContainer(txt1);

        let selNum = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomSelectServantNum",["", ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        selNum.x = txt1.x;
        selNum.y = txt1.y + 30;
        this.addChildToContainer(selNum);
        this._currSelNum = selNum;

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 574;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = selNum.y + 30;
        this.addChildToContainer(bg);
        
        let studyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "allianceInfoSave", this.studyBtnClick, this);
        studyBtn.setPosition(bg.x + bg.width/2 - studyBtn.width/2, bg.y + bg.height + 8);
        this.addChildToContainer(studyBtn);

        let rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        let idList= Api.servantVoApi.getServantInfoIdListWithSort(2);

        this._maxNum =  Api.bookroomVoApi.getMaxleng();
        let parmsstr = Api.housekeeperVoApi.getCheckParms("bookroom");
        this._selectSerList = parmsstr.split("|");
        let servantNum = this._selectSerList.length;
        if (servantNum == 1 && this._selectSerList[0] == "")
        {
            servantNum = 0;
            this._selectSerList.length = 0;
        }
        selNum.text = LanguageManager.getlocal("bookRoomSelectServantNum",[String(servantNum), String(this._maxNum)]);

        let array:Object[] = []
        for (let i = 0; i<idList.length; i++)
        {   
            let oneid = idList[i];
            let isSelected = GameData.isInArray(oneid,this._selectSerList);
            array.push({id:oneid, type: isSelected ? 1 : 2});
        }

      
        let scrollList = ComponentManager.getScrollList(HousekeeperServantScrollItem, array, rect);
		scrollList.x = bg.x;
        scrollList.y = bg.y + 5;
		this.addChildToContainer(scrollList);
    }

    //是否可以选择
    public isCanSelect():boolean{
        
        if (this._maxNum > this._selectSerList.length){
            return true;
        }
        return false;
    }


    private selectServant(data:egret.Event):void{
        if (data && data.data){
            if (data.data.isSelect){
                this._selectSerList.push(data.data.servantId);
            }
            else{
                this.removeServantFromList(data.data.servantId);
            } 
            let maxPosNum = Api.bookroomVoApi.getMaxleng();
            let studyNum = 0;//Api.bookroomVoApi.getInStudyServantNum();
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
       this._function.apply(this._obj,[this._selectSerList]);
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        
        this._maxNum = 0;
        this._currSelNum = null;
        this._selectSerList.length = 0;
        this._function = null;
        this._obj = null;
        
        super.dispose();
    }
}