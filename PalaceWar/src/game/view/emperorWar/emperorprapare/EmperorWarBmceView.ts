/**
 * 报名册
 * author qianjun
 */

class EmperorWarBmceView  extends CommonView
{
    private _title_rwbTxt:BaseTextField;
    private _title_nameTxt:BaseTextField;
    private _title_officerTxt:BaseTextField;
    private _title_powerTxt:BaseTextField;
    private _midBg : BaseBitmap = null;
    private _posArr : number[] = [];
    
    public constructor() {
        super();
    }

    protected getRequestData():{requestType:string,requestData:any}{
        let view = this;
		return {requestType:NetRequestConst.REQUEST_EMPEROR_BMLIST,requestData:{
            version : view.api.getVersion(),
            sort : view.api.type <= 2 ? 1 : 2// 1报名时间排序 2消耗人望币排序
        }};
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "emperorwarcheerbg", "emprankinglist_line"
        ]);
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        let view = this;
        if(data.ret){
            let cmd = data.data.cmd;
            if(cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST){
                if(data.data.data.bmlist)
                {
                    view.api.setBmListData(data.data.data.bmlist);
                }
            }
        }
    }

	public initView():void
	{
        let view = this; 
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        let isGetAuthor = view.api.getSelfNumb() > 0;
        let curRWB = Api.prestigeVoApi.getPem();
        let ztaitxt = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBmceZtai`,[LanguageManager.getlocal(isGetAuthor ? `emperorWarBmceZige` : `emperorWarBmceNotZige`)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ztaitxt, emparena_bottom, [15,0]);
        view.addChild(ztaitxt);

        let rwbtxt = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBmceRWB`, [curRWB.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, rwbtxt, emparena_bottom, [15,0]);
        view.addChild(rwbtxt);
        //中部
        let inTime = view.api.type <= 2;
        view._midBg = BaseBitmap.create("public_9_bg22");
        view._midBg.height = GameConfig.stageHeigth - view.titleBg.height - emparena_bottom.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._midBg, view, [0,view.titleBg.y + view.titleBg.height]);
        view.addChild(view._midBg);
        //没结束前排版
        if(inTime){
            view.createMid(false, view._midBg.height - 60, 30);
        }
        //结束后排版
        else{
            let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
            let getText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWargetZige`), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK)
            downTitleLine.width = downTitleLine.width + getText.textWidth;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine, view._midBg, [0,30]);
            view.addChild(downTitleLine);
            
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getText, downTitleLine);
            view.addChild(getText);
            view.createMid(true, 52 * 8 + 45, getText.y + getText.textHeight + 10 - view._midBg.y,'up');
            
            let downTitleLine2: BaseBitmap = BaseBitmap.create("public_line3");
            let getText2 = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarNoZige`), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK)
            downTitleLine2.width = downTitleLine2.width + getText2.textWidth;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine2, view._midBg, [0,(getText.y + getText.textHeight + 10 + 30 + 10 + 52 * 8 + 5 * 7 - view._midBg.y)]);
            view.addChild(downTitleLine2);

            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getText2, downTitleLine2);
            view.addChild(getText2);
            view.createMid(true, view._midBg.y + view._midBg.height - 35 - getText2.y - getText2.textHeight, getText2.y + getText2.textHeight + 5 - view._midBg.y, 'down');
        }
    }

    private createMid(end : boolean, height : number, posY : number, type : string = null):void{
        let view = this;
        let listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = view._midBg.width - 60;
        listBg.height = height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view._midBg, [0,posY]);
        view.addChild(listBg);

        let maskBg = BaseBitmap.create("public_9_bg33");
        maskBg.width = listBg.width;
        maskBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg, [0,0]);
        view.addChild(maskBg);
        view.refreshTopTitle(end, maskBg);
        //列表
        let data = view.api.getBmlistData(type);
        let lenth = data.length;//Math.floor(Math.random() * 10) + 1;
        let arr = [];
        for(let i = 0; i < lenth; ++i){
            let unit = data[i];
            unit.pos_arr = view._posArr;
            unit.width = maskBg.width;
            unit.end = end;
            arr.push(unit);
        }
        let scrollList  = ComponentManager.getScrollList(EmperorWarBmceScrollItem, arr, new egret.Rectangle(maskBg.x, maskBg.y + maskBg.height, listBg.width, listBg.height - 45));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listBg, [0,maskBg.height + 5]);
        view.addChild(scrollList);
        if(arr.length){

        }
        else{
            scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
    }

    private refreshTopTitle(end : boolean, maskBg : BaseBitmap)
    {
        let view = this;
        view._title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        view._title_nameTxt.text = LanguageManager.getlocal("emperorWarmchen");
        view.addChild( view._title_nameTxt);

        view._title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        view._title_officerTxt.text = LanguageManager.getlocal("rankofficer");
        view.addChild(view._title_officerTxt);

        view._title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        view._title_powerTxt.text = LanguageManager.getlocal("rankpower");
        view.addChild(view._title_powerTxt);
        //结束前不显示人望
        view._posArr = [];
        let desc = !end ? ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 2 + 2)) / 4) : ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 2 + 2 + 3)) / 5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._title_nameTxt, maskBg, [desc,0]);
        view._posArr.push(view._title_nameTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, view._title_officerTxt, view._title_nameTxt, [view._title_nameTxt.textWidth + desc,0]);
        view._posArr.push(view._title_officerTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, view._title_powerTxt, view._title_officerTxt, [view._title_officerTxt.textWidth + desc,0]);
        view._posArr.push(view._title_powerTxt.x - maskBg.x);
        if(end){
            view._title_rwbTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            view._title_rwbTxt.text = LanguageManager.getlocal("emperorWarRWB");
            view.setLayoutPosition(LayoutConst.lefttop, view._title_rwbTxt, view._title_powerTxt, [view._title_powerTxt.textWidth + desc,0]);
            if(PlatformManager.checkIsEnSp())
            {
                view._title_rwbTxt.x =view._title_rwbTxt.x-50;
            } 
            view._posArr.push(view._title_rwbTxt.x - maskBg.x);
            view.addChild(view._title_rwbTxt);
        }
    }

	public dispose():void
	{
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);
        let view = this;
        view._title_nameTxt = null;
        view._title_officerTxt = null;
        view._title_powerTxt = null;
        view._title_rwbTxt = null;
        view._midBg = null;
        view._posArr = [];
        super.dispose();
    }
}