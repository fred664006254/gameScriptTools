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
var SceneController = (function (_super) {
    __extends(SceneController, _super);
    function SceneController() {
        var _this = _super.call(this) || this;
        _this._curScene = undefined;
        _this._lastScene = undefined;
        _this._sceneList = new Object();
        _this._isTicking = false;
        App.MsgHelper.addEvt(MsgConst.HIDE_LAST_SCENE, _this.hideLastScene, _this);
        return _this;
    }
    SceneController.prototype.playBg = function () {
        var scene = this._sceneList[this._curScene];
        if (scene && scene["playBg"]) {
            scene["playBg"]();
        }
    };
    SceneController.prototype.go = function (sceneId, params, successCallback, successCallbackThisObj) {
        if (this._curScene == sceneId) {
            return;
        }
        this._goSceneCallBack = successCallback;
        this._goSceneCallBackThisObj = successCallbackThisObj;
        this._lastScene = this._curScene;
        var scene = undefined;
        if (this._sceneList.hasOwnProperty(sceneId)) {
            scene = this._sceneList[sceneId];
        }
        else {
            var sceneClass = egret.getDefinitionByName(sceneId);
            if (sceneClass) {
                scene = new sceneClass();
                this._sceneList[sceneId] = scene;
            }
            else {
                App.LogUtil.log("lost " + sceneId);
                return;
            }
        }
        scene.show(params);
        if (!this._isTicking) {
            this._isTicking = true;
            TickMgr.addTick(this.tick, this);
        }
    };
    SceneController.prototype.tick = function () {
        if (this._sceneList) {
            for (var sceneId in this._sceneList) {
                var scene = this._sceneList[sceneId];
                if (scene && scene.isShow() && scene.isInit() && scene.parent && scene["tick"]) {
                    scene["tick"]();
                }
            }
        }
    };
    SceneController.prototype.hideLastScene = function (e) {
        if (e && e.data && e.data.sceneId) {
            this._curScene = e.data.sceneId;
        }
        if (this._goSceneCallBack) {
            this._goSceneCallBack.call(this._goSceneCallBackThisObj);
            this._goSceneCallBack = this._goSceneCallBackThisObj = null;
        }
        if (this._lastScene) {
            if (this._sceneList.hasOwnProperty(this._lastScene)) {
                var curScene = this._sceneList[this._lastScene];
                if (curScene) {
                    curScene.hide();
                }
            }
        }
    };
    SceneController.prototype.goReady = function (successCallback, successCallbackThisObj) {
        this.go(SceneConst.SCENE_READY, null, successCallback, successCallbackThisObj);
    };
    // public goScene(scene:string,params:{[key:string]:any},successCallback?:Function,successCallbackThisObj?:any):void
    // {
    // 	this.go(scene,params,successCallback,successCallbackThisObj);
    // }
    SceneController.prototype.hideScene = function () {
        if (this._curScene && this._sceneList && this._sceneList[this._curScene]) {
            var scene = this._sceneList[this._curScene];
            if (scene.isShow()) {
                scene.hide();
            }
        }
    };
    SceneController.prototype.showScene = function () {
        if (this._curScene && this._sceneList && this._sceneList[this._curScene]) {
            var scene = this._sceneList[this._curScene];
            if (scene) {
                scene.show();
            }
        }
    };
    SceneController.prototype.hideAllScene = function (isDispose) {
        if (this._sceneList) {
            for (var sceneId in this._sceneList) {
                var scene = this._sceneList[sceneId];
                if (scene && scene.isShow()) {
                    scene.hide(isDispose);
                }
            }
        }
        this._goSceneCallBack = this._goSceneCallBackThisObj = null;
        this._curScene = null;
    };
    SceneController.prototype.dispose = function () {
        this.hideAllScene(true);
        TickMgr.removeTick(this.tick, this);
        this._isTicking = false;
    };
    SceneController.getInstance = function () {
        if (!SceneController._instance) {
            SceneController._instance = new SceneController();
        }
        return SceneController._instance;
    };
    SceneController._instance = undefined;
    return SceneController;
}(BaseController));
__reflect(SceneController.prototype, "SceneController");
//# sourceMappingURL=SceneController.js.map