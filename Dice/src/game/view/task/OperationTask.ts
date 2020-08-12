

class OperrationTask extends BaseDisplayObjectContainer{
    private _bg:BaseBitmap;
    private _title:BaseTextField;
    private _progess:ProgressBar;
    private _opeTxt:BaseTextField;
    private _red:BaseBitmap;

    public initView(){
        this._bg = BaseBitmap.create("ab_task_opre_bg");
        this._bg.width = 514;
        this._bg.height = 190;
        this.addChild(this._bg);

        this._progess = ComponentMgr.getProgressBar("ab_readyscene_war_progress", ProgressBarConst.TASK_OPER_BAR, 308);
        this._progess.setProgressMode();
        this.addChild(this._progess);
        
        this._title = ComponentMgr.getTextField('', TextFieldConst.SIZE_36, ColorEnums.white);
        this.addChild(this._title);
        this._title.y = 10;
        this._title.width = this._bg.width;
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        this._title.text = LangMger.getlocal("operationtitle");
        this._title.strokeColor = ColorEnums.strokeOrange;

        let powerIcon = BaseBitmap.create("task_power");
        this.addChild(powerIcon);
        powerIcon.x = 12;
        powerIcon.y = this._bg.height - powerIcon.height - 40 ;

        let con = new BaseDisplayObjectContainer();
        this.addChild(con);
        con.addTouchTap(this.boxOnclick, this);

        let boxIcon = BaseBitmap.create("ab_task_icon");
        con.addChild(boxIcon);
        let scale = 1;
        boxIcon.scaleX = scale;
        boxIcon.scaleY = scale;
        con.x = 360;
        con.y = 34;
      
        let redbg = BaseBitmap.create("task_reward_bg");
        con.addChild(redbg);
        redbg.x = 120;
        this._red = redbg;
        this._opeTxt = ComponentMgr.getTextField('99', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white, false);
        con.addChild(this._opeTxt);
        this._opeTxt.width = redbg.width;
        this._opeTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._opeTxt.x = redbg.x;
        this._opeTxt.y = (redbg.height - this._opeTxt.height) / 2;

        // 不确定有没有
        // let openTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
        // con.addChild(openTxt);
        // openTxt.text = `开启`;
        // openTxt.x = 0;
        // openTxt.y = con.height - openTxt.height;

        this._progess.x = 44;
        this._progess.y = powerIcon.y + (powerIcon.height - this._progess.height) / 2;

        let power = ComponentMgr.getTextField('2', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white);
        this.addChild(power);
        power.x = powerIcon.x;
        power.y = powerIcon.y - power.height - 5;
        power.text = LangMger.getlocal("taskviewpowernum");
        power.strokeColor = ColorEnums.strokeOrange;

        this.update();
    }

    private update(){
        let curCards = Api.UserinfoVoApi.getCard();
        let needCards = Config.TogetherCfg.getNeedCard(Api.GameinfoVoApi.getGnum());
        let boxNum = curCards/needCards;
        if(boxNum > 1){
            this._progess.setPercentage(1, `${curCards}/${needCards}`);
            this._opeTxt.text = Math.floor((boxNum > 99) ? 99 : boxNum).toString();
            this._red.visible = true;
            this._opeTxt.visible = true;
        } else {
            this._progess.setPercentage(boxNum, `${curCards}/${needCards}`);
            this._red.visible = false;
            this._opeTxt.visible = false;
        }
        
    }
    private boxOnclick(event, params){
        if(Api.UserinfoVoApi.getCardBox() >= 1){
            NetManager.request(NetConst.USER_OPENCARDBOX, {});
        } else {
            // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
            //     title : LangMger.getlocal("reward_pupopview_title"),
            //     msg : "卡片数量不足"
            // });
        }
    }
   
    public dispose(){
        this._bg = null;
        this._title = null;
        this._progess = null;
        this._opeTxt = null;
        super.dispose()
    }
}