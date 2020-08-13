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
var AcJadeVo = (function (_super) {
    __extends(AcJadeVo, _super);
    function AcJadeVo() {
        return _super.call(this) || this;
    }
    AcJadeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACJADE_REFRESHVO);
    };
    Object.defineProperty(AcJadeVo.prototype, "unlock", {
        get: function () {
            return this.ainfo.unlock;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务类型的进度
     */
    AcJadeVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.task[type] ? this.ainfo.task[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcJadeVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcJadeVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskList();
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskStatus(taskData[i].id)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.gettTaskNum(taskData[i].questType) >= taskData[i].value) {
                taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
                continue;
            }
            else {
                taskData[i].sortId = Number(taskData[i].id);
                continue;
            }
        }
        return taskData;
    };
    // /**
    //  *  充值奖励 充值档位 领没领
    //  */
    // public isReceiveRecharge(id:string):boolean
    // {
    // 	return  this.recharge&&this.recharge.flags[id] == 1 ? true:false;
    // }
    /**
     * 充值的进度
     */
    AcJadeVo.prototype.getRechargeValue = function () {
        return this.recharge;
    };
    /**
     * 获得充值奖励的配置
     */
    AcJadeVo.prototype.getSortRecharge = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            // if(this.isReceiveRecharge(rechargeData[i].id))
            // {
            // rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            // continue;
            // }
            if (this.getRechargeValue() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    Object.defineProperty(AcJadeVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.isHaveTaskRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcJadeVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.getTaskList().length; i++) {
            if (this.gettTaskNum(cfg.getTaskList()[i].questType) >= cfg.getTaskList()[i].value) {
                if (!this.getTaskStatus(cfg.getTaskList()[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcJadeVo.prototype, "acTime", {
        // /**
        //  * 获得Task列表
        //  */
        // public isHaveRechargeRedDot():boolean
        // {
        // 	let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // 	if(!cfg)
        // 	{
        // 		return false;
        // 	}
        // 	for(let i = 0;i < cfg.getTotalList().length; i++ )
        // 	{
        // 		if(this.getRechargeValue() >= cfg.getTotalList()[i].rankV1)
        // 		{
        // 			//  if(!this.isReceiveRecharge(cfg.rechargeList()[i].id))
        // 			//  {
        // 				 return true;
        // 			//  }
        // 		}
        // 	}
        // 	return false;
        // }
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcJadeVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcJadeVo;
}(AcBaseVo));
__reflect(AcJadeVo.prototype, "AcJadeVo");
