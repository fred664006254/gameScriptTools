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
 * 设置
 * author dky
 * date 201711/10
 * @class SettingPopopView
 */
var SettingPopopView = (function (_super) {
    __extends(SettingPopopView, _super);
    function SettingPopopView() {
        var _this = _super.call(this) || this;
        _this._type = "";
        _this._openSound = true;
        _this._openMusic = true;
        _this._soundNum = 0.5;
        _this._musicNum = 0.5;
        _this.progressMaxWidth = 300;
        return _this;
    }
    SettingPopopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "hold_dinner_box",
            "hold_dinner_check",
        ]);
    };
    SettingPopopView.prototype.initView = function () {
        this.getLocalSettings();
        var btn = {
            x: 100,
            y: 20
        };
        var soundEffectstring = this._openSound ? LangMger.getlocal("settingSound") : LangMger.getlocal("settingSoundClose");
        var soundEffectText = ComponentMgr.getTextField(soundEffectstring, TextFieldConst.SIZE_20, 0x2B58AB);
        soundEffectText.x = btn.x;
        soundEffectText.y = btn.y;
        this.addChildToContainer(soundEffectText);
        this._soundProgres = ComponentMgr.getDragProgressBar("sound_progress", "sound_progerss_bar", 100, this.changeSoundValue, this, [], 0, this.progressMaxWidth);
        this.addChildToContainer(this._soundProgres);
        this._soundProgres.setBtnVisible(false);
        this._soundProgres.setDragIcon("sound_slide");
        this._soundProgres.setGray(!this._openSound);
        this._soundProgres.setPercentage(this._soundNum);
        this._soundCheckBox = ComponentMgr.getCheckBox(null, "sound_btn");
        this._soundCheckBox.x = btn.x;
        this._soundCheckBox.y = soundEffectText.y + soundEffectText.height + 5;
        this._soundCheckBox.setSelected(!this._openSound);
        this._soundCheckBox.addChangeStatusHanlder(function (target, args) {
            this._openSound = !this._openSound;
            var tem = this._openSound ? "ON" : "OFF";
            LocalStorageMgr.set(LocalStorageConst.LOCAL_SOUND_SWITCH, tem);
            this._soundProgres.setGray(!this._openSound);
            SoundMgr.setEffectOn(this._openSound);
            soundEffectText.text = this._openSound ? LangMger.getlocal("settingSound") : LangMger.getlocal("settingSoundClose");
        }, this);
        this.addChildToContainer(this._soundCheckBox);
        this._soundProgres.x = this._soundCheckBox.x + this._soundCheckBox.width - 5;
        this._soundProgres.y = this._soundCheckBox.y + (this._soundCheckBox.height - this._soundProgres.getBgHeight()) / 2;
        var musicStr = this._openMusic ? LangMger.getlocal("settingMusic") : LangMger.getlocal("settingMusicClose");
        var musicText = ComponentMgr.getTextField(musicStr, TextFieldConst.SIZE_20, 0x2B58AB);
        musicText.x = btn.x;
        musicText.y = this._soundCheckBox.y + this._soundCheckBox.height + 20;
        this.addChildToContainer(musicText);
        this._musicProgres = ComponentMgr.getDragProgressBar("sound_progress", "sound_progerss_bar", 100, this.changeMusicValue, this, [], 0, this.progressMaxWidth);
        this.addChildToContainer(this._musicProgres);
        this._musicProgres.setBtnVisible(false);
        this._musicProgres.setDragIcon("sound_slide");
        this._musicProgres.setGray(!this._openMusic);
        this._musicProgres.setPercentage(this._musicNum);
        this._musicCheckBox = ComponentMgr.getCheckBox(null, "music_btn");
        this._musicCheckBox.x = btn.x;
        this._musicCheckBox.y = musicText.y + musicText.height + 5;
        this._musicCheckBox.setSelected(!this._openMusic);
        this._musicCheckBox.addChangeStatusHanlder(function (target, args) {
            this._openMusic = !this._openMusic;
            var tem = this._openMusic ? "ON" : "OFF";
            LocalStorageMgr.set(LocalStorageConst.LOCAL_MUSIC_SWITCH, tem);
            SoundMgr.setBgOn(this._openMusic);
            this._musicProgres.setGray(!this._openMusic);
            musicText.text = this._openMusic ? LangMger.getlocal("settingMusic") : LangMger.getlocal("settingMusicClose");
        }, this);
        this.addChildToContainer(this._musicCheckBox);
        this._musicProgres.x = this._musicCheckBox.x + this._musicCheckBox.width - 5;
        this._musicProgres.y = this._musicCheckBox.y + (this._musicCheckBox.height - this._musicProgres.getBgHeight()) / 2;
        var userIDStr = "UID:" + Api.UserinfoVoApi.getShowUid();
        var userIDText = ComponentMgr.getTextField(userIDStr, TextFieldConst.SIZE_22, 0xCFDEFF);
        userIDText.width = this.viewBg.width;
        userIDText.x = 0;
        userIDText.y = 270;
        userIDText.textAlign = egret.HorizontalAlign.CENTER;
        userIDText.stroke = 2;
        userIDText.strokeColor = 0x0C2C77;
        this.addChildToContainer(userIDText);
    };
    SettingPopopView.prototype.checkShowContentBg = function () {
        return true;
    };
    SettingPopopView.prototype.getLocalSettings = function () {
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM) != "") {
            this._soundNum = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_NUM)) / 100;
            this._soundNum = parseFloat(this._soundNum.toFixed(2));
        }
        if (LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM) != "") {
            this._musicNum = parseInt(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_NUM)) / 100;
            this._musicNum = parseFloat(this._musicNum.toFixed(2));
        }
        this._openMusic = !(LocalStorageMgr.get(LocalStorageConst.LOCAL_MUSIC_SWITCH) == "OFF");
        this._openSound = !(LocalStorageMgr.get(LocalStorageConst.LOCAL_SOUND_SWITCH) == "OFF");
    };
    SettingPopopView.prototype.changeSoundValue = function (curNum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // this._soundText.text = curNum + "%";
        // this._soundText.x = this._soundProgres._dragIcon.x + (this._soundProgres._dragIcon.width - this._soundText.width) / 2
        LocalStorageMgr.set(LocalStorageConst.LOCAL_SOUND_NUM, curNum.toString());
        SoundMgr.setEffectVolume(curNum / 100);
    };
    SettingPopopView.prototype.changeMusicValue = function (curNum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // this._musicText.text = curNum + "%";
        // this._musicText.x = this._musicProgres._dragIcon.x + (this._musicProgres._dragIcon.width - this._musicText.width) / 2;
        LocalStorageMgr.set(LocalStorageConst.LOCAL_MUSIC_NUM, curNum.toString());
        SoundMgr.setBgVolume(curNum / 100);
    };
    SettingPopopView.prototype.soundBtnHander = function () {
    };
    SettingPopopView.prototype.musicBtnHander = function () {
    };
    SettingPopopView.prototype.getShowHeight = function () {
        return 420;
    };
    SettingPopopView.prototype.changeCheckFlagStatus = function (evt) {
        this._checkFlag.alpha = (this._checkFlag.alpha + 1) % 2;
        if (this._checkFlag.alpha == 1) {
            SoundMgr.setVoiceOn(false);
            LocalStorageMgr.set(LocalStorageConst.LOCAL_VIOICE_SWITCH, "false");
            this._checkFlag2.alpha = 0;
            App.CommonUtil.showTip(LangMger.getlocal("national"));
        }
    };
    SettingPopopView.prototype.idTouchHandler = function () {
        PlatMgr.client.getGUID();
    };
    SettingPopopView.prototype.openUserCenter = function () {
        PlatMgr.openUserCenter();
    };
    SettingPopopView.prototype.changeHandler = function (param) {
        LoginMgr.changeServer();
    };
    SettingPopopView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    SettingPopopView.prototype.dispose = function () {
        this._type = null;
        this._soundBB = null;
        this._soundState = null;
        this._type = "";
        this._musicText = null;
        this._musicProgres = null;
        this._soundProgres = null;
        this._soundText = null;
        _super.prototype.dispose.call(this);
    };
    return SettingPopopView;
}(PopupView));
__reflect(SettingPopopView.prototype, "SettingPopopView");
//# sourceMappingURL=SettingPopopView.js.map