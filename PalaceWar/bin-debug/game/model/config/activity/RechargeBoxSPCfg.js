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
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RechargeBoxSPCfg = (function () {
            function RechargeBoxSPCfg() {
                this.rechargeBoxItemMap = {};
                this.rechargeBoxItemMap2 = {};
                this.AVGDialog_code1 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_full_2020", "nameId": "wifeName_2020", "clickContinue": true, "resEndId": "2020" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "2020" },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "2020" },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_full_2020", "nameId": "wifeName_2020", "clickContinue": true, "resEndId": "2020" },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "2020" },
                        "6": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_full_2020", "nameId": "wifeName_2020", "clickContinue": true, "resEndId": "2020" },
                    },
                };
            }
            /**
             * 初始化数据
             */
            RechargeBoxSPCfg.prototype.formatData = function (data) {
                for (var key in data.boxList) {
                    var itemCfg = new RechargeBoxSPItemCfg();
                    itemCfg.initData(data.boxList[key]);
                    itemCfg.id = Number(key) + 1;
                    this.rechargeBoxItemMap2[key] = itemCfg;
                    if (!this.rechargeBoxItemMap.hasOwnProperty(itemCfg.needGem)) {
                        this.rechargeBoxItemMap[itemCfg.needGem] = itemCfg;
                    }
                    this.rechargeBoxItemMap[itemCfg.needGem].addChild(itemCfg);
                }
            };
            RechargeBoxSPCfg.prototype.getDialogById = function (id, code) {
                var ccode = null;
                if (this["AVGDialog_code" + code]) {
                    ccode = code;
                }
                else {
                    ccode = 1;
                }
                // if(id=="first"){
                //     return this["AVGDialog_code" + ccode]["first"];
                // } else {
                //     return this["AVGDialog_code" + ccode][`id${id}`];
                // }
                return this["AVGDialog_code1"]["first"];
            };
            RechargeBoxSPCfg.prototype.getBoxListBaseData = function () {
                var arr = [];
                for (var key in this.rechargeBoxItemMap) {
                    arr.push(this.rechargeBoxItemMap[key]);
                }
                return arr;
            };
            /**
             * 获取当前的boxList cfg
             */
            RechargeBoxSPCfg.prototype.getBoxListData = function () {
                var arr = [];
                for (var key in this.rechargeBoxItemMap) {
                    arr.push(this.rechargeBoxItemMap[key]);
                }
                arr.sort(function (a, b) {
                    return b.id - a.id;
                });
                var maxIndex = 0;
                var maxCost = 0;
                for (var i = 0; i < arr.length; i++) {
                    var thirdPayGem = arr[i].thirdPayGem;
                    if (thirdPayGem) {
                        if (thirdPayGem > maxCost) {
                            maxCost = thirdPayGem;
                            maxIndex = i;
                        }
                    }
                    else {
                        var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(arr[i].needGem);
                        if (rechargecfg.cost > maxCost) {
                            maxCost = rechargecfg.cost;
                            maxIndex = i;
                        }
                    }
                }
                if (maxIndex != 1 && arr.length > 2) {
                    var tmp = arr[1];
                    arr[1] = arr[maxIndex];
                    arr[maxIndex] = tmp;
                }
                return arr;
            };
            //根据id得到数据
            RechargeBoxSPCfg.prototype.getBoxDataById = function (id) {
                return this.rechargeBoxItemMap2[id];
            };
            /**
             * 根据充值档位取当前的cfg
             */
            RechargeBoxSPCfg.prototype.getBoxData = function (gears) {
                for (var key in this.rechargeBoxItemMap) {
                    var boxData = this.rechargeBoxItemMap[key];
                    if (boxData.needGem == gears) {
                        return boxData;
                    }
                }
                return null;
            };
            /**
             * 获取红颜头像框数据
             */
            RechargeBoxSPCfg.prototype.getShowWifeData = function () {
                var boxData = this.rechargeBoxItemMap2;
                var dataArr = [];
                for (var i in boxData) {
                    var rewards = boxData[i].getReward;
                    var reward = rewards.split("|")[0];
                    if (reward) {
                        var strArr = reward.split("_");
                        var data = {};
                        if (strArr[0] == "10") {
                            data = { idType: reward, sortId: 2, needGem: boxData[i].needGem };
                            dataArr.push(data);
                        }
                        else if (strArr[0] == "11" && strArr[1] == "4033") {
                            data = { idType: reward, sortId: 3, needGem: boxData[i].needGem };
                            dataArr.push(data);
                        }
                        else if (strArr[0] == "8") {
                            data = { idType: reward, sortId: 1, needGem: boxData[i].needGem };
                            dataArr.push(data);
                        }
                    }
                }
                dataArr.sort(function (a, b) {
                    return a.sortId - b.sortId;
                });
                return dataArr;
            };
            return RechargeBoxSPCfg;
        }());
        AcCfg.RechargeBoxSPCfg = RechargeBoxSPCfg;
        __reflect(RechargeBoxSPCfg.prototype, "Config.AcCfg.RechargeBoxSPCfg");
        var RechargeBoxSPItemCfg = (function (_super) {
            __extends(RechargeBoxSPItemCfg, _super);
            function RechargeBoxSPItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 可获得奖励次数
                 */
                _this.limit = 0;
                /**
                 * 解锁id
                 */
                _this.unlockID = 0;
                _this.gemDrop = [];
                _this.childList = [];
                _this.thirdPayGem = undefined;
                _this.VND = undefined;
                return _this;
            }
            RechargeBoxSPItemCfg.prototype.addChild = function (child) {
                if (child != null) {
                    if (this.childList.length > 0) {
                        this.limit += child.limit;
                    }
                    this.childList.push(child);
                }
            };
            return RechargeBoxSPItemCfg;
        }(BaseItemCfg));
        AcCfg.RechargeBoxSPItemCfg = RechargeBoxSPItemCfg;
        __reflect(RechargeBoxSPItemCfg.prototype, "Config.AcCfg.RechargeBoxSPItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RechargeBoxSPCfg.js.map