/**
 * 称帝战门客布阵
 * author qianjun
 */

class EmperorWarBuzhenView  extends CommonView
{
    private _buzheninfo : any = {};
    private _scrollList : ScrollList = null;
    
    public constructor() {
        super();
    }
    
    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "empupbg","empmanbg","empzli","empzzhi","empwli","empmli","childview_addicon"
        ]);
    }

    protected getRuleInfo():string
	{
		 
		if(Api.switchVoApi.checkOpenSeat())
		{
			return "EmpWarBuzhenRuleInfo_withNewMonthYear";
		}
		return "EmpWarBuzhenRuleInfo";
        
    } 
    
    private get api(){
        return Api.emperorwarVoApi;
    }

	public initView():void
	{
        let view = this; 
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,this.checkBuzhen,this);
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
    
        let savebtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorWarBuzhenSave`, view.saveBuzhen, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, savebtn, emparena_bottom); 
        view.addChild(savebtn);
        //顶部
        let topBg = BaseBitmap.create(`empupbg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view, [0,view.titleBg.height]);
        view.addChild(topBg);

        // let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
        let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),Api.playerVoApi.getPlayerPtitle());
		headImg.name = "headImg";
		view.setLayoutPosition(LayoutConst.lefttop, headImg, topBg, [15,5]);
        view.addChild(headImg);

        let nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headImg, [headImg.width + 20, 10]);
        view.addChild(nameTxt);

        //主角属性
        let zizhi:number[] = Api.practiceVoApi.geAbilityValues();
		let totalV = App.StringUtil.changeIntToText(zizhi[0]+zizhi[1]+zizhi[2]+zizhi[3]);
        let zzhitext = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenZzhi`,[totalV]), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, zzhitext, nameTxt, [0,nameTxt.textHeight+10]);
        view.addChild(zzhitext);

        let attrV:number[] = Api.practiceVoApi.geAttrValues();
        totalV = App.StringUtil.changeIntToText(attrV[0]+attrV[1]+attrV[2]+attrV[3]);
        let sxingtext = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenZsx`,[totalV]), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, sxingtext, zzhitext, [0,nameTxt.textHeight+10]);
        view.addChild(sxingtext);

        let smingDesc = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenDesc`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, smingDesc, topBg, [0,10]);
        view.addChild(smingDesc);

        let listBg = BaseBitmap.create("public_9_bg33");
        listBg.width = GameConfig.stageWidth - 20;
        listBg.height = emparena_bottom.y - topBg.y - topBg.height - 20;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0,topBg.y+topBg.height + 10]);
        if(PlatformManager.checkIsThSp())
        {
            listBg.x = topBg.x + 10;
        }
        view.addChild(listBg);

        let arr = [`wli`,`zli`,`zzhi`,`mli`];
        view._buzheninfo = view.api.getServantInfo();
        view.api.curBuzhen = view._buzheninfo;
        let data = [];
        for(let i in view._buzheninfo){
            let idx = Number(i);
            data.push({
                'type' : idx,
                'image' : arr[idx - 1],
                'empty' : view._buzheninfo[i] == '',
                'servantID' : view._buzheninfo[i],
            });
        }

        view._scrollList = ComponentManager.getScrollList(EmperorWarBuzhenItem, data, new egret.Rectangle(listBg.x, listBg.y, listBg.width, listBg.height - 10));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._scrollList, listBg);
        view.addChild(view._scrollList);

        view.swapChildren(view.closeBtn, topBg);
    }

    private getNewBuzhenInfo():void{
        let view = this;
        view._buzheninfo = {};
        for(let i = 0; i < 4; ++ i){
            let item : any = view._scrollList.getItemByIndex(i);
            if(item && item.curServantId){
                view._buzheninfo[i + 1] = item.curServantId;
            }
            else{
                view._buzheninfo[i + 1] = '';
            }
        }
    }

    private saveBuzhen():void{
        let view = this;
        view.getNewBuzhenInfo();
        if(view.api.isCanAutoSelect(view._buzheninfo)){
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:LanguageManager.getlocal('emperorWarCanNotBuzhenTip1'),
                callback:this.saveSinfo,
                handler:this,
                needCancel:true,
            });
        }
        else{
            let change = view.api.buzhewnIsChange(view._buzheninfo);
            if(change){
                view.saveSinfo();
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarSaveBuzhen"));
            }
        }
    }

    private saveSinfo():void{
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS),view.setposCallBack,view);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_SETPOS, {
            setArr:view._buzheninfo,
            version:view.api.getVersion(),
        });
    }

    private setposCallBack(evt : egret.Event):void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS),view.setposCallBack,view);
        if(evt.data.ret){                        
            if(evt.data.data.ret < 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
                if(view._close){
                    view._close = false;
                    view.hide();
                }
                return;
            }
            let data = evt.data.data.data;
            view.api.setDataInfo(data.myemperor);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarSaveBuzhen"));
            if(view._close){
                view._close = false;
                view.hide();
            }
        }
    }

    private _close = false;
    protected closeHandler():void
	{
        let view = this;
        view.getNewBuzhenInfo();
        let change = view.api.buzhewnIsChange(view._buzheninfo);
        if(change){
            view._close = true;
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:LanguageManager.getlocal(`emperorWarCanNotBuzhenTip${change ? 2 : 1}`),
                callback:this.saveSinfo,
                handler:this,
                needCancel:true,
                cancelcallback:view.hide
            });
        }
        else{
            view._close = false;
            view.hide();
        }
    }
    
    private checkBuzhen() : void{
        let view = this;
        if(view._scrollList){
            view.getNewBuzhenInfo();
            view.api.curBuzhen = view._buzheninfo;
        }
    }

    protected tick():void{
        let view = this;
        if(view.api.cannotSetBuzhen()){
            view.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCanNotSaveBuzhen"));
        }
    }


	public dispose():void
	{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,this.checkBuzhen,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS),view.setposCallBack,view);
        view._scrollList = null;
        view._buzheninfo = {};
        view._close = false;
        super.dispose();
    }
}