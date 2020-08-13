/**
 * 称帝助威
 * author qianjun
 */
class EmperorWarCheerView extends CommonView {
    public constructor() {
		super();
    }

    private _timeDesc : BaseTextField = null;
    private _time : number = 0;
    private _scrollList : ScrollList = null;
    private _myrenqiTxt : BaseTextField = null;

    private get api(){
        return Api.emperorwarVoApi;
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "emperorwarcheerbg"
        ]);
    }


    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        let view = this;
        if(data.ret){
            let cmd = data.data.cmd;
            if(cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST){
                if (data.data.data.bmlist)
                {
                    view.api.setBmListData(data.data.data.bmlist);
                }
            }
        }
    }
    
    // 背景图名称
	// protected getBgName():string
	// {
	// 	return "emperorwarcheerbg";
	// }
    
    protected initView():void{
        let view = this;
        //倒计时提示
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        let type = view.api.judge_time();
        view._time = view.api.getCountDownTime();
        view._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal(`emperorTimeDesc${type}`, [App.DateUtil.getFormatBySecond(view._time)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._timeDesc, view, [0,view.titleBg.y + view.titleBg.height + 15]);
        view.addChild(view._timeDesc);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);

        let renqi = view.api.getSelfNumb() > 0 ? (view.api.curCheer.toString()) : (LanguageManager.getlocal(`emperorWarCheerNot`));
        let rqitxt = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarCheerMy`, [renqi]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, rqitxt, emparena_bottom, [15,0]);
        view.addChild(rqitxt);
        view._myrenqiTxt = rqitxt;
        //列表
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_CHEER),view.cheerCallBack,this);
        let listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = view.width - 60;
        listBg.height = emparena_bottom.y - view._timeDesc.y - view._timeDesc.textHeight - 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0,view._timeDesc.y + view._timeDesc.textHeight + 15]);
        view.addChild(listBg);

        let lenth = 8;//Math.floor(Math.random() * 10) + 1;
        let zhuweiId = Math.floor(Math.random() * 8);
        let data = view.api.getBmlistData('up');
        for(let unit of data){
            unit.width = listBg.width - 20;
        }
        data.sort((a,b)=>{
            if(b.uid == view.api.getZhuweiID()){
                return 1;
            }
        });
        let scrollList  = ComponentManager.getScrollList(EmperorWarCheerScrollItem, data, new egret.Rectangle(listBg.x, listBg.y, listBg.width - 20, listBg.height - 20));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listBg, [0,10]);
        view.addChild(scrollList);
        view._scrollList = scrollList;
    }

    private cheerCallBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            if(evt.data.data.ret < 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerFail"));
                return;
            }
            view.api.setDataInfo(data.myemperor);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
    
            let listdata = view.api.getBmlistData('up');
            for(let unit of listdata){
                if(unit.uid == view.api.getZhuweiID()){
                    unit.getcheer += 1;
                    break;
                }
            }
            listdata.sort((a,b)=>{
                if(b.uid == view.api.getZhuweiID()){
                    return 1;
                }
            });
            view._scrollList.setScrollTop(0);
            view._scrollList.refreshData(listdata);
            let renqi = view.api.getSelfNumb() > 0 ? (view.api.curCheer.toString()) : (LanguageManager.getlocal(`emperorWarCheerNot`));
            view._myrenqiTxt.text = LanguageManager.getlocal(`emperorWarCheerMy`, [renqi]);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_ZHUWEI_SUCCESS);
        }
    }

    protected tick():void{
        let view = this;
        view._time = view.api.getCountDownTime();
        let type = view.api.type;
        view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc${view.api.type}`, [App.DateUtil.getFormatBySecond(view._time)]);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        if(type > 3){
            view.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerError"));
        }

        if(view._time <= 0){
            

            view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc${type}`, [App.DateUtil.getFormatBySecond(view._time)]);
            view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
            
        }
    }

    public dispose():void{
        let view = this;
        view._timeDesc = null;
        view._scrollList = null;
        view._myrenqiTxt = null;
        view._timeDesc = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_CHEER),view.cheerCallBack,view);
        super.dispose();
    }
}