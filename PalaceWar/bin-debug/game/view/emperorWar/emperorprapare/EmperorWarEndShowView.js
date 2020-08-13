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
/**
 * 结束展示界面
 * author qianjun
 */
var EmperorWarEndShowView = (function (_super) {
    __extends(EmperorWarEndShowView, _super);
    function EmperorWarEndShowView() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this._curRoleImg = null;
        _this._empBottom = null;
        _this._rewardBtn = null;
        _this._empData = null;
        return _this;
    }
    EmperorWarEndShowView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emparena_bottom", "empgodbless_tip_bg",
            "empbmce", "empbmce_down", "servant_attributemap", "empvsbattle", "empvsbattle_down", "gojndian", "gojndian_down", "empreward", "empreward_down",
            "emperorwarbg5",
            "icon_fight_tex_png", "icon_fight_tex_json", "icon_fight_ske",
        ]);
    };
    EmperorWarEndShowView.prototype.getTitleStr = function () {
        return "emperorWarEnterViewTitle";
    };
    EmperorWarEndShowView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_PALACE;
    };
    EmperorWarEndShowView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenSeat()) {
            return "EmpWarEndShowRuleInfo_withNewMonthYear";
        }
        return "EmpWarEndShowRuleInfo";
    };
    EmperorWarEndShowView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_EMPEROR_GETMODEL, requestData: {
                version: view.api.getVersion(),
            } };
    };
    Object.defineProperty(EmperorWarEndShowView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    //请求回调
    EmperorWarEndShowView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            var cmd = data.data.cmd;
            if (data.data.data.myemperor.version > view.api.getVersion()) {
                return;
            }
            if (data.data.data.myemperor) {
                Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
            }
        }
    };
    EmperorWarEndShowView.prototype.userShotCallback = function (event) {
        var view = this;
        if (event.data.ret) {
            var data = event.data.data.data;
            //ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
            this._empData = data;
        }
    };
    EmperorWarEndShowView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            // 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
        }
    };
    // 背景图名称
    EmperorWarEndShowView.prototype.getBgName = function () {
        return "emperorwarbg5";
    };
    EmperorWarEndShowView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST), this.receiveBmlist, this);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_BMLIST, {
            version: view.api.getVersion(),
            sort: view.api.type <= 2 ? 1 : 2 // 1报名时间排序 2消耗人望币排序
        });
        //活动详情
        // let detailBtn = ComponentManager.getButton(`empdetail`, ``, view.clickDetail, this);
        // view.setLayoutPosition(LayoutConst.lefttop, detailBtn, view.titleBg, [10,view.titleBg.height + 10]);
        // view.addChild(detailBtn);
        //
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        emparena_bottom.height = 108;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        view._empBottom = emparena_bottom;
        //倒计时提示
        var timeBg = BaseBitmap.create("empgodbless_tip_bg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, emparena_bottom, [0, -timeBg.height - 8]);
        view.addChild(timeBg);
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        var type = view.api.judge_time();
        var timedesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorTimeDesc5"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timedesc, timeBg);
        view.addChild(timedesc);
        var distance = (emparena_bottom.width - 4 * 120 - 3 * 40) / 2;
        var bmcBtn = ComponentManager.getButton('empbmce', "", view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, bmcBtn, emparena_bottom, [distance, 0]);
        view.addChild(bmcBtn);
        var vsBtn = ComponentManager.getButton('empvsbattle', "", view.vsClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, vsBtn, bmcBtn, [bmcBtn.width + 40, 0]);
        view.addChild(vsBtn);
        var goBtn = ComponentManager.getButton('gojndian', "", view.goClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, goBtn, vsBtn, [vsBtn.width + 40, 0]);
        view.addChild(goBtn);
        var rewardBtn = ComponentManager.getButton('empreward', "", view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, rewardBtn, goBtn, [goBtn.width + 40, 0]);
        view.addChild(rewardBtn);
        view._rewardBtn = rewardBtn;
        var cfg = Config.EmperorwarCfg;
        if (!Api.servantVoApi.getServantObj(String(cfg.servant))) {
            var curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if (curNum >= cfg.exchangeNum) {
                App.CommonUtil.addIconToBDOC(view._rewardBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
    };
    EmperorWarEndShowView.prototype.tick = function () {
        var view = this;
        var cfg = Config.EmperorwarCfg;
        if (!Api.servantVoApi.getServantObj(String(cfg.servant))) {
            var curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if (curNum >= cfg.exchangeNum) {
                App.CommonUtil.addIconToBDOC(view._rewardBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
    };
    //奖励弹窗
    EmperorWarEndShowView.prototype.rewardClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW);
    };
    //活动详情弹窗
    EmperorWarEndShowView.prototype.goClick = function () {
        var view = this;
        var key = 31;
        var buildcfg = GameConfig.config.buildingCfg[key];
        var titleId = buildcfg.title;
        if (buildcfg && buildcfg.unlock == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
        }
        else {
            var buildingId = key;
            if (Object.keys(titleId).length == 1) {
                var tid = titleId[0];
                var titlecfg = Config.TitleCfg.getTitleCfgById(tid);
                if (titlecfg.unlock == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                    return;
                }
                Api.palaceVoApi.enterKingsHouse();
                view.hide();
            }
        }
    };
    //对战详情
    EmperorWarEndShowView.prototype.vsClick = function () {
        var view = this;
        if (!view.api.getBmlistData().length) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCancel2"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARVSVIEW);
    };
    //报名册弹窗
    EmperorWarEndShowView.prototype.bmcClick = function () {
        var view = this;
        if (!view.api.getBmlistData().length) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCancel2"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    };
    EmperorWarEndShowView.prototype.receiveBmlist = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.ret) {
            if (data.data.ret < 0) {
                return;
            }
            var cmd = data.data.cmd;
            if (cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST) {
                if (data.data.data.bmlist) {
                    view.api.setBmListData(data.data.data.bmlist);
                    //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
                    var empdata = view.api.getWinnerEmpData(); //中部展示
                    if (empdata && !view._curRoleImg) {
                        var roleinfo = new PalaceRoleInfoVo();
                        empdata['titleId'] = '3201';
                        roleinfo.initData(empdata);
                        view._curRoleImg = new PalaceRoleInfoItem();
                        view._curRoleImg.y = 50;
                        view._curRoleImg.refreshUIWithData(roleinfo);
                        view._curRoleImg.anchorOffsetX = view._curRoleImg.width / 2;
                        view._curRoleImg.anchorOffsetY = view._curRoleImg.height / 2;
                        view._curRoleImg.scaleX = view._curRoleImg.scaleY = 0.8;
                        view._curRoleImg.visible = true;
                        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curRoleImg, view.titleBg, [view._curRoleImg.width / 2 * 0.8, view.titleBg.height + (view._empBottom.y - view.titleBg.y - view.titleBg.height - view._curRoleImg.height * view._curRoleImg.scaleX) / 2 + view._curRoleImg.height / 2 * 0.8]);
                        view.addChild(view._curRoleImg);
                        view._curRoleImg.setHeadHeight();
                    }
                    ;
                }
            }
        }
    };
    EmperorWarEndShowView.prototype.dispose = function () {
        var view = this;
        view._empBottom = null;
        view._curRoleImg = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST), this.receiveBmlist, this);
        _super.prototype.dispose.call(this);
    };
    return EmperorWarEndShowView;
}(CommonView));
__reflect(EmperorWarEndShowView.prototype, "EmperorWarEndShowView");
//# sourceMappingURL=EmperorWarEndShowView.js.map