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
 * 对战图界面
 * author qianjun
 */
var EmperorWarVsView = (function (_super) {
    __extends(EmperorWarVsView, _super);
    function EmperorWarVsView() {
        var _this = _super.call(this) || this;
        _this._timeDesc = null;
        _this._midBtn = null;
        _this._buzhenBtn = null;
        _this._time = 0;
        _this._midgroup = null;
        _this._vsgroup1 = null;
        _this._vsgroup2 = null;
        _this._vsgroup3 = null;
        _this._vsgroup4 = null;
        _this._bg = null;
        _this.cheerShow = false;
        _this._fireclip = null;
        _this.stopTick = false;
        _this.midlineWidth = 0;
        _this.fugroup1_1 = null;
        _this.fugroup2_1 = null;
        _this.fugroup3_1 = null;
        _this.fugroup4_1 = null;
        _this.fugroup1_2 = null;
        _this.fugroup2_2 = null;
        _this.fugroup1_3 = null;
        return _this;
    }
    EmperorWarVsView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emparena_bottom", "empgodbless_tip_bg",
            "empgquan", "emphfangbg", "emphfang", "emphfang_down", "empfightfu",
            "empvsmanbg1", "empvsmanbg2", "empvsmanbg3", "empvsbattle", "empvsbattle_down", "emptline1", "emptline2", "emptline3", "empline1", "empline2", "empline3", "empzhuwei", "empzhuwei_down",
            "emperorwarbg2", "emperorwarbg3", "emperorwarcheerbg", "empvsmask",
            "empshopbtn", "empshopbtn_down", "fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09",
            "empbmce", "empbmce_down", "empfight_down", "empfight"
        ]);
    };
    EmperorWarVsView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_EMPEROR_BMLIST, requestData: {
                version: view.api.getVersion(),
                sort: view.api.type <= 2 ? 1 : 2 // 1报名时间排序 2消耗人望币排序
            } };
    };
    EmperorWarVsView.prototype.getRuleInfo = function () {
        var view = this;
        // return `EmpWarVsRule-${view.api.type}`;
        if (Api.switchVoApi.checkOpenSeat()) {
            return "EmpWarVsRule-" + view.api.type + "_withNewMonthYear";
        }
        // let view = this;
        return "EmpWarVsRule-" + view.api.type;
    };
    Object.defineProperty(EmperorWarVsView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    //请求回调
    EmperorWarVsView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            var cmd = data.data.cmd;
            if (cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST) {
                if (data.data.data.bmlist) {
                    view.api.setBmListData(data.data.data.bmlist);
                    if (view.api.freshFight) {
                        view.freshFight();
                        view.api.freshFight = false;
                        view.showFuTween(true);
                    }
                }
            }
        }
    };
    // 背景图名称
    EmperorWarVsView.prototype.getBgName = function () {
        var view = this;
        return view.api.type == 3 ? "emperorwarbg2" : "emperorwarcheerbg";
    };
    EmperorWarVsView.prototype.initBg = function () {
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
            this.viewBg.y = (GameConfig.stageHeigth - 1136) / 2;
        }
    };
    EmperorWarVsView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        if (view.api.type == 5) {
            view.stopTick = true;
        }
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_GETMODEL, {
            version: view.api.getVersion(),
        });
        var timeBg = BaseBitmap.create("empgodbless_tip_bg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, view.titleBg, [0, view.titleBg.height + 12]);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPWEAR_ZHUWEI_SUCCESS, view.cheerCallBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPEROR_FRESHPLAYERDATA, view.freshFight, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPEROR_FRESHFIGHTEND, view.freshFightEnd, view);
        view.addChild(timeBg);
        var shopBtn = ComponentManager.getButton('empshopbtn', "", view.shopClick, view);
        var bmcBtn = ComponentManager.getButton('empbmce', "", view.bmcClick, view);
        // let height = shopBtn.height + ;
        view.setLayoutPosition(LayoutConst.rightverticalCenter, shopBtn, view, [0, -bmcBtn.height / 2]);
        view.addChild(shopBtn);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bmcBtn, shopBtn, [0, shopBtn.height]);
        view.addChild(bmcBtn);
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        var type = view.api.judge_time();
        view._time = view.api.getCountDownTime();
        var flag = view.api.isShowFightFu();
        view._timeDesc = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (type == 4) {
            var period = view.api.getFightPeriod2();
            view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc4-" + period + "-" + (flag ? 2 : 1), [App.DateUtil.getFormatBySecond(Math.max((flag ? view._time : (view._time - 360)), 0))]);
        }
        else {
            view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc" + type, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, timeBg);
        view.addChild(view._timeDesc);
        //背景图
        var bg = view.viewBg;
        bg.setload(type == 3 ? "emperorwarbg2" : "emperorwarcheerbg");
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        emparena_bottom.x = 0;
        view.addChild(emparena_bottom);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorReward", view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardBtn, emparena_bottom);
        view.addChild(rewardBtn);
        if (view.api.isCanJoinWar()) {
            view.setLayoutPosition(LayoutConst.leftverticalCenter, rewardBtn, emparena_bottom, [50, 0]);
            var buzhenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorWarBuzhen", view.buzhenClick, view);
            view.setLayoutPosition(LayoutConst.rightverticalCenter, buzhenBtn, emparena_bottom, [50, 0]);
            buzhenBtn.setEnable(type < 5);
            view.addChild(buzhenBtn);
            view._buzhenBtn = buzhenBtn;
        }
        //对决图
        view._midgroup = new BaseDisplayObjectContainer();
        view._midgroup.width = GameConfig.stageWidth;
        view._midgroup.height = emparena_bottom.y - timeBg.y - timeBg.height - 10;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._midgroup, timeBg, [0, timeBg.height + 10]);
        view.addChild(view._midgroup);
        var pos = [LayoutConst.lefttop, LayoutConst.righttop, LayoutConst.leftbottom, LayoutConst.rightbottom];
        var desc = (GameConfig.stageWidth - 154 * 4) / 3;
        for (var i = 1; i <= 4; ++i) {
            var group = new BaseDisplayObjectContainer();
            group.width = 154 * 2 + desc;
            group.height = 172;
            view.setLayoutPosition(pos[i - 1], group, view._midgroup, [0, (i > 2 ? 15 : 0)]);
            view.addChild(group);
            view["_vsgroup" + i] = group;
        }
        //8头像
        view.createMid();
        //晋级之路
        view.createLine();
        //按钮展示
        view.createFightBtn();
        //报名按钮 按时间段显示
        view._midBtn = ComponentManager.getButton(type < 4 ? "empzhuwei" : "empvsbattle", "", this.enterHandle, this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._midBtn, view, [0, -40]);
        view._midBtn.setEnable(type > 1);
        view._midBtn.visible = type < 4;
        view.addChild(view._midBtn);
        egret.Tween.get(view._midBtn, { onChange: function () {
                view._midBtn.x = (GameConfig.stageWidth - view._midBtn.width * view._midBtn.scaleX) / 2,
                    view._midBtn.y = (GameConfig.stageHeigth - view._midBtn.height * view._midBtn.scaleY - 80) / 2;
            }, onChangeObj: view, loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        if (view.api.type < 4) {
            var fireclip = ComponentManager.getCustomMovieClip("fire_0", 9, 50);
            fireclip.width = 311;
            fireclip.height = 416;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fireclip, view._midBtn, [0, -150]);
            fireclip.y = view._midBtn.y - 204;
            view.addChild(fireclip);
            fireclip.goToAndPlay(0);
            fireclip.playWithTime(-1);
            view._fireclip = fireclip;
            fireclip.visible = view.api.isHaveZhuWei();
        }
        //刷新进度
        view.freshFight();
    };
    EmperorWarVsView.prototype.bmcClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    };
    EmperorWarVsView.prototype.shopClick = function () {
        var view = this;
        if (view.api.type == 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarShopNot2"));
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSHOPVIEW);
        }
    };
    EmperorWarVsView.prototype.createLine = function () {
        var view = this;
        //8条基准线
        var vs = { 1: [1, 8], 2: [4, 5], 3: [2, 7], 4: [3, 6] };
        for (var i in vs) {
            var group = view["_vsgroup" + i];
            //1阶段战斗线 8条4按钮
            for (var j in vs[i]) {
                var numb = vs[i][j];
                var manbg = group.getChildByName("manbg" + numb);
                var line_1 = BaseBitmap.create("empline1");
                line_1.name = "line" + numb + "-1";
                line_1.width = 90;
                line_1.scaleX = Number(j) == 1 ? -1 : 1;
                line_1.scaleY = Number(i) < 3 ? 1 : -1;
                group.setLayoutPosition(LayoutConst.lefttop, line_1, manbg, [(manbg.width) / 2 + (Number(j) == 0 ? -7 : 5), Number(i) < 3 ? (manbg.height - 5) : 5]);
                group.addChild(line_1);
            }
            //2阶段战斗线 4条2按钮
            var line_2 = BaseBitmap.create("empline1");
            line_2.name = "line" + i + "-2";
            line_2.visible = false;
            line_2.width = 170;
            line_2.scaleX = Number(i) % 2 == 0 ? -1 : 1;
            line_2.scaleY = Number(i) < 3 ? 1 : -1;
            group.setLayoutPosition(LayoutConst.lefttop, line_2, group, [line_2.scaleX == 1 ? 150 : (163 - group.x), line_2.scaleY == 1 ? (200 - group.y) : (-59 - group.y)]);
            group.addChild(line_2);
            //3阶段战斗线 2条1按钮
            if (Number(i) % 2) {
                var line_3 = BaseBitmap.create("emptline1");
                line_3.name = Number(i) < 3 ? "line1-3" : "line2-3";
                line_3.visible = false;
                line_3.height = Number(i) < 3 ? (Math.abs(view._midgroup.height - 50) / 2 - line_2.y) : view.midlineWidth;
                view.midlineWidth = line_3.height;
                line_3.anchorOffsetY = 31;
                line_3.anchorOffsetX = line_3.width / 2;
                line_3.scaleY = Number(i) < 3 ? 1 : -1;
                //line_3.rotation = Number(i) < 3 ? 90 : -90;
                group.setLayoutPosition(LayoutConst.lefttop, line_3, group, [line_2.x + line_2.width, Number(i) < 3 ? (line_2.y + 32 + 15 - group.y) : (line_2.y - 32 - 15 - group.y)]);
                group.addChild(line_3);
            }
        }
    };
    EmperorWarVsView.prototype.createFightBtn = function () {
        var view = this;
        var obj = {
            1: [1, 2, 3, 4],
            2: [1, 2],
            3: [1]
        };
        var numb = {
            1: [1, 8],
            2: [4, 5],
            3: [2, 7],
            4: [3, 6]
        };
        for (var round in obj) {
            var arr = obj[round];
            for (var i in arr) {
                var groupidx = arr[i];
                var groupname = groupidx + "_" + round;
                var group = new BaseDisplayObjectContainer();
                var baseGroup = (groupname == "2_2" ? view["_vsgroup3"] : view["_vsgroup" + groupidx]);
                group.x = baseGroup.x;
                group.y = baseGroup.y;
                view.addChild(group);
                view["fugroup" + groupname] = group;
                var linename = '';
                switch (Number(round)) {
                    case 1:
                        linename = "line" + numb[groupidx][0] + "-" + round;
                        break;
                    case 2:
                        linename = i == '0' ? "line1-" + round : "line3-" + round;
                        group.visible = false;
                        break;
                    case 3:
                        linename = "line1-3";
                        group.visible = false;
                        break;
                }
                var line = baseGroup.getChildByName(linename);
                if (line) {
                    var button = null;
                    if (App.CommonUtil.check_dragon()) {
                        button = App.DragonBonesUtil.getLoadDragonBones('icon_fight', -1, 'stop');
                    }
                    else {
                        button = BaseBitmap.create('empfight');
                        button.anchorOffsetX = 62 / 2;
                        button.anchorOffsetY = 65 / 2;
                    }
                    var fu1 = BaseBitmap.create('empfightfu');
                    fu1.anchorOffsetX = fu1.width / 2;
                    fu1.anchorOffsetY = fu1.height / 2;
                    fu1.visible = false;
                    fu1.name = 'fu1';
                    fu1.scaleX = -1;
                    if (round == '3') {
                        group.setLayoutPosition(LayoutConst.lefttop, fu1, line, [19, (view._midgroup.height) / 2 - group.y * 2 + fu1.height / 2]);
                    }
                    else {
                        group.setLayoutPosition(LayoutConst.lefttop, fu1, line, [line.width + fu1.width - (round == '2' ? 30 : 35), round == "1" ? (Number(groupidx) < 3 ? -7 : -fu1.height - 7) : (Number(groupidx) == 1 ? -7 : -fu1.height - 7)]);
                    }
                    fu1.x -= fu1.width / 2;
                    ;
                    fu1.y += fu1.height / 2;
                    ;
                    group.addChild(fu1);
                    var fu2 = BaseBitmap.create('empfightfu');
                    fu2.name = 'fu2';
                    fu2.visible = false;
                    fu2.anchorOffsetX = fu1.width / 2;
                    fu2.anchorOffsetY = fu1.height / 2;
                    group.setLayoutPosition(LayoutConst.lefttop, fu2, fu1, [10, 0]);
                    group.addChild(fu2);
                    // let button = ComponentManager.getButton('emphfang',``,view.hfangclick,view,[groupname]);
                    if (round == '3') {
                        group.setLayoutPosition(LayoutConst.lefttop, button, fu1, [12.5 - 5, -10]);
                    }
                    else {
                        group.setLayoutPosition(LayoutConst.lefttop, button, fu2, [-5, -10 + (round == "1" ? (Number(groupidx) < 3 ? 5 : 11) : (Number(groupidx) == 1 ? 5 : 11))]);
                    }
                    // button.x -= fu1.width / 2;
                    // button.y -= fu1.height / 2;
                    button.name = 'hfang';
                    button.addTouchTap(view.hfangclick, view, [groupname]);
                    button.visible = true;
                    group.addChild(button);
                }
            }
        }
    };
    EmperorWarVsView.prototype.changemc = function (evt) {
        var view = this;
        var target = evt.currentTarget;
        switch (evt.animationName) {
            case 'fight':
                target.armature.animation.play('word', 1);
                break;
            case 'word':
                target.armature.animation.stop();
                break;
        }
    };
    EmperorWarVsView.prototype.hfangclick = function (evt, btnIndex) {
        //1-1 2-1 3-1 4-1 1-2 2-2 1-3
        var idx;
        var flag = false;
        if (App.CommonUtil.check_dragon()) {
            flag = evt.currentTarget.getLastFrameName() == 'word';
        }
        else {
            flag = evt.currentTarget.name == 'hfang';
        }
        if (flag) {
            switch (btnIndex) {
                case '1_1':
                    //第一轮第一组 1打8
                    idx = 1;
                    break;
                case '2_1':
                    //第一轮第二组 4打5
                    idx = 4;
                    break;
                case '3_1':
                    //第一轮第三组 2打7
                    idx = 2;
                    break;
                case '4_1':
                    //第一轮第四组 3打6
                    idx = 3;
                    break;
                case '1_2':
                    //第二轮第一组 [1,8]胜者打[4,5]胜者
                    idx = 5;
                    break;
                case '2_2':
                    //第二轮轮第二组 [2,7]胜者打[3,6]胜者
                    idx = 6;
                    break;
                case '1_3':
                    //第三轮第一组 第二轮第一组胜者 打 第二轮轮第二组胜者
                    idx = 7;
                    break;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW, { id: idx });
        }
    };
    EmperorWarVsView.prototype.freshFight = function () {
        var view = this;
        var period = view.api.getFightPeriod();
        view.fresh_line(period);
    };
    EmperorWarVsView.prototype.fresh_line = function (period) {
        var view = this;
        var winArr = view.api.getRoundWinner(period);
        var vs = {
            1: [1, 8],
            2: [4, 5],
            3: [2, 7],
            4: [3, 6]
        };
        if (period == 1) {
            //针对1阶段做演示
            view.reDrawLine(1);
        }
        if (period == 2) {
            view.fresh_line(1);
            view.reDrawLine(2);
        }
        if (period == 3 || period == -1) {
            view.fresh_line(2);
            view.reDrawLine(3);
            if (view._buzhenBtn) {
                view._buzhenBtn.setEnable(false);
            }
        }
    };
    EmperorWarVsView.prototype.reDrawLine = function (period) {
        var view = this;
        var vs = {
            1: [1, 8],
            2: [4, 5],
            3: [2, 7],
            4: [3, 6]
        };
        var winArr = view.api.getRoundWinner(period);
        for (var i in vs) {
            var win = 0;
            var group = view["_vsgroup" + i];
            for (var j in vs[i]) {
                var numb = vs[i][j];
                var linetype = 1;
                if (winArr.indexOf(numb) > -1) {
                    win = numb;
                    linetype = 3;
                }
                else {
                    //灰化效果
                    var manbg = group.getChildByName("manbg" + numb);
                    if (manbg) {
                        App.DisplayUtil.changeToGray(manbg);
                    }
                    var headImg = group.getChildByName("headImg" + numb);
                    if (headImg) {
                        App.DisplayUtil.changeToGray(headImg);
                    }
                    var nameTxt = group.getChildByName("nameTxt" + numb);
                    var data = view.api.getBmDataByKV('numb', numb);
                    if (nameTxt && (Number(data.uid) != Api.playerVoApi.getPlayerID())) {
                        App.DisplayUtil.changeToGray(nameTxt);
                    }
                    linetype = 2;
                }
                //这轮是否参与
                if (!view.api.getThisRoundIn(numb, period - 1)) {
                    continue;
                }
                var line = void 0;
                switch (period) {
                    case 1:
                        line = group.getChildByName("line" + numb + "-" + period);
                        break;
                    case 2:
                        line = group.getChildByName("line" + i + "-" + period);
                        break;
                    case 3:
                        line = Number(i) < 3 ? (view["_vsgroup1"].getChildByName("line1-3")) : (view["_vsgroup3"].getChildByName("line2-3"));
                        break;
                }
                if (line) {
                    line.setRes(period < 3 ? "empline" + linetype : "emptline" + linetype);
                }
            }
            var line3 = void 0;
            if (period == 1) {
                line3 = group.getChildByName("line" + i + "-" + (period + 1));
            }
            else if (period == 2) {
                line3 = group.getChildByName(Number(i) < 3 ? "line1-3" : "line2-3");
            }
            if (line3) {
                line3.visible = true;
            }
            if (win) {
                var group_name = "";
                switch (period) {
                    case 1:
                        group_name = "fugroup" + i + "_1";
                        break;
                    case 2:
                        group_name = Number(i) < 3 ? "fugroup1_2" : "fugroup2_2";
                        break;
                    case 3:
                        group_name = "fugroup1_3";
                        break;
                }
                var btn_group = view[group_name];
                if (btn_group) {
                    btn_group.visible = true;
                    var button = btn_group.getChildByName("hfang");
                    if (button) {
                        button.visible = true;
                        if (App.CommonUtil.check_dragon()) {
                            if (button.getLastFrameName() && button.getLastFrameName() != 'word') {
                                button.playDragonMovie('word', -1); //stop
                            }
                            else {
                                button.setFrameAndNum('word', -1);
                            }
                        }
                        else {
                            if (button.resourceName == 'empfight') {
                                button.setRes('emphfang');
                            }
                        }
                    }
                    // let fu1 : any  = btn_group.getChildByName(`fu1`);
                    // if(fu1){
                    //     fu1.visible = false;
                    // }
                    // let fu2 : any  = btn_group.getChildByName(`fu2`);
                    // if(fu2){
                    //     fu2.visible = false;
                    // }
                }
            }
            else {
            }
            if (view["fugroup" + i + "_" + (period + 1)]) {
                view["fugroup" + i + "_" + (period + 1)].visible = true;
            }
        }
    };
    EmperorWarVsView.prototype.showFuTween = function (flag) {
        if (flag === void 0) { flag = false; }
        var view = this;
        if (App.CommonUtil.check_dragon()) {
            var ziduan = ['1_1', '2_1', '3_1', '4_1', '1_2', '2_2', '1_3'];
            var vs = ['1_8', '4_5', '2_7', '3_6', '1_8_4_5', '2_7_3_6', '1_2_3_4_5_6_7_8'];
            var curPeriod = view.api.getFightPeriod2();
            for (var i in ziduan) {
                var unit = ziduan[i];
                var group = view["fugroup" + unit];
                var button = group.getChildByName('hfang');
                var period = Number(unit.split('_')[1]);
                if (button.getLastFrameName()) {
                    if (button.getLastFrameName() == 'word') {
                        continue;
                    }
                    var numbstr = vs[i];
                    if (curPeriod == period) {
                        if (button.visible) {
                            switch (button.getLastFrameName()) {
                                case 'stop':
                                    if (!flag) {
                                        button.playDragonMovie('fight', 0);
                                    }
                                    break;
                                case 'fight':
                                    if (flag) {
                                        if (view.api.isNotEmptyData(numbstr)) {
                                            button.playDragonMovie('word', 1);
                                        }
                                        else {
                                            button.playDragonMovie('stop', -1);
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    else if (curPeriod > period) {
                        if (button.getLastFrameName() == 'word') {
                        }
                        else {
                            if (view.api.isNotEmptyData(numbstr)) {
                                button.playDragonMovie('word', -1);
                            }
                            else {
                                button.playDragonMovie('stop', -1);
                            }
                        }
                    }
                }
            }
        }
    };
    EmperorWarVsView.prototype.cheerCallBack = function () {
        var view = this;
        var data = view.api.getBmDataByKV('uid', view.api.getZhuweiID());
        //替换助威底图
        for (var i = 1; i <= 4; ++i) {
            var group = view["_vsgroup" + i];
            var bg = group.getChildByName("manbg" + data.numb);
            var zhuweibg = group.getChildByName("empvsmanbg3");
            if (bg) {
                if (zhuweibg) {
                }
                else {
                    zhuweibg = BaseBitmap.create("empvsmanbg3");
                    zhuweibg.name = "empvsmanbg3";
                    group.setLayoutPosition(LayoutConst.horizontalCentertop, zhuweibg, bg);
                    group.addChild(zhuweibg);
                }
            }
            // let nameTxt = group.getChildByName(`nameTxt${data.numb}`);
            // if(nameTxt){
            //     if(view.api.type > 3){
            //         nameTxt.text += `\n${LanguageManager.getlocal('emperorWarXshouNum', [data.getcheer])}`;
            //     }
            //     // nameTxt.text = `${data.name}\n${LanguageManager.getlocal('emperorWarXshouNum', [data.getcheer])}`;
            //     group.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,15 + 93 + (150 - 15 - 93 - nameTxt.textHeight)/2]);
            //     break;
            // }
        }
        if (view._fireclip) {
            view._fireclip.visible = true;
        }
    };
    EmperorWarVsView.prototype.tick = function () {
        var view = this;
        if (view.stopTick) {
            return;
        }
        if (view.api.type == 5) {
            NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {}); //分封的相关数据
            ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
            view.hide();
            return;
        }
        view._time = view.api.getCountDownTime();
        var type = view.api.type;
        if (view.api.type == 4) {
            if (view._fireclip) {
                view._fireclip.visible = false;
            }
            var period = view.api.getFightPeriod2();
            view.api.getRoundFightMsg();
            var flag_1 = view.api.isShowFightFu();
            if (view.api.freshFight) {
                view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc6");
            }
            else {
                view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc4-" + period + "-" + (flag_1 ? 2 : 1), [App.DateUtil.getFormatBySecond(Math.max((flag_1 ? view._time : (view._time - 360)), 0))]);
            }
            if (!view.cheerShow) {
                for (var i = 1; i <= 4; ++i) {
                    var group = view["_vsgroup" + i];
                    for (var j = 1; j < 9; ++j) {
                        var data = view.api.getBmDataByKV('numb', j);
                        if (data) {
                            var nameTxt = group.getChildByName("nameTxt" + data.numb);
                            var bg_1 = group.getChildByName("manbg" + data.numb);
                            if (nameTxt) {
                                if (view.api.type > 3) {
                                    nameTxt.text += "\n" + LanguageManager.getlocal('emperorWarXshouNum', [data.getcheer]);
                                }
                                // nameTxt.text = `${data.name}\n${LanguageManager.getlocal('emperorWarXshouNum', [data.getcheer])}`;
                                group.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg_1, [0, 15 + 93 + (150 - 15 - 93 - nameTxt.textHeight) / 2]);
                            }
                        }
                    }
                }
                view.cheerShow = true;
            }
        }
        else {
            view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc" + view.api.type, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        view._midBtn.visible = view.api.type < 4;
        var flag = view.api.isShowFightFu();
        if (flag) {
            view.showFuTween();
        }
        view._midBtn.setBtnBitMap(type < 4 ? "empzhuwei" : "empvsbattle"); //ComponentManager.getButton(type < 3 ? "empbming" : "empenter","",this.enterHandle,this);
        view._midBtn.setEnable(true);
        view._midBtn.visible = type < 4;
        var bg = view.viewBg;
        bg.setload(type == 4 ? 'emperorwarcheerbg' : 'emperorwarbg2');
    };
    //中部按钮
    EmperorWarVsView.prototype.enterHandle = function () {
        var view = this;
        var type = view.api.type;
        switch (type) {
            case 3:
                //助威弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARCHEERVIEW);
                break;
            case 4:
                //战斗弹窗
                break;
        }
    };
    //奖励弹窗
    EmperorWarVsView.prototype.rewardClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
    };
    //布阵弹窗
    EmperorWarVsView.prototype.buzhenClick = function () {
        var view = this;
        if (view.api.isCanJoinWar()) {
            if (view.api.cannotSetBuzhen()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCanNotSaveBuzhen"));
                return;
            }
            var period = view.api.getFightPeriod2();
            if (view.api.getThisRoundIn(view.api.getSelfNumb(), period - 1)) {
                ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBUZHENVIEW);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCanNotBuzhenTip3"));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCanNotBuzhen"));
        }
    };
    //vs对阵图
    EmperorWarVsView.prototype.createMid = function () {
        //八个头像
        var view = this;
        // let data = view.api.getBmlistData('up');
        var vs = { 1: [1, 8], 2: [4, 5], 3: [2, 7], 4: [3, 6] };
        var pos = [LayoutConst.lefttop, LayoutConst.righttop];
        for (var i in vs) {
            var numArr = vs[i].slice();
            for (var j in numArr) {
                var numb = numArr[j];
                var data = view.api.getBmDataByKV('numb', numb);
                var bgtype = 1;
                var group = view["_vsgroup" + i];
                var manbg = null;
                if (data) {
                    if (data.uid == Api.playerVoApi.getPlayerID()) {
                        bgtype = 2;
                    }
                    manbg = BaseBitmap.create("empvsmanbg" + bgtype);
                    manbg.name = "manbg" + numb;
                    manbg.width = 154;
                    manbg.height = 172;
                    group.setLayoutPosition((Number(j) == 0 ? LayoutConst.lefttop : LayoutConst.righttop), manbg, group, [0, 0], true);
                    group.addChild(manbg);
                    var title = data.phototitle;
                    //  = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
                    var headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
                    headImg.name = "headImg" + numb;
                    headImg.addTouchTap(view.playerTouch, view, [data.uid]);
                    group.setLayoutPosition(LayoutConst.horizontalCentertop, headImg, manbg, [8, 15]);
                    group.addChild(headImg);
                    var nameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    nameTxt.name = "nameTxt" + numb;
                    nameTxt.text = "" + data.name;
                    if (view.api.type > 3) {
                        view.cheerShow = true;
                        nameTxt.text += "\n" + LanguageManager.getlocal('emperorWarXshouNum', [data.getcheer]);
                    }
                    nameTxt.width = manbg.width - 30;
                    nameTxt.textAlign = egret.HorizontalAlign.CENTER;
                    group.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, manbg, [0, 15 + 93 + (150 - 15 - 93 - nameTxt.textHeight) / 2]);
                    group.addChild(nameTxt);
                    if (view.api.getZhuweiID() == data.uid) {
                        var zhuweibg = BaseBitmap.create("empvsmanbg3");
                        zhuweibg.name = "empvsmanbg3";
                        group.setLayoutPosition(LayoutConst.horizontalCentertop, zhuweibg, manbg);
                        group.addChild(zhuweibg);
                    }
                }
                else {
                    manbg = BaseBitmap.create("empvsmanbg1");
                    manbg.name = "manbg" + numb;
                    manbg.width = 154;
                    manbg.height = 172;
                    group.setLayoutPosition((Number(j) == 0 ? LayoutConst.lefttop : LayoutConst.righttop), manbg, group, [0, 0], true);
                    group.addChild(manbg);
                }
            }
        }
    };
    EmperorWarVsView.prototype.playerTouch = function (evt, uid) {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: uid });
    };
    EmperorWarVsView.prototype.userShotCallback = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        }
    };
    EmperorWarVsView.prototype.freshFightEnd = function () {
        var view = this;
        view.freshFight();
        view.showFuTween(true);
    };
    EmperorWarVsView.prototype.dispose = function () {
        var view = this;
        view._timeDesc = null;
        view._midBtn = null;
        view._buzhenBtn = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_ZHUWEI_SUCCESS, view.cheerCallBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPEROR_FRESHPLAYERDATA, view.freshFight, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPEROR_FRESHFIGHTEND, view.freshFightEnd, view);
        if (view._fireclip) {
            view._fireclip.stop();
            view._fireclip.dispose();
            view._fireclip = null;
        }
        view._midgroup = null;
        view._vsgroup1 = null;
        view._vsgroup2 = null;
        view._vsgroup3 = null;
        view._vsgroup4 = null;
        BaseLoadBitmap.release(view._bg);
        view._bg = null;
        view.fugroup1_1 = null;
        view.fugroup2_1 = null;
        view.fugroup3_1 = null;
        view.fugroup4_1 = null;
        view.fugroup1_2 = null;
        view.fugroup2_2 = null;
        view.fugroup1_3 = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarVsView;
}(CommonView));
__reflect(EmperorWarVsView.prototype, "EmperorWarVsView");
//# sourceMappingURL=EmperorWarVsView.js.map