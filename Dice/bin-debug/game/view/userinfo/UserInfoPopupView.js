/*
 *@description: 龙珠人物信息界面
 *@author: hwc
 *@date: 2020-04-14 14:58:44
 *@version 0.0.1
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var UserInfoPopupView = (function (_super) {
    __extends(UserInfoPopupView, _super);
    function UserInfoPopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 标记是否初始化完成？？？
        _this.flag = 0;
        _this.detaX = 114;
        return _this;
    }
    UserInfoPopupView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_USERINFO, MsgConst.MODEL_DICE,
        ];
    };
    UserInfoPopupView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_USERINFO:
            case MsgConst.MODEL_DICE:
                view.refresh();
                break;
        }
    };
    UserInfoPopupView.prototype.initView = function () {
        var width = 512;
        var height = 236;
        var top = this.initTop(width, height);
        var scorll = ComponentMgr.getScrollView(top, new egret.Rectangle(0, 0, width, height));
        this.addChildToContainer(scorll);
        scorll.x = (this.viewBg.width - width) / 2;
        scorll.y = 10;
        // scorll.setScrollLeft(this._por.getPercent() * this._por.width, 500);
        this.scrollTo(scorll);
        var bottom = this.initBottom(512, 488);
        this.addChildToContainer(bottom);
        bottom.y = scorll.height + scorll.y + 10;
        bottom.x = scorll.x;
        this.flag = 1;
        this.refresh();
    };
    UserInfoPopupView.prototype.scrollTo = function (scorll) {
        var toX = this._por.getPercent() * this._por.width;
        if (toX < 269)
            return;
        if (toX > 1778) {
            toX = 1778;
        }
        else {
            toX -= 269;
        }
        scorll.setScrollLeft(toX, 1000);
    };
    UserInfoPopupView.prototype.refresh = function () {
        if (this.flag == 0) {
            return;
        }
        var winnum = Api.UserinfoVoApi.getWin();
        var lossnum = Api.UserinfoVoApi.getLose();
        this._winTxt.text = Api.UserinfoVoApi.getWin().toString();
        this._lossTxt.text = Api.UserinfoVoApi.getLose().toString();
        var ratenum = 0;
        ratenum = (winnum + lossnum <= 0) ? 0 : winnum / (winnum + lossnum) * 100;
        ratenum = Math.floor(ratenum);
        this._rateTxt.text = ratenum + "%";
        this._maxScoreTxt.text = Api.UserinfoVoApi.getMaxscore().toString();
        this._maxTrunTxt.text = Api.UserinfoVoApi.getMaxturn().toString();
        this._idTxt.text = Api.UserinfoVoApi.getName();
        var havenum = Api.DiceVoApi.getDiceTotalType();
        var totalnum = Config.DiceCfg.getTotalDice();
        this._diceTxt.text = havenum + "/" + totalnum;
        this._reName.text = String(Api.SigninfoVoApi.getRenameNum() == 0 ? 0 : Config.GamebaseCfg.renameGem);
        this._por.setPercentage(this.getProgressNum());
        // 气泡刷新
        this._capnum.text = String(Api.UserinfoVoApi.getScore());
        var bubble_x = this._por.getPercent() * this._por.width;
        if (bubble_x >= this._por.width - this._bubble.width) {
            this._bubble.TryangleX = bubble_x - (this._por.width - this._bubble.width);
            this._bubble.x = this._por.width - this._bubble.width;
        }
        else {
            this._bubble.x = bubble_x - this._bubble.TryangleX;
        }
    };
    UserInfoPopupView.prototype.getProgressNum = function () {
        var num = 0;
        var level = Api.UserinfoVoApi.getLevel();
        var curCap = Api.UserinfoVoApi.getScore();
        curCap = (Config.LevelCfg.getLevelNeedScore(level + 1) < curCap) ? Config.LevelCfg.getLevelNeedScore(level + 1) - 1 : curCap;
        var tem = curCap - Config.LevelCfg.getLevelNeedScore(level);
        var upnum = Config.LevelCfg.getLevelNeedScore(level + 1) - Config.LevelCfg.getLevelNeedScore(level);
        var d = tem / upnum / 20.5;
        num = level / 20.5 + d;
        return num;
    };
    UserInfoPopupView.prototype.initTop = function (width, height) {
        var top = new BaseDisplayObjectContainer();
        // top.width = width;
        // top.height = height;
        var bg = BaseBitmap.create("userinfo_view_top_bg1");
        top.addChild(bg);
        bg.x = 0;
        bg.y = 0;
        bg.height = 236;
        bg.width = 2337;
        var pro = ComponentMgr.getProgressBar("userinfo_view_progress", "userinfo_view_bar", bg.width);
        top.addChild(pro);
        pro.x = 0;
        pro.y = (bg.height - pro.height) / 2;
        pro.setPercentage(this.getProgressNum());
        this._por = pro;
        var box = this.bullbeBox();
        top.addChild(box);
        box.x = 200;
        box.y = pro.y + pro.height + 10;
        this._bubble = box;
        for (var index = 0; index < 20; index++) {
            var spilt = BaseBitmap.create("userinfo_view_top_split");
            top.addChild(spilt);
            spilt.x = 114 * (index + 1);
            spilt.y = pro.y;
            var lv = BaseLoadBitmap.create("levelicon" + (index + 1));
            top.addChild(lv);
            lv.setScale(0.175);
            lv.x = spilt.x - lv.width * lv.scaleX / 2;
            lv.y = spilt.y - 10 - lv.height * lv.scaleY;
            var capnum = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
            top.addChild(capnum);
            capnum.text = String(Config.LevelCfg.getLevelNeedScore(index + 1)) || "100";
            capnum.x = spilt.x - capnum.width / 2;
            capnum.y = spilt.y + (spilt.height - capnum.height) / 2;
        }
        return top;
    };
    UserInfoPopupView.prototype.initBottom = function (width, height) {
        var bom = new BaseDisplayObjectContainer();
        bom.width = width;
        bom.height = height;
        var bigbg = BaseBitmap.create("userinfo_view_bottom_bg");
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
        var title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, 0x1953A1);
        bom.addChild(title);
        title.width = bom.width;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.bold = true;
        title.text = LangMger.getlocal("userinfo_bottom_title");
        title.x = 0;
        title.y = 10;
        var win = this.bottomItem("userinfo_win", "userinfo_view_victory_icon");
        bom.addChild(win.con);
        win.con.y = 70;
        win.con.x = 10;
        this._winTxt = win.txt;
        var loss = this.bottomItem("userinfo_loss", "userinfo_view_loss_icon");
        bom.addChild(loss.con);
        loss.con.x = win.con.x + win.con.width + 28;
        loss.con.y = win.con.y;
        this._lossTxt = loss.txt;
        var rate = this.bottomItem("userinfo_win_rate", "userinfo_view_win_rate_icon");
        bom.addChild(rate.con);
        rate.con.x = win.con.x;
        rate.con.y = win.con.y + win.con.height + 10;
        this._rateTxt = rate.txt;
        var btn = this.modifyBtn("userinfo_view_fresh", this.reRateBtnOnclick);
        rate.con.addChild(btn.btn);
        btn.btn.x = rate.con.width - btn.btn.width;
        btn.btn.y = 25;
        this._reRate = btn.num;
        var maxScore = this.bottomItem("userinfo_max_score", "userinfo_view_cap_icon");
        bom.addChild(maxScore.con);
        maxScore.con.x = loss.con.x;
        maxScore.con.y = rate.con.y;
        this._maxScoreTxt = maxScore.txt;
        var maxTurn = this.bottomItem("userinfo_max_trun", "userinfo_view_oper_icon");
        bom.addChild(maxTurn.con);
        maxTurn.con.x = win.con.x;
        maxTurn.con.y = rate.con.y + rate.con.height + 10;
        this._maxTrunTxt = maxTurn.txt;
        var dice = this.bottomItem("userinfo_dice_num", "userinfo_view_lz_icon");
        bom.addChild(dice.con);
        dice.con.x = loss.con.x;
        dice.con.y = maxTurn.con.y;
        this._diceTxt = dice.txt;
        var idcon = this.bottomItem("userinfo_id", "userinfo_view_id_icon", "userinfo_item_id_bg");
        bom.addChild(idcon.con);
        idcon.con.x = win.con.x;
        idcon.con.y = maxTurn.con.y + maxTurn.con.height + 10;
        this._idTxt = idcon.txt;
        var rename = this.modifyBtn("userinfo_view_rename_icon", this.reNameBtnOnclick);
        idcon.con.addChild(rename.btn);
        rename.btn.x = idcon.con.width - rename.btn.width;
        rename.btn.y = 25;
        this._reName = rename.num;
        return bom;
    };
    UserInfoPopupView.prototype.modifyBtn = function (iconURL, callback) {
        var btn = new BaseButton();
        btn.init("userinfo_view_btn", "", callback, this);
        var icon = BaseBitmap.create(iconURL);
        btn.addChild(icon);
        icon.x = (btn.width - icon.width) / 2;
        icon.y = 7;
        var scale = 0.6;
        var gem = BaseBitmap.create("ab_mainui_gem");
        btn.addChild(gem);
        gem.x = 10;
        gem.y = btn.height - gem.height * scale - 5;
        gem.scaleX = scale;
        gem.scaleY = scale;
        var num = ComponentMgr.getTextField('11', 18, ColorEnums.white);
        btn.addChild(num);
        num.text = "50";
        num.x = gem.x + gem.width * scale + 2;
        num.y = gem.y + (gem.height * scale - num.height) / 2;
        return { "btn": btn, "num": num };
    };
    UserInfoPopupView.prototype.bottomItem = function (key, iconurl, bgurl) {
        iconurl = iconurl || "userinfo_view_cap";
        bgurl = bgurl || "userinfo_item_bg";
        var con = new BaseDisplayObjectContainer();
        // 标题
        var title = ComponentMgr.getTextField('11', 20, ColorEnums.white);
        con.addChild(title);
        title.bold = true;
        title.text = LangMger.getlocal(key);
        title.x = 0;
        title.y = 0;
        // 框框背景
        var bg = BaseBitmap.create(bgurl);
        con.addChild(bg);
        bg.x = title.x;
        bg.y = title.y + title.height + 10;
        // icon
        var icon = BaseBitmap.create(iconurl);
        con.addChild(icon);
        icon.x = bg.x + 5;
        icon.y = bg.y + (bg.height - icon.height) / 2;
        // 文本
        var info = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        con.addChild(info);
        info.bold = true;
        info.text = "3";
        info.x = icon.x + icon.width + 30;
        info.y = icon.y + (icon.height - info.height) / 2;
        info.name = "info";
        return { "con": con, "txt": info };
    };
    UserInfoPopupView.prototype.bullbeBox = function (width, height) {
        width = width || 120;
        height = height || 57;
        var box = new BubbleBox();
        box.initView("userinfo_view_triangle", "userinfo_view_youbiao", width, height, null, 5);
        var cap = BaseBitmap.create("trophy_icon");
        box.addChildCon(cap);
        cap.setScale(0.3);
        cap.x = 10;
        cap.y = 13;
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.black);
        box.addChildCon(txt);
        txt.text = "40000";
        txt.x = cap.x + cap.width * cap.scaleX;
        txt.y = cap.y + (cap.height * cap.scaleX - txt.height) / 2;
        txt.name = "TextField";
        this._capnum = txt;
        return box;
    };
    UserInfoPopupView.prototype.reRateBtnOnclick = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.SETWINPOPUPVIEW);
        // this.request(NetConst.USER_RESETWIN, {});
    };
    UserInfoPopupView.prototype.reNameBtnOnclick = function () {
        // this.request(NetConst.USER_RENAME, {name: "新的名字"})
        ViewController.getInstance().openView(ViewConst.RENAMEPOPUPVIEW);
        this.hide();
    };
    // // 初始化标题
    // protected initTitle():void
    // {
    //     let bg = BaseBitmap.create(this.getTitleBgName());
    //     this.addChild(bg);
    //     this._titlebg = bg;
    //     this.viewBg.width = this._titlebg.width;
    //     super.initTitle();
    // }
    UserInfoPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
    };
    UserInfoPopupView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        this.viewBg.width = this.getShowWidth();
    };
    UserInfoPopupView.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    // 需要加载的资源
    UserInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this);
    };
    // protected initBg():void
    // {
    //     super.initBg();
    // }
    UserInfoPopupView.prototype.showLineFrame = function () {
        return false;
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    UserInfoPopupView.prototype.getShowHeight = function () {
        return 841;
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    UserInfoPopupView.prototype.getBgExtraHeight = function () {
        return _super.prototype.getBgExtraHeight.call(this);
    };
    // 背景图名称
    UserInfoPopupView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
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
    UserInfoPopupView.prototype.dispose = function () {
        this._diceTxt = null;
        this._idTxt = null;
        this._lossTxt = null;
        this._maxScoreTxt = null;
        this._maxTrunTxt = null;
        this._reName = null;
        this._reRate = null;
        this.flag = 0;
        _super.prototype.dispose.call(this);
    };
    return UserInfoPopupView;
}(PopupView));
__reflect(UserInfoPopupView.prototype, "UserInfoPopupView");
//# sourceMappingURL=UserInfoPopupView.js.map