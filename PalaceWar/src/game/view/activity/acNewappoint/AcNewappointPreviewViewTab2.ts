/**
 * 新服预约 tab1
 * date 2020.6.29
 * author ycg
 */
class AcNewappointPreviewViewTab2 extends CommonViewTab{
    private _scoreInfo:BaseTextField = null;
    private _scrollList:ScrollList = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 540;
        bg.height = 450;
        bg.setPosition(50, 0);
        this.addChild(bg);

        let topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width/2 - topInfoBg.width/2, bg.y + 10);
        this.addChild(topInfoBg);

        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTotalScore", this.getTypeCode()), [""+Api.acnewappointApi.getScore()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.anchorOffsetX = topInfo.width/2;
        topInfo.setPosition(topInfoBg.x + topInfoBg.width/2, topInfoBg.y + topInfoBg.height/2 - topInfo.height/2);
        this.addChild(topInfo);
        this._scoreInfo = topInfo;

        let dataList = Api.acnewappointApi.getSortTaskCfg();
        let scrollList = ComponentManager.getScrollList(AcNewappointPreviewTaskScrollItem, dataList, new egret.Rectangle(0, 0, 530, 395), {aid: this.aid, code: this.code});
        scrollList.setPosition(bg.x + 5, topInfoBg.y + topInfoBg.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private refreshView():void{
        this._scoreInfo.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTotalScore", this.getTypeCode()), [""+Api.acnewappointApi.getScore()]);
        this._scoreInfo.anchorOffsetX = this._scoreInfo.width/2;

        let dataList = Api.acnewappointApi.getSortTaskCfg();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    protected get code():string{
		return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
    }

    private get aid():string{
        return "newappoint";
    }

    private getTypeCode():string{
        return this.code;
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        this._scoreInfo = null;
        this._scrollList = null;

        super.dispose();
    }
}