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
 * 主播网红
 * author 赵占涛
 * date 2018/3/17
 * @class ZhubowanghongView
 */
var ZhubowanghongView = (function (_super) {
    __extends(ZhubowanghongView, _super);
    function ZhubowanghongView() {
        return _super.call(this) || this;
    }
    ZhubowanghongView.prototype.initView = function () {
        console.log("ZhubowanghongView.initView");
        var bg = BaseBitmap.create("zhubowanghong_bg");
        bg.y = -13;
        this.addChildToContainer(bg);
        // let btnBg = BaseBitmap.create("wifeskin_barbg");
        // btnBg.x = 0;
        // btnBg.y = GameConfig.stageHeigth - this.container.y - btnBg.height;
        // this.addChildToContainer(btnBg);
        // 寻访按钮
        // let goXunfangBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"zhubowanghong_goXunfang",this.xunfangButtonHandler ,this);        
        // goXunfangBtn.x = btnBg.width/2 - goXunfangBtn.width/2;
        // goXunfangBtn.y = btnBg.y + btnBg.height/2 - goXunfangBtn.height/2;
        // goXunfangBtn.name = "goXunfangBtn";
        // this.addChildToContainer(goXunfangBtn);
        // console.log("ZhubowanghongView.initView over");
    };
    ZhubowanghongView.prototype.xunfangButtonHandler = function () {
        if (Api.searchVoApi.isShowNpc()) {
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
        }
        else {
            App.CommonUtil.showTip(Api.searchVoApi.getLockedString());
        }
    };
    ZhubowanghongView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "zhubowanghong_bg"
        ]);
    };
    ZhubowanghongView.prototype.dispose = function () {
        this._handContainer = null;
        _super.prototype.dispose.call(this);
    };
    return ZhubowanghongView;
}(CommonView));
__reflect(ZhubowanghongView.prototype, "ZhubowanghongView");
