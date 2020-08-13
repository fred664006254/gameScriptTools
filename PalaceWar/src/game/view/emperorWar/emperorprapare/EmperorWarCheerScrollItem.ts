/**
 * 助威item
 * author qianjun
 */
class EmperorWarCheerScrollItem  extends ScrollListItem
{
    private _rowIdx = 0;
    private _uiData = undefined;
    private _btn : BaseButton = null;
    private _rqTxt : BaseTextField = null;
    public constructor()
    {
        super();
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    private get cfg(){
        return Config.EmperorwarCfg;
    }

    protected initItem(index:number,data:any)
    {
        let view = this;
        view._rowIdx = index
        view._uiData = data;
        view.width = data.width;
        view.height = 170;

        let listBg = BaseBitmap.create("public_9_bg14");
        listBg.width = view.width;
        listBg.height = view.height;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listBg, view);
        view.addChild(listBg);

        let tarColor = TextFieldConst.COLOR_BLACK;
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, listBg, [20,15]);
        view.addChild(nameTxt);

        let line = BaseBitmap.create("public_line1");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,nameTxt.y + nameTxt.textHeight + 5]);
        view.addChild(line);
        //头像
        let title = data.phototitle;
        let headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
        headImg.name = "headImg";
        headImg.addTouchTap(view.showUserInfo,view,[data.uid]);
        view.setLayoutPosition(LayoutConst.lefttop, headImg, nameTxt, [0,35]);
        view.addChild(headImg);
        //权势
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = LanguageManager.getlocal(`powerDes`,[App.StringUtil.changeIntToText(Number(data.power))]);
        view.setLayoutPosition(LayoutConst.lefttop, powerTxt, headImg, [headImg.width + 10,10]);
        view.addChild(powerTxt);
        //官品
        let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        officerTxt.text = LanguageManager.getlocal(`practiceStorageoffice`,[LanguageManager.getlocal(`officialTitle${this._uiData.level}`)]);
        view.setLayoutPosition(LayoutConst.lefttop, officerTxt, powerTxt, [0,powerTxt.textHeight + 10]);
        view.addChild(officerTxt);
        //帮会
        let clubTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        clubTxt.text = LanguageManager.getlocal("emperorWarCheerBhui", [data.mygname == '' ? LanguageManager.getlocal('nothing') : data.mygname]);
        view.setLayoutPosition(LayoutConst.lefttop, clubTxt, officerTxt, [0,officerTxt.textHeight + 10]);
        view.addChild(clubTxt);
        //人气
        let renqi = data.getcheer * view.cfg.cheerEffect;
        let renqiTxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarCheerPower", [renqi.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        view.setLayoutPosition(LayoutConst.righttop, renqiTxt, view, [20,15]);
        view._rqTxt = renqiTxt;
        view.addChild(renqiTxt);
        //助威按钮   
        let button : BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, ``, view.cheerConfirm, view);   
        view.setLayoutPosition(LayoutConst.righttop, button, view, [15,line.y + line.height + 20]);
        view.addChild(button);
        view._btn = button;
        view.fresh_btn_status();
    }

    private showUserInfo(evc,uid){
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:uid});
    }

    private userShotCallback(event:egret.Event)
    {
        if(event.data.ret){
            let data = event.data.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        }
    }
    

    private fresh_btn_status():void{
        let view = this;
        let data = view._uiData;
        let zhuweiTxt = ``;
        let renqi = 0;
        if(view.api.isHaveZhuWei()){
            if(data.uid == view.api.getZhuweiID() ){
                zhuweiTxt = LanguageManager.getlocal(`emperorWarCheerNum`, [view.api.getZhuweiNum().toString()]);
                view._btn.setEnable(true);
            }
            else{
                zhuweiTxt = LanguageManager.getlocal(`emperorWarCheerViewTitle`);
                view._btn.setEnable(false);
            }
        }
        else{
            zhuweiTxt = LanguageManager.getlocal(`emperorWarCheerViewTitle`);
            view._btn.setEnable(true);
        }  
        view._btn.setText(zhuweiTxt,false);
        renqi = data.getcheer * view.cfg.cheerEffect;
        view._rqTxt.text = LanguageManager.getlocal("emperorWarCheerPower", [renqi.toString()]);
    }

    private cheerConfirm():void{
        let view = this;
        let data = view._uiData;
        let cfg = Config.EmperorwarCfg;
        let curLevel = Api.playerVoApi.getPlayerLevel();
        if(curLevel < cfg.cheerLv){
            App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerConition', [LanguageManager.getlocal(`officialTitle${cfg.cheerLv}`)]));
            return;
        }
        let num = Math.min(view.api.getZhuweiNum(), cfg.cheerCost.length - 1);
        let cost = cfg.cheerCost[num];
        if(Api.playerVoApi.getPlayerGem() < cost){
            App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerNo'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal("emperorWarCheertext",[cost, data.name, `+1`,`${cfg.cheerAddAtk * 100}％`,view.api.getZhuweiNum().toString()]),
            callback:this.cheerUp,
            handler:this,
            needCancel:true,
            height: 320,
            txtcolor: 0xffffff
        });
        // else{
        //     App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerMax'));
        // }
    }

    private cheerUp():void{
        let view = this;
        let data = view._uiData;
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_CHEER, {
            fuid:data.uid,
            version:view.api.getVersion(),
        });
    }

    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 10;
    }
    
    public dispose():void
    {
        this._uiData = null;
        this._rqTxt = null;
        this._btn = null;
        this.cacheAsBitmap=false;
        super.dispose();
    }
}
