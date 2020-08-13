/**
 * 修身获得
 * author shaoliang
 * date 2018/04/23
 * @class PracticeGetPopupView
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
var PracticeGetPopupView = (function (_super) {
    __extends(PracticeGetPopupView, _super);
    function PracticeGetPopupView() {
        return _super.call(this) || this;
    }
    PracticeGetPopupView.prototype.initView = function () {
        var basecfg = GameConfig.config.practicebaseCfg;
        var pnum = Api.practiceVoApi.getRealSpd();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var descBg = BaseBitmap.create("public_9_bg4");
        descBg.width = 530;
        descBg.height = 310;
        descBg.x = this.viewBg.x + this.viewBg.width / 2 - descBg.width / 2;
        descBg.y = this.viewBg.y + 10;
        this._nodeContainer.addChild(descBg);
        var startY = descBg.y + 30;
        var startX = descBg.x + 70;
        var pvip = Api.playerVoApi.getPlayerVipLevel();
        var plv = Api.playerVoApi.getPlayerLevel();
        var vipAdd = basecfg.vip[pvip];
        var vipAdd2 = basecfg.vip[pvip + 1];
        var levelAdd = basecfg.level[plv - 1];
        var levelAdd2 = basecfg.level[plv];
        var ptextV2 = undefined;
        var pnode2 = undefined;
        if (plv < Config.LevelCfg.getMaxLevel()) {
            ptextV2 = [Api.playerVoApi.getPlayerOfficeByLevel(plv + 1), String(levelAdd2)];
        }
        var pVipnode2 = undefined;
        var pVipText2 = undefined;
        if (pvip < Config.VipCfg.getMaxLevel()) {
            pVipText2 = [String(pvip + 1), (vipAdd2 * 100).toFixed(0) + "%"];
        }
        var uiList = [
            {
                node1: ComponentManager.getTextField(LanguageManager.getlocal("practice_getTxt2"), 28),
                textKey: "practice_getTxt1",
                textV: [String(pnum)],
                textKey2: undefined,
                textV2: undefined,
            },
            {
                node1: ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt", 0xfff000),
                textKey: "practice_officeAdd",
                // textKey2:"practice_officeAdd2",
                textV: [Api.playerVoApi.getPlayerOffice(), String(levelAdd)],
                // textV2:ptextV2,
                textKey2: undefined,
                textV2: undefined,
            },
            {
                node1: BaseLoadBitmap.create("vip_icon_" + Api.playerVoApi.getPlayerVipLevel()),
                textKey: "practice_vipAdd",
                // textKey2:"practice_vipAdd3",
                textV: [String((vipAdd * 100).toFixed(0)) + "%"],
                // textV2:pVipText2,
                textKey2: undefined,
                textV2: undefined,
            },
            {
                node1: BaseBitmap.create("monthcard_icon"),
                textKey: "practice_monthCardAdd",
                textKey2: undefined,
                textV: [(basecfg.monthCard * 100) + "%"],
                textV2: undefined,
            },
            {
                node1: BaseBitmap.create("yearcard_icon"),
                textKey: "practice_yearCardAdd",
                textKey2: undefined,
                textV: [(basecfg.yearCard * 100) + "%"],
                textV2: undefined,
            },
        ];
        for (var index = 0; index < uiList.length; index++) {
            var cfg = uiList[index];
            var node1 = cfg.node1;
            var isShowBtn = false;
            if (index == 1) {
                isShowBtn = Api.playerVoApi.getPlayerLevel() < Config.LevelCfg.getMaxLevel();
            }
            else if (index == 2) {
                isShowBtn = Api.playerVoApi.getPlayerVipLevel() < Config.VipCfg.getMaxLevel();
            }
            else if (index == 3) {
                isShowBtn = !Api.shopVoApi.ifBuyMonthCard();
            }
            else if (index == 4) {
                isShowBtn = !Api.shopVoApi.ifBuyYearCard();
            }
            if (index == 2) {
                node1.width = 80;
                node1.height = 35;
            }
            node1.anchorOffsetX = node1.width / 2;
            node1.anchorOffsetY = node1.height / 2;
            node1.x = startX;
            node1.y = startY;
            var btnStr = "practice_getBtnTxt1";
            if (index > 2) {
                node1.setScale(0.8);
                btnStr = "practice_getBtnTxt2";
            }
            this._nodeContainer.addChild(node1);
            var addTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (index < 2) {
                addTxt1.text = LanguageManager.getlocal(cfg.textKey, [].concat(cfg.textV));
            }
            else {
                if (index == 2) {
                    if (Api.playerVoApi.getPlayerVipLevel() == 0 && isShowBtn) {
                        addTxt1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                        addTxt1.text = LanguageManager.getlocal(cfg.textKey + "_1", cfg.textV);
                    }
                    else {
                        addTxt1.text = LanguageManager.getlocal(cfg.textKey, [].concat(cfg.textV));
                    }
                }
                if (index > 2) {
                    if (isShowBtn) {
                        addTxt1.text = "";
                        addTxt1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                        addTxt1.text = LanguageManager.getlocal(cfg.textKey + "_1", cfg.textV);
                    }
                    else {
                        addTxt1.text = LanguageManager.getlocal(cfg.textKey, [].concat(cfg.textV));
                    }
                }
            }
            addTxt1.anchorOffsetY = addTxt1.height / 2;
            addTxt1.x = startX + 110;
            addTxt1.y = startY;
            this._nodeContainer.addChild(addTxt1);
            if (cfg.textV2) {
                addTxt1.y -= 25;
                var addTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_GRAY);
                addTxt2.text = LanguageManager.getlocal(cfg.textKey2, [].concat(cfg.textV2));
                addTxt2.anchorOffsetY = addTxt1.height / 2;
                addTxt2.x = addTxt1.x;
                addTxt2.y = addTxt1.y + 30;
                this._nodeContainer.addChild(addTxt2);
            }
            if (isShowBtn) {
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnStr, this.btnHandler, this, [index]);
                btn.anchorOffsetY = btn.height / 2;
                btn.x = descBg.x + descBg.width - btn.width - 20;
                btn.y = startY;
                this._nodeContainer.addChild(btn);
            }
            else {
                if (index > 0) {
                    var flagImg = "practice_max";
                    if (index > 2) {
                        flagImg = "practice_active";
                    }
                    var flag = BaseBitmap.create(flagImg);
                    flag.anchorOffsetY = flag.height / 2;
                    flag.anchorOffsetX = flag.width / 2;
                    flag.x = descBg.x + descBg.width - 80;
                    flag.y = startY;
                    this._nodeContainer.addChild(flag);
                }
            }
            startY += 25;
            if (index < uiList.length - 1) {
                var lineImg = BaseBitmap.create("public_line1");
                lineImg.width = descBg.width - 20;
                lineImg.x = descBg.x + descBg.width / 2 - lineImg.width / 2;
                lineImg.y = startY;
                this._nodeContainer.addChild(lineImg);
            }
            startY += 35;
        }
        //按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(descBg.x + descBg.width / 2 - confirmBtn.width / 2, descBg.y + descBg.height + 15);
        this._nodeContainer.addChild(confirmBtn);
    };
    PracticeGetPopupView.prototype.btnHandler = function (param) {
        if (param == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
        }
        else if (param == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else if (param == 3) {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
        }
        else if (param == 4) {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
        }
        this.hide();
    };
    PracticeGetPopupView.prototype.getResourceList = function () {
        // return super.getResourceList().concat([
        // 	"progress3","progress3_bg","public_icon12","servant_detailBtn","servant_detailBtn_down",
        //     "practice_max","practice_plus_down","practice_plus",
        // ]);
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_list_bg", "practice_active",
            "tailor_get_light", "office_fnt", "monthcard_icon", "yearcard_icon", "practice_get_word",
        ]);
    };
    // protected getBgName():string
    // {
    // 	return "public_9_bg8";
    // }
    PracticeGetPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeGetPopupView;
}(PopupView));
__reflect(PracticeGetPopupView.prototype, "PracticeGetPopupView");
//# sourceMappingURL=PracticeGetPopupView.js.map