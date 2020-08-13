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
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE, _this.hideLastScene, _this);
        return _this;
    }
    SceneController.prototype.playBg = function () {
        var scene = this._sceneList[this._curScene];
        if (scene && scene["playBg"]) {
            scene["playBg"]();
        }
    };
    SceneController.prototype.go = function (sceneId, successCallback, successCallbackThisObj) {
        // if(sceneId)
        // {
        // 	ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
        // }
        if (this._curScene == sceneId) {
            return;
        }
        this._goSceneCallBack = successCallback;
        this._goSceneCallBackThisObj = successCallbackThisObj;
        this._lastScene = this._curScene;
        // if(this._curScene)
        // {
        // 	if(this._sceneList.hasOwnProperty(this._curScene))
        // 	{
        // 		let curScene:BaseScene = this._sceneList[this._curScene];
        // 		if(curScene)
        // 		{
        // 			curScene.hide();
        // 		}
        // 	}
        // }
        var scene = undefined;
        if (this._sceneList.hasOwnProperty(sceneId)) {
            scene = this._sceneList[sceneId];
        }
        else {
            var sceneClass = egret.getDefinitionByName(sceneId);
            scene = new sceneClass();
            this._sceneList[sceneId] = scene;
        }
        // this._curScene=sceneId;
        scene.show();
        if (!this._isTicking) {
            this._isTicking = true;
            TickManager.addTick(this.tick, this);
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
    SceneController.prototype.jump = function (successCallback, successCallbackThisObj) {
        if (this._curScene == SceneConst.SCENE_HOME) {
            this.goCity(successCallback, successCallbackThisObj);
        }
        else {
            this.goHome(successCallback, successCallbackThisObj);
        }
    };
    SceneController.prototype.goHome = function (successCallback, successCallbackThisObj) {
        this.go(SceneConst.SCENE_HOME, successCallback, successCallbackThisObj);
    };
    SceneController.prototype.goCity = function (successCallback, successCallbackThisObj) {
        this.go(SceneConst.SCENE_CITY, successCallback, successCallbackThisObj);
    };
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
                scene.show(true);
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
    /**
     * 检测是否在府邸
     */
    SceneController.prototype.checkisAtHomeScene = function () {
        return this._curScene == SceneConst.SCENE_HOME || (!this._curScene);
    };
    SceneController.prototype.dispose = function () {
        this.hideAllScene(true);
        TickManager.removeTick(this.tick, this);
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