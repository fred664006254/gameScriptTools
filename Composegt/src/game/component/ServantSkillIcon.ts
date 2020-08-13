class ServantSkillIcon extends BaseDisplayObjectContainer {
    public constructor(skill: ServantSkillBarParams, showDetail: boolean = true, showType: boolean = false, showName: boolean = false, effect: boolean = false) {
        super();
        this.skillInfo = skill;
        this.showDetail = showDetail;
        this.showType = showType;
        this.showName = showName;
        this.showEffect = effect;
        this.initView(skill);
    }

    private _icon: BaseLoadBitmap;
    private _effect: CustomMovieClip;
    private _skillId: string;
    private _typeBg: BaseBitmap;
    private _type: BaseBitmap;
    // private _nameBg: BaseBitmap;
    private _name: BaseDisplayObjectContainer;

    private skillInfo: ServantSkillBarParams;
    private showDetail: boolean;
    private showType: boolean;
    private showName: boolean;
    private showEffect: boolean;

    private isGray: boolean = false;

    private _callBack: (skillInfo: ServantSkillBarParams)=>void;
    private _callBackObj: any;

    private initView(skill: ServantSkillBarParams) {
        this._skillId = skill.skillid;

        this._icon = BaseLoadBitmap.create(skill.icon);
        this._icon.width = this._icon.height = 108;
        this.addChild(this._icon);

        this._typeBg = BaseBitmap.create("public_skilltypebg_" + this.skillInfo.type);
        this.addChild(this._typeBg);
        this._typeBg.setPosition(-6, 5);
        this._type = BaseBitmap.create("public_skilltype_" + this.skillInfo.type);
        this.addChild(this._type);
        this._type.setPosition(-6, 5);
        this._type.visible = this._typeBg.visible = this.showType;

        this._name = new BaseDisplayObjectContainer();
        this.addChild(this._name);
        this._name.setPosition(0, 115);
        let _nameBg = BaseBitmap.create("public_skillnamebg");
        this._name.addChild(_nameBg);
        _nameBg.width = 116;
        _nameBg.setPosition(-5, 0);
        let _name = ComponentManager.getTextField(this.skillInfo.skillname, 18, 0xffeeca);
        this._name.addChild(_name);
        _name.textAlign = TextFieldConst.ALIGH_CENTER;
        _name.width = 106;
        _name.setPosition(0, 3);
        this._name.visible = this.showName;

        if (this.showEffect) {
            this.addEffect();
        }
        
        this.addTouchTap(this.onTouchTap, this);
    }

    private onTouchTap(e: egret.TouchEvent) {
        if (!this.showDetail) return;
        if (this._callBack && this._callBackObj) {
            this._callBack.call(this._callBackObj, this.skillInfo);
        } else {
            ComponentManager.getSkillDetail().showSkill(this.skillInfo, this.getLayer(), this.localToGlobal(), this._icon.width);
        }
    }

    /**
     * 自定义点击反馈
     */
    public setCallBack(callBack: (skillInfo: ServantSkillBarParams)=>void, obj: any) {
        this._callBack = callBack;
        this._callBackObj = obj;
    }

    /**
     * 移除自定义点击
     */
    public removeCallBack() {
        this._callBack = null;
        this._callBackObj = null;
    }

    public set Size(size: number) {
        this.width = this.height = size;
        this._icon.width = this._icon.height = size;

        const __scale: number = size/106;

        if (this.showType) {
            this._type.setScale(__scale);
            this._typeBg.setScale(__scale);
        }

        if (this.showName) {
            this._name.setScale(__scale);
            this._name.y = size + 6;
        }

        if (this._effect) {
            this._effect.setPosition(this._icon.width/2, this._icon.height/2);
            this._effect.setScale(size/74);
        }
    }

    public set Gray(g: boolean) {
        if (this.isGray == g) return;
        this.isGray = g;
        if (this.isGray) {
            App.DisplayUtil.changeToGray(this);
        } else {
            App.DisplayUtil.changeToNormal(this);
        }
    }

    public get skillId(): string {
        return this._skillId;
    }

    public localToGlobal(): egret.Point {
        return super.localToGlobal();
    }

    public get isSkillIcon(): boolean {
        return true;
    }

    public set Effect(effect: boolean) {
        if (this.showEffect == effect) return;
        this.showEffect = effect;
        if (this.showEffect) {
            this.addEffect();
        } else {
            this.removeEffect();
        }
    }

    private addEffect() {
        if (!this._effect) {
            this._effect = ComponentManager.getCustomMovieClip("cmpsbuyeffect", 10, 120);
            this._effect.blendMode = egret.BlendMode.ADD;
            this.addChild(this._effect);
            this._effect.anchorOffsetX = 133 / 2;
            this._effect.anchorOffsetY = 132 / 2;
            this._effect.setPosition(this._icon.width/2, this._icon.height/2);
            this._effect.setScale(this._icon.width/74);
            this._effect.playWithTime(-1);
        }
    }

    private removeEffect() {
        if (this._effect) {
            this._effect.dispose();
            this._effect = null;
        }
    }

    public dispose() {
        this._icon = null;
        this._effect = null;
        this._typeBg = null;
        this._type = null;
        // this._nameBg = null;
        this._name = null;
        this._skillId = null;
        this.skillInfo = null;
        this._callBack = null;
        this._callBackObj = null;

        super.dispose();
    }
}