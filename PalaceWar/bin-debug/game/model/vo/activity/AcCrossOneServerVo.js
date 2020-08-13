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
var AcCrossOneServerVo = /** @class */ (function (_super) {
    __extends(AcCrossOneServerVo, _super);
    function AcCrossOneServerVo() {
        var _this = _super.call(this) || this;
        _this.info = {};
        _this.task = {};
        _this.zidgroup = [];
        return _this;
    }
    AcCrossOneServerVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        // this.zidgroup = [11,12,13,17, 19,20, 31,33,34,35,41]
    };
    Object.defineProperty(AcCrossOneServerVo.prototype, "config", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossOneServerVo.prototype, "CurrServantImg", {
        /**
         * 获取当期门客立绘
         */
        get: function () {
            return "servant_full_" + this.config.servant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossOneServerVo.prototype, "CurrServantDragon", {
        /**
         * 获取当期门客龙骨
         */
        get: function () {
            return "servant_full2_" + this.config.servant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossOneServerVo.prototype, "CurrServantInfo", {
        /**
         * 获取当期门客信息
         */
        get: function () {
            return Config.ServantCfg.getServantItemById(this.config.servant);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossOneServerVo.prototype.getServerGroup = function () {
        var _gp = this.zidgroup.map(function (v) {
            return Api.mergeServerVoApi.getSeverName(v); //LanguageManager.getlocal("acCrossOneServerText20", [`${v}`]);
        });
        return LanguageManager.getlocal("acCrossOneServerText28", [_gp.join("、")]);
    };
    AcCrossOneServerVo.prototype.getServerGroupText = function () {
        //原来是显示x服，改成x区。
        // let _zid_gp: number[][] = [];
        // let _dd: number[] = [this.zidgroup[0]];
        // for (let i=1;i<this.zidgroup.length;i++) {
        //     if (this.zidgroup[i] == this.zidgroup[i-1]+1) {
        //         _dd.push(this.zidgroup[i]);
        //     } else {
        //         _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        //         _dd = [this.zidgroup[i]];
        //     }
        // }
        // if (_dd.length) {
        //     _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        // }
        // let __param = _zid_gp.slice(0, 5).map(v => {
        //     let _pm = v[0] == v[1] ? `${v[0]}` : `${v[0]}-${v[1]}`;
        //     return LanguageManager.getlocal("acCrossOneServerText20", [_pm]);
        // }).join("、");
        var _zid_gp = [];
        var server = "";
        var tmepGroup = [];
        if (Api.mergeServerVoApi.getQuByZid(this.zidgroup[0]) > 0) {
            for (var i = 0; i < this.zidgroup.length; i++) {
                var zid = Api.mergeServerVoApi.getQuByZid(this.zidgroup[i]);
                if (!GameData.isInArray(zid, tmepGroup)) {
                    tmepGroup.push(zid);
                }
            }
            server = "mergeServerOnlyqu";
        }
        else {
            server = "acCrossOneServerText20";
            tmepGroup = this.zidgroup;
        }
        var _dd = [tmepGroup[0]];
        for (var i = 1; i < tmepGroup.length; i++) {
            if (tmepGroup[i] == tmepGroup[i - 1] + 1) {
                _dd.push(tmepGroup[i]);
            }
            else {
                _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
                _dd = [tmepGroup[i]];
            }
        }
        if (_dd.length) {
            _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        }
        var __param = _zid_gp.slice(0, 5).map(function (v) {
            var _pm = v[0] == v[1] ? "" + v[0] : v[0] + "-" + v[1];
            return LanguageManager.getlocal(server, [_pm]);
        }).join("、");
        return LanguageManager.getlocal(_zid_gp.length > 5 ? "acCrossOneServerText25" : "acCrossOneServerText26", [__param]);
    };
    Object.defineProperty(AcCrossOneServerVo.prototype, "MsgText", {
        get: function () {
            var params = [
                this.CurrServantInfo.name,
                this.CurrServantInfo.name,
                this.config.needLv + "",
                this.acTimeAndHour
            ];
            return LanguageManager.getlocal("acCrossOneServerText1", params);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossOneServerVo.prototype, "risePower", {
        get: function () {
            return this.info.v || 0;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossOneServerVo.prototype.getTaskStatus = function (rkey) {
        if (this.task.flags[rkey]) {
            return 1;
        }
        var _ti = this.config.taskList[rkey - 1];
        return _ti.powerAdd <= this.risePower ? 3 : 2;
    };
    AcCrossOneServerVo.prototype.TaskHasRewGet = function () {
        var rsl = false;
        for (var i = 0; i < this.config.taskList.length; i++) {
            if (this.getTaskStatus(i + 1) == 3) {
                rsl = true;
                break;
            }
        }
        return rsl;
    };
    Object.defineProperty(AcCrossOneServerVo.prototype, "isShowRedDot", {
        /**
         * 检测活动是否显示红点，true：显示
         */
        get: function () {
            return this.TaskHasRewGet();
        },
        enumerable: true,
        configurable: true
    });
    AcCrossOneServerVo.prototype.getRankInfo = function (index) {
        NetManager.request(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK, {
            "activeId": this.aid + "-" + this.code,
            "index": index
        });
    };
    AcCrossOneServerVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossOneServerVo;
}(AcBaseVo));
//# sourceMappingURL=AcCrossOneServerVo.js.map