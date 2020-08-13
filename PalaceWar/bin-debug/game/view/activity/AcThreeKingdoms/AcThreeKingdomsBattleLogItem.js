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
 对战信息logitem
 * author qianjun
 */
var AcThreeKingdomsBattleLogItem = (function (_super) {
    __extends(AcThreeKingdomsBattleLogItem, _super);
    function AcThreeKingdomsBattleLogItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsBattleLogItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleLogItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleLogItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleLogItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleLogItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBattleLogItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsBattleLogItem.prototype.initItem = function (index, rdata, itemparam) {
        var _this = this;
        var view = this;
        view.width = 620;
        view.height = 100;
        this._code = itemparam;
        var code = view.getUiCode();
        //获取最新一条记录
        var str = "";
        var data = rdata.attacklog;
        if (data) {
            //魏 玩家 （15服） （编号：1）成功防御了 吴国 玩家 （17服） 的进攻
            var param = [];
            //胜利方信息data.
            var downinfo = data.pklogs[0][3];
            var upinfo = data.pklogs[0][4];
            var downuid = downinfo.uid;
            var upuid = upinfo.uid;
            var isdownwin = Number(data.winuid) == Number(downuid);
            var winkingdom = LanguageManager.getlocal("acThreeKingdomsTeam" + (isdownwin ? data.kingdom1 : data.kingdom2) + "-" + code);
            var winname = isdownwin ? downinfo.name : upinfo.name;
            var winzid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? downinfo.uid : upinfo.uid));
            var winuid = isdownwin ? downuid : upuid;
            var fromkid = Math.ceil(data.mainland / 2);
            //1防御成功 2攻城成功
            var attacktype = isdownwin ? 2 : 1;
            var losekingdom = LanguageManager.getlocal("acThreeKingdomsTeam" + (isdownwin ? data.kingdom2 : data.kingdom1) + "-" + code);
            var losename = isdownwin ? upinfo.name : downinfo.name;
            var losezid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? upinfo.uid : downinfo.uid));
            var loseuid = isdownwin ? upuid : downuid;
            param = [winkingdom, winname, winzid, winuid, losekingdom, losename, losezid];
            // pklogs[1]={firstflag,win,reports,ainfo,binfo}
            // ainfo = {uid=uid,name=mUserinfo.name,power=mUserinfo.power} 
            //attacklist[1]={id=id,attacklog=attacklog}
            //attacklog = {pklogs=pklogs,winuid=winuid,sidlist1=sidlist1,sidlist2=sidlist2,aBuff=aBuff,bBuff=bBuff,troopNum=troopNum,kingdom1=kingdom1,kingdom2=kingdom2,mainland=mainland,building=building}
            if (data.troopNum) {
                attacktype = isdownwin ? 4 : 3;
                param.push(App.StringUtil.changeIntToText(data.troopNum.troopNum));
                if (data.mainland == 7) {
                    var time = App.DateUtil.getFormatBySecond(data.time, 20);
                    var timearr = time.split("-");
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomcenter" + (Number(timearr[2]) == 6 ? 1 : 2), code), [data.building]));
                }
                else {
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdom" + fromkid + "_" + ((data.mainland % 2 == 0 ? 2 : 1) + 3), code), [data.building]));
                }
                // param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${fromkid}City${(data.mainland % 2 == 0 ? 2 : 1) + 3}Name`, code)));
                // param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdom${fromkid}_${(data.mainland % 2 == 0 ? 2 : 1) + 3}`, code), [data.building]));
            }
            param.push(App.DateUtil.getFormatBySecond(data.time, 2));
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsPklog" + attacktype, code), param);
        }
        var logTxt = ComponentManager.getTextField(index + 1 + "." + str, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        logTxt.width = 440;
        logTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, logTxt, view, [10, 0], true);
        view.addChild(logTxt);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "allianceBtnCheck", function () {
            _this.vo.tmpinfo.cityid = data.mainland;
            _this.vo.tmpinfo.kindomid = data.kingdom2;
            _this.vo.tmpinfo.judianid = data.building;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETLISTDETAIL, {
                activeId: view.acTivityId,
                id: rdata.id
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, view, [0, 0], true);
        view.addChild(btn);
        var line = BaseBitmap.create("public_line1");
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        this.addChild(line);
    };
    AcThreeKingdomsBattleLogItem.prototype.dispose = function () {
        this._code = '';
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsBattleLogItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsBattleLogItem.prototype, "AcThreeKingdomsBattleLogItem");
//# sourceMappingURL=AcThreeKingdomsBattleLogItem.js.map