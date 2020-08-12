/*
 *@description: 龙珠人物信息界面
 *@author: hwc 
 *@date: 2020-04-14 14:58:44
 *@version 0.0.1
 */

class UserInfoPopupView extends PopupView 
{
    // 要刷新的界面
    private _winTxt:BaseTextField;
    private _lossTxt:BaseTextField;
    private _rateTxt:BaseTextField;
    private _maxScoreTxt:BaseTextField;
    private _maxTrunTxt:BaseTextField;
    private _diceTxt:BaseTextField;
    private _idTxt:BaseTextField;

    private _reRate:BaseTextField;
    private _reName:BaseTextField;

    // 气泡
    private _bubble:BubbleBox;
    private _capnum:BaseTextField;
    private _por:ProgressBar;

    // 标记是否初始化完成？？？
    private flag = 0;
    private detaX = 114;
    
    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_USERINFO, MsgConst.MODEL_DICE,
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.MODEL_USERINFO:
            case MsgConst.MODEL_DICE:
                view.refresh();
                break;
        }
    }

    public initView(){
        let width = 512;
        let height = 236;
        let top  = this.initTop(width, height);

        let scorll = ComponentMgr.getScrollView(top, new egret.Rectangle(0, 0, width, height));
        this.addChildToContainer(scorll);
        scorll.x = (this.viewBg.width - width) / 2;
        scorll.y = 10;
        // scorll.setScrollLeft(this._por.getPercent() * this._por.width, 500);
        this.scrollTo(scorll);

        let bottom = this.initBottom(512, 488);
        this.addChildToContainer(bottom);
        bottom.y = scorll.height + scorll.y + 10;
        bottom.x = scorll.x;
        this.flag = 1;
        this.refresh();


    }

    private scrollTo(scorll:ScrollView){
        let toX = this._por.getPercent() * this._por.width;
        if(toX < 269)
            return;
        if(toX > 1778){
            toX = 1778;
        } else {
            toX -= 269;
        }
        scorll.setScrollLeft(toX, 1000);
    }

    private refresh(){
        if(this.flag == 0){
            return
        }
        let winnum = Api.UserinfoVoApi.getWin();
        let lossnum = Api.UserinfoVoApi.getLose();
        this._winTxt.text = Api.UserinfoVoApi.getWin().toString();

        this._lossTxt.text = Api.UserinfoVoApi.getLose().toString();
        
        let ratenum  = 0;
        ratenum = (winnum + lossnum <= 0) ? 0 : winnum / (winnum + lossnum) * 100;
        ratenum = Math.floor(ratenum);
        this._rateTxt.text = `${ratenum}%`;

        this._maxScoreTxt.text = Api.UserinfoVoApi.getMaxscore().toString();

        this._maxTrunTxt.text = Api.UserinfoVoApi.getMaxturn().toString();

        this._idTxt.text = Api.UserinfoVoApi.getName();

        let havenum = Api.DiceVoApi.getDiceTotalType();
        let totalnum = Config.DiceCfg.getTotalDice();
        this._diceTxt.text = `${havenum}/${totalnum}`;
        this._reName.text = String(Api.SigninfoVoApi.getRenameNum() == 0 ? 0 : Config.GamebaseCfg.renameGem);

        this._por.setPercentage(this.getProgressNum());
        // 气泡刷新
        this._capnum.text = String(Api.UserinfoVoApi.getScore());
        let bubble_x = this._por.getPercent() * this._por.width;
        if(bubble_x >= this._por.width - this._bubble.width){
            this._bubble.TryangleX = bubble_x - (this._por.width - this._bubble.width);
            this._bubble.x = this._por.width - this._bubble.width;
        } else {
            this._bubble.x = bubble_x - this._bubble.TryangleX;
        }

    }

    private getProgressNum():number{
        let num:number = 0;
        let level = Api.UserinfoVoApi.getLevel();
        let curCap = Api.UserinfoVoApi.getScore();
        curCap = (Config.LevelCfg.getLevelNeedScore(level+1) < curCap) ? Config.LevelCfg.getLevelNeedScore(level+1) - 1 : curCap;
        let tem = curCap - Config.LevelCfg.getLevelNeedScore(level);
        let upnum = Config.LevelCfg.getLevelNeedScore(level+1) - Config.LevelCfg.getLevelNeedScore(level);
        let d = tem / upnum / 20.5;
        num = level / 20.5 + d;
        return num;
    }

    private initTop(width:number, height:number):BaseDisplayObjectContainer{
        let top = new BaseDisplayObjectContainer();
        // top.width = width;
        // top.height = height;
        let bg = BaseBitmap.create("userinfo_view_top_bg1");
        top.addChild(bg);
        bg.x = 0;
        bg.y = 0;
        bg.height = 236;
        bg.width = 2337;

        let pro = ComponentMgr.getProgressBar("userinfo_view_progress", "userinfo_view_bar", bg.width);
        top.addChild(pro);
        pro.x = 0;
        pro.y = (bg.height - pro.height) / 2;
        pro.setPercentage(this.getProgressNum());
        this._por = pro;

        let box = this.bullbeBox();
        top.addChild(box);
        box.x = 200;
        box.y = pro.y + pro.height + 10;
        this._bubble = box;

        for (let index = 0; index < 20; index++) {
            let spilt = BaseBitmap.create("userinfo_view_top_split");
            top.addChild(spilt);
            spilt.x = 114 * (index + 1);
            spilt.y = pro.y;

            let lv = BaseLoadBitmap.create(`levelicon${index+1}`);
            top.addChild(lv);
            lv.setScale(0.175);
            lv.x = spilt.x - lv.width * lv.scaleX /2;
            lv.y = spilt.y - 10 - lv.height * lv.scaleY;

            let capnum = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
            top.addChild(capnum);
            capnum.text = String(Config.LevelCfg.getLevelNeedScore(index+1)) || "100"
            capnum.x = spilt.x - capnum.width / 2;
            capnum.y = spilt.y + (spilt.height - capnum.height) / 2;
            
        }
        
        return top;
    }

    private initBottom(width:number, height:number):BaseDisplayObjectContainer{
        let bom = new BaseDisplayObjectContainer();
        bom.width = width;
        bom.height = height;

        let bigbg = BaseBitmap.create("userinfo_view_bottom_bg");
        bom.addChild(bigbg);
        bigbg.x = 0;
        bigbg.y = 60;
        bigbg.width = width;
        bigbg.height = height - 60;

        // // 标题背景
        // let bg = BaseBitmap.create("userinfo_view_bottom_title");
        // bom.addChild(bg);
        // bg.x = 0;
        // bg.y = 0;
        // bg.width = width;
        // bg.height = 60;
        // 标题文字
        let title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, 0x1953A1);
        bom.addChild(title);
        title.width = bom.width;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.bold = true;
        title.text = LangMger.getlocal("userinfo_bottom_title");
        title.x = 0;
        title.y = 10;

        let win = this.bottomItem("userinfo_win", "userinfo_view_victory_icon");
        bom.addChild(win.con);
        win.con.y = 70;
        win.con.x = 10;
        this._winTxt = win.txt;

        let loss = this.bottomItem("userinfo_loss", "userinfo_view_loss_icon");
        bom.addChild(loss.con);
        loss.con.x = win.con.x + win.con.width + 28;
        loss.con.y = win.con.y;
        this._lossTxt = loss.txt;

        let rate = this.bottomItem("userinfo_win_rate", "userinfo_view_win_rate_icon");
        bom.addChild(rate.con);
        rate.con.x = win.con.x;
        rate.con.y = win.con.y + win.con.height + 10;
        this._rateTxt = rate.txt;
        let btn = this.modifyBtn("userinfo_view_fresh", this.reRateBtnOnclick);
        rate.con.addChild(btn.btn);
        btn.btn.x = rate.con.width - btn.btn.width;
        btn.btn.y = 25;
        this._reRate = btn.num;

        let maxScore = this.bottomItem("userinfo_max_score", "userinfo_view_cap_icon");
        bom.addChild(maxScore.con);
        maxScore.con.x = loss.con.x;
        maxScore.con.y = rate.con.y;
        this._maxScoreTxt = maxScore.txt;

        let maxTurn = this.bottomItem("userinfo_max_trun", "userinfo_view_oper_icon");
        bom.addChild(maxTurn.con);
        maxTurn.con.x = win.con.x;
        maxTurn.con.y = rate.con.y + rate.con.height + 10;
        this._maxTrunTxt = maxTurn.txt;

        let dice = this.bottomItem("userinfo_dice_num", "userinfo_view_lz_icon");
        bom.addChild(dice.con);
        dice.con.x = loss.con.x;
        dice.con.y = maxTurn.con.y;
        this._diceTxt = dice.txt;

        let idcon = this.bottomItem("userinfo_id", "userinfo_view_id_icon","userinfo_item_id_bg");
        bom.addChild(idcon.con);
        idcon.con.x = win.con.x;
        idcon.con.y = maxTurn.con.y + maxTurn.con.height + 10;
        this._idTxt = idcon.txt;
        let rename = this.modifyBtn("userinfo_view_rename_icon", this.reNameBtnOnclick);
        idcon.con.addChild(rename.btn);
        rename.btn.x = idcon.con.width - rename.btn.width;
        rename.btn.y = 25;
        this._reName = rename.num;

        return bom;
    }

    private modifyBtn(iconURL:string, callback:Function){
        let btn = new BaseButton();
        btn.init("userinfo_view_btn", "", callback,this);

        let icon = BaseBitmap.create(iconURL);
        btn.addChild(icon);
        icon.x = (btn.width - icon.width) / 2;
        icon.y = 7;

        let scale = 0.6;
        let gem = BaseBitmap.create("ab_mainui_gem");
        btn.addChild(gem);
        gem.x = 10;
        gem.y = btn.height - gem.height * scale - 5;
        gem.scaleX = scale;
        gem.scaleY = scale;

        let num = ComponentMgr.getTextField('11', 18, ColorEnums.white);
        btn.addChild(num);
        num.text = "50"
        num.x = gem.x + gem.width * scale + 2;
        num.y = gem.y + (gem.height * scale - num.height) / 2;

        return {"btn": btn, "num": num};
    }

    private bottomItem(key:string, iconurl?:string, bgurl?:string){
        iconurl = iconurl || "userinfo_view_cap";
        bgurl = bgurl || "userinfo_item_bg";
        let con = new BaseDisplayObjectContainer();

        // 标题
        let title = ComponentMgr.getTextField('11', 20, ColorEnums.white);
        con.addChild(title);
        title.bold = true;
        title.text = LangMger.getlocal(key)
        title.x = 0;
        title.y = 0;
        // 框框背景
        let bg = BaseBitmap.create(bgurl);
        con.addChild(bg);
        bg.x = title.x;
        bg.y = title.y + title.height + 10;

        // icon
        let icon = BaseBitmap.create(iconurl);
        con.addChild(icon);
        icon.x = bg.x + 5;
        icon.y = bg.y + (bg.height - icon.height) / 2;
        
        // 文本
        let info = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        con.addChild(info);
        info.bold = true;
        info.text = "3"
        info.x = icon.x + icon.width + 30;
        info.y = icon.y + (icon.height - info.height) / 2;
        info.name = "info";

        return {"con":con, "txt":info};
    }

    private bullbeBox(width?:number, height?:number):BubbleBox{
        width = width || 120;
        height = height || 57;
        let box = new BubbleBox();
        box.initView("userinfo_view_triangle", "userinfo_view_youbiao", width, height, null, 5);
        
        let cap = BaseBitmap.create("trophy_icon");
        box.addChildCon(cap);
        cap.setScale(0.3);
        cap.x = 10;
        cap.y = 13;
        
        let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.black);
        box.addChildCon(txt);
        txt.text = "40000"
        txt.x = cap.x + cap.width * cap.scaleX;
        txt.y = cap.y + (cap.height * cap.scaleX - txt.height) / 2;
        txt.name = "TextField";
        this._capnum = txt;
        
        return box;
    }

    private reRateBtnOnclick(){
        this.hide();
        ViewController.getInstance().openView(ViewConst.SETWINPOPUPVIEW);
        // this.request(NetConst.USER_RESETWIN, {});
    }

    private reNameBtnOnclick(){
        // this.request(NetConst.USER_RENAME, {name: "新的名字"})
        ViewController.getInstance().openView(ViewConst.RENAMEPOPUPVIEW);
        this.hide();
    }

    // // 初始化标题
    // protected initTitle():void
    // {
    //     let bg = BaseBitmap.create(this.getTitleBgName());
    //     this.addChild(bg);
    //     this._titlebg = bg;
    //     this.viewBg.width = this._titlebg.width;
    //     super.initTitle();
    // }

    protected resetBgSize(){
        super.resetBgSize();
    }

    protected initBg(){
        super.initBg();
        this.viewBg.width = this.getShowWidth();
    }

    public show(data?:any):void
    {
        super.show(data);
    }

    // 需要加载的资源
    protected getResourceList():string[]
    {
        return super.getResourceList();
    }

    // protected initBg():void
    // {
    //     super.initBg();
    // }

    protected showLineFrame():boolean
    {
        return false;
    }

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return 841;
    }

    // 计算背景高度时使用，在container高度的基础上添加该高度
    protected getBgExtraHeight():number
    {
        return super.getBgExtraHeight();
    }

    // 背景图名称
    protected getBgName():string
    {
        return "ab_task_view_bg";
    }
    // 标题背景名称
    // protected getTitleBgName():string
    // {
    //     return "public_dice_title_bg";
    // }

    // 关闭按钮图标名称
    // protected getCloseBtnName():string
    // {
    //     return "popupview_closebtn2";
    // }

    public dispose():void
    {
        this._diceTxt = null;
        this._idTxt = null;
        this._lossTxt = null;
        this._maxScoreTxt = null;
        this._maxTrunTxt = null;
        this._reName = null;
        this._reRate = null;
        this.flag = 0;
        super.dispose();
    }
}