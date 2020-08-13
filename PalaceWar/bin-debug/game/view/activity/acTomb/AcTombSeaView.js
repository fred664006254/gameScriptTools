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
 * author:qianjun
 * desc:东海皇陵海底寻宝界面
*/
var AcTombSeaView = (function (_super) {
    __extends(AcTombSeaView, _super);
    function AcTombSeaView() {
        var _this = _super.call(this) || this;
        _this._chatTxt = null;
        _this._countDownText = null;
        _this._list = null;
        _this._rankindex = 0;
        _this._coinbg = null;
        _this._buySearchBtn = null;
        _this._count = 0;
        return _this;
    }
    Object.defineProperty(AcTombSeaView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSeaView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombSeaView.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombSeaView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_TOMBSEA;
    };
    AcTombSeaView.prototype.getResourceList = function () {
        var code = this.getUicode();
        return _super.prototype.getResourceList.call(this).concat([
            "tombbg1-" + code, "tombbg5-" + code, "battlegroundbottomchatbg-1", "bhdqing", "bhdqing_down",
            "tombtop-" + code, "tombbg2-" + code, "tombbg4-" + code, "tombbg7-" + code, "tombbossitem-" + code, "tombloopbg-" + code,
            "tombsea" + code + "-", "shuizhu0" + code, "doorlight-" + code, "tombboxef" + code + "-", "tombbubble" + code + "-", "tombdoor" + code + "-",
            "tombboxcircle8-" + code, "tombboxcircle9-" + code, "tombboxcircle10-" + code,
            "tombboss8-" + code, "tombboss9-" + code, "tombboss10-" + code, "tombboatscan" + code + "-"
        ]);
    };
    AcTombSeaView.prototype.getTitleStr = function () {
        var code = this.getUicode();
        return "tombtitle-" + code;
    };
    AcTombSeaView.prototype.initView = function () {
        var view = this;
        var code = view.getUicode();
        view.vo.moviePlay = false;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.freshView, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSCHAT_MSG, view.freshChat, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBMAP), view.mapCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBDIG), view.digCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO), view.bossCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK), view.attackCallBack, view);
        //总boss
        if (view.vo.getAttendQUality()) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO, {
                activeId: view.vo.aidAndCode,
                index: 0,
                x: 0,
                y: 0
            });
        }
        var top1 = BaseBitmap.create("tombbg1-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top1, view);
        view.addChild(top1);
        view.setChildIndex(top1, 2);
        if (view.vo.getAttendQUality()) {
            var infoBtn = ComponentManager.getButton('bhdqing', '', function () {
                if (view.vo.getAttendQUality()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBALLIANCEINFOVIEW, {
                        aid: view.param.data.aid,
                        code: view.param.data.code
                    });
                }
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, infoBtn, top1);
            view.addChild(infoBtn);
        }
        var boattop = BaseBitmap.create("tombtop-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, boattop, top1, [120, 0]);
        view.addChild(boattop);
        var boat = ComponentManager.getButton("tombbg3-" + code, '', function () {
            //排行榜
            if (view.vo.moviePlay) {
                return;
            }
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBRANKIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, boat, top1, [70, 0]);
        view.addChild(boat);
        var tmpx = boat.x;
        var tmpy = boat.y;
        egret.Tween.get(boat, { loop: true }).to({ x: tmpx - 3, y: tmpy + 1.5 }, 1340).to({ x: tmpx - 3.5, y: tmpy - 1.4 }, 1320).to({ x: tmpx, y: tmpy }, 1340);
        egret.Tween.get(boat, { loop: true }).to({ rotation: -2 }, 2000).to({ rotation: 0 }, 2000);
        //榜单
        var rankbtn = ComponentManager.getButton("tombrank-" + code, '', function () {
            //排行榜
            if (view.vo.moviePlay) {
                return;
            }
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBRANKIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankbtn, view.titleBg, [35, view.titleBg.height + 20]);
        view.addChild(rankbtn);
        var boatscan = ComponentManager.getCustomMovieClip("tombboatscan" + code + "-", 13, 70);
        boatscan.blendMode = egret.BlendMode.ADD;
        boatscan.width = 163;
        boatscan.height = 35;
        boatscan.anchorOffsetX = boatscan.width / 2;
        boatscan.anchorOffsetY = boatscan.height / 2;
        egret.Tween.get(boatscan, { loop: true }).call(function () {
            boatscan.playWithTime(1);
        }, view).wait(1000);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatscan, rankbtn);
        view.addChild(boatscan);
        // egret.Tween.get(boatscan).wait();
        var boatalpha = BaseBitmap.create("tombrankalpha-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatalpha, rankbtn);
        view.addChild(boatalpha);
        boatalpha.alpha = 0;
        egret.Tween.get(boatalpha, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000);
        /****顶部****/
        var qulaity = view.vo.getAttendQUality();
        if (qulaity) {
            //铲子数目
            var coinbg = BaseBitmap.create("public_9_resbg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, coinbg, view.titleBg, [10, view.titleBg.height + 15]);
            view.addChild(coinbg);
            view._coinbg = coinbg;
            var coinicon = ComponentManager.getButton("tombcoin_coin-" + code, "", null, null);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinicon, coinbg, [0, 0]);
            view.addChild(coinicon);
            var coinTxt = ComponentManager.getTextField("", 20);
            coinTxt.textAlign = egret.HorizontalAlign.CENTER;
            coinTxt.lineSpacing = 6;
            // coinTxt.width = 240;
            view.addChild(coinTxt);
            view._coinTxt = coinTxt;
            var rechargeBtn = ComponentManager.getButton("mainui_btn1", "", view.enterInHandler, view);
            rechargeBtn.setScale(0.8);
            rechargeBtn.alpha = 0;
            view._buySearchBtn = rechargeBtn;
            view.addChild(rechargeBtn);
            view.freshCoinText();
        }
        var middletop = BaseBitmap.create("tombbg2-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, middletop, top1, [0, top1.height]);
        //海平面特效
        var sealine = ComponentManager.getCustomMovieClip("tombsea" + code + "-", 12, 130);
        sealine.width = 639;
        sealine.height = 37;
        sealine.anchorOffsetX = sealine.width / 2;
        sealine.anchorOffsetY = sealine.height / 2;
        sealine.playWithTime(-1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, sealine, top1, [0, -17]);
        /****中部滑动列表****/
        if (qulaity) {
            var arr = view.vo.getFloorData(0);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 65 - middletop.y);
            var scrollList = ComponentManager.getScrollList(AcTombSeaFloorItem, arr, rect, view.code, 30);
            //scrollList.setContentPosY(middletop.height);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, middletop);
            view.addChild(scrollList);
            scrollList.bounces = false;
            view._list = scrollList;
            scrollList.bindMoveCompleteCallback(function () {
                //发消息请求数据
                var curFloor = view.getCurFloor();
                var empty = false;
                var startIdx = (curFloor - 1) * 6 + 1;
                var endIdx = (curFloor + 6) * 6 + 1;
                for (var i = startIdx; i <= endIdx; ++i) {
                    var data = view.vo.getBoxDataById(i);
                    if (!data) {
                        empty = true;
                        break;
                    }
                }
                if (empty) {
                    var index = Math.max(Math.floor(curFloor / 10), 1);
                    var startFloor = index;
                    //发请求
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBMAP, {
                        activeId: view.vo.aidAndCode,
                        indexs: view.getIndexs(startFloor)
                    });
                }
            }, view);
        }
        else {
            view.addChild(middletop);
            var boattop1 = BaseBitmap.create("tombbg7-" + code);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boattop1, middletop, [0, middletop.height]);
            view.addChild(boattop1);
            var num = Math.ceil((GameConfig.stageHeigth - boattop1.y - boattop1.height) / 161);
            for (var i = 0; i < num; ++i) {
                var boatbg = BaseBitmap.create("tombloopbg-" + code);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boatbg, boattop1, [0, boattop1.height + (i * boatbg.height)]);
                view.addChild(boatbg);
            }
            //无参赛资格提示
            var wordsBg = BaseBitmap.create("public_tipbg");
            view.addChild(wordsBg);
            var period = view.vo.getCurPeriod();
            var str = LanguageManager.getlocal("tombtimetip" + period + "-" + code, [App.DateUtil.getFormatBySecond(view.vo.getCountDownTime())]);
            var wordsText = ComponentManager.getTextField(LanguageManager.getlocal("tombnoattend-" + code, [str]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            wordsText.lineSpacing = 6;
            wordsText.textAlign = egret.HorizontalAlign.CENTER;
            view._countDownText = wordsText;
            wordsBg.height = wordsText.textHeight + 50;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, boattop1, [0, 100]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordsText, wordsBg);
            view.addChild(wordsText);
        }
        var top2 = BaseBitmap.create("tombbg5-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top2, middletop);
        view.addChild(top2);
        view.addChild(sealine);
        /****底部****/
        var bottomBg = BaseBitmap.create("tombbottombg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        //跨服聊天
        if (1) {
            //跨服聊天消息
            bottomBg.addTouchTap(view.chatBgClickHandler, view);
            var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width / 2;
            chatIcon.anchorOffsetY = chatIcon.height / 2;
            chatIcon.x = chatIcon.width / 2 + 10;
            chatIcon.y = bottomBg.y + bottomBg.height / 2;
            view.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,
            }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr.content.message);
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (emoticonStr.length > 15 ? (emoticonStr.substring(0, 16) + "...") : emoticonStr);
            }
            view._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            view._chatTxt.width = 480;
            view._chatTxt.height = 20;
            view.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, bottomBg, [chatIcon.width + 5, 0]);
            view.addChild(view._chatTxt);
        }
        if (qulaity) {
            //跳转层数
            var jumpBtn = ComponentManager.getButton("tombjumpbtn-" + code, "tombjump-" + code, view.jumpClick, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, jumpBtn, bottomBg);
            view.addChild(jumpBtn);
        }
        //跨服有泡泡特效
        if (Number(code) == 1) {
            view.showBublle();
        }
    };
    //吐泡泡动画
    AcTombSeaView.prototype.showBublle = function () {
        var view = this;
        var code = this.getUicode();
        //粒子效果
        /**
         *  走到水面的时长区间：12s-40s
            大小区间：15%-35%
            同屏数量12个左右，最大粒子数量20个
        */
        var num = 15;
        var _loop_1 = function (i) {
            var bubble = BaseBitmap.create("shuizhu0" + code);
            bubble.name = "bubble" + i;
            view.addChild(bubble);
            var time = App.MathUtil.getRandom(12, 41);
            var speed = (GameConfig.stageHeigth - 65 - 244) / (time * 1000);
            var scale = App.MathUtil.getRandom(15, 36);
            bubble.setScale(scale / 100);
            bubble.x = App.MathUtil.getRandom(0, GameConfig.stageWidth - 64);
            bubble.y = GameConfig.stageHeigth - 65;
            bubble.alpha = 0;
            egret.Tween.get(bubble, { loop: true }).wait(4000 * i).to({ y: GameConfig.stageHeigth - 65 - 64, alpha: 1 }, 64 / speed).to({ y: 308 }, (GameConfig.stageHeigth - 438) / speed).to({ y: 244, alpha: 0 }, 64 / speed).call(function () {
                time = App.MathUtil.getRandom(12, 41);
                speed = (GameConfig.stageHeigth - 65 - 244) / (time * 1000);
                var newscale = App.MathUtil.getRandom(15, 36);
                bubble.setScale(newscale / 100);
                bubble.x = App.MathUtil.getRandom(0, GameConfig.stageWidth - 64);
                bubble.y = GameConfig.stageHeigth - 65;
            });
            view.addChild(bubble);
        };
        for (var i = 0; i < num; ++i) {
            _loop_1(i);
        }
    };
    AcTombSeaView.prototype.removeBubble = function () {
        var view = this;
        var num = 15;
        for (var i = 0; i < num; ++i) {
            var bubble = view.getChildByName("bubble" + i);
            if (bubble) {
                egret.Tween.removeTweens(bubble);
                view.removeChild(bubble);
                bubble = null;
            }
        }
    };
    AcTombSeaView.prototype.judgeFloorById = function (id) {
        var view = this;
        var floor = 1;
        return floor;
    };
    AcTombSeaView.prototype.getCurFloor = function () {
        var view = this;
        var list = view._list;
        var top = list.scrollTop;
        var num = Math.ceil((top - 337) / 172) + 1;
        return Math.max(num, 1);
    };
    AcTombSeaView.prototype.getIndexs = function (num) {
        var view = this;
        var arr = [];
        var max = Math.floor(view.vo.getFloorNum() / 10);
        for (var i = 0; i < 3; ++i) {
            if (num + i < max) {
                arr.push(num + i);
            }
        }
        return arr;
    };
    AcTombSeaView.prototype.jumpToFloor = function (floor) {
        var view = this;
        var list = view._list;
        var index = Math.max(Math.floor(floor / 10) - 1, 1);
        var startFloor = index;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBMAP, {
            activeId: view.vo.aidAndCode,
            indexs: view.getIndexs(startFloor)
        });
        //337 172
        list.setScrollTopByIndex(floor + 1, 300);
    };
    AcTombSeaView.prototype.jumpClick = function () {
        var view = this;
        if (view.vo.moviePlay) {
            return;
        }
        var curfloor = view.getCurFloor();
        ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBJUMPVIEW, {
            aid: view.aid,
            code: view.code,
            callback: function (data) {
                view.jumpToFloor(data);
            },
            callobj: view,
            curFloor: curfloor
        });
    };
    AcTombSeaView.prototype.freshCoinText = function () {
        var view = this;
        var code = this.getUicode();
        if (view._coinTxt) {
            var coininfo = view.vo.getTanSuoNum();
            var str = '';
            view._buySearchBtn.alpha = 0;
            if (coininfo.num) {
                view._coinTxt.text = coininfo.num.toString();
                view._coinTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            else if (coininfo.time) {
                view._coinTxt.textColor = TextFieldConst.COLOR_WARN_RED3;
                view._coinTxt.text = LanguageManager.getlocal("tombcointip-" + code, [App.DateUtil.getFormatBySecond(coininfo.time)]);
                view._buySearchBtn.alpha = 1;
            }
            view._coinbg.width = view._coinTxt.textWidth + 70;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._coinTxt, view._coinbg, [10, 14]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._buySearchBtn, view._coinTxt, [view._coinTxt.textWidth + 10, 0]);
        }
    };
    AcTombSeaView.prototype.infoClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcTombSeaView.prototype.getRuleInfo = function () {
        var rule = "tombrule-" + this.getUicode();
        return "tombrule-" + this.getUicode();
    };
    AcTombSeaView.prototype.clickRuleBtnHandler = function (param) {
        var msg = '';
        var extra = this.getExtraRuleInfo();
        if (extra && extra !== '') {
            msg = extra;
        }
        else {
            var keyParam = this.getRuleInfoParam();
            msg = LanguageManager.getlocal(this.getRuleInfo(), keyParam);
        }
        if (Api.switchVoApi.checkOpenTombEndLess()) {
            msg += LanguageManager.getlocal("tombrule_newrule-1", [this.cfg.maxScore.toString()]);
        }
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
    };
    AcTombSeaView.prototype.getRuleInfoParam = function () {
        var time = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        return [this.cfg.initialExplore.toString(), time.toString(), this.cfg.needKillNum.toString(), this.cfg.maxScore.toString()];
    };
    AcTombSeaView.prototype.moreClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSKILLINFOIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcTombSeaView.prototype.freshView = function () {
        var view = this;
        view.freshCoinText();
    };
    AcTombSeaView.prototype.tick = function () {
        var view = this;
        var code = this.getUicode();
        if (!view.vo.isInActTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tombtime9-" + code));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (!unit.killAll) {
            view.freshCoinText();
            // view.freshMid();
            ++view._count;
            if (view._count == 300) {
                view._count = 0;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO, {
                    activeId: view.vo.aidAndCode,
                    index: 0,
                    x: 0,
                    y: 0
                });
            }
        }
        if (view._countDownText) {
            var period = view.vo.getCurPeriod();
            var str = LanguageManager.getlocal("tombtimetip" + period + "-" + code, [App.DateUtil.getFormatBySecond(view.vo.getCountDownTime())]);
            view._countDownText.text = LanguageManager.getlocal("tombnoattend-" + code, [str]);
        }
    };
    AcTombSeaView.prototype.enterInHandler = function () {
        var view = this;
        var code = this.getUicode();
        if (view.vo.moviePlay) {
            return;
        }
        if (!view.vo.isInActTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (unit.killAll) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc3"));
            return;
        }
        if (unit.num) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH, {
            // 	activeId : view.vo.aidAndCode,
            // });	
        }
        else {
            var searchBuyNum = view.vo.getBuySearchNum();
            var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
            var message = LanguageManager.getlocal("tombbuysearchtip-" + code, [String(needNum)]);
            var mesObj = {
                confirmCallback: function () {
                    var searchBuyNum = view.vo.getBuySearchNum();
                    var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
                    if (Api.playerVoApi.getPlayerGem() >= needNum) {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBBUYSEARCH, {
                            activeId: view.vo.aidAndCode,
                        });
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                    }
                },
                handler: this,
                icon: "itemicon1",
                iconBg: "itembg_1",
                num: Api.playerVoApi.getPlayerGem(),
                useNum: needNum,
                msg: message,
                id: 1,
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        }
    };
    AcTombSeaView.prototype.chatBgClickHandler = function () {
        if (this.vo.moviePlay) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcTombSeaView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_TOMBMAP, requestData: {
                activeId: view.vo.aidAndCode,
                indexs: [0, 1, 2]
            } };
    };
    AcTombSeaView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setMapInfo(data.data.data.map);
        // view.vo.setBossNumInfo(data.data.data);
    };
    AcTombSeaView.prototype.mapCallBack = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        if (data && data.map) {
            view.vo.setMapInfo(data.map);
            //刷新数据
            view.freshMapData(view.getCurFloor());
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_TOMB_FRESH);
        }
    };
    AcTombSeaView.prototype.bossCallBack = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            if ((data.index + data.x + data.y) == 0) {
                view.vo.setBossInfo({
                    bosstype: 7,
                    bosskey: 1,
                    bosshp: Number(data.bosshp),
                    damagelog: data.damagelog,
                    killnum: data.killnum,
                    killer: data.killer,
                    joinnum: data.joinnum,
                    bossNum: data.bossNum,
                    bossMaxHp: data.bossMaxHp,
                });
            }
            var bossitem = view._list.getItemByIndex(0);
            bossitem.freshBossInfo();
        }
    };
    //默认刷新30层数据
    AcTombSeaView.prototype.freshMapData = function (floor, floorNum) {
        if (floorNum === void 0) { floorNum = 30; }
        var view = this;
        var index = Math.max(Math.floor(floor / 10) * 10, 1);
        var startFloor = index;
        var endFloor = Math.min((index + floorNum), view.vo.getFloorNum());
        for (var i = startFloor; i <= endFloor; ++i) {
            var item = view._list.getItemByIndex(i);
            if (item) {
                item.freshData();
            }
        }
    };
    AcTombSeaView.prototype.digCallBack = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        var code = this.getUicode();
        if (data && data.map) {
            view.vo.setMapInfo(data.map);
            view.freshMapData(view.getCurFloor(), 10);
            var strList_1 = [];
            if (data.score) {
                var flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt4", [String(data.score)]);
                strList_1.push({ tipMessage: flyStr1 });
            }
            if (data.shopscore) {
                var flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt3", [String(data.shopscore)]);
                strList_1.push({ tipMessage: flyStr2 });
            }
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(strList_1);
            }, this, 800);
            if (data.hasDig) {
                App.CommonUtil.showTip(LanguageManager.getlocal("tombattacktip4-" + code));
            }
            else {
                var digid = view.vo.getClickIdx();
                var floor = Math.ceil(digid / 6);
                var param = view.vo.getParamMap(digid);
                var item = view._list.getItemByIndex(floor);
                if (item) {
                    item.freshAfterDig(param.y - 1);
                }
            }
            // view.freshMapData(floor, 0);
        }
    };
    AcTombSeaView.prototype.attackCallBack = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        var code = this.getUicode();
        if (data && data.map) {
            var index = data.index;
            var x = data.x;
            var y = data.y;
            var id = 0;
            if ((index + x + y) > 0) {
                id = index * 10 * 6 + (x - 1) * 6 + y;
            }
            view.vo.setMapInfo(data.map);
            view.freshMapData(view.getCurFloor(), 10);
            var boxdata = view.vo.getBoxDataById(id);
            if (boxdata) {
                var cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
                if (cfg) {
                    if (cfg.type == 3) {
                        var hasKill = data.hasKill;
                        if (hasKill == 1) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("tombattacktip3-" + code));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBGETREWARDVIEW, {
                            aid: view.param.data.aid,
                            code: view.param.data.code,
                            reward: boxdata.rewards
                        });
                    }
                    else if (view.vo.getFinalbossStatusById() == 1) {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO, {
                            activeId: view.vo.aidAndCode,
                            index: 0,
                            x: 0,
                            y: 0
                        });
                    }
                }
            }
        }
    };
    AcTombSeaView.prototype.searchCallback = function (evt) {
        var view = this;
        if (!view.vo.isInActTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
            view.hide();
            return;
        }
        if (evt.data.data.ret >= 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSSEARCHRESULTVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
                foeId: evt.data.data.data.bosstype,
                bosskey: evt.data.data.data.bosskey
            });
        }
        else if (evt.data.data.ret == -3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip5"));
            this.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
                activeId: this.vo.aidAndCode,
            });
        }
    };
    AcTombSeaView.prototype.freshChat = function () {
        var view = this;
        var showStr = Api.chatVoApi.getLastAcCrossMessage();
        if (!showStr) {
            showStr = "";
        }
        else {
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr.content.message);
            var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
            showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (emoticonStr.length > 15 ? (emoticonStr.substring(0, 16) + "...") : emoticonStr);
        }
        view._chatTxt.text = showStr;
    };
    AcTombSeaView.prototype.dispose = function () {
        var view = this;
        view.vo.clearMapInfo();
        view.removeBubble();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSCHAT_MSG, view.freshChat, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBMAP), view.mapCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBDIG), view.digCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO), view.bossCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK), view.attackCallBack, view);
        if (view._coinTxt) {
            view._coinTxt = null;
        }
        if (view._countDownText) {
            view._countDownText = null;
        }
        if (view._list) {
            view._list = null;
        }
        view._count = 0;
        view._chatTxt = null;
        view._rankindex = 0;
        view.vo.moviePlay = false;
        view._coinbg = null;
        view._buySearchBtn = null;
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return AcTombSeaView;
}(CommonView));
__reflect(AcTombSeaView.prototype, "AcTombSeaView");
//# sourceMappingURL=AcTombSeaView.js.map