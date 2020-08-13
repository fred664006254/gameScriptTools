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
 * 配置
 */
var Config;
(function (Config) {
    /**
     *     --剧情
     */
    var NewstoryCfg;
    (function (NewstoryCfg) {
        var storyMap = {};
        function formatData(data) {
            if (typeof (data) == "object") {
                formatStory(data);
            }
            // for(var key in data)
            // {
            // 	if(typeof(data[key])=="object")
            // 	{
            // 		if(key=="story")
            // 		{
            // 			formatStory(data[key]);
            // 		}
            // 	}
            // 	else
            // 	{
            // 		NewstoryCfg[key]=data[key];
            // 	}
            // }
        }
        NewstoryCfg.formatData = formatData;
        function formatStory(data) {
            for (var key in data) {
                var storyCfg = new StoryItemCfg();
                storyCfg.initData(data[key]);
                storyCfg.id = String(key);
                storyMap[key] = storyCfg;
            }
        }
        function getStoryItemCfgById(storyId) {
            return storyMap[storyId];
        }
        NewstoryCfg.getStoryItemCfgById = getStoryItemCfgById;
    })(NewstoryCfg = Config.NewstoryCfg || (Config.NewstoryCfg = {}));
    var StoryItemCfg = (function (_super) {
        __extends(StoryItemCfg, _super);
        function StoryItemCfg() {
            var _this = _super.call(this) || this;
            _this.dialogMap = {};
            return _this;
        }
        StoryItemCfg.prototype.initData = function (data) {
            if (data) {
                for (var key in data) {
                    var dialogCfg = new DialogItemCfg();
                    dialogCfg.initData(data[key]);
                    dialogCfg.id = String(key);
                    if (this.startId == null && dialogCfg.begin == 1) {
                        this.startId = dialogCfg.id;
                    }
                    this.dialogMap[key] = dialogCfg;
                }
            }
        };
        StoryItemCfg.prototype.getDialogItemCfgById = function (dialog) {
            return this.dialogMap[dialog];
        };
        return StoryItemCfg;
    }(BaseItemCfg));
    Config.StoryItemCfg = StoryItemCfg;
    __reflect(StoryItemCfg.prototype, "Config.StoryItemCfg");
    var DialogItemCfg = (function (_super) {
        __extends(DialogItemCfg, _super);
        function DialogItemCfg() {
            return _super.call(this) || this;
        }
        return DialogItemCfg;
    }(BaseItemCfg));
    Config.DialogItemCfg = DialogItemCfg;
    __reflect(DialogItemCfg.prototype, "Config.DialogItemCfg");
})(Config || (Config = {}));
