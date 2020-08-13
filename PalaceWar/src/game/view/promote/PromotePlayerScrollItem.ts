/**
 * 分封玩家item
 * author qianjun
 */
class PromotePlayerScrollItem  extends ScrollListItem
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
        view.height = 110;
        let pos_arr = data.pos_arr;

        //头像
        let title = data.phototitle;
        // let headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
		// headImg.width = 93;
		// headImg.height = 93;
        // headImg.name = "headImg";
        // headImg.addTouchTap(view.showUserInfo,view,[data.uid]);
        let headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headImg, view, [pos_arr[0] + (48 - headImg.width)/2, 0]);
        view.addChild(headImg);
        
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK)
        nameTxt.text =  data.name;
        view.addChild(nameTxt);

        let titleinfo = App.CommonUtil.getTitleData(view._uiData.title);
        if (titleinfo.title != "" && titleinfo.title != "{}")
        {   
            // let officerImg = App.CommonUtil.getTitlePic(view._uiData.title);
            // let deltaV = 0.8;
            // officerImg.setScale(deltaV);
            // let spaceY = (view.height - nameTxt.textHeight - officerImg.height + 20)/3;
            // view.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth)/2, spaceY]);
            // view.setLayoutPosition(LayoutConst.lefttop, officerImg, view, [pos_arr[1] + (96 - officerImg.width * officerImg.scaleX)/2,spaceY + nameTxt.textHeight + 10]);
            // view.addChild(officerImg);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth)/2,0]);
        }
        else
        {
            view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth)/2,0]);
        }

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK)
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
        view.setLayoutPosition(LayoutConst.leftverticalCenter, powerTxt, view, [pos_arr[2] + (48 - powerTxt.textWidth) / 2,0]);
        view.addChild(powerTxt);
        if(PlatformManager.checkIsEnSp())
        {
             powerTxt.x =  340;
        }

        //任命按钮   
        let button : BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `PromotePlayersPopViewRm`, view.appointConfirm, view);   
        view.setLayoutPosition(LayoutConst.leftverticalCenter, button, view, [pos_arr[3] + (48 - button.width) / 2,0]);
        view.addChild(button);
        if(PlatformManager.checkIsTextHorizontal())
        {
            button.x += 40; 
        }
        view._btn = button;
        if (PlatformManager.checkIsRuLang()){
            button.x = view.width - button.width - 2;
        }

        let line = BaseBitmap.create("emprankinglist_line");
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
    }

    private appointConfirm():void{
        let view = this;
        let data = view._uiData;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal("PromotePlayersPopViewRmConfirm",[data.name, LanguageManager.getlocal(`promoteType${data.promoteType}`)]),
            callback:this.appoint,
            handler:this,
            needCancel:true,
            txtcolor: 0xffffff
        });
    }

    private appoint():void{
        let view = this;
        let data = view._uiData;
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_APPOINT, {
            position:data.promoteType,
            auid:data.uid,
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
        this.cacheAsBitmap=false;
        this._btn = null;
        this._rqTxt = null;
        super.dispose();
    }
}
