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
 * 情缘详细弹窗
 * @class WifeSelectedPopupView
 */
var QingyuanDetailView = (function (_super) {
    __extends(QingyuanDetailView, _super);
    function QingyuanDetailView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._progress = null;
        _this._progressGroup = null;
        _this._progressScroll = null;
        _this._curIdx = 0;
        _this._lockIdx = -1;
        _this._lockSidx = -1;
        _this._stop = false;
        _this._tiptxt = null;
        _this._select = null;
        return _this;
    }
    QingyuanDetailView.prototype.getResourceList = function () {
        var resArr = [
            "wifestatus_lock", "qingyuanclick", "qingyuanball", "qingyuanclicked", "qingyuanunlock"
        ];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    QingyuanDetailView.prototype.getBgName = function () {
        var data = this.param.data;
        return "qingyuanpopbg" + data.type;
    };
    QingyuanDetailView.prototype.getCloseBtnName = function () {
        return "commonview_closebtn1";
    };
    QingyuanDetailView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    QingyuanDetailView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE), view.activateCallback, view);
        var data = view.param.data;
        //已解锁数目
        var haveunlock = Api.encounterVoApi.getActiveBuffNum(data.type);
        // let poscfg = {
        // 	fourrenegade : {
        // 		20011 : {x : 215, y : 137, namex : 100, namey : 367, emptyx : 48, emptyy : 152, lockx : 40, locky : 80},
        // 		20031 : {x : 320, y : 213, namex : 288, namey : 220,emptyx : 217, emptyy : 94, lockx : 80, locky : 80},
        // 		20021 : {x : 67, y : 81, namex : 420, namey : 567,emptyx : 366, emptyy : 210, lockx : 40, locky : 80},
        // 		20041 : {x : 38, y : 274, namex : 186, namey : 561,emptyx : 114, emptyy : 258, lockx : 80, locky : 120},
        // 	}
        // };
        //人物形象
        var rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = 600;
        rolegroup.height = 609;
        rolegroup.x = 20;
        rolegroup.y = 0;
        rolegroup.name = "roleGroup";
        rolegroup.mask = new egret.Rectangle(0, 0, rolegroup.width, rolegroup.height);
        view.addChildToContainer(rolegroup);
        var type = data.type;
        var lockGroup = new BaseDisplayObjectContainer();
        lockGroup.width = 600;
        lockGroup.height = 609;
        lockGroup.name = "lockGroup";
        lockGroup.mask = new egret.Rectangle(0, 0, rolegroup.width, rolegroup.height);
        view.addChildToContainer(lockGroup);
        var unlock = false;
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var str = "";
            var info = Api.encounterVoApi.getNeedInfo(type, rewardvo.id.toString());
            var poscfg = data.coordinateInside[rewardvo.id];
            var group = new BaseDisplayObjectContainer();
            group.name = "group" + i;
            rolegroup.addChild(group);
            group.x = poscfg.x - rolegroup.x;
            group.y = poscfg.y;
            var role = BaseBitmap.create(type + "role" + rewardvo.id);
            role.name = "role" + i;
            group.addChild(role);
            if (info.isopen) {
                if (!info.have) {
                    App.DisplayUtil.changeToAlpha(role);
                }
                else {
                    if (Api.encounterVoApi.getActiveBuffIndex(type, Number(i) + 1)) {
                        App.DisplayUtil.changeToNormal(role);
                    }
                    else {
                        App.DisplayUtil.changeToAlpha(role);
                        if (!unlock) {
                            unlock = true;
                            view._lockIdx = Number(i);
                            view._lockSidx = rewardvo.id;
                            lockGroup.height = group.height;
                            lockGroup.width = group.width;
                            lockGroup.x = group.x;
                            lockGroup.y = group.y;
                            lockGroup.addTouchTap(function () {
                                // let info = view._curIdx
                                var sinfo = Api.encounterVoApi.getNeedInfo(type, view._lockSidx.toString());
                                if (view._stop || !sinfo.have || (sinfo.have && Api.encounterVoApi.getActiveBuffIndex(data.type, view._lockIdx + 1))) {
                                    return;
                                }
                                if (Api.encounterVoApi.checkRed(data.type)) {
                                    NetManager.request(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, {
                                        encounterId: data.type,
                                        eIndex: view._lockIdx + 1
                                    });
                                }
                            }, view);
                            var clip = ComponentManager.getCustomMovieClip("qingyuanclick", 12, 70);
                            clip.width = 193;
                            clip.height = 191;
                            clip.playWithTime(-1);
                            var lockcfg = data.unlock[rewardvo.id];
                            clip.x = lockcfg.x - lockGroup.x - 40;
                            clip.y = lockcfg.y - lockGroup.y - 50;
                            lockGroup.addChild(clip);
                            clip.name = "clip";
                            var lock = BaseBitmap.create("wifestatus_lock");
                            lock.anchorOffsetX = lock.width / 2;
                            lock.anchorOffsetY = lock.height / 2;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lock, clip);
                            lockGroup.addChild(lock);
                            lock.alpha = 0;
                            lock.name = "lock";
                            var lock2 = BaseBitmap.create("wifestatus_lock");
                            lock2.anchorOffsetX = lock2.width / 2;
                            lock2.anchorOffsetY = lock2.height / 2;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lock2, clip);
                            lockGroup.addChild(lock2);
                            lock2.name = "lock2";
                            egret.Tween.get(lock2, { loop: true }).to({ rotation: -25 }, 70).to({ rotation: 20 }, 130).to({ rotation: -15 }, 130).to({ rotation: 7 }, 200).to({ rotation: 0 }, 330).wait(1000);
                            egret.Tween.get(lock, { loop: true }).to({ rotation: -25 }, 70).to({ rotation: 20 }, 130).to({ rotation: -15 }, 130).to({ rotation: 7 }, 200).to({ rotation: 0 }, 330).wait(1000);
                            egret.Tween.get(lock, { loop: true }).to({ alpha: 1 }, 30).to({ alpha: 0 }, 500);
                        }
                    }
                }
            }
            else {
                App.DisplayUtil.changeToBlack(role);
                // let square:egret.Shape = new egret.Shape();
                // square.graphics.beginFill(0x090b1a);
                // square.graphics.drawRect(role.x,role.y,role.width,role.height);
                // square.graphics.endFill();
                // square.alpha = 1;
                // group.addChild(square);
                // square.mask = role;
                // let unlock = BaseBitmap.create(`qingyuannpcempty`);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unlock, role);
                // group.addChild(unlock);
            }
        }
        // view.setIndex();
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var group = rolegroup.getChildByName("group" + i);
            if (group) {
                var info = Api.encounterVoApi.getNeedInfo(type, rewardvo.id.toString());
                if (info.isopen) {
                    var descbg = BaseBitmap.create("qingyuanrolenamebg");
                    var nametxt = ComponentManager.getTextField(rewardvo.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    descbg.width = nametxt.width + 40;
                    var namecfg = data.coordinateName[rewardvo.id];
                    descbg.x = namecfg.x;
                    descbg.y = namecfg.y;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, descbg);
                    rolegroup.addChild(descbg);
                    rolegroup.addChild(nametxt);
                }
            }
        }
        var progressbg = BaseBitmap.create("qingyuanprogressbg");
        progressbg.width = 530;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbg, rolegroup, [0, 612]);
        view.addChildToContainer(progressbg);
        var topProgressGroup = new BaseDisplayObjectContainer();
        topProgressGroup.height = progressbg.height;
        view.addChildToContainer(topProgressGroup);
        view._progressGroup = topProgressGroup;
        var progress = ComponentManager.getProgressBar("qingyuanprogress", "qingyuanprogress_bg", 127 * (data.need.length - 1));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progress, topProgressGroup, [0, 3], true);
        progress.x = 75;
        topProgressGroup.addChild(progress);
        view._progress = progress;
        var rect = new egret.Rectangle(0, 0, progressbg.width - 13, progressbg.height);
        var scrollView = ComponentManager.getScrollView(topProgressGroup, rect);
        scrollView.bounces = false;
        scrollView.verticalScrollPolicy = 'off';
        view.addChildToContainer(scrollView);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, progressbg);
        view._progressScroll = scrollView;
        var tiptxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChildToContainer(tiptxt);
        progress.setPercentage(0);
        view._tiptxt = tiptxt;
        var scroRect = new egret.Rectangle(0, 0, 565, 85);
        var arr = [];
        var curIdx = Math.min(haveunlock + 1, data.need.length);
        arr.push({
            id: curIdx,
            need: data.need,
            attr: data.add[curIdx - 1],
            type: data.type
        });
        view._curIdx = curIdx;
        var select = BaseBitmap.create("qingyuanselect");
        topProgressGroup.addChild(select);
        view._select = select;
        var _loop_1 = function (i) {
            var icon = BaseBitmap.create("qingyuanprogressbox_" + ((haveunlock - 1) >= Number(i) ? 1 : 2));
            icon.name = "box" + (Number(i) + 1);
            icon.anchorOffsetX = icon.width / 2;
            icon.x = 68 + (Number(i)) * 127; //75
            icon.y = 8;
            topProgressGroup.addChild(icon);
            if ((Number(i) + 1) == curIdx) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, select, icon, [0, -5]);
            }
            icon.addTouchTap(function () {
                if (view._stop) {
                    return;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, select, icon, [0, -5]);
                view._curIdx = Number(i) + 1;
                tiptxt.text = LanguageManager.getlocal("qingyuandetailadd", [view._curIdx.toString()]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, tiptxt, progressbg, [0]);
                var arr = [{
                        id: view._curIdx,
                        need: data.need,
                        attr: data.add[view._curIdx - 1],
                        type: data.type
                    }];
                view._list.refreshData(arr);
            }, view);
            if (haveunlock - 1 == Number(i)) {
                progress.setPercentage((icon.x - 75) / progress.width);
            }
        };
        for (var i in data.need) {
            _loop_1(i);
        }
        if (data.need.length > 4) {
            topProgressGroup.width = progressbg.width + 90;
        }
        tiptxt.text = LanguageManager.getlocal("qingyuandetailadd", [view._curIdx.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, progressbg, [0, scrollView.height + 10]);
        var scrollList = ComponentManager.getScrollList(QingyuanDetailItem, arr, scroRect);
        scrollList.bounces = false;
        scrollList.x = 30;
        scrollList.y = tiptxt.y + tiptxt.height;
        view.addChildToContainer(scrollList);
        view._list = scrollList;
    };
    QingyuanDetailView.prototype.activateCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
            if (data.rewards) {
                var rewardList = GameData.formatRewardItem(data.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            view._curIdx = Math.min(Api.encounterVoApi.getActiveBuffNum(view.param.data.type) + 1, view.param.data.need.length);
            view._stop = true;
            //view.setIndex();
            view.clickEff();
            view.freshProgress();
            // let list : any = view._list;
            // for(let i in list._scrollListItemArr){
            //     let item = <QingyuanDetailItem>list._scrollListItemArr[i];
            //     if(item){
            //         item.refresh();
            //     }
            // }
        }
    };
    QingyuanDetailView.prototype.setIndex = function () {
        var view = this;
        var data = view.param.data;
        var type = data.type;
        var rolegroup = view.container.getChildByName("roleGroup");
        var haveidx = 0;
        var nothaveidx = 0;
        var notopenidx = 0;
        var imageIndex = {
            have: {},
            nothave: {},
            notopen: {}
        };
        for (var i in data.need) {
            var unit = data.need[i];
            var rewardvo = GameData.formatRewardItem(unit)[0];
            var info = Api.encounterVoApi.getNeedInfo(type, rewardvo.id.toString());
            if (info.isopen) {
                if (!info.have) {
                    ++nothaveidx;
                    imageIndex.nothave[Number(i)] = nothaveidx;
                }
                else {
                    if (Api.encounterVoApi.getActiveBuffIndex(type, Number(i) + 1)) {
                        ++haveidx;
                        imageIndex.have[Number(i)] = haveidx;
                    }
                    else {
                        ++nothaveidx;
                        imageIndex.nothave[Number(i)] = nothaveidx;
                    }
                }
            }
            else {
                ++notopenidx;
                imageIndex.notopen[Number(i)] = notopenidx;
            }
        }
        for (var i in imageIndex.notopen) {
            var group = rolegroup.getChildByName("group" + i);
            rolegroup.setChildIndex(group, imageIndex.notopen[i]);
        }
        for (var i in imageIndex.nothave) {
            var group = rolegroup.getChildByName("group" + i);
            rolegroup.setChildIndex(group, imageIndex.nothave[i] + Object.keys(imageIndex.notopen).length);
        }
        for (var i in imageIndex.have) {
            var group = rolegroup.getChildByName("group" + i);
            rolegroup.setChildIndex(group, imageIndex.have[i] + Object.keys(imageIndex.notopen).length + Object.keys(imageIndex.nothave).length);
        }
    };
    QingyuanDetailView.prototype.clickEff = function () {
        var view = this;
        var data = view.param.data;
        var progressgroup = view._progressGroup;
        var roleGroup = view.container.getChildByName("roleGroup");
        var lockGroup = view.container.getChildByName("lockGroup");
        var group = roleGroup.getChildByName("group" + view._lockIdx);
        var role = group.getChildByName("role" + view._lockIdx);
        // let poscfg = {
        // 	fourrenegade : {
        // 		20011 : {x : 215, y : 137, namex : 100, namey : 367, emptyx : 48, emptyy : 152, lockx : 40, locky : 80},
        // 		20031 : {x : 320, y : 213, namex : 288, namey : 220,emptyx : 217, emptyy : 94, lockx : 80, locky : 80},
        // 		20021 : {x : 67, y : 81, namex : 420, namey : 567,emptyx : 366, emptyy : 210, lockx : 40, locky : 80},
        // 		20041 : {x : 38, y : 274, namex : 186, namey : 561,emptyx : 114, emptyy : 258, lockx : 80, locky : 120},
        // 	}
        // };
        var lockcfg = data.unlock[view._lockSidx];
        //点击特效
        var click = ComponentManager.getCustomMovieClip("qingyuanclicked", 12, 70);
        click.width = 371;
        click.height = 370;
        click.anchorOffsetX = click.width / 2;
        click.anchorOffsetY = click.height / 2;
        click.setScale(1.25);
        click.x = lockcfg.x + 57;
        click.y = lockcfg.y + 47;
        click.playWithTime(1);
        click.setEndCallBack(function () {
            click.dispose();
            click = null;
        }, view);
        view.addChildToContainer(click);
        // let alpha = -50;
        //点击后角色置黑变白过程用时1秒。       
        egret.Tween.get(role).to({
            alpha: 1
        }, 1000).call(function () {
            App.DisplayUtil.changeToNormal(role);
        }, view);
        //点击时，锁和UI透明度淡出动画
        egret.Tween.get(lockGroup).to({ alpha: 0 }, 700).wait(1400).call(function () {
            //已解锁数目
            var haveunlock = Api.encounterVoApi.getActiveBuffNum(data.type);
            for (var i in data.need) {
                var unit = data.need[i];
                var rewardvo = GameData.formatRewardItem(unit)[0];
                var tmpgroup = roleGroup.getChildByName("group" + i);
                if (tmpgroup) {
                    var info = Api.encounterVoApi.getNeedInfo(data.type, rewardvo.id.toString());
                    if (info.isopen && info.have) {
                        if (!Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)) {
                            lockGroup.width = tmpgroup.width;
                            lockGroup.height = tmpgroup.height;
                            lockGroup.x = tmpgroup.x;
                            lockGroup.y = tmpgroup.y;
                            view._lockIdx = Number(i);
                            view._lockSidx = rewardvo.id;
                            var clip = lockGroup.getChildByName("clip");
                            var lockcfg_1 = data.unlock[rewardvo.id];
                            clip.x = lockcfg_1.x - lockGroup.x - 40;
                            clip.y = lockcfg_1.y - lockGroup.y - 50;
                            var lock = lockGroup.getChildByName("lock");
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lock, clip);
                            var lock2 = lockGroup.getChildByName("lock2");
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lock2, clip);
                            lockGroup.alpha = 1;
                            break;
                        }
                    }
                }
            }
        }, view);
        //点击时就在点击的中心位置播放圆球动画
        var ball = ComponentManager.getCustomMovieClip("qingyuanball", 10, 70);
        ball.width = 126;
        ball.height = 126;
        ball.anchorOffsetX = ball.width / 2;
        ball.anchorOffsetY = ball.height / 2;
        ball.playWithTime(-1);
        ball.setScale(1.3);
        ball.x = click.x;
        ball.y = click.y;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ball, click);
        view.addChildToContainer(ball);
        //在点击动画的播放过程中从130%缩放至60%.
        //已解锁数目
        var haveunlock = Api.encounterVoApi.getActiveBuffNum(data.type);
        var icon = progressgroup.getChildByName("box" + haveunlock);
        egret.Tween.get(ball).to({
            scaleX: 0.6,
            scaleY: 0.6,
        }, 840).to({ scaleX: 0.8, scaleY: 0.8, x: view._progressScroll.x + icon.x, y: view._progressScroll.y + icon.y + 25 }, 550).to({ scaleX: 2.4, scaleY: 2.4, alpha: 0 }, 100).call(function () {
            ball.dispose();
            ball = null;
            var nexticon = progressgroup.getChildByName("box" + (haveunlock + 1));
            if (nexticon) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._select, nexticon, [0, -5]);
            }
        }, view);
        //绿色圆球特效
        var green = BaseBitmap.create("qingyuanunlock");
        green.anchorOffsetX = green.width / 2;
        green.x = icon.x;
        green.y = icon.y - 38;
        progressgroup.addChild(green);
        green.alpha = 0;
        egret.Tween.get(green).wait(1400).set({ alpha: 1 }).to({ alpha: 0 }, 700).call(function () {
            green.dispose();
            green = null;
            view._stop = false;
        }, view);
    };
    QingyuanDetailView.prototype.freshProgress = function () {
        var view = this;
        var group = view._progressGroup;
        var data = view.param.data;
        var have = Api.encounterVoApi.getActiveBuffNum(data.type);
        for (var i in data.need) {
            var icon = group.getChildByName("box" + (Number(i) + 1));
            if (icon) {
                icon.setRes("qingyuanprogressbox_" + ((have - 1) >= Number(i) ? 1 : 2));
                if (have - 1 == Number(i)) {
                    view._progress.setPercentage((icon.x - 75) / view._progress.width);
                }
            }
        }
        var arr = [{
                id: view._curIdx,
                need: data.need,
                attr: data.add[view._curIdx - 1],
                type: data.type
            }];
        view._list.refreshData(arr);
        view._tiptxt.text = LanguageManager.getlocal("qingyuandetailadd", [view._curIdx.toString()]);
    };
    QingyuanDetailView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? this.viewBg.x : 569;
    };
    QingyuanDetailView.prototype.getShowHeight = function () {
        return 832;
    };
    QingyuanDetailView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._progress = null;
        view._progressGroup = null;
        view.removeTouchTap();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE), view.activateCallback, view);
        view._curIdx = 0;
        view._lockIdx = -1;
        view._progressScroll = null;
        view._stop = false;
        view._lockSidx = 0;
        view._tiptxt = null;
        view._select = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useCallback,this);
        _super.prototype.dispose.call(this);
    };
    return QingyuanDetailView;
}(PopupView));
__reflect(QingyuanDetailView.prototype, "QingyuanDetailView");
//# sourceMappingURL=QingyuanDetailView.js.map