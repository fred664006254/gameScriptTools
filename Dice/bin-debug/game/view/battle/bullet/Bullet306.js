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
 * 原名称：-原名称：齿轮骰子  --新名称：回音
*/
var Bullet306 = (function (_super) {
    __extends(Bullet306, _super);
    function Bullet306() {
        return _super.call(this) || this;
    }
    //链接的攻击力
    // public getDmgData():{dmg:number,isCrit:boolean}{
    //     let dmgData:{dmg:number,isCrit:boolean}=null;
    //     if(Config.DiceCfg.checkHasNmAtk(String(this.id)))
    //     {
    //         let initInfo=Api.BattleVoApi.getInitInfo(this.isMe);
    //         let addCritScale=0;
    //         let isCrit:boolean=false;
    //         if(this.checkCrit(initInfo.uid))
    //         {
    //             isCrit=true;
    //             addCritScale=(initInfo.crivalue)/100;
    //             App.LogUtil.log(initInfo.uid,"暴击",addCritScale,BattleStatus.battleLogicHasTickTime);
    //         }
    //         dmgData={dmg:this._damage*(1+addCritScale),isCrit:isCrit};
    //     }
    //     return dmgData;
    // }
    Bullet306.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet306;
}(Bullet));
__reflect(Bullet306.prototype, "Bullet306");
//# sourceMappingURL=Bullet306.js.map