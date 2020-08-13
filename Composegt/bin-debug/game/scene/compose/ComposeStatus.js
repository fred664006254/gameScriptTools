var ComposeStatus;
(function (ComposeStatus) {
    //NetManager.request("map.testunlockgroup",groupid:90); 测试解锁关卡
    ComposeStatus.renSize = new egret.Rectangle(0, 0, 94, 134);
    ComposeStatus.renBigSize = new egret.Rectangle(0, 0, 192, 260);
    ComposeStatus.status = ComposeEnums.NONE;
    ComposeStatus.curStopPos = { x: -1, y: -1 };
    ComposeStatus.curSelectPos = { x: -1, y: -1 };
    ComposeStatus.targetList = {};
    ComposeStatus.startX = 56 + 45 - 73; //732-182;
    ComposeStatus.startY = 395 + 23 - 74; //722-368-92;
    ComposeStatus.cellCfg = { w: 146, h: 148 }; //{w:90,h:46,spaceX:56,spaceY:102};
    ComposeStatus.cellBgSize = { w: 90, h: 46 };
    ComposeStatus.angle = Math.atan2(ComposeStatus.cellCfg.h, ComposeStatus.cellCfg.w) * 180 / Math.PI;
    ComposeStatus.mapSize = { w: 1808, h: 1750 };
    ComposeStatus.buyNum = 0;
    ComposeStatus.isBatchMoving = false;
    // export let isComposeing:boolean=false;
    // export function getDataById(id:string):ComposemapItemVo
    // {
    // 	return Api.composemapVoApi.getCellDataById(id);
    // }
    function getLeftTopPixByPos(x, y) {
        var _a = getPixPosByCellPos(x, y), pixX = _a.pixX, pixY = _a.pixY;
        return { pixX: pixX - ComposeStatus.cellCfg.w * 0.5, pixY: pixY - ComposeStatus.cellCfg.h * 0.5 };
    }
    ComposeStatus.getLeftTopPixByPos = getLeftTopPixByPos;
    function getRightButtomPixByPos(x, y) {
        var _a = getPixPosByCellPos(x, y), pixX = _a.pixX, pixY = _a.pixY;
        return { pixX: pixX + ComposeStatus.cellCfg.w * 0.5, pixY: pixY + ComposeStatus.cellCfg.h * 0.5 };
    }
    ComposeStatus.getRightButtomPixByPos = getRightButtomPixByPos;
    function getPixPosByCellPos(x, y) {
        var pixX = ComposeStatus.startX + x * (ComposeStatus.cellCfg.w) + ComposeStatus.cellCfg.w * 0.5;
        var pixY = ComposeStatus.startY + y * (ComposeStatus.cellCfg.h) + ComposeStatus.cellCfg.h * 0.5;
        return { pixX: pixX, pixY: pixY };
    }
    ComposeStatus.getPixPosByCellPos = getPixPosByCellPos;
    function resetStatus() {
        ComposeStatus.status = ComposeEnums.NONE;
    }
    ComposeStatus.resetStatus = resetStatus;
    function getCellPosByPixPos(pixX, pixY) {
        var x = -1, y = -1;
        pixX = pixX - ComposeStatus.startX;
        pixY = pixY - ComposeStatus.startY;
        // let radian=Math.atan2(pixY,pixX)
        // let tmpAngle=radian*180/Math.PI;
        // console.log("agnle"+tmpAngle);
        // if(tmpAngle>=this.angle&&tmpAngle<=(180-this.angle))
        // {
        // var k0 = Math.tan(Math.PI-this.angle*Math.PI/180);
        // var k1 = Math.tan(angle*Math.PI/180);
        // var e = (pixY+ComposeStatus.startY-k0*(pixX+ComposeStatus.startX));
        // var e1 = (ComposeStatus.startY - k1*ComposeStatus.startX);
        // var xp = (e1-e)/(k0-k1);
        // //x
        // let ps={x:(e1-e)/(k0-k1),y:k0*xp + e};
        // //y
        // let e2=(ComposeStatus.startY-k0*ComposeStatus.startX);
        // let e3=(pixY+ComposeStatus.startY - k1*(pixX+ComposeStatus.startX));
        // var xp2 = (e3-e2)/(k0-k1);
        // let ps2={x:(e3-e2)/(k0-k1),y:k0*xp2 + e2};
        // let disX=ps.x-ComposeStatus.startX;
        // let disY=ps2.y-ComposeStatus.startY;
        // let offX=disX/(ComposeStatus.cellCfg.w/2);
        // let offY=disY/(ComposeStatus.cellCfg.h/2);
        // offX=offX<0?Math.floor(offX):Math.floor(offX);
        // offY=offY<0?Math.floor(offY):Math.floor(offY);
        // console.log(offX, offY);
        var offX = pixX / (ComposeStatus.cellCfg.w);
        var offY = pixY / (ComposeStatus.cellCfg.h);
        offX = offX < 0 ? Math.floor(offX) : Math.floor(offX);
        offY = offY < 0 ? Math.floor(offY) : Math.floor(offY);
        // console.log(pixX, pixY);
        return { x: offX, y: offY };
        // }
        // else
        // {
        // 	return {x:x,y:y};
        // }
        // return null;
    }
    ComposeStatus.getCellPosByPixPos = getCellPosByPixPos;
    function clear() {
        ComposeStatus.status = ComposeEnums.NONE;
        ComposeStatus.curStopPos = { x: -1, y: -1 };
        ComposeStatus.curSelectPos = { x: -1, y: -1 };
        ComposeStatus.targetList = {};
        ComposeStatus.delId = null;
        ComposeStatus.buyNum = 0;
        ComposeStatus.isBatchMoving = false;
        // isComposeing = false
    }
    ComposeStatus.clear = clear;
})(ComposeStatus || (ComposeStatus = {}));
