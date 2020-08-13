/**
 * 巾帼活动选择门客奖励
 * author qianjun
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChooseServantView = /** @class */ (function (_super) {
    __extends(ChooseServantView, _super);
    function ChooseServantView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._selectIdx = 0;
        return _this;
    }
    ChooseServantView.prototype.initView = function () {
        var view = this;
        var itemId = "1952";
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK, view.checkBuzhen, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE), view.seleCallBack, view);
        var str = "chooseservanttip_" + itemId;
        if (this.param && this.param.data && this.param.data.itemId) {
            itemId = this.param.data.itemId;
            str = "chooseToolCommonTip";
            if (String(itemId) == "1953" || String(itemId) == "1954" || String(itemId) == "1955" || String(itemId) == "1956" || String(itemId) == "2288") {
                str = "chooseservanttip_" + itemId;
            }
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(str), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = view.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = 10;
        view.addChildToContainer(tipTxt);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChildToContainer(bg);
        var itemcfg = Config.ItemCfg.getItemCfgById(itemId);
        var arr = GameData.formatRewardItem(itemcfg.chooseRewards);
        var rect = egret.Rectangle.create();
        var len = Math.min(Math.ceil(arr.length / 3), 2);
        rect.setTo(0, 0, 534, (len * 245) + 15);
        var list = ComponentManager.getScrollList(ChooseRewardItem, arr, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bg);
        bg.height = list.height + 10;
        view.addChildToContainer(list);
        view._list = list;
        if (arr.length == 2) {
            list.x = 132;
        }
        view._selectIdx = 0;
        var button = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultChoose", function () {
            //选择门客
            var str = itemcfg.chooseRewards.split("|");
            var chooseid = str[view._selectIdx];
            var rewardvo = GameData.formatRewardItem(chooseid)[0];
            if (itemId == "1955" && (rewardvo.id == 2003 || rewardvo.id == 2004)) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("chooseservanttip3", [itemcfg.name]),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                            itemId: itemId,
                            chooseId: chooseid
                        });
                    },
                    handle: view,
                    needClose: 1,
                    needCancel: true
                });
            }
            else {
                if (itemId == "1952") {
                    if (Api.servantVoApi.getServantObj(rewardvo.id.toString())) {
                        var servantData = Config.ServantCfg.getServantItemById(rewardvo.id);
                        var itemVo = GameData.formatRewardItem(servantData.exchange)[0];
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: LanguageManager.getlocal("chooseservanttip2", [servantData.name, itemVo.name, String(itemVo.num)]),
                            title: "itemUseConstPopupViewTitle",
                            touchMaskClose: true,
                            callback: function () {
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                                    itemId: itemId,
                                    chooseId: chooseid
                                });
                            },
                            handle: view,
                            needClose: 1,
                            needCancel: true
                        });
                    }
                    else {
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                            itemId: itemId,
                            chooseId: chooseid
                        });
                    }
                }
                else if (itemId == "1954") {
                    //佳人
                    var wifeData = Config.WifeCfg.getWifeCfgById(rewardvo.id);
                    var itemVo = GameData.formatRewardItem(wifeData.exchange)[0];
                    if (Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())) {
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: LanguageManager.getlocal("chooseservanttip2", [wifeData.name, itemVo.name, String(itemVo.num)]),
                            title: "itemUseConstPopupViewTitle",
                            touchMaskClose: true,
                            callback: function () {
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                                    itemId: itemId,
                                    chooseId: chooseid
                                });
                            },
                            handle: view,
                            needClose: 1,
                            needCancel: true
                        });
                    }
                    else {
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                            itemId: itemId,
                            chooseId: chooseid
                        });
                    }
                }
                else if (itemId == "1956") {
                    if (Api.servantVoApi.getServantObj(rewardvo.id.toString())) {
                        var servantData = Config.ServantCfg.getServantItemById(rewardvo.id);
                        var itemVo = GameData.formatRewardItem(servantData.exchange)[0];
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: LanguageManager.getlocal("chooseservanttip2", [servantData.name, itemVo.name, String(itemVo.num)]),
                            title: "itemUseConstPopupViewTitle",
                            touchMaskClose: true,
                            callback: function () {
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                                    itemId: itemId,
                                    chooseId: chooseid
                                });
                            },
                            handle: view,
                            needClose: 1,
                            needCancel: true
                        });
                    }
                    else {
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                            itemId: itemId,
                            chooseId: chooseid
                        });
                    }
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, {
                        itemId: itemId,
                        chooseId: chooseid
                    });
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, button, bg, [0, bg.height + 20]);
        view.addChildToContainer(button);
        if (arr.length == 5) {
            var item3 = list.getItemByIndex(3);
            item3.x = 88;
            var item4 = list.getItemByIndex(4);
            item4.x = 266;
        }
        else if (arr.length == 4) {
            var item1 = list.getItemByIndex(0);
            item1.x = 68;
            var item2 = list.getItemByIndex(1);
            item2.x = 286;
            var item3 = list.getItemByIndex(2);
            item3.x = 68;
            item3.y = 246;
            var item4 = list.getItemByIndex(3);
            item4.x = 286;
        }
    };
    ChooseServantView.prototype.getTitleStr = function () {
        return "adultChoose";
    };
    ChooseServantView.prototype.checkBuzhen = function (event) {
        var data = event.data;
        var view = this;
        var list = view._list;
        view._selectIdx = data;
        for (var i in list._scrollListItemArr) {
            var item = list._scrollListItemArr[i];
            item.update(data);
        }
    };
    ChooseServantView.prototype.getShowWidth = function () {
        return 600;
    };
    ChooseServantView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "itemservantselect", "itemservantbg",
        ]);
    };
    ChooseServantView.prototype.seleCallBack = function (evt) {
        var view = this;
        if (evt && evt.data && evt.data.ret && evt.data.data.data) {
            if (evt.data.data.data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                    replacerewards: evt.data.data.data.replacerewards,
                    callback: function () {
                        var rewards = evt.data.data.data.replacerewards;
                        var rewardList = GameData.formatRewardItem(rewards);
                        App.CommonUtil.playRewardFlyAction(rewardList);
                    },
                    handler: this
                });
            }
            view.hide();
        }
    };
    ChooseServantView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._selectIdx = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK, view.checkBuzhen, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE), view.seleCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return ChooseServantView;
}(PopupView));
//# sourceMappingURL=ChooseServantView.js.map